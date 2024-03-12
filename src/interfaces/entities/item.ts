export class Item {
  public id: string;
  public name: string;
  public image: string;
  public positionX: number;
  public positionY: number;

  constructor(
    id: string,
    name: string,
    image: string,
    positionX: number,
    positionY: number
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
