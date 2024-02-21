export class Room {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public positionX: number;
  public positionY: number;
  public minimapImg: string;

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    positionX: number,
    positionY: number,
    minimapImg: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.positionX = positionX;
    this.positionY = positionY;
    this.minimapImg = minimapImg;
  }
}
