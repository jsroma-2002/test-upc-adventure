/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CharacterDialog from "@/components/rooms/character-dialog";
import CharactersDisplay from "@/components/rooms/characters-display";
import DeskDialog from "@/components/rooms/desk-display";
import ExitDialog from "@/components/rooms/exit-dialog";
import ItemsDialog from "@/components/rooms/items-dialog";
import MiniMapDialog from "@/components/rooms/minimap-dialog";
import ObjectivesDialog from "@/components/rooms/objective-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { seedItems } from "@/data/seed/items";
import { Item } from "@/interfaces/entities/item";
import { isOnLimit } from "@/lib/rooms/utils";
import { useSave } from "@/providers/save-provider";
import { GetDeskByPosition } from "@/services/rooms/desk-service";
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
import { toast } from "sonner";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [useKeyboard, setUseKeyboard] = useState<boolean>(true);

  const [loaded, setLoaded] = useState<boolean>(false);

  const [entranceLocked, setEntranceLocked] = useState<boolean>(true);

  const coordinateX = searchParams.get("x");
  const coordinateY = searchParams.get("y");

  const { save, setSave } = useSave();

  useEffect(() => {
    const savedGame = LoadSave();
    if (savedGame) {
      setSave(savedGame);
    }

    setLoaded(true);
  }, [setSave]);

  function useItem(item: Item) {
    switch (item.id) {
      case "3":
        setEntranceLocked(false);
        if (coordinateX === "0" && coordinateY === "0") {
          toast.success("Escenario desbloqueado!");
          break;
        } else {
          toast.info("Este ítem no puede ser utilizado");
          break;
        }
      case "6":
        if (save.items.find((i) => i.id === "7")) {
          toast.info("Ya tienes un TIU Virtual");
          break;
        } else {
          addItemToSave(seedItems.find((i) => i.id === "7")!);
          toast.success("Conseguiste un TIU Virtual");
          break;
        }

      default:
        toast.info("Este ítem no puede ser utilizado");
        break;
    }
  }

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

      if (
        x! === "0" &&
        y! === "1" &&
        entranceLocked &&
        coordinateX === "0" &&
        coordinateY === "0"
      ) {
        toast.error("No puedes ingresar a la UPC sin identificarte.");
        return;
      }

      const currentSave = save;

      currentSave.positionX = x!;
      currentSave.positionY = y!;

      setSave(currentSave);

      router.push(`/rooms?x=${x}&y=${y}`);
    },
    [coordinateX, coordinateY, router, setSave, save, entranceLocked]
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
      toast.info("Item añadido al inventario");
      currentSave.items.push(item);
      setSave(currentSave);
    }
  }

  function completeObjective(objectiveId: string) {
    const currentSave = save;
    const objective = currentSave.objectives.find((o) => o.id === objectiveId);

    if (objective) {
      //if is already completed, return
      if (objective.completed) return;

      objective.completed = true;
      objective.endTime = new Date();
      setSave(currentSave);
      SaveDataToLocalStorage(save);
      toast.success("Felicidades, haz completado un objetivo");

      if (save.objectives.every((objective) => objective.completed)) {
        setAdventureComplete(true);
        toast.success("¡Has completado la aventura!", {
          description:
            "Felicidades por completar la aventura. Esperamos que hayas disfrutado de la experiencia.",
          duration: 5000,
        });
      }
    }
  }

  const desks = GetDeskByPosition(coordinateX!, coordinateY!);

  const [adventureComplete, setAdventureComplete] = useState<boolean>(false);

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
          tutorialAction={null}
          disableKeyboard={() => setUseKeyboard(!useKeyboard)}
          positionX={coordinateX!}
          positionY={coordinateY!}
          completeObjetive={completeObjective}
        />
        {desks && (
          <DeskDialog
            disableKeyboard={() => setUseKeyboard(!useKeyboard)}
            completeObjective={completeObjective}
          />
        )}
        <div className="m-4">
          <ExitDialog />
        </div>
        <div className="m-4">
          <Button
            onClick={() => {
              toast.success("Partida guardada");
              SaveDataToLocalStorage(save);
            }}
          >
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
        </div>
        <div className="m-4">{loaded && <ObjectivesDialog />}</div>
        <div className="m-4">
          <ItemsDialog action={useItem} />
        </div>
        <div className="m-4">
          <CharacterDialog />
        </div>

        {items.map((item, index) =>
          index == 0 ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger>
                <Image
                  className="fixed left-52 top-24 hover:scale-105 transition-all cursor-pointer animate-bounce"
                  src={item.image}
                  alt={"Item"}
                  width={100}
                  height={100}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute bottom-10 left-52 z-50 ">
                <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    if (item.id === "5") {
                      toast.error(
                        "Para recoger este item, debes identificarte con tu TIU"
                      );
                    }

                    if (item.id === "2") {
                      addItemToSave(item);
                      completeObjective("1");
                    }

                    // if (item.id === "5") {
                    //   addItemToSave(item);
                    //   completeObjective("7");
                    // }
                  }}
                >
                  Recoger
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger>
                <Image
                  className="fixed right-64 hover:scale-105 transition-all cursor-pointer animate-bounce"
                  src={item.image}
                  alt={"Item"}
                  width={100}
                  height={100}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute left-[85rem]  z-50 ">
                <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    if (
                      item.id === "5" &&
                      !save.items.find((i) => i.id === "7")
                    ) {
                      toast.error(
                        "Para recoger este item, debes identificarte con tu TIU"
                      );
                    }

                    if (
                      item.id === "5" &&
                      save.items.find((i) => i.id === "7")
                    ) {
                      addItemToSave(item);
                      completeObjective("7");
                    }

                    if (item.id === "2") {
                      addItemToSave(item);
                      completeObjective("1");
                    }

                    // if (item.id === "5") {
                    //   addItemToSave(item);
                    //   completeObjective("7");
                    // }
                  }}
                >
                  Recoger
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )}
      </main>
      <aside>
        <MiniMapDialog
          minimapImg={roomInfo!.minimapImg}
          description={roomInfo!.description}
        />
      </aside>
    </div>
  );
}
