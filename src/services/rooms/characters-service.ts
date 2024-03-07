import { CharactersDatasourceImp } from "@/data/datasources/characters-datasource";
import { CharactersRepositoryImpl } from "@/data/repositories/characters-repository-impl";
import { Character } from "@/interfaces/entities/character";

const charactersRepository = new CharactersRepositoryImpl(
  new CharactersDatasourceImp()
);

export function getCharacterByCoordinates(
  positionX: string,
  positionY: string
) {
  const characters: Character[] = charactersRepository.getCharactersByCoordinates(
    positionX,
    positionY
  );

  return characters;
}
