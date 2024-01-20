import { LoginCard } from "@/components/auth/login-card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Image
        src="/directv-back-3.jpg"
        className="w-full h-full object-cover dark:blur-sm"
        width={1000}
        height={1000}
        alt="Directv background"
      />

      <LoginCard />
    </div>
  );
}
