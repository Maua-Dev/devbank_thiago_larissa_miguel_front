// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";

// Avaliar status do usuário -> Já entrou alguma vez? Chamar hasDoneLogin : FirstLogin

export default function App(){
  const [user] = useState({
    nome: "",
    agencia: "",
    conta: ""
  });

  return(

    <body>
      <Header user={user} />
      
    </body>
    
  );
}
