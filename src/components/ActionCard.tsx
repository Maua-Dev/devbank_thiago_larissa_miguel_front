import "../css/ActionCard.css";

type ActionCardTipo = "depositar" | "retirar" | "transacao";

type ActionCardProps = {
  titulo: string;
  tipo: ActionCardTipo;
  onClick: () => void;
};

export function ActionCard({ titulo, tipo, onClick }: ActionCardProps) {
  return (
    <div className="action-card" onClick={onClick}>
      <span className="action-card-titulo">{titulo}</span>

      <div className={`action-card-icones action-card-icones--${tipo}`}>
        {tipo === "transacao" ? (
          <>
            <div className="seta seta--direita">
              <div className="seta-corpo" />
              <div className="seta-ponta" />
            </div>
            <div className="cifrao"><span>$</span></div>
            <div className="seta seta--esquerda">
              <div className="seta-corpo" />
              <div className="seta-ponta" />
            </div>
          </>
        ) : (
          <>
            <div className="cifrao"><span>$</span></div>
            {tipo === "depositar" ? (
              <div className="seta seta--cima">
                <div className="seta-ponta" />
                <div className="seta-corpo" />
              </div>
            ) : (
              <div className="seta seta--baixo">
                <div className="seta-corpo" />
                <div className="seta-ponta" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}