// @ts-expect-error: CSS import handled by build tooling 
import copyIcon from "../assets/images/copyIcon.png";
// @ts-expect-error: CSS import handled by build tooling 
import "../css/Home.css";
//Miguel: o  codigo acima serve pro TypeScript ignorar arquivos como o de baixo como erros, e não  sublinhalos em vermelho;


type FooterBarProps = {
  endpoint: string;
  response: string;
};

export function FooterBar({ endpoint, response}: FooterBarProps) {
   const handleCopy = () => {
    const textToCopy = response || endpoint;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      alert("Copiado para a área de transferência!"); 
    }
  };
  return (
    <div className="footer-bar" onClick={handleCopy}>
      <input
        className="footer-input"
        type="text"
        value={endpoint}
        readOnly
      />

      <button className="copy-btn">
        <img src={copyIcon} alt="Copiar" />
      </button>

      {response && (
        <pre className="response-content">{response}</pre>
      )}
    </div>
  );
}