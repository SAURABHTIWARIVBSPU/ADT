// src/context/FilterContext.js
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState(() => localStorage.getItem('adventureFilter') || "All");
  const [addressSearch, setAddressSearch] = useState("");
  const [activitySearch, setActivitySearch] = useState("");

  return (
    <FilterContext.Provider
      value={{ activeFilter, setActiveFilter, addressSearch, setAddressSearch, activitySearch, setActivitySearch }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
