import SearchDialog from "@/components/global/search-dialog";
import MenuBar from "./components/menubar";
import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { BookDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Volume } from "@/types/google-books";
import SvgPlaceholder from "@/assets/placeholder.svg";

function App() {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [books, setBooks] = useState<Volume[]>([]);

  return (
    <>
      <div className="flex flex-1 flex-col space-y-6 container">
        <SearchDialog
          open={searchDialogOpen}
          onOpenChange={(open) => setSearchDialogOpen(open)}
          onAdd={(book) => {
            setBooks((_books) => [..._books, book]);
          }}
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
              <div
                className={cn(
                  "relative py-2 md:py-10 sm:py-3 px-2 md:px-5 flex flex-col items-center justify-center w-auto h-auto rounded-xl border",
                  "bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]"
                )}
              >
                <div className="text-xl font-bold text-neutral-600 dark:text-white text-ellipsis overflow-hidden line-clamp-2">
                  {it.volumeInfo.title}
                </div>
                <div className="flex gap-1 mt-1">
                  {it.volumeInfo.authors?.map((it) => (
                    <Badge variant="outline">{it}</Badge>
                  ))}
                </div>
                <div className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-ellipsis overflow-hidden line-clamp-2">
                  {it.volumeInfo.description}
                </div>
                <div className="w-full mt-4">
                  <img
                    src={
                      it.volumeInfo.imageLinks?.thumbnail
                        ? it.volumeInfo.imageLinks.thumbnail
                        : SvgPlaceholder
                    }
                    height="1000"
                    width="1000"
                    className="h-28 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </div>
                <div className="flex items-center mt-6">
                  <Button size="sm" variant="ghost">
                    Detail
                  </Button>
                </div>
              </div>
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
