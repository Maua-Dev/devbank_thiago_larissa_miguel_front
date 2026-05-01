type Banknote = {
    value: number;
    quantity: number;
}

type BanknotesGridProps = {
    banknotes: Banknote[];
    onAdd: (value: number) => void;
    onSubtract: (value: number) => void;
}

import { BanknoteCard } from './BanknoteCard';

export function BanknotesGrid({ banknotes, onAdd, onSubtract }: BanknotesGridProps) {
    return (
        <div className="banknotes-section">
            <p className="banknotes-label">
                Selecione as cédulas e a quantidade que você deseja.
            </p>
            <div className="banknotes-grid">
                {banknotes.map((banknote) => (
                    <BanknoteCard
                        key={banknote.value}
                        banknote={banknote}
                        onAdd={() => onAdd(banknote.value)}
                        onSubtract={() => onSubtract(banknote.value)}
                    />
                ))}
            </div>
        </div>
    );
}