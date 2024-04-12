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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item } from "@/interfaces/entities/item";
import { useSave } from "@/providers/save-provider";
import { Box } from "lucide-react";
import Image from "next/image";

interface ItemsDialogProps {
  action: (item: Item) => void;
}

export default function ItemsDialog({ action }: ItemsDialogProps) {
  const { save } = useSave();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Box className="mr-2 h-4 w-4" /> Inventario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Items</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 p-4 gap-4">
          {save.items.length > 0 ? (
            save.items.map((item, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger>
                  <div className="w-60 h-60 rounded border flex flex-col items-center justify-center place-content-between">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                    />
                    <p>{item.name} </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      action(item);
                    }}
                  >
                    Usar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))
          ) : (
            <h1>No hay items</h1>
          )}
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
