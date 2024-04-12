import { ItemsDatasource } from "@/interfaces/datasources/items-datasource";
import { Item } from "@/interfaces/entities/item";

  import { seedItems } from "../seed/items";


export class ItemsDatasourceImp extends ItemsDatasource {
  getItemsByCoordinates(positionX: string, positionY: string): Item[] {
    return seedItems.filter((item) => {
      return (
        item.positionX === Number(positionX) &&
        item.positionY === Number(positionY)
      );
    });
  }
}
