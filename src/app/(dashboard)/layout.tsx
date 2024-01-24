import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (session && session.user) {
    return (
      <div className="w-full flex flex-col px-8 xl:px-48">
        <div className="w-full flex justify-between items-center py-4  ">
          <Link href="/">
            <Logo className="w-12 h-12" />
          </Link>
          <UserDropdownMenu user={session.user} />
        </div>

        {children}
        {profile}
      </div>
    );
  }

  return redirect("/login");
}
