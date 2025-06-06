import { create } from 'zustand';
import {axiosInstance} from '../lib/axios.js';

export const useSavingsStore = create((set) => ({
  savings: [],
  loading: false,
  error: null,

  fetchSavings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/record/getClassData');
      const data = response.data;
      if (data.success) {
        set({ savings: data.savings, loading: false });
      } else {
        set({ error: 'Failed to fetch savings', loading: false });
      }
    } catch (err) {
      set({ error: 'Failed to fetch savings', loading: false });
    }
  },

  addSaving: async (savingData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/record/addSave', savingData);
      const result = response.data;

      if (result.success) {
        set((state) => ({
          savings: [...state.savings, result.saving || savingData],
          loading: false,
        }));
        return true;
      }

      set({ error: 'Failed to add saving', loading: false });
      return false;
    } catch (err) {
      set({ error: 'Failed to add saving', loading: false });
      return false;
    }
  }
}));

