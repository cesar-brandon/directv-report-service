"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import axios from "axios";

export default function SaveButton() {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    canvasRef.current = canvasElement;
  }, []);

  const saveCanvas = () => {
    if (!canvasRef.current) return;

    const linkEl = document.createElement("a");
    linkEl.download = "scribble.png";
    linkEl.href = canvasRef.current.toDataURL();
    uploadByFile([linkEl.href]);
    linkEl.click();
    linkEl.remove();
  };

  async function uploadByFile(file: string[]) {
    try {
      await axios.post("/uploadthing", file);
    } catch (error: any) {
      return {
        success: 0,
        error: error.message,
      };
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={saveCanvas}>
      Confirmar firma
    </Button>
  );
}
