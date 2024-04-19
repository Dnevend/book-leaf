import { useNavigate } from "react-router";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { useEffect, useState } from "react";
import BgLibrary from "@/assets/bg_library_1.jpg";
import { supabase } from "@/lib/supabaseClient";
import { Tables } from "@/types/supabase";
import SvgPlaceholder from "@/assets/placeholder.svg";
import { BookPlus } from "lucide-react";
import { storeGet, storeSet } from "@/lib/store2";

const Mine = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo } = useSupabaseAuth();
  const [leafs, setLeafs] = useState<Tables<"leaf">[]>(storeGet("leafs"));

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, [isAuth, navigate]);

  useEffect(() => {
    (async () => {
      if (!userInfo) return;
      const { data } = await supabase
        .from("leaf")
        .select()
        .eq("user_id", userInfo?.id);
      setLeafs(data || []);
      storeSet("leafs", data || []);
    })();
  }, [userInfo]);

  const onView = (id: Tables<"leaf">["share_id"]) => {
    navigate("/app/" + id);
  };

  const onCreate = () => {
    navigate("/app");
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
            className="flex flex-col justify-between border-2 rounded-md hover:shadow-md"
            onClick={() => onView(it.share_id)}
          >
            <h2 className="text-xl px-2 my-5">
              {it.name || "BookLeaf - nnamed"}
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
