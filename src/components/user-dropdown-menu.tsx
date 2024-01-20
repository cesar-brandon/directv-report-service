"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toogle";
import { simplifyName } from "@/lib/utils";

type Props = {
  user: any;
};

export function UserDropdownMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden flex items-center gap-4">
        Hola, {user?.name}
        <Avatar>
          <AvatarImage src={user?.image} alt="@user" className="object-cover" />
          <AvatarFallback>{simplifyName(user?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link className="flex items-center" href="/profile">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start"
          >
            <UserCircle className="mr-2 h-4 w-4" /> Perfil
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" /> Salir
        </Button>
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
