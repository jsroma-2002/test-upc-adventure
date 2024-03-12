import { Objective } from "@/interfaces/entities/objective";
import { Difficulty } from "@/interfaces/entities/save";

export function GetObjectives(level: Difficulty): Objective[] {
  switch (level) {
    case Difficulty.EASY:
      return [
        {
          id: "1",
          name: "Encuentra la llave",
          description: "Encuentra la llave",
          itemId: null,
          location: null,
        },
        {
          id: "2",
          name: "Encuentra la puerta",
          description: "Encuentra la puerta",
          itemId: null,
          location: null,
        },
        {
          id: "3",
          name: "Encuentra el cofre",
          description: "Encuentra el cofre",
          itemId: null,
          location: null,
        },
      ];
    case Difficulty.MEDIUM:
      return [
        {
          id: "1",
          name: "Encuentra la llave",
          description: "Encuentra la llave",
          itemId: null,
          location: null,
        },
        {
          id: "2",
          name: "Encuentra la puerta",
          description: "Encuentra la puerta",
          itemId: null,
          location: null,
        },
        {
          id: "3",
          name: "Encuentra el cofre",
          description: "Encuentra el cofre",
          itemId: null,
          location: null,
        },
        {
          id: "4",
          name: "Encuentra el tesoro",
          description: "Encuentra el tesoro",
          itemId: null,
          location: null,
        },
      ];
    case Difficulty.HARD:
      return [
        {
          id: "1",
          name: "Encuentra la llave",
          description: "Encuentra la llave",
          itemId: null,
          location: null,
        },
        {
          id: "2",
          name: "Encuentra la puerta",
          description: "Encuentra la puerta",
          itemId: null,
          location: null,
        },
        {
          id: "3",
          name: "Encuentra el cofre",
          description: "Encuentra el cofre",
          itemId: null,
          location: null,
        },
        {
          id: "4",
          name: "Encuentra el tesoro",
          description: "Encuentra el tesoro",
          itemId: null,
          location: null,
        },
        {
          id: "5",
          name: "Encuentra la salida",
          description: "Encuentra la salida",
          itemId: null,
          location: null,
        },
      ];
  }
}
