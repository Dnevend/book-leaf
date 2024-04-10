import { useNavigate } from "react-router";
import { ProfileForm } from "./components/profileForm";
import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { useEffect } from "react";

const Mine = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo, signOut } = useSupabaseAuth();

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, [isAuth, navigate]);

  return (
    <div className="max-w-screen-xl flex-col space-y-6 p-6 mx-auto">
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
