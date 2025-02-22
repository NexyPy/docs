import { create } from 'zustand';

interface StoreState {
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useStore = create<StoreState>((set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (isOpen: boolean) => set({ menuIsOpen: isOpen }),
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useStore;

