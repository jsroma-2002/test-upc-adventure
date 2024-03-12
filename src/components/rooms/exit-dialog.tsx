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
import { SaveDataToLocalStorage } from "@/services/shared/storage-service";
import { DoorClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExitDialog() {
  const router = useRouter();

  const { save } = useSave();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <DoorClosed className="mr-2 h-4 w-4" /> Salir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Estas seguro?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Cerrar
            </Button>
          </DialogClose>

          <Button
            onClick={() => {
              router.push("/");
              SaveDataToLocalStorage(save);
            }}
            type="button"
          >
            Guardar y Salir
          </Button>

          <Link href="/">
            <Button variant={"destructive"} type="button">
              Salir
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
