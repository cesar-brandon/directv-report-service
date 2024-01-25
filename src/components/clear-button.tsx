import { Button } from "@/components/ui/button";

interface ClearButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clear: () => void;
}

export default function cClearButton({ canvasRef, clear }: ClearButtonProps) {
  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    clear();
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="absolute right-[25px] top-[25px] flex select-none rounded-none rounded-bl rounded-tr-md border-0 border-b border-l focus-within:z-10"
      onClick={clearCanvas}
    >
      Clear
    </Button>
  );
}
