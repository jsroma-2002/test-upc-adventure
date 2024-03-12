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

  constructor(
    id: string,
    name: string,
    description: string,
    itemId: string | null,
    location: location | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.itemId = itemId;
    this.location = location;
  }
}
