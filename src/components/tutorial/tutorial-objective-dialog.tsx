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

interface TutorialObjectiveDialogProps {
  save: {
    objectives: { name: string; description: string }[];
  };
  onClose: () => void;
}

export default function TutorialObjectiveDialog({
  save,
  onClose,
}: TutorialObjectiveDialogProps) {
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
            Debes completar estos objetivos.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-4">
          {save.objectives.map((objective, index) => (
            <li key={index}>
              <div className="flex items-center space-x-2">
                <span className="text-md font-medium leading-none bg-primary rounded-full h-4 w-4 text-center">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h5 className="text-md font-medium leading-none">
                    {objective.name}
                  </h5>
                  <small className="text-sm text-gray-500 leading-none -mt-1">
                    {objective.description}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onClose();
              }}
              type="button"
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
