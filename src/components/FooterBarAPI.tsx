// @ts-expect-error: CSS import handled by build tooling 
//Miguel: o  codigo acima serve pro TypeScript ignorar arquivos como o de baixo como erros, e não  sublinhalos em vermelho;
import "../css/Home.css";

type FooterBarProps = {
  endpoint: string;
  onChange: (valor: string) => void;
};

export function FooterBar({ endpoint, onChange }: FooterBarProps) {
  return (
    <div className="footer-bar">
      <input
        className="footer-input"
        type="text"
        placeholder="Coloque aqui o endpoint da sua API"
        value={endpoint}
        onChange={e => onChange(e.target.value)}
      />
      <div className="footer-icone">
        <div className="lapis">
          <div className="lapis-corpo" />
          <div className="lapis-ponta" />
        </div>
      </div>
    </div>
  );
}