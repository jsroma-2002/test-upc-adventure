import { CHARACTER_ROLES } from "@/lib/shared/enums";

export class Character {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public profileImage: string;
  public positionX: number;
  public positionY: number;
  public role: CHARACTER_ROLES;

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    profileImage: string,
    positionX: number,
    positionY: number,
    role: CHARACTER_ROLES
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.profileImage = profileImage;
    this.positionX = positionX;
    this.positionY = positionY;
    this.role = role;
  }
}
