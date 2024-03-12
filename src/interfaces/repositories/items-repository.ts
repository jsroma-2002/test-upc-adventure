import { Item } from "../entities/item";

export abstract class ItemsRepository {
  abstract getItemsByCoordinates(positionX: string, positionY: string): Item[];
}
