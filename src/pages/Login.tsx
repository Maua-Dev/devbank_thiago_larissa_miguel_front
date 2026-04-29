// @ts-expect-error: CSS import handled by build tooling 
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from "../context/AppContext"; 

const Login = () => {
  const { setApiSource, setUserData } = useApp();
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

const handleLogin = async () => {
  if (!apiUrl) return alert("Insira uma URL"); //pega os dados da api
  
  setLoading(true);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setApiSource(apiUrl);
    setUserData(data);

    navigate("/home");}  
    catch (error) {
        alert("Erro ao conectar na API");
    } 
    finally {
    setLoading(false);
    }};

  return (
    <div className="login-page-wrapper">
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