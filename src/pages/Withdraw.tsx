// Withdraw.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; {/* ADICIONADO */}
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { WithdrawActionButtons } from '../components/WithdrawActionButtons';
import { Header } from '../components/Header';
import "../css/Withdraw.css";

const BANKNOTE_VALUES = [2, 5, 10, 20, 50, 100, 200];
type QuantityMap = Record<number, number>;

type WithdrawPageProps = {
    currentBalance: number;
    onBack: () => void;
    onWithdraw: (totalWithdraw: number) => void;
}

export function Withdraw({ currentBalance, onWithdraw }: WithdrawPageProps) {
    const navigate = useNavigate(); {/* ADICIONADO */}
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

    const banknotes = BANKNOTE_VALUES.map((v) => ({
        value: v,
        quantity: quantities[v],
    }));

    return (
        <div className="withdraw-main">
            <Header user={{ nome: '', agencia: '', conta: '' }} />
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
                onWithdraw={() => onWithdraw(totalWithdraw)}
                disabled={totalWithdraw === 0 || totalWithdraw > currentBalance}
            />
        </div>
    );
}