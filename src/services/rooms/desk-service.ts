import { desksData } from "@/data/seed/desks";

export function GetDeskByPosition(positionX: string, positionY: string) {
  return desksData.find(
    (desk) =>
      desk.positionX === parseInt(positionX) &&
      desk.positionY === parseInt(positionY)
  );
}
