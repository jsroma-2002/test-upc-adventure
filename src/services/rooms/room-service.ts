import { rooms } from "@/data/seed/rooms";

export function getRoomByCoordinates(x: number, y: number) {
  const findRoom = rooms.find(
    (room) => room.positionX === x && room.positionY === y
  );

  return findRoom;
}
