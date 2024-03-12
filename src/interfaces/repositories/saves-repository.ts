import { Save } from "../entities/save";

export abstract class SavesRepository {
  abstract saveData(save: Save): void;

  abstract loadSave(): Save | null;
}
