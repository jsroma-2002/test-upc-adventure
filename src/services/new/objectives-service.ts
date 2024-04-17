import { objectives } from "@/data/seed/objectives";
import { Objective } from "@/interfaces/entities/objective";
import { Difficulty } from "@/interfaces/entities/save";

export function GetObjectives(level: Difficulty): Objective[] {
  switch (level) {
    case Difficulty.EASY:
      return objectives.filter((objective) =>
        ["1", "13", "17"].includes(objective.id)
      );
    case Difficulty.MEDIUM:
      return objectives.filter((objective) =>
        ["2", "11", "12", "4"].includes(objective.id)
      );
    case Difficulty.HARD:
      return objectives.filter((objective) =>
        ["6", "2", "12", "9", "10"].includes(objective.id)
      );
  }
}
