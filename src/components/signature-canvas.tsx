"use client";

import useDraw, { type DrawProps } from "@/hooks/useDraw";
import { draw } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";
import ClearButton from "./clear-button";
import SaveButton from "./save-button";

export default function SignatureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  const strokeColor = "#001bc9";
  const strokeWidth = [4];
  const dashGap = [0];

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const drawOptions = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth,
        dashGap,
      };
      draw(drawOptions);
    },
    [strokeColor, strokeWidth, dashGap]
  );

  const { canvasRef, onInteractStart, clear, undo } = useDraw(onDraw);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement?.getContext("2d");
  }, [canvasRef]);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();

      canvasRef.current.width = width - 50;
      canvasRef.current.height = height - 50;
    };

    setCanvasDimensions();
  }, [canvasRef]);

  const handleInteractStart = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    onInteractStart();
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="relative flex h-[20rem] w-[30rem] items-center justify-center"
      >
        <div className="absolute overflow-hidden right-[26px] top-[25px] flex select-none rounded-none rounded-bl rounded-tr-[2.5px]">
          <ClearButton canvasRef={canvasRef} clear={clear} />
        </div>

        {/* {isCanvasLoading && (
          <Skeleton className="absolute h-[calc(100%-50px)] w-[calc(100%-50px)]" />
        )} */}

        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleInteractStart}
          onTouchStart={handleInteractStart}
          width={0}
          height={0}
          className="touch-none rounded border bg-background"
        />
      </div>
      <SaveButton />
    </div>
  );
}
