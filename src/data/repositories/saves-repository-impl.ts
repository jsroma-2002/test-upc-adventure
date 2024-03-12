"use client";
import { SavesDatasource } from "@/interfaces/datasources/saves-datasource";
import { Save } from "@/interfaces/entities/save";
import { SavesRepository } from "@/interfaces/repositories/saves-repository";

export class SavesRepositoryImp extends SavesRepository {
  private datasource: SavesDatasource;

  constructor(datasource: SavesDatasource) {
    super();
    this.datasource = datasource;
  }

  saveData(save: Save): void {
    this.datasource.saveData(save);
  }
  loadSave(): Save | null {
    return this.datasource.loadSave();
  }
}
