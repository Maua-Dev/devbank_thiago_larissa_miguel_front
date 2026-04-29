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