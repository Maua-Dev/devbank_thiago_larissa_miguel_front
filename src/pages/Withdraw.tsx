import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { WithdrawActionButtons } from '../components/WithdrawActionButtons';
import { Header } from '../components/Header';
import "../css/Withdraw.css";
import { useApp } from '../context/AppContext';
import { withdrawPost, BANKNOTE_VALUES } from "../service/TransactionsService.ts";

export function Withdraw() {

    const navigate = useNavigate();
    const { userData, refreshUser } = useApp();
    const balance = userData?.current_balance;

    const [selectedBanknotes, setSelectedBanknotes] = useState<BANKNOTE_VALUES>({
        "2": 0,
        "5": 0,
        "10": 0,
        "20": 0,
        "50": 0,
        "100": 0,
        "200": 0,
    });

    const totalWithdraw = Object.entries(selectedBanknotes).reduce(
        (sum, [value, qty]) =>
            sum + Number(value) * qty,
        0
    );

    function handleAdd(value: number) {
        setSelectedBanknotes((prev) => ({ ...prev, [value]: prev[String(value) as keyof BANKNOTE_VALUES] + 1 }));
    }

    function handleSubtract(value: number) {
        setSelectedBanknotes((prev) => ({ ...prev, [value]: Math.max(0, prev[String(value) as keyof BANKNOTE_VALUES] - 1) }));
    }

    async function handleWithdraw() {
        try {
            await withdrawPost(selectedBanknotes);
            await refreshUser(); 
            navigate("/home");
        } catch (error) {
            console.error("Erro ao realizar saque:", error);
            alert("Erro ao realizar saque");
        }
    }

    const banknotes = Object.entries(selectedBanknotes).map(([value, quantity]) => ({
        value: Number(value),
        quantity,
    }));

    return (
        <div className="withdraw-main">
            <Header/>
            <BalanceHeader
                currentBalance={balance ?? 0}
                totalDeposited={totalWithdraw}
            />
            <BanknotesGrid
                banknotes={banknotes}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
            />
            <WithdrawActionButtons
                onBack={() => navigate("/home")}
                onWithdraw={handleWithdraw}
                disabled={totalWithdraw === 0 || totalWithdraw > (balance ?? 0)}
            />
        </div>
    );
}