
import "../css/ErrorModal.css";

type ErrorModalProps = {
  mensagem: string;
  onClose: () => void;
};

export function ErrorModal({ mensagem, onClose }: ErrorModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icone">
          <div className="modal-triangulo-wrapper">
            <div className="modal-triangulo" />
            <span className="modal-exclamacao">!</span>
          </div>
        </div>
        <h2 className="modal-titulo">Erro!</h2>
        <p className="modal-mensagem">{mensagem}</p>
        <button className="modal-btn" onClick={onClose}>Ok</button>
      </div>
    </div>
  );
}