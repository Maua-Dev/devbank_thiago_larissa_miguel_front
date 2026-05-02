import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from "../context/AppContext"; 
import { ErrorModal } from "../components/ErrorModal"; // ADICIONADO

const Login = () => {
  const { setApiSource, setUserData } = useApp();
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(""); // ADICIONADO
  const navigate = useNavigate();
  

const handleLogin = async () => {
  if (!apiUrl) return setErro("Insira uma URL"); // ALTERADO
  
  setLoading(true);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    setApiSource(apiUrl);
    setUserData(data);

    localStorage.setItem("api_url", apiUrl); 

    navigate("/home");
  } catch (error) {
    setErro("Erro ao conectar na API"); // ALTERADO
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-page-wrapper">
      {erro && <ErrorModal mensagem={erro} onClose={() => setErro("")} />} {/* ADICIONADO */}

      <div className="login-banner">
            <div className="help-button" onClick={() => navigate('/documentation')}>?</div>
        <div className="content-container">
          <h1 className="logo">
            <span className="dev">DEV</span>
            <span className="bank">BANK</span>
          </h1>
          
          <input 
            className="input-api"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Cole a URL da API aqui"
          />
          
          <button className="btn-entrar" onClick={handleLogin} disabled={loading}> 
             {loading ? "Conectando..." : "Entrar"}
          </button>
        </div>
      </div>      
    </div>
  );
};

export default Login;