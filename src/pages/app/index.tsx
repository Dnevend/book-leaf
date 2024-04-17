import SearchDialog from "@/components/global/search-dialog";
import MenuBar from "./components/menubar";
import { useState } from "react";
import { Button } from "@/components/ui";
import { BookDashed } from "lucide-react";
import { cn } from "@/lib/utils";

function App() {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-dvh flex-col space-y-6 container">
        <SearchDialog
          open={searchDialogOpen}
          onOpenChange={(open) => setSearchDialogOpen(open)}
        />

        <div className={cn("flex w-full max-w-sm space-x-2 mx-auto", "m-auto")}>
          <div className="flex flex-col flex-1 items-center gap-1 text-center">
            <BookDashed size={48} />
            <h3 className="text-2xl font-bold tracking-tight">
              You have no books
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start sharing as soon as you add a book.
            </p>
            <Button className="mt-4" onClick={() => setSearchDialogOpen(true)}>
              Add Book
            </Button>
          </div>
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
