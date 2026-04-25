import {create} from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("meetingtime") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("meetingtime", theme);
    set({ theme });
  },
}));
