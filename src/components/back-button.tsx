"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="absolute right-4 top-4 z-10 text-white"
    >
      <X className="w-6 h-6" />
    </div>
  );
}
