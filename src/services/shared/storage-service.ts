"use client";
import { SavesDatasourceImp } from "@/data/datasources/saves-datasource";
import { SavesRepositoryImp } from "@/data/repositories/saves-repository-impl";
import { SavesDatasource } from "@/interfaces/datasources/saves-datasource";
import { Save } from "@/interfaces/entities/save";
import { SavesRepository } from "@/interfaces/repositories/saves-repository";

const datasource: SavesDatasource = new SavesDatasourceImp();
const savesRepository: SavesRepository = new SavesRepositoryImp(datasource);

export function SaveDataToLocalStorage(save: Save) {
  savesRepository.saveData(save);
}

export function LoadSave(): Save | null {
  const save = savesRepository.loadSave();

  if (save) {
    return save;
  }

  return null;
}
