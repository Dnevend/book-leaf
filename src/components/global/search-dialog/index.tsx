import { Dialog, DialogContent } from "./dialog";
import { Logo } from "..";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import { Volume } from "@/types/google-books";

import {
  Input,
  Separator,
  Button,
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";
import { useThrottleFn } from "@/lib/hooks";

const baseUrl = "https://www.googleapis.com/books";

const requestUrl = {
  volumes: "/v1/volumes",
};

export const SearchDialog = (props: DialogPrimitive.DialogProps) => {
  const [books, setBooks] = useState<Volume[]>([]);

  const onSearch = async (searchContent: string) => {
    const res = await fetch(
      `${baseUrl}${requestUrl.volumes}?q=intitle:${searchContent}&key=${
        import.meta.env.VITE_GOOGLE_BOOKS_API
      }`
    );
    const { totalItems, items = [] } = await res.json();

    console.log("🐞 => onSearch => totalItems:", totalItems);

    setBooks(items);
  };

  const { run } = useThrottleFn(onSearch);

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-screen-sm p-0">
        <div className="p-4">
          <Input
            placeholder="Book / ISBN / Author"
            onChange={(e) => {
              run(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center items-center">
          {books.length === 0 && (
            <span className="my-10 text-slate-200">No content searches</span>
          )}

          {books.length > 0 && (
            <ScrollArea className="h-80 w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Publisher
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Published Date
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={it.volumeInfo.imageLinks?.smallThumbnail}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {it.volumeInfo.title}
                      </TableCell>
                      <TableCell>
                        {it.volumeInfo.authors?.map((it) => (
                          <Badge variant="outline">{it}</Badge>
                        ))}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $499.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {it.volumeInfo.publisher}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {it.volumeInfo.publishedDate}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>

        <div>
          <Separator />
          <div className="flex justify-center gap-x-2 p-2">
            <span className="text-slate-400">BookLeaf</span>
            <Logo size="icon" iconProps={{ size: 24 }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
