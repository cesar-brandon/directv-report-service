"use client";

import useDraw, { type DrawProps } from "@/hooks/useDraw";
import { draw } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import ClearButton from "./clear-button";
import SaveButton from "./save-button";
import { Loader2 } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export default function SignatureCanvas({ form }: { form: any }) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isCanvasActive, setIsCanvasActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const strokeColor = "#001bc9";
  const strokeWidth = [3];
  const dashGap = [0];

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const strokeWidth = [3];
      const dashGap = [0];
      const drawOptions = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth,
        dashGap,
      };
      draw(drawOptions);
      setIsEmpty(false);
    },
    [strokeColor, strokeWidth, dashGap, setIsEmpty]
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

  const clearCanvas = () => {
    clear();
    setIsEmpty(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="relative flex h-[20rem] w-[35rem] items-center justify-center"
      >
        <ClearButton canvasRef={canvasRef} clear={clearCanvas} />

        {/* {isCanvasLoading && (
          <Skeleton className="absolute h-[calc(100%-50px)] w-[calc(100%-50px)]" />
        )} */}

        <FormField
          control={form.control}
          name="signature"
          render={() => (
            <FormItem>
              <FormControl>
                <canvas
                  id="canvas"
                  ref={canvasRef}
                  onMouseDown={isCanvasActive ? handleInteractStart : undefined}
                  onTouchStart={
                    isCanvasActive ? handleInteractStart : undefined
                  }
                  width={0}
                  height={0}
                  className="touch-none rounded-lg border bg-background"
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {!isCanvasActive && (
          <div
            className="absolute h-[17rem] w-[32rem] border flex items-center justify-center
          z-10 top-6 lef-0 backdrop-blur-sm bg-background/30 rounded-lg"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-primary" size={64} />
            ) : (
              <p>Firma Guardada!</p>
            )}
          </div>
        )}
      </div>

      <SaveButton
        setIsCanvasActive={setIsCanvasActive}
        setIsLoading={setIsLoading}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        form={form}
      />
    </div>
  );
}
