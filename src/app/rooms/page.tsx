"use client";
import CharactersDisplay from "@/components/rooms/characters-display";
import { isOnLimit } from "@/lib/rooms/utils";
import { getRoomByCoordinates } from "@/services/rooms/room-service";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [useKeyboard, setUseKeyboard] = useState<boolean>(true);

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
    if (!useKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "ArrowUp" || e.key === "w") &&
        isOnLimit(parseInt(coordinateX!), parseInt(coordinateY!) + 1)
      ) {
        handleMove("up");
      } else if (
        (e.key === "ArrowDown" || e.key === "s") &&
        isOnLimit(parseInt(coordinateX!), parseInt(coordinateY!) - 1)
      ) {
        handleMove("down");
      } else if (
        (e.key === "ArrowLeft" || e.key === "a") &&
        isOnLimit(parseInt(coordinateX!) - 1, parseInt(coordinateY!))
      ) {
        handleMove("left");
      } else if (
        (e.key === "ArrowRight" || e.key === "d") &&
        isOnLimit(parseInt(coordinateX!) + 1, parseInt(coordinateY!))
      ) {
        handleMove("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [coordinateX, coordinateY, handleMove, useKeyboard]);

  const roomInfo = getRoomByCoordinates(
    parseInt(coordinateX!),
    parseInt(coordinateY!)
  );

  return (
    <div>
      <main>
        <Image
          className="absolute w-full h-full"
          src={roomInfo!.image}
          alt={roomInfo!.description}
          width={1920}
          height={1080}
        />
        <CharactersDisplay
          disableKeyboard={() => setUseKeyboard(!useKeyboard)}
          positionX={coordinateX!}
          positionY={coordinateY!}
        />
      </main>
      <aside>
        <Image
          className="absolute w-80 translate-x-5 bottom-4 hover:scale-105 transition-all cursor-pointer"
          src={roomInfo!.minimapImg}
          alt={roomInfo!.description}
          width={400}
          height={400}
        />
      </aside>
    </div>
  );
}
