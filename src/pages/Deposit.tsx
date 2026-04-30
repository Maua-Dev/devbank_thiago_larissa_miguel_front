import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { useApp } from "../context/AppContext";
import { DepositActionButtons } from '../components/DepositActionButtons';
import "../css/Deposit.css";
import { Header } from '../components/Header';

const BANKNOTE_VALUES = [2, 5, 10, 20, 50, 100, 200]; // Thiago : esses são os valores de cada cédula para as operações
type QuantityMap = Record<number, number>; // Thiago: decidi usar um dicionário (key : value)

export function Deposit() {
    const navigate = useNavigate();
    const { userData, apiSource } = useApp();
    const [quantities, setQuantities] = useState<QuantityMap>(
        Object.fromEntries(BANKNOTE_VALUES.map((v) => [v, 0]))
    );

    const totalDeposited = Object.entries(quantities).reduce(
        (sum, [value, qty]) => sum + Number(value) * qty,
        0
    );

    function handleAdd(value: number) {
        setQuantities((prev) => ({ ...prev, [value]: prev[value] + 1 }));
    }

    function handleSubtract(value: number) {
        setQuantities((prev) => ({ ...prev, [value]: Math.max(0, prev[value] - 1) }));
    }

    //chamar no backend;
    async function handleDeposit(totalDeposited: number) {
        try {
            const response = await fetch(`${apiSource}/deposit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalDeposited }),
            });

             if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
                }
                
            const data = await response.json();

            console.log("Depósito realizado:", data);
            
            navigate("/home");
        } catch (error) {
            console.error("Erro ao realizar depósito:", error);
            alert("Erro ao realizar depósito");
        }
    }

    const banknotes = BANKNOTE_VALUES.map((v) => ({
        value: v,
        quantity: quantities[v],
    }));

    return (
        <body className="deposit-main">
            <Header />
            <BalanceHeader
                currentBalance={userData.current_balance}
                totalDeposited={totalDeposited}
            />
            <BanknotesGrid
                banknotes={banknotes}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
            />
            <DepositActionButtons
                onBack={() => navigate("/home")}
                onDeposit={() => handleDeposit(totalDeposited)}
                disabled={totalDeposited === 0}
            />
        </body>
    );
}