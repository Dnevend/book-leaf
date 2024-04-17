import { useNavigate } from "react-router";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { useEffect } from "react";
import BgLibrary from "@/assets/bg_library_1.jpg";

const Mine = () => {
  const navigate = useNavigate();

  const { isAuth, userInfo } = useSupabaseAuth();

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, [isAuth, navigate]);

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

      <h1 className="text-2xl text-center mt-2">{userInfo?.email}</h1>
    </div>
  );
};

export default Mine;
