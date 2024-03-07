import { Character } from "@/interfaces/entities/character";
import { CHARACTER_ROLES } from "@/lib/shared/enums";

export const charactersData: Character[] = [
  {
    id: "1",
    name: "Prof. Juan Perez",
    description: "Profesor de la materia de programación",
    image: "/characters/teacher1.svg",
    positionX: 2,
    positionY: 1,
    role: CHARACTER_ROLES.TEACHER,
  },
  {
    id: "2",
    name: "Prof. Mario Espina",
    description: "Profesor de ética y valores",
    image: "/characters/teacher2.svg",
    positionX: 2,
    positionY: 2,
    role: CHARACTER_ROLES.TEACHER,
  },
  {
    id: "3",
    name: "Prof. Rosa Castro",
    description: "Profesora de historia",
    image: "/characters/teacher3.svg",
    positionX: 1,
    positionY: 2,
    role: CHARACTER_ROLES.TEACHER,
  },
];
