import "../css/Documentation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentationItem } from "../components/Documentation";

export default function Documentation() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

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
current_balance [float]`,
      response: `{
  "name": "Vitor Soller",
  "agency": "0000",
  "account": "00000-0",
  "current_balance": 1000.0
}`
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
timestamp [float] - instante da operação em ms`,
      request: `{
  "2": 1,
  "5": 2,
  "10": 3,
  "20": 4,
  "50": 5,
  "100": 6,
  "200": 7
}`,
      response: `{
  "current_balance": 1000.0,
  "timestamp": 1690482853890 
}`
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
timestamp [float] - instante da operação em ms`,
      request: `{
  "2": 1,
  "5": 2,
  "10": 3,
  "20": 4,
  "50": 5,
  "100": 6,
  "200": 7
}`,
      response: `{
  "current_balance": 1000.0,
  "timestamp": 1690482853890 
}`
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
timestamp [float] - instante da operação`,
      response: `{
  "all_transactions": [
    {
      "type": "deposit",
      "value": 100.0,
      "current_balance": "1000.0",
      "timestamp": 1690482853890
    },
    {
      "type": "withdraw",
      "timestamp": 1691707985704.6152,
      "current_balance": 700.0,
      "value": 300
    }
  ]
}`
    }
  ];

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
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
            response={activeId === item.id ? 
              `${item.request ? "Request:\n" + item.request + "\n\n" : ""}Response:\n${item.response}` 
              : ""}
            isActive={activeId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
        <button className="back-btn" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}