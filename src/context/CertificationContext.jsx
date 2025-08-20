import { createContext, useContext, useState } from "react";

const CertificationContext = createContext();

export function CertificationProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem('certificationCategory') || "All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <CertificationContext.Provider
      value={{ activeCategory, setActiveCategory, searchTerm, setSearchTerm }}
    >
      {children}
    </CertificationContext.Provider>
  );
}

export function useCertification() {
  return useContext(CertificationContext);
} 