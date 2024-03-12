import { ItemsDatasourceImp } from "@/data/datasources/items-datasource";
import { ItemsRepositoryImp } from "@/data/repositories/items-repository-impl";

const itemsRepository = new ItemsRepositoryImp(new ItemsDatasourceImp());

export function getItemsByCoordinates(positionX: string, positionY: string) {
  const items = itemsRepository.getItemsByCoordinates(positionX, positionY);

  return items;
}
