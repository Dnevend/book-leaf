import { Loading } from "@/components/global";
import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  const { isLoading } = useHandleSignInCallback(() => {
    // Navigate to root path when finished
    navigate("/app");
  });

  // When it's working in progress
  if (isLoading) {
    return <Loading />;
  }

  return null;
};
export default Callback;
