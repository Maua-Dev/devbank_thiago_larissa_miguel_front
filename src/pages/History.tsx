import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HistoricoItem } from "../components/HistoryItems";
import "../css/History.css";
import { getHistory, Transaction } from "../service/TransactionsService.ts";

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getHistory();
        setTransactions(data.all_transactions);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <>
      <Header />

      <main className="history-main">
        <div className="history-titulo">
          <span>Histórico de transações</span>
        </div>

        <div className="history-lista">
          {loading ? (
            <p className="history-vazio">Carregando...</p>
          ) : transactions.length === 0 ? (
            <p className="history-vazio">Nenhuma transação encontrada.</p>
          ) : (
            transactions.map((transacao, index) => (
              <HistoricoItem key={index} transacao={transacao} />
            ))
          )}
        </div>

        <button
          className="history-voltar"
          onClick={() => navigate("/home")}
        >
          Voltar
        </button>
      </main>
    </>
  );
}