"use client";

import { createContext, useContext, useState } from "react";

type NavContextType = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <NavContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNav must be used within NavProvider");
  }
  return ctx;
}
