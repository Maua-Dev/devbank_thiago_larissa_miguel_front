import copyIcon from "../assets/images/copyIcon.png";

type DocumentationItemProps = {
  title: string;
  desc: string;
  response: string;
  isActive: boolean;
  onToggle: () => void;
};
export function DocumentationItem({ title, desc, response, isActive, onToggle }: DocumentationItemProps) {
  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      alert("Copiado para a área de transferência!"); 
    }
  };
  return (
    <div className="doc-item-wrapper">
      <button 
        className={`doc-btn ${isActive ? 'active' : ''}`} 
        onClick={onToggle}
      >
        {title}
      </button>
      
      {isActive && (
        <div className="doc-desc-container">
          <div className="text-content">{desc}</div>

        {response && (
            <div className="response-wrapper">
              <button className="copy-btn" onClick={handleCopy}>
               <img src={copyIcon} alt="Copiar" />
              </button>
              
              <pre className="response-content">{response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}