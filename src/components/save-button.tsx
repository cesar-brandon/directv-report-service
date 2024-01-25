"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";

interface Props {
  setIsCanvasActive: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  isEmpty: boolean;
  setIsEmpty: (value: boolean) => void;
  form: any;
}

export default function SaveButton({
  setIsCanvasActive,
  setIsLoading,
  isEmpty,
  setIsEmpty,
  form,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    canvasRef.current = canvasElement;
  }, []);

  const saveCanvas = async () => {
    if (!canvasRef.current) return;
    setIsCanvasActive(false);
    setIsLoading(true);
    setIsEmpty(true);
    const dataUrl = canvasRef.current.toDataURL();
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "firma.png", { type: "image/png" });
    if (!file) return;
    await uploadByFile(file);
  };

  async function uploadByFile(file: File) {
    try {
      const [res] = await uploadFiles("imageUploader", {
        files: [file],
        package: "myPackage",
      });
      form.setValue("signature", res.url);
    } catch (error: any) {
      toast({
        title: "Algo salió mal",
        description: "Error al subir la firma.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={saveCanvas}
      disabled={isEmpty}
    >
      Confirmar firma
    </Button>
  );
}
