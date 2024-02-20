"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const coordinateX = searchParams.get("x");
  const coordinateY = searchParams.get("y");

  const handleMove = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      let x = coordinateX;
      let y = coordinateY;

      if (direction === "up") {
        y = (parseInt(y!) + 1).toString();
      } else if (direction === "down") {
        y = (parseInt(y!) - 1).toString();
      } else if (direction === "left") {
        x = (parseInt(x!) - 1).toString();
      } else if (direction === "right") {
        x = (parseInt(x!) + 1).toString();
      }

      router.push(`/rooms?x=${x}&y=${y}`);
    },
    [coordinateX, coordinateY, router]
  );

  //move with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        handleMove("up");
      } else if (e.key === "ArrowDown" || e.key === "s") {
        handleMove("down");
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        handleMove("left");
      } else if (e.key === "ArrowRight" || e.key === "d") {
        handleMove("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [coordinateX, coordinateY, handleMove]);

  return (
    <div>
      Coordenadas: {coordinateX} / {coordinateY}
      <button onClick={() => handleMove("up")}>Up</button>
      <button onClick={() => handleMove("down")}>Down</button>
      <button onClick={() => handleMove("left")}>Left</button>
      <button onClick={() => handleMove("right")}>Right</button>
    </div>
  );
}
