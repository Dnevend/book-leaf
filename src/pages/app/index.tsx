import SearchDialog from "@/components/global/search-dialog";
import MenuBar from "./components/menubar";
import BookCard from "./components/book-card";
import BookEmpty from "./components/book-empty";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Volume } from "@/types/google-books";

import { storeGet, storeRemove, storeSet } from "@/lib/store2";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/provider";
import { useNavigate, useParams } from "react-router";
import { TablesInsert } from "@/types/supabase";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function App() {
  const { id } = useParams() as { id?: string };
  const navigate = useNavigate();

  const { toast } = useToast();
  const { userInfo, isAuth } = useSupabaseAuth();

  const [isBelongMe, setIsBelongMe] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [coverUrl, setCoverUrl] = useState<string>();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [books, setBooks] = useState<Volume[]>([]);

  useEffect(() => {
    if (!id) {
      setBooks(storeGet("books", []));
    } else {
      (async () => {
        const { data: leaf } = await supabase
          .from("leaf")
          .select()
          .eq("share_id", id)
          .single();
        if (!leaf) return;

        const { data: leafItems } = await supabase
          .from("leaf_items")
          .select()
          .eq("leaf_id", leaf.share_id!);

        setIsBelongMe(leaf.user_id === userInfo?.id);
        setTitle(leaf.name || "");
        setDesc(leaf.desc || "");
        setCoverUrl(leaf.cover || "");
        setBooks(leafItems?.map((it) => JSON.parse(it.info as string)) || []);
      })();
    }
  }, [id, userInfo]);

  const onAddBook = (book: Volume) => {
    if (books.map((it) => it.id).includes(book.id)) return;
    const _books = [...books, book];
    storeSet("books", _books);
    setBooks(_books);
  };

  const onRemoveBook = (book: Volume) => {
    const _books = books.filter((it) => it.id !== book.id);
    storeSet("books", _books);
    setBooks(_books);
  };

  const onViewDetail = (book: Volume) => {
    console.log("🐞 => onViewDetail => Volume:", book);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    const file = files[0];

    const { data, error } = await supabase.storage
      .from("cover")
      .upload(`Bookleaf-${new Date().valueOf()}-${file.name}`, file);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error && (error as any).statusCode === "403") {
      navigate("/auth");
      return;
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from("cover").getPublicUrl(data!.path);

    setCoverUrl(publicUrl);
  };

  const onShare = async () => {
    if (!isAuth) {
      navigate("/auth");
      return;
    }

    if (books.length === 0) {
      toast({
        description: "Please add book first!",
        action: (
          <ToastAction
            altText="Add Book"
            onClick={() => setSearchDialogOpen(true)}
          >
            Add book
          </ToastAction>
        ),
      });
      return;
    }

    const { data } = await supabase
      .from("leaf")
      .insert({
        user_id: userInfo?.id,
        name: title,
        desc: desc,
        cover: coverUrl,
      })
      .select()
      .single();

    const columns: TablesInsert<"leaf_items">[] = books.map((it) => ({
      leaf_id: data?.share_id,
      info: JSON.stringify(it),
    }));
    await supabase.from("leaf_items").insert(columns);

    storeRemove("books");

    navigate(`/app/${data?.share_id}`, { replace: true });

    toast({
      title: "Link",
      description: data?.share_id,
      action: <ToastAction altText="Copy">Copy</ToastAction>,
    });
  };

  return (
    <>
      <div className="flex flex-1 flex-col space-y-6 container">
        <SearchDialog
          open={searchDialogOpen}
          onOpenChange={(open) => setSearchDialogOpen(open)}
          added={books.map((it) => it.id)}
          onAdd={onAddBook}
        />

        {(!id || isBelongMe) && (
          <Input
            placeholder="Title"
            className="text-4xl font-bold leading-6 border-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        {(!id || isBelongMe) && (
          <Textarea
            placeholder="Description"
            className="text-lg leading-4 border-none resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        )}

        {coverUrl && (
          <div
            className="h-36 w-full rounded-sm"
            style={{ backgroundImage: `url(${coverUrl})` }}
          />
        )}

        <div
          className={cn(
            "flex w-full space-x-2 mx-auto",
            books.length === 0 ? "m-auto" : null
          )}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-4">
            {books.map((it) => (
              <BookCard
                key={it.id}
                book={it}
                onRemove={onRemoveBook}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>

          {books.length === 0 && (
            <BookEmpty onAdd={() => setSearchDialogOpen(true)} />
          )}
        </div>
      </div>

      <div className="sticky bottom-6 w-full">
        <MenuBar
          onShare={onShare}
          onBookAdd={() => setSearchDialogOpen(true)}
          onCoverUpload={handleUpload}
        />
      </div>
    </>
  );
}

export default App;
