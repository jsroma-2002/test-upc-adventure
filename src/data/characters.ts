import { Character } from "@/interfaces/entities/character";
import { CHARACTER_ROLES } from "@/lib/shared/enums";

export const characters: Character[] = [
  {
    id: "1",
    name: "Prof. Juan Perez",
    description: "Profesor de la materia de programación",
    image: "/src/assets/characters/teacher1.svg",
    positionX: 2,
    positionY: 1,
    role: CHARACTER_ROLES.TEACHER,
  },
  {
    id: "2",
    name: "Prof. Mario Espina",
    description: "Profesor de ética y valores",
    image: "/src/assets/characters/teacher2.svg",
    positionX: 2,
    positionY: 2,
    role: CHARACTER_ROLES.TEACHER,
  },
  {
    id: "3",
    name: "Prof. Rosa Castro",
    description: "Profesora de historia",
    image: "/src/assets/characters/teacher3.svg",
    positionX: 1,
    positionY: 2,
    role: CHARACTER_ROLES.TEACHER,
  },
];
