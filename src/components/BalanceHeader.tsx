type BalanceHeaderProps = {
    currentBalance: number;
    totalDeposited: number;
}

export function BalanceHeader({ currentBalance, totalDeposited }: BalanceHeaderProps) {
    return (
        <div className="balance-header">
            <span className="balance-current">
                Saldo atual: R$ {currentBalance}  
            </span>
            <span className="balance-deposited">
                /Quantidade depositada: R$ {totalDeposited}
            </span>
        </div>
    );
}