type ActionButtonsProps = {
    onBack: () => void;
    onDeposit: () => void;
    disabled: boolean;
}

export function ActionButtons({ onBack, onDeposit, disabled }: ActionButtonsProps) {
    return (
        <div className="action-buttons">
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