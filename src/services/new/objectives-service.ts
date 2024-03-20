import { Objective } from "@/interfaces/entities/objective";
import { Difficulty } from "@/interfaces/entities/save";

export function GetObjectives(level: Difficulty): Objective[] {

  console.log(level);

  switch (level) {
    case Difficulty.EASY:
      return [
        new Objective(
          "1",
          "Obtén un libro",
          "Consigue un libro en la biblioteca",
          null,
          null,
          false
        ),
        new Objective(
          "3",
          "Consulta sobre info de la biblioteca",
          "Consulta a un personaje sobre la biblioteca",
          null,
          null,
          false
        ),
        new Objective(
          "9",
          "Ingresa al aula virtual",
          "Ingresa al aula virtual mediante las plataformas",
          null,
          null,
          false
        ),
      ];
    case Difficulty.MEDIUM:
      return [
        new Objective(
          "1",
          "Encuentra la llave",
          "Encuentra la llave",
          null,
          null,
          false
        ),
        new Objective(
          "2",
          "Encuentra la puerta",
          "Encuentra la puerta",
          null,
          null,
          false
        ),
        new Objective(
          "3",
          "Encuentra el cofre",
          "Encuentra el cofre",
          null,
          null,
          false
        ),
      ];
    case Difficulty.HARD:
      return [
        new Objective(
          "1",
          "Encuentra la llave",
          "Encuentra la llave",
          null,
          null,
          false
        ),
        new Objective(
          "2",
          "Encuentra la puerta",
          "Encuentra la puerta",
          null,
          null,
          false
        ),
        new Objective(
          "3",
          "Encuentra el cofre",
          "Encuentra el cofre",
          null,
          null,
          false
        ),
      ];
  }
}
