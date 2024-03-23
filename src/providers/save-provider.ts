import { Difficulty, Save } from "@/interfaces/entities/save";
import { create } from "zustand";

type State = {
  save: Save;
  setSave: (save: Save) => void;
};

export const useSave = create<State>((set) => ({
  save: new Save("0", "0", Difficulty.EASY, "", [], []),
  setSave: (save: Save) => set({ save }),
}));
