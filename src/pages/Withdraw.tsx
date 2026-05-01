import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { WithdrawActionButtons } from '../components/WithdrawActionButtons';
import { Header } from '../components/Header';
import { useApp } from "../context/AppContext";
import "../css/Withdraw.css";

const BANKNOTE_VALUES = [2, 5, 10, 20, 50, 100, 200];
type QuantityMap = Record<number, number>;

export function Withdraw() {
    const navigate = useNavigate();
    const { userData, apiSource } = useApp();
    const currentBalance = userData?.current_balance || 0;
    const [quantities, setQuantities] = useState<QuantityMap>(
        Object.fromEntries(BANKNOTE_VALUES.map((v) => [v, 0]))
    );

    const totalWithdraw = Object.entries(quantities).reduce(
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
    async function handleWithdraw(totalWithdraw: number) {
        try {
            const response = await fetch(`${apiSource}/withdraw`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalWithdraw }),
            });

            if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
                }

            const data = await response.json();

            console.log("Saque realizado:", data);

            navigate("/home");

        } catch (error) {
            console.error("Erro ao realizar saque:", error);
            alert("Erro ao realizar saque");
        }
    }

    const banknotes = BANKNOTE_VALUES.map((v) => ({
        value: v,
        quantity: quantities[v],
    }));

    return (
        <div className="withdraw-main">
            <Header />
            <BalanceHeader
                currentBalance={currentBalance}
                totalDeposited={totalWithdraw}
            />
            <BanknotesGrid
                banknotes={banknotes}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
            />
            <WithdrawActionButtons
                onBack={() => navigate("/home")}
                onWithdraw={() => handleWithdraw(totalWithdraw)}
                disabled={totalWithdraw === 0 || totalWithdraw > currentBalance}
            />
        </div>
    );
}