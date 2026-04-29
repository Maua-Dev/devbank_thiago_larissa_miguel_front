import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const [userData, setUserData] = useState(null);
  const [apiSource, setApiSource] = useState(""); // A URL que você digita no Login

  return (
    <AppContext.Provider value={{ userData, setUserData, apiSource, setApiSource }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);