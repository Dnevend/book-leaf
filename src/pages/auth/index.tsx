import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/provider/supabaseAuth";
import { Logo } from "@/components/global";

const App = () => {
  const navigate = useNavigate();

  const { isAuth } = useSupabaseAuth();

  if (isAuth) {
    navigate("/");
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 sm:max-w-md">
        <Link to="/">
          <Logo size="lg" />
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
