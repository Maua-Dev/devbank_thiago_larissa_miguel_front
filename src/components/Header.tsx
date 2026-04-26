// @ts-expect-error: CSS import handled by build tooling // Thiago: adicionei isso pro código não dar pau, estou descobrindo pra que serve (copilot que adicionou)
import "../css/Header.css";

type User = {
  nome: string;
  agencia: string;
  conta: string;
};

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <span className="dev">DEV</span>
        <span className="bank">BANK</span>
      </div>
    
      <div className="header-right">

        <div className="user-box">
        <p>Nome: {user.nome}</p>
        <p>Agência: {user.agencia}</p>
        <p>Conta: {user.conta}</p>
        </div> 

         <div className="help">?</div>

      </div>
    </header>
  );
}
