import { getRoomByCoordinates } from "@/services/rooms/room-service";
import { toast } from "sonner";

export function isOnLimit(positionX: number, positionY: number): boolean {
  const roomFind = getRoomByCoordinates(positionX, positionY);

  if (!roomFind) {
    toast.error("No puedes moverte en esta dirección");
    return false;
  }

  return true;
}
