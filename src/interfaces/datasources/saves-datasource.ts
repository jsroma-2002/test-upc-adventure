import { Save } from "../entities/save";

export abstract class SavesDatasource {
  abstract saveData(save: Save): void;

  abstract loadSave(): Save | null;
}
