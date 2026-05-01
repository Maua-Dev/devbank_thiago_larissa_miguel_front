import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { DepositActionButtons } from '../components/DepositActionButtons';
import "../css/Deposit.css";
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { depositPost, BANKNOTE_VALUES } from "../service/TransactionsService.ts";

export function Deposit() {

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

    const totalDeposited = Object.entries(selectedBanknotes).reduce(
        (sum, [value, qty]) =>
            sum + Number(value) * qty,
        0
    );

    function handleAdd(value: number) {
        setSelectedBanknotes((prev) => ({ ...prev, [String(value)]: prev[String(value) as keyof BANKNOTE_VALUES] + 1 }));
    }

    function handleSubtract(value: number) {
        setSelectedBanknotes((prev) => ({
            ...prev,
            [String(value)]: Math.max(0, prev[String(value) as keyof BANKNOTE_VALUES] - 1),
        }));
    }

    async function handleDeposit() {
        try {
            await depositPost(selectedBanknotes);
            await refreshUser();
            navigate("/home");
        } catch (error) {
            console.error("Erro ao realizar depósito:", error);
            alert("Erro ao realizar depósito");
        }
    }

    const banknotes = Object.entries(selectedBanknotes).map(([value, quantity]) => ({
        value: Number(value),
        quantity,
    }));

    return (
        <div className="deposit-main">
            <Header/>
            <BalanceHeader
                currentBalance={balance ?? 0}
                totalDeposited={totalDeposited}
            />
            <BanknotesGrid
                banknotes={banknotes}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
            />
            <DepositActionButtons
                onBack={() => navigate("/home")}
                onDeposit={handleDeposit}
                disabled={totalDeposited === 0}
            />
        </div>
    );
}