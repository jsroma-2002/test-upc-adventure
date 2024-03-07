export class Message {
  public id: string;
  public content: string;
  public isExternal: boolean;

  constructor(id: string, content: string, isExternal: boolean) {
    this.id = id;
    this.content = content;
    this.isExternal = isExternal;
  }
}
