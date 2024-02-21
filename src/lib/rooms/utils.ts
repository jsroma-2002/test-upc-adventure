import { getRoomByCoordinates } from "@/services/rooms/room-service";

export function isOnLimit(positionX: number, positionY: number): boolean {
  const roomFind = getRoomByCoordinates(positionX, positionY);

  if (!roomFind) {
    return false;
  }

  return true;
}
