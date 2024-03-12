import { ItemsDatasource } from "@/interfaces/datasources/items-datasource";
import { Item } from "@/interfaces/entities/item";
import { ItemsRepository } from "@/interfaces/repositories/items-repository";

export class ItemsRepositoryImp extends ItemsRepository {
  private datasource: ItemsDatasource;

  constructor(datasource: ItemsDatasource) {
    super();
    this.datasource = datasource;
  }

  getItemsByCoordinates(positionX: string, positionY: string): Item[] {
    return this.datasource.getItemsByCoordinates(positionX, positionY);
  }
}
