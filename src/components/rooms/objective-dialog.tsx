import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LayoutList } from "lucide-react";

export default function ObjectivesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LayoutList className="mr-2 h-4 w-4" /> Objetivos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Objetivos</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-4">
          <li>
            <div className="flex items-center space-x-2">
              <span className="text-md font-medium leading-none bg-primary rounded-full h-4 w-4 text-center"></span>
              <div className="space-y-1">
                <h5 className="text-md font-medium leading-none">Test</h5>
                <small className="text-sm text-gray-500 leading-none -mt-1">
                  test dsecrtrtrtyt
                </small>
              </div>
            </div>
          </li>
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
