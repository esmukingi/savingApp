// src/store/sidebarStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useSidebarStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/category/getCat");
      const fetchedCategories = response.data.categories;
      set({ categories: fetchedCategories, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch categories",
        isLoading: false,
      });
    }
  },
}));
