"use client";
import CharacterDialog from "@/components/rooms/character-dialog";
import CharactersDisplay from "@/components/rooms/characters-display";
import ExitDialog from "@/components/rooms/exit-dialog";
import ItemsDialog from "@/components/rooms/items-dialog";
import ObjectivesDialog from "@/components/rooms/objective-dialog";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/entities/item";
import { isOnLimit } from "@/lib/rooms/utils";
import { useSave } from "@/providers/save-provider";
import { getItemsByCoordinates } from "@/services/rooms/items-service";
import { getRoomByCoordinates } from "@/services/rooms/room-service";
import {
  LoadSave,
  SaveDataToLocalStorage,
} from "@/services/shared/storage-service";
import { Save } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [useKeyboard, setUseKeyboard] = useState<boolean>(true);

  const coordinateX = searchParams.get("x");
  const coordinateY = searchParams.get("y");

  const { save, setSave } = useSave();

  useEffect(() => {
    const savedGame = LoadSave();

    console.log(savedGame);
    if (savedGame) {
      setSave(savedGame);
    }
  }, [setSave]);

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

      const currentSave = save;

      currentSave.positionX = x!;
      currentSave.positionY = y!;

      setSave(currentSave);

      router.push(`/rooms?x=${x}&y=${y}`);
    },
    [coordinateX, coordinateY, router, setSave, save]
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

  const items = getItemsByCoordinates(coordinateX!, coordinateY!);

  function addItemToSave(item: Item) {
    const currentSave = save;
    //if item not in save, add it
    if (!currentSave.items.find((i) => i.id === item.id)) {
      currentSave.items.push(item);
      setSave(currentSave);
    }
  }

  return (
    <div>
      <main>
        <Image
          className="fixed w-full h-full -z-50"
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
        <div className="m-4">
          <ExitDialog />
        </div>
        <div className="m-4">
          <Button onClick={() => SaveDataToLocalStorage(save)}>
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
        </div>
        <div className="m-4">
          <ObjectivesDialog />
        </div>
        <div className="m-4">
          <ItemsDialog />
        </div>
        <div className="m-4">
          <CharacterDialog />
        </div>

        {items.map((item, index) =>
          index == 0 ? (
            <Image
              key={item.id}
              className="fixed left-52 top-24 hover:scale-105 transition-all cursor-pointer animate-bounce"
              onClick={() => addItemToSave(item)}
              src={item.image}
              alt={"Item"}
              width={100}
              height={100}
            />
          ) : (
            <Image
              key={item.id}
              onClick={() => addItemToSave(item)}
              className="fixed right-64 hover:scale-105 transition-all cursor-pointer animate-bounce"
              src={item.image}
              alt={"Item"}
              width={100}
              height={100}
            />
          )
        )}
      </main>
      <aside>
        <Image
          className="fixed w-80 translate-x-5 bottom-4 hover:scale-105 transition-all cursor-pointer"
          src={roomInfo!.minimapImg}
          alt={roomInfo!.description}
          width={400}
          height={400}
        />
      </aside>
    </div>
  );
}
