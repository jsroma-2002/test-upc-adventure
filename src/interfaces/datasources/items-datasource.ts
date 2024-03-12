import { Item } from "../entities/item";

export abstract class ItemsDatasource {
    
    abstract getItemsByCoordinates(
        positionX: string,
        positionY: string
    ): Item[];

    
}