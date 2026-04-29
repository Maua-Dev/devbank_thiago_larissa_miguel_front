

import { useState } from 'react';
import { BalanceHeader } from '../components/BalanceHeader';
import { BanknotesGrid } from '../components/BanknotesGrid';
import { DepositActionButtons } from '../components/DepositActionButtons';
import "../css/Deposit.css";
import { Header } from '../components/Header';

const BANKNOTE_VALUES = [2, 5, 10, 20, 50, 100, 200];
type QuantityMap = Record<number, number>;

type DepositPageProps = {
    currentBalance: number;
    onBack: () => void;
    onDeposit: (totalDeposited: number) => void;
}

export function Deposit({ currentBalance, onBack, onDeposit }: DepositPageProps) {
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

    const banknotes = BANKNOTE_VALUES.map((v) => ({
        value: v,
        quantity: quantities[v],
    }));

    return (
            <body className="deposit-main">
            <Header user={{
          nome: '',
          agencia: '',
          conta: ''
        }}/>
            <BalanceHeader
                currentBalance={currentBalance}
                totalDeposited={totalDeposited}
            />
            <BanknotesGrid
                banknotes={banknotes}
                onAdd={handleAdd}
                onSubtract={handleSubtract}
            />
            <DepositActionButtons
                onBack={onBack}
                onDeposit={() => onDeposit(totalDeposited)}
                disabled={totalDeposited === 0}
            />
        </body>
    );
}