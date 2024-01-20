"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon, Logo } from "../icons";
import { LoginForm } from "./login-form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      return toast({
        title: "Algo salió mal",
        description: "No se pudo iniciar sesión con Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card
      className="absolute w-full flex flex-col items-center justify-center sm:block h-full sm:w-[27rem] sm:h-auto
       p-6 dark:bg-background/60 backdrop-blur-md
       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-3xl"
    >
      <Logo className="w-20 h-20 mx-auto mb-10" />
      <CardContent>
        <LoginForm />
        <Separator className="my-8" />
        <Button
          className="w-full"
          variant="outline"
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <GoogleIcon /> Iniciar sesión con Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
