import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ActionCard } from "../components/ActionCard";
import { FooterBar } from "../components/FooterBarAPI";
import { useApp } from "../context/AppContext";
import "../css/Home.css";

export default function Home() {
  const { userData, apiSource} = useApp();
  const navigate = useNavigate();

  const saldo = userData?.current_balance ?? 0;

  return (
    <>
      <Header />

      <main className="home-main">
        <div className="home-pergunta">
          <h2>O que você deseja <span className="home-destaque">fazer</span>?</h2>
          <div className="home-saldo">Saldo atual: R$ {saldo.toFixed(2)}</div>
        </div>
        <div className="home-cards">
          <ActionCard titulo="Depositar" tipo="depositar" onClick={() => navigate("/deposit")} />
          <ActionCard titulo="Retirar"   tipo="retirar"   onClick={() => navigate("/withdraw")} />
          <ActionCard titulo="Transação" tipo="transacao"  onClick={() => navigate("/history")} />
        </div>
      </main>
      <FooterBar endpoint={apiSource} response=""/>
    </>
  );
}