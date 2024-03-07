import { Character } from "../entities/character";

export abstract class CharactersDatasource {
  abstract getCharactersByCoordinates(
    positionX: string,
    positionY: string
  ): Character[];
}
