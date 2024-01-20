import { FilterFn } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { DrawOptions } from "@/types/draw";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const simplifyName = (fullName: string): string => {
  const words = fullName.split(" ");
  let simplifiedName = "";
  if (words.length >= 2) {
    simplifiedName = words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  } else {
    simplifiedName = words[0].charAt(0);
  }
  return simplifiedName;
};

export function draw({
  ctx,
  currentPoint,
  prevPoint,
  strokeColor,
  strokeWidth,
  dashGap,
}: DrawOptions) {
  const startPoint = prevPoint ?? currentPoint;

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth[0];
  ctx.setLineDash(dashGap);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Start a new path
  ctx.beginPath();
  // Place the cursor from the point the line should be started
  ctx.moveTo(startPoint.x, startPoint.y);
  // Draw a line from current cursor position to the provided x,y coordinate
  ctx.lineTo(currentPoint.x, currentPoint.y);
  // Add stroke to the given path (render the line)
  ctx.stroke();
}

export function drawWithDataURL(
  dataURL: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement
) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(img, 0, 0);
  };
}
