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
import { useSave } from "@/providers/save-provider";
import { LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ObjectivesDialog() {
  const { save } = useSave();

  const router = useRouter();

  //get if all objectives are completed
  const allObjectivesCompleted = save.objectives.every(
    (objective) => objective.completed
  );

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
        <ul className="space-y-4 min-w-[60vw]">
          {save.objectives.map((objective, index) => (
            <li key={index}>
              <div className="flex items-center place-content-between">
                <div className="flex gap-4">
                  <span className="bg-primary rounded-full h-4 w-4">
                    
                  </span>
                  <div className="">
                    <h5 className="text-md font-medium leading-none">
                      {objective.name}
                    </h5>
                    <small className="text-sm text-gray-500 leading-none -mt-1">
                      {objective.description}
                    </small>
                  </div>
                </div>
                <div>
                  {objective.completed ? (
                    <span className="text-green-500">Completado</span>
                  ) : (
                    <span className="text-red-500">Pendiente</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <DialogFooter>
          {allObjectivesCompleted && (
            <Button onClick={() => router.push("/feedback")} type="button">
              Finalizar Aventura
            </Button>
          )}
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
