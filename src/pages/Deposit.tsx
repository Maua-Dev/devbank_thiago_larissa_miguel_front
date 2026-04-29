import { useState } from 'react';
import { Header } from '../components/Header';
import { BalanceHeader } from '../components/BalanceHeader';

export default function Deposit() {
  const [user] = useState({
    nome: "",
    agencia: "",
    conta: ""
  });
  const [totalDeposited] = useState(0);

  return (
    <>
      <Header user={user} />
      <BalanceHeader
        currentBalance={1000}
        totalDeposited={totalDeposited}
      />
    </>
  );
}
