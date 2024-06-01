import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { LogOut, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  const handleSignOut = async () => {
    await fetch("http://localhost:5001/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("User logged out successfully!");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center bg-gray-300 sticky top-0 w-full p-3">
      <Link to="/">
        <h1 className="text-2xl font-bold">Invoice Generator</h1>
      </Link>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
              <AvatarFallback>profile image</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-1 ml-1">
              <User size={18} />
              {currentUser?.user?.username ?? "Username"}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 ml-1">
              <Mail size={16} />
              {currentUser?.user?.email ?? "Email"}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div
                onClick={handleSignOut}
                className="flex items-center gap-1 ml-1"
              >
                <LogOut size={16} /> Sign out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
