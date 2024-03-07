import { CharactersDatasource } from "@/interfaces/datasources/characters-datasource";
import { Character } from "@/interfaces/entities/character";
import { CharactersRepository } from "@/interfaces/repositories/characters-repository";

export class CharactersRepositoryImpl extends CharactersRepository {
  private datasource: CharactersDatasource;

  constructor(datasource: CharactersDatasource) {
    super();
    this.datasource = datasource;
  }

  getCharactersByCoordinates(
    positionX: string,
    positionY: string
  ): Character[] {
    return this.datasource.getCharactersByCoordinates(positionX, positionY);
  }
}
