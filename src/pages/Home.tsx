import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ActionCard } from "../components/ActionCard";
import { FooterBar } from "../components/FooterBarAPI";
import { useApp } from "../context/AppContext"; //puxa todos os dados da api
// @ts-expect-error: CSS import handled by build tooling 
//Miguel: o  codigo acima serve pro TypeScript ignorar arquivos como o de baixo como erros, e não  sublinhalos em vermelho;
import "../css/Home.css";

export default function Home() {
  const { userData, apiSource } = useApp(); //puxa todos os dados da api

  const [endpoint] = useState(apiSource); 
  const [response] = useState("");
  const navigate = useNavigate();

  const [user] = useState({
    nome: userData?.name || "Visitante",
    agencia: userData?.agency || "0000",
    conta: userData?.account || "00000-0"
  });

  const [saldo] = useState(userData?.current_balance || 0);
  
  return (
    <>
      <Header user={user} />

      <main className="home-main">
        <div className="home-pergunta">
          <h2>O que você deseja <span className="home-destaque">fazer</span>?</h2>
          <div className="home-saldo">Saldo atual: R$ {saldo.toFixed(2)}</div>
        </div>
        <div className="home-cards">
          <ActionCard titulo="Depositar" tipo="depositar" onClick={() => navigate("/deposit")} />
          <ActionCard titulo="Retirar"   tipo="retirar"   onClick={() => navigate("/withdraw")} />
          <ActionCard titulo="Transação" tipo="transacao"  onClick={() => navigate("/account")} />
        </div>
      </main>
      <FooterBar endpoint={endpoint} response={response} />
    </>
  );
}