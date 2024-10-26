import { THEME_TYPES, ThemeType } from "@/interfaces/Theme";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeStoreI {
  theme: ThemeType;
  toggleTheme: () => void;
}
const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;
const useThemeStore = create<ThemeStoreI>()(
  devtools(
    persist(
      (set) => ({
        theme: THEME_LIGHT,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
          })),
      }),
      {
        name: "themeStore",
      }
    )
  )
);
export default useThemeStore;
