interface location {
  positionX: number;
  positionY: number;
}

export class Objective {
  public id: string;
  public name: string;
  public description: string;
  public itemId: string | null;
  public location: location | null;
  public completed: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    itemId: string | null,
    location: location | null,
    completed: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.itemId = itemId;
    this.location = location;
    this.completed = completed;
  }
}
