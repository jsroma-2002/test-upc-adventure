export class Desk {
  id: string;
  name: string;
  positionX: number;
  positionY: number;

  constructor(id: string, name: string, positionX: number, positionY: number) {
    this.id = id;
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
