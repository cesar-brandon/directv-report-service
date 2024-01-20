import { Button } from "@/components/ui/button";

interface ClearButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clear: () => void;
}

export default function ClearButton({ canvasRef, clear }: ClearButtonProps) {
  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    clear();
  };

  return (
    <Button
      variant="outline"
      className="rounded-none rounded-tr-[2.8px] border-0 border-b border-l focus-within:z-10"
      onClick={clearCanvas}
    >
      Clear
    </Button>
  );
}
