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
import { Box } from "lucide-react";

export default function ItemsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Box className="mr-2 h-4 w-4" /> Items
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Items</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 p-4 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-60 h-60 rounded border">
              Item 1
            </div>
          ))}
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
