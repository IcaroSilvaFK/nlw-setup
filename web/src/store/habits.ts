import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../global/configs/axios';

interface IHabitsProps {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

interface IUseHabitsProps {
  habits: IHabitsProps[];
  requestHabits(): Promise<void>;
}

export const useHabits = create<IUseHabitsProps>()((set) => ({
  habits: [],
  async requestHabits() {
    try {
      const { data } = await api.get<IHabitsProps[]>('/summary');

      set((prev) => ({ ...prev, habits: data }));
    } catch (err) {
      console.log(err);
    }
  },
}));
