import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/provider/supabaseAuth";

const App = () => {
  const navigate = useNavigate();

  const { isAuth } = useSupabaseAuth();

  if (isAuth) {
    navigate("/");
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 sm:max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <Leaf size={48} color="#96c24e" />
          <h1 className="text-xl font-bold px-2">書叶 · BookLeaf</h1>
        </Link>

        <div className="border-md rounded-md shadow-md p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            socialLayout="horizontal"
            providers={["google", "github"]}
          ></Auth>
        </div>
      </div>
    </main>
  );
};

export default App;
