import { Objective } from "@/interfaces/entities/objective";
import { Difficulty } from "@/interfaces/entities/save";

export function GetObjectives(level: Difficulty): Objective[] {
  switch (level) {
    case Difficulty.EASY:
      return [
        new Objective(
          "1",
          "Encuentra la llave",
          "Encuentra la llave",
          null,
          null
        ),
        new Objective(
          "2",
          "Encuentra la puerta",
          "Encuentra la puerta",
          null,
          null
        ),
        new Objective(
          "3",
          "Encuentra el cofre",
          "Encuentra el cofre",
          null,
          null
        ),
      ];
    case Difficulty.MEDIUM:
      return [
        new Objective(
          "1",
          "Encuentra la llave",
          "Encuentra la llave",
          null,
          null
        ),
        new Objective(
          "2",
          "Encuentra la puerta",
          "Encuentra la puerta",
          null,
          null
        ),
        new Objective(
          "3",
          "Encuentra el cofre",
          "Encuentra el cofre",
          null,
          null
        ),
      ];
    case Difficulty.HARD:
      return [
        new Objective(
          "1",
          "Encuentra la llave",
          "Encuentra la llave",
          null,
          null
        ),
        new Objective(
          "2",
          "Encuentra la puerta",
          "Encuentra la puerta",
          null,
          null
        ),
        new Objective(
          "3",
          "Encuentra el cofre",
          "Encuentra el cofre",
          null,
          null
        ),
      ];
  }
}
