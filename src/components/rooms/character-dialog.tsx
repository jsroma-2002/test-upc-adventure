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
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CharacterDialog() {
  const router = useRouter();

  const { save } = useSave();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <User2 className="mr-2 h-4 w-4" /> Personaje
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personaje</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <p>
            <strong>Nombre:</strong> {save.username}
          </p>
          <p>
            <strong>Dificultad:</strong> {save.difficulty}
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
