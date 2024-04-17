import { LogOut, UserCog } from "lucide-react";
import { Logo } from "@/components/global";
import { Button } from "@/components/ui";
import { useSupabaseAuth } from "@/provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isAuth, signOut, userInfo } = useSupabaseAuth();

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl w-full mx-auto md:px-8">
      <div className="items-center justify-between flex">
        {isAuth && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <UserCog />
                <span className="sr-only">User Config</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {userInfo?.email || "My Account"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/me"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Logo size="sm" />
      </div>
    </footer>
  );
};

export default Footer;
