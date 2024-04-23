import { useNavigate } from "react-router";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { useCallback, useEffect, useState } from "react";
import BgLibrary from "@/assets/bg_library_1.jpg";
import { supabase } from "@/lib/supabaseClient";
import { Tables } from "@/types/supabase";
import SvgPlaceholder from "@/assets/placeholder.svg";
import { Book, BookPlus, MoreHorizontal, Trash } from "lucide-react";
import { storeGet, storeSet } from "@/lib/store2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Mine = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo } = useSupabaseAuth();
  const [leafs, setLeafs] = useState<Tables<"leaf">[]>(storeGet("leafs", []));

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, [isAuth, navigate]);

  const fetchLeafs = useCallback(async () => {
    if (!userInfo) return;
    const { data } = await supabase
      .from("leaf")
      .select()
      .eq("user_id", userInfo?.id);
    setLeafs(data || []);
    storeSet("leafs", data || []);
  }, [userInfo]);

  useEffect(() => {
    fetchLeafs();
  }, [fetchLeafs]);

  const onView = (id: Tables<"leaf">["share_id"]) => {
    navigate("/app/" + id);
  };

  const onCreate = () => {
    navigate("/app");
  };

  const onDelete = async (leaf: Tables<"leaf">) => {
    await supabase.from("leaf_items").delete().eq("leaf_id", leaf.share_id!);
    await supabase.from("leaf").delete().eq("id", leaf.id);
    await fetchLeafs();
  };

  return (
    <div className="w-full max-w-screen-xl flex-1 flex-col p-6 mx-auto">
      <div
        className="w-full h-40 sm:h-64 rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url(${BgLibrary})` }}
      />

      <img
        className="relative -mt-12 sm:-mt-14 mx-auto w-24 h-24 sm:w-28 sm:h-28 border-solid border-4 rounded-full overflow-hidden shadow-md"
        src="https://http.cat/images/200.jpg"
        alt="avatar"
      />

      <h1 className="text-2xl text-center my-3">{userInfo?.email}</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-2">
        {leafs.map((it) => (
          <div
            key={it.id}
            className="relative flex flex-col justify-between border-2 rounded-md hover:shadow-md overflow-hidden"
            onClick={() => onView(it.share_id)}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    to={`/app/${it.share_id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    <span>查看</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="flex">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>删除</span>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {/* TODO: Close after asynchronous */}
                        <AlertDialogAction onClick={() => onDelete(it)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <h2 className="text-lg px-2 my-5 pr-8">
              {it.name || "BookLeaf - unnamed"}
            </h2>
            <div>
              <img
                src={it.cover || SvgPlaceholder}
                className="h-28 w-full object-cover"
              />
            </div>
          </div>
        ))}

        <div
          className="flex justify-center items-center border-2 rounded-md hover:shadow-md py-12"
          onClick={onCreate}
        >
          <BookPlus />
        </div>
      </div>
    </div>
  );
};

export default Mine;
