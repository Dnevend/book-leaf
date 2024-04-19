import { Button } from "@/components/ui";
import { BookDashed } from "lucide-react";

const BookEmpty = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-1 text-center">
      <BookDashed size={48} />
      <h3 className="text-2xl font-bold tracking-tight">You have no books</h3>
      <p className="text-sm text-muted-foreground">
        You can start sharing as soon as you add a book.
      </p>
      <Button className="mt-4" onClick={onAdd}>
        Add Book
      </Button>
    </div>
  );
};

export default BookEmpty;
