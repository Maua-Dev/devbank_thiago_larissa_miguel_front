import "../css/Header.css";
import { useNavigate } from 'react-router-dom';
import { useApp } from "../context/AppContext"; //puxa todos os dados da api
import { useEffect } from "react";


type User = {
  user :string;
  agencia :number;
  conta :number;
}


export function Header({user, agencia,conta}: User) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-header">
        <span className="dev-header">DEV</span>
        <span className="bank-header">BANK</span>
      </div>
    
      <div className="header-right">

        <div className="user-box">
        <p>Nome: {user}</p>
        <p>Agência: {agencia}</p>
        <p>Conta: {conta}</p>
        </div> 

         <div className="help" onClick={() => navigate('/documentation')}>?</div>

      </div>
    </header>
  );
}
function setUser(data: any) {
  throw new Error("Function not implemented.");
}

