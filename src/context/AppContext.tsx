import { createContext, useContext, useState } from "react";
import getUser from "../service/UserService";
import type { User } from "../type/User";

type AppContextType = {
  userData: User | null;
  setUserData: (user: User | null) => void;
  apiSource: string;
  setApiSource: (source: string) => void;
  refreshUser: () => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [apiSource, setApiSource] = useState("");

  async function refreshUser() {
    try {
      const data = await getUser();
      setUserData(data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  return (
    <AppContext.Provider value={{ userData, setUserData, apiSource, setApiSource, refreshUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext)!;

// import { createContext, useContext, useState } from "react";

// const AppContext = createContext<any>(null);

// export function AppProvider({ children }: any) {
//   // lê do localStorage quando inicia, para não perder os dados ao navegar
//   const [userData, setUserDataState] = useState(() => {
//     const salvo = localStorage.getItem("userData");
//     return salvo ? JSON.parse(salvo) : null;
//   });

//   const [apiSource, setApiSourceState] = useState(() => {
//     return localStorage.getItem("apiSource") || "";
//   });  

//   // salva no localStorage além de atualizar o estado;
//   const setUserData = (data: any) => {
//     setUserDataState(data);
//     localStorage.setItem("userData", JSON.stringify(data));
//   };

//   const setApiSource = (url: string) => {
//     setApiSourceState(url);
//     localStorage.setItem("apiSource", url);
//   };

//   return (
//     <AppContext.Provider value={{ userData, setUserData, apiSource, setApiSource }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useApp = () => useContext(AppContext);