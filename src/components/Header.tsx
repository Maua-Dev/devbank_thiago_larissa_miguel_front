// @ts-expect-error: CSS import handled by build tooling // Thiago: adicionei isso pro código não dar pau, estou descobrindo pra que serve (copilot que adicionou)
import "../css/Header.css";
import { useNavigate } from 'react-router-dom';
import { useApp } from "../context/AppContext"; //puxa todos os dados da api



export function Header() {
  const navigate = useNavigate();

  const {userData} = useApp(); //puxa todos os dados da api

  const user = ({
    nome: userData?.name || "Visitante",
    agencia: userData?.agency || "0000",
    conta: userData?.account || "00000-0"
  });

  return (
    <header className="header">
      <div className="logo-header">
        <span className="dev-header">DEV</span>
        <span className="bank-header">BANK</span>
      </div>
    
      <div className="header-right">

        <div className="user-box">
        <p>Nome: {user.nome}</p>
        <p>Agência: {user.agencia}</p>
        <p>Conta: {user.conta}</p>
        </div> 

         <div className="help" onClick={() => navigate('/documentation')}>?</div>

      </div>
    </header>
  );
}
