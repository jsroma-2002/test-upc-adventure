import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface RoomInfo {
  minimapImg: string;
  description: string;
}

export default function MiniMapDialog({ minimapImg, description }: RoomInfo) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className="fixed w-80 translate-x-5 bottom-4 hover:scale-105 transition-all cursor-pointer"
          src={minimapImg}
          alt={description}
          width={400}
          height={400}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Minimapa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <Image
            src={"/minimap/dialog/minimap-dialog.svg"}
            alt={description}
            width={400}
            height={400}
          />
          <div className="p-8">
            <p>
              El Minimapa es una representación visual de un espacio, en este
              caso del campus de la UPC.
            </p>
            <br />
            <p>Leyenda:</p>
            <br />
            <ul>
              <li>[B]. Biblioteca</li>
              <li>[P]. Plataforma UPC</li>
              <li>[S]. Salon de clases</li>
              <li>[D]. Sala de Descanso</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
