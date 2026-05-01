type DepositActionButtonsProps = {
    onBack: () => void;
    onDeposit: () => void;
    disabled: boolean;
}

export function DepositActionButtons({ onBack, onDeposit, disabled }: DepositActionButtonsProps) {
    return (
        <div className="deposit-action-buttons">
            <button className="btn-back" onClick={onBack}>
                Voltar
            </button>
            <button
                className="btn-deposit"
                onClick={onDeposit}
                disabled={disabled}
            >
                Depositar
            </button>
        </div>
    );
}