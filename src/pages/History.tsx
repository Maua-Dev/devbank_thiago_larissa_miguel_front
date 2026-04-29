import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HistoricoItem } from "../components/HistoryItems";
import { useApp } from "../context/AppContext";
import "../css/History.css";

type Transacao = {
  tipo: string;
  valor: number;
  data: string;
};

export default function History() {
  const { userData, apiSource } = useApp();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const navigate = useNavigate();

  const [user] = useState({
    nome: userData?.name || "Visitante",
    agencia: userData?.agency || "0000",
    conta: userData?.account || "00000-0"
  });

  useEffect(() => {
    fetch(`${apiSource}/history`)
      .then(res => res.json())
      .then(data => setTransacoes(data.all_transactions))
      .catch(err => console.error("Erro ao buscar histórico:", err));
  }, [apiSource]);

  return (
    <>
      <Header user={user} />

      <main className="history-main">
        <div className="history-titulo">
          <span>Histórico de transações</span>
        </div>

        <div className="history-lista">
          {transacoes.length === 0 ? (
            <p className="history-vazio">Nenhuma transação encontrada.</p>
          ) : (
            transacoes.map((transacao, index) => (
              <HistoricoItem key={index} transacao={transacao} />
            ))
          )}
        </div>

        <button className="history-voltar" onClick={() => navigate("/home")}>
          Voltar
        </button>
      </main>
    </>
  );
}