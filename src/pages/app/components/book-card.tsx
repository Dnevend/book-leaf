import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Volume } from "@/types/google-books";
import SvgPlaceholder from "@/assets/placeholder.svg";
import { Trash } from "lucide-react";

const BookCard = ({
  book,
  onRemove,
  onViewDetail,
}: {
  book: Volume;
  onViewDetail: (book: Volume) => void;
  onRemove: (book: Volume) => void;
}) => {
  return (
    <div
      className={cn(
        "py-2 md:py-6 sm:py-3 px-2 md:px-5 flex flex-col items-center justify-between w-auto h-auto rounded-xl border",
        "bg-gray-50 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]"
      )}
    >
      <div className="text-sm md:text-xl sm:text-base font-bold text-neutral-600 dark:text-white text-ellipsis overflow-hidden line-clamp-2">
        {book.volumeInfo.title}
      </div>
      <div className="w-full flex flex-wrap justify-start gap-1 mt-1">
        {book.volumeInfo.authors?.map((it) => (
          <Badge key={it} variant="outline">
            {it}
          </Badge>
        ))}
      </div>
      <div className="text-neutral-500 text-sm break-all max-w-sm mt-2 dark:text-neutral-300 text-ellipsis overflow-hidden line-clamp-2">
        {book.volumeInfo.description}
      </div>
      <div className="w-full mt-4">
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : SvgPlaceholder
          }
          height="1000"
          width="1000"
          className="h-28 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </div>
      <div className="w-full flex justify-between items-center mt-6">
        <Button size="sm" variant="ghost" onClick={() => onViewDetail(book)}>
          Detail
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onRemove(book)}>
          <Trash size="20" />
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
