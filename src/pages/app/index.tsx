import { useState } from "react";
import {
  Input,
  Button,
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui";
import { MoreHorizontal, BookPlus, Link as LucideLink } from "lucide-react";

const baseUrl = "https://www.googleapis.com/books";

const requestUrl = {
  volumes: "/v1/volumes",
};

interface VolumeInfo {
  authors: string[];
  categories?: string[];
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  description: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  pageCount: number;
  publisher: string;
  title: string;
  subtitle: string;
  publishedDate: string;
}

interface Volume {
  id: string;
  searchInfo: {
    textSnippet: string;
  };
  volumeInfo: VolumeInfo;
}

function App() {
  const [searchContent, setSearchContent] = useState("");
  const [bookItems, setBookItems] = useState<Volume[]>([]);

  const onSearch = async () => {
    console.log("v =>", searchContent);
    const res = await fetch(
      `${baseUrl}${requestUrl.volumes}?q=intitle:${searchContent}&key=${
        import.meta.env.VITE_GOOGLE_BOOKS_API
      }`
    );
    const { totalItems, items = [] } = await res.json();
    console.log("items =>", totalItems, items);
    setBookItems(items);
  };

  return (
    <div className="max-w-screen-xl flex-col space-y-6 p-6 mx-auto">
      <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
        <Input
          onChange={(e) => setSearchContent(e.target.value)}
          value={searchContent}
          placeholder="Book / ISBN / Author"
        />
        <Button type="submit" onClick={onSearch}>
          Search
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
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
              {bookItems.map((it) => (
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
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>

      <div className="sticky bottom-6 mx-auto w-fit shadow-md">
        <Menubar className="p-2">
          <MenubarMenu>
            <MenubarTrigger>
              <BookPlus className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <LucideLink className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>
                Always Show Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default App;
