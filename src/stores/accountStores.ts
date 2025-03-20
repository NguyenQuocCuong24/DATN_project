import { AccountBodyType } from "@/validations/account.schema";
import { create } from "zustand";

interface IAccountState {
  user: AccountBodyType | undefined;
  updateUser: (newUser: AccountBodyType) => void;
}

export const useAccountStore = create<IAccountState>()((set) => ({
  user: undefined,
  updateUser: (newUser) => set(() => ({ user: newUser })),
}));
