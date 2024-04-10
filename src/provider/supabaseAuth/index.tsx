import { storeGet, storeRemove, storeSet } from "@/lib/store2";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useNavigate } from "react-router";

type Action =
  | { type: "signIn"; userInfo: Session["user"] }
  | { type: "signOut" };

type Dispatch = (action: Action) => void;

interface State {
  isAuth: boolean;
  userInfo?: Session["user"];
}

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "signIn": {
      storeSet("userInfo", action.userInfo);
      return {
        ...state,
        isAuth: true,
        userInfo: action.userInfo,
      };
    }

    case "signOut": {
      storeRemove("userInfo");
      return {
        ...state,
        isAuth: false,
        userInfo: undefined,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const SupabaseAuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const SupabaseAuthProvider = (props: PropsWithChildren) => {
  const initState: State = {
    isAuth: Boolean(storeGet("userInfo")),
    userInfo: storeGet("userInfo"),
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch({ type: "signIn", userInfo: session.user });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <SupabaseAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const navigate = useNavigate();
  const ctx = useContext(SupabaseAuthContext);

  const signOut = async () => {
    await supabase.auth.signOut();
    ctx?.dispatch({ type: "signOut" });
    navigate("/");
  };

  return { ...ctx?.state, signOut };
};
