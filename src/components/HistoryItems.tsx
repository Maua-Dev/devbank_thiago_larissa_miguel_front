
import "../css/History.css";

type Transacao = {
  tipo: string;
  valor: number;
  data: string;
};

type HistoricoItemProps = {
  transacao: Transacao;
};

export function HistoricoItem({ transacao }: HistoricoItemProps) {
  return (
    <div className="historico-item">
      <span className="historico-tipo">{transacao.tipo}</span>
      <span className="historico-valor">R$ {transacao.valor.toFixed(2)}</span>
      <span className="historico-data">{transacao.data}</span>
    </div>
  );
}