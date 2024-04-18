import SearchDialog from "@/components/global/search-dialog";
import MenuBar from "./components/menubar";
import BookCard from "./components/book-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { BookDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Volume } from "@/types/google-books";

import { storeGet, storeSet } from "@/lib/store2";

function App() {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [books, setBooks] = useState<Volume[]>([]);

  useEffect(() => {
    setBooks(storeGet("books", []));
  }, []);

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

  return (
    <>
      <div className="flex flex-1 flex-col space-y-6 container">
        <SearchDialog
          open={searchDialogOpen}
          onOpenChange={(open) => setSearchDialogOpen(open)}
          added={books.map((it) => it.id)}
          onAdd={onAddBook}
        />

        <div>Title...</div>

        <div>Description...</div>

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
            <div className="flex flex-col flex-1 items-center gap-1 text-center">
              <BookDashed size={48} />
              <h3 className="text-2xl font-bold tracking-tight">
                You have no books
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start sharing as soon as you add a book.
              </p>
              <Button
                className="mt-4"
                onClick={() => setSearchDialogOpen(true)}
              >
                Add Book
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-6 w-full">
        <MenuBar
          onShare={() => null}
          onBookAdd={() => setSearchDialogOpen(true)}
          onPicAdd={() => null}
        />
      </div>
    </>
  );
}

export default App;
