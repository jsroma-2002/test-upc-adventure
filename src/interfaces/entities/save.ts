import { Item } from "./item";
import { Objective } from "./objective";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export class Save {
  public positionX: string;
  public positionY: string;
  public difficulty: Difficulty;
  public username: string;
  public items: Item[];
  public objectives: Objective[];

  constructor(
    positionX: string,
    positionY: string,
    difficulty: Difficulty,
    username: string,
    items: Item[],
    objectives: Objective[]
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.difficulty = difficulty;
    this.username = username;
    this.items = items;
    this.objectives = objectives;
  }
}
