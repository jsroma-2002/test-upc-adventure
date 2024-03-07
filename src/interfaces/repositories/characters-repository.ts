import { Character } from "../entities/character";

export abstract class CharactersRepository {
  abstract getCharactersByCoordinates(
    positionX: string,
    positionY: string
  ): Character[];
}
