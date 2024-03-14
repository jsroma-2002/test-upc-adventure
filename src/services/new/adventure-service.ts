import { Adventure } from "@/interfaces/entities/adventure";
import { Difficulty } from "@/interfaces/entities/save";
import { GetObjectives } from "./objectives-service";

export function GetAventure(level: Difficulty): Adventure {
  const objectives = GetObjectives(level);

  return new Adventure(
    "The Joke Tax Chronicles",
    "Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.",
    objectives
  );
}
