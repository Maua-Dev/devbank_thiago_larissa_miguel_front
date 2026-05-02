// WithdrawActionButtons.tsx
type WithdrawActionButtonsProps = {
    onBack: () => void;
    onWithdraw: () => void;
    disabled: boolean;
}

export function WithdrawActionButtons({ onBack, onWithdraw, disabled }: WithdrawActionButtonsProps) {
    return (
        <div className="withdraw-action-buttons">
            <button className="btn-back" onClick={onBack}>
                Voltar
            </button>
            <button
                className="btn-withdraw"
                onClick={onWithdraw}
                disabled={disabled}
            >
                Sacar
            </button>
        </div>
    );
}