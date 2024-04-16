import { useNavigate } from "react-router";
import { ProfileForm } from "./components/profileForm";
import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { useEffect } from "react";
import BgLibrary from "@/assets/bg_library_1.jpg";

const Mine = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo, signOut } = useSupabaseAuth();

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, [isAuth, navigate]);

  return (
    <div className="w-full max-w-screen-xl flex-1 flex-col space-y-6 p-6 mx-auto">
      <div
        className="w-full h-64 rounded-md bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${BgLibrary})` }}
      >
        <div className="flex gap-x-2">
          <img
            className="w-28 h-28 border-solid border-4 rounded-full overflow-hidden"
            src="https://http.cat/images/200.jpg"
          />
          <div className="text-xl font-bold text-white">{userInfo?.email}</div>
        </div>
      </div>

      <ProfileForm userInfo={userInfo!} />

      <Button
        onClick={() => signOut()}
        className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
      >
        Sign Out
        <LogOut />
      </Button>
    </div>
  );
};

export default Mine;
