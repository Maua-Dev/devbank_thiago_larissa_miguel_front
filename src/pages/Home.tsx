import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ActionCard } from "../components/ActionCard";
import { FooterBar } from "../components/FooterBarAPI";
// @ts-expect-error: CSS import handled by build tooling 
//Miguel: o  codigo acima serve pro TypeScript ignorar arquivos como o de baixo como erros, e não  sublinhalos em vermelho;
import "../css/Home.css";

// Avaliar status do usuário -> Já entrou alguma vez? Chamar hasDoneLogin : FirstLogin

export default function Home() {
  const [user] = useState({
    nome: "",
    agencia: "",
    conta: ""
  });

  const [endpoint, setEndpoint] = useState("");
  const navigate = useNavigate();

  return (
    <body>
      <Header user={user} />

      <main className="home-main">
        <div className="home-pergunta">
          <h2>O que você deseja <span className="home-destaque">fazer</span>?</h2>
          <div className="home-saldo">Saldo atual: 000</div>
        </div>

        <div className="home-cards">
          <ActionCard titulo="Depositar" tipo="depositar" onClick={() => navigate("/deposit")} />
          <ActionCard titulo="Retirar"   tipo="retirar"   onClick={() => navigate("/withdraw")} />
          <ActionCard titulo="Transação" tipo="transacao"  onClick={() => navigate("/account")} />
        </div>
      </main>

      <FooterBar endpoint={endpoint} onChange={setEndpoint} />
    </body>
  );
}