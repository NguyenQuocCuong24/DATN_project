import { create } from "zustand";

interface IHeaderState {
  title: string;
  updateTitle: (newTitle: string) => void;
}

export const useHeaderStore = create<IHeaderState>()((set) => ({
  title: "",
  updateTitle: (newTitle) => set(() => ({ title: newTitle })),
}));
