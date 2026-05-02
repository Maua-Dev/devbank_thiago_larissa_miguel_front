
import "../css/History.css";
import { Transaction } from "../service/TransactionsService";

type HistoricoItemProps = {
  transacao: Transaction;
};

export function HistoricoItem({ transacao }: HistoricoItemProps) {
  return (
    <div className="historico-item">
      <span className="historico-tipo">{transacao.type}</span>
      <span className="historico-valor">R$ {transacao.value.toFixed(2)}</span>
      <span className="historico-data">{new Date(transacao.timestamp).toLocaleString()}</span>
    </div>
  );
}