import { Objective } from "./objective";

export class Adventure {
  public title: string;
  public description: string;
  public objectives: Objective[];

  constructor(title: string, description: string, objectives: Objective[]) {
    this.title = title;
    this.description = description;
    this.objectives = objectives;
  }
}
