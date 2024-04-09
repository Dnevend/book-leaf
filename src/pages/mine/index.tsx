import { useLogto, IdTokenClaims } from "@logto/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Mine = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getIdTokenClaims, signOut } = useLogto();

  const [userInfo, setUserInfo] = useState<IdTokenClaims>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUserInfo(claims);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  console.log("user info =>", isAuthenticated, userInfo);

  return (
    <div>
      <h1>{userInfo?.name ?? userInfo?.sub}</h1>
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
