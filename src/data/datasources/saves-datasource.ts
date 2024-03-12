"use client";
import { SavesDatasource } from "@/interfaces/datasources/saves-datasource";
import { Save } from "@/interfaces/entities/save";

export class SavesDatasourceImp extends SavesDatasource {
  saveData(save: Save): void {
    localStorage.setItem("save", JSON.stringify(save));
  }

  loadSave(): Save | null {

    const save = localStorage.getItem("save");
    if (save) {
      return JSON.parse(save);
    }

    return null;
  }
}
