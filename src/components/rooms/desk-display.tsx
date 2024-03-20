"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSave } from "@/providers/save-provider";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";

interface DeskDialogProps {
  disableKeyboard: () => void;
  completeObjective: (objective: string) => void;
}

export default function DeskDialog({
  disableKeyboard,
  completeObjective,
}: DeskDialogProps) {
  const results = ["aula virtual", "mi_upc", "intranet"];

  const [search, setSearch] = useState<string>("");

  const { save, setSave } = useSave();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          disableKeyboard();
        }

        if (!open) {
          disableKeyboard();
        }
      }}
    >
      <DialogTrigger asChild>
        <Image
          className="fixed left-[30vw] top-80 hover:scale-105 transition-all cursor-pointer"
          src={"/desk/desk.svg"}
          alt={"Desk"}
          width={150}
          height={150}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscador</DialogTitle>
        </DialogHeader>
        <form
          className="flex w-96 max-w-sm items-center space-x-2"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const inputElement = e.currentTarget
              .elements[0] as HTMLInputElement;
            if (inputElement.value === results[0]) {
              completeObjective("9");
            }
            setSearch(inputElement.value);
          }}
        >
          <Input type="text" placeholder="buscar..." />
          <Button type="submit">Buscar</Button>
        </form>
        <div>
          {search === results[0] && <h1>Aula virtual</h1>}
          {search === results[1] && <h1>Mi UPC</h1>}
          {search === results[2] && <h1>Intranet</h1>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
