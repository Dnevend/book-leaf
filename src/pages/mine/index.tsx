import { useLogto } from "@logto/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { Tables } from "@/types/supabase";

const Mine = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getIdTokenClaims, signOut } = useLogto();

  const [userInfo, setUserInfo] = useState<Tables<"user"> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();

        if (!claims?.sub) return;

        const { data: userInfo } = await supabase
          .from("user")
          .select("id, username, avatar, bio, email")
          .eq("logto_sub", claims?.sub)
          .single<Tables<"user">>();

        setUserInfo(userInfo);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div>
      <h1>{userInfo?.username ?? "-"}</h1>
      <button
        onClick={() => signOut(import.meta.env.VITE_LOGTO_SIGNOUT_REDIRECT_URL)}
        className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Mine;
