// @ts-expect-error: CSS import handled by build tooling
import "../css/Documentation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationItem } from "../components/Documentation";
import { useApp } from "../context/AppContext";

export default function Documentation() {
  const { apiSource } = useApp();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const docData = [
    {
      id: "get",
      title: "GET /",
      method: "GET",
      path: "/",
      desc: `É uma request GET, qualquer parâmetro de envio será ignorado. Traz as informações iniciais da API:

name [str] - nome do usuário,
agency [str] - 4 dígitos,
account [str] - 6 dígitos no esquema XXXXX-X,
current_balance [float]`
    },
    {
      id: "post-deposit",
      title: "POST /deposit",
      method: "POST",
      path: "/deposit",
      desc: `Trata-se de um POST, são passados a quantidade de células. Se não possuir a CHAVE daquele valor, a quantidade é 0. O valor deve ser depositado na conta do usuário. 
Caso o valor depositado seja o dobro da quantidade em conta, deve retornar o status code 403 (Forbidden) e a string "Depósito suspeito". 
Em casos convencionais retorna:

current_balance [float] - valor atual na conta,
timestamp [float] - instante da operação em ms`
    },
    {
      id: "post-withdraw",
      title: "POST /withdraw",
      method: "POST",
      path: "/withdraw",
      desc: `Trata-se de um POST, são passados a quantidade de células. O valor deve ser deduzido da conta. 
Caso o saldo seja insuficiente, deve retornar status code 403 e a string "Saldo insuficiente para transação". 
Em casos convencionais retorna:

current_balance [float] - valor atual na conta,
timestamp [float] - instante da operação em ms`
    },
    {
      id: "get-history",
      title: "GET /history",
      method: "GET",
      path: "/history",
      desc: `É uma request GET, qualquer parâmetro de envio será ignorado. Traz as últimas transações da conta em forma de lista:

type [str] - tipo da transação,
value [float] - valor da operação,
current_balance [float] - saldo pós-operação,
timestamp [float] - instante da operação`
    }
  ];

  const handleToggle = async (id: string, method: string, path: string) => {
    if (activeId === id) {
      setActiveId(null);
    } 
    else {
      setActiveId(id);
    
    if (!responses[id]) {
        setLoading(true);
        try {
          const options: RequestInit = { method: method };

    if (method === 'POST') {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify({ "100": 1 }); 
    }

    const res = await fetch(`${apiSource.replace(/\/$/, '')}${path}`, options);
    const data = await res.json(); setResponses(prev => ({ ...prev, [id]: data }));} 
      catch (err) {setResponses(prev => ({ ...prev, [id]: "Erro ao conectar com a API." }));} 
      finally {setLoading(false);}
    }
  }
};

  return (
    <div className="doc-container">
      <h1>Documentação</h1>
      <div className="doc-content">
        {docData.map((item) => (
          <DocumentationItem
            key={item.id}
            title={item.title}
            desc={item.desc}
            
            response={responses[item.id] ? JSON.stringify(responses[item.id], null, 2) : (activeId === item.id && loading ? "Carregando..." : "")}
            isActive={activeId === item.id}
            onToggle={() => handleToggle(item.id, item.method, item.path)}
          />
        ))}
        <button className="back-btn" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}