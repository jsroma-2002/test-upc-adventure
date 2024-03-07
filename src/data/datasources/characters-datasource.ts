import { CharactersDatasource } from "@/interfaces/datasources/characters-datasource";
import { Character } from "@/interfaces/entities/character";
import { charactersData } from "../seed/characters";

export class CharactersDatasourceImp extends CharactersDatasource {
  getCharactersByCoordinates(
    positionX: string,
    positionY: string
  ): Character[] {
    const characters: Character[] = charactersData.filter(
      (character) =>
        character.positionX === parseInt(positionX) &&
        character.positionY === parseInt(positionY)
    );

    return characters;
  }
}
