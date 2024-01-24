import { BackButton } from "@/components/back-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { simplifyName } from "@/lib/utils";
import Image from "next/image";

export default async function Profile() {
  const session = await getAuthSession();
  const user = session && session?.user;

  return (
    <div className="fixed inset-0 bg-background/50 z-10 backdrop-blur-sm">
      <div className="container flex justify-center items-center h-full max-w-lg mx-auto">
        <Card className="relative w-[50rem] h-[30rem] overflow-hidden">
          <CardHeader className="relative overflow-hidden">
            <Image
              className="absolute w-full h-[8rem] object-cover top-0 left-0 blur-sm scale-105"
              src="/directv-back.jpg"
              width={600}
              height={600}
              alt="back-profile"
            />
            <div className="flex z-10 items-center gap-8">
              <Avatar className="w-[4rem] h-[4rem]">
                <AvatarImage src={user.image} alt="@shadcn" />
                <AvatarFallback>{simplifyName(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className=" text-white">{user.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <BackButton />
            <section></section>
            <Separator />
            <section></section>
            <Separator />
            <section></section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
