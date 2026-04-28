
type Banknote = {
    value: number;
    quantity: number;
}

type BanknoteCardProps = {
    banknote: Banknote;
    onAdd: () => void;
    onSubtract: () => void;
}

export function BanknoteCard({ banknote, onAdd, onSubtract }: BanknoteCardProps) {
    return (
        <div className="banknote-card">
            <div className="banknote">
                <span className="banknote-currency">R$</span>
                <span className="banknote-value">{banknote.value}</span>
            </div>

            <div className="banknote-controls">
                <span className="quantidade">Quantidade</span>
                <div className="qtd-value">
                    <button
                        className="sub-banknote"
                        onClick={onSubtract}
                        disabled={banknote.quantity === 0}
                    >
                        -
                    </button>
                    <span className="qtd-count">{banknote.quantity}</span>
                    <button className="add-banknote" onClick={onAdd}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}