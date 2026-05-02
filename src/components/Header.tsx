import "../css/Header.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import getUser from "../service/UserService";
import type { User } from "../type/User.ts";


export function Header() {

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, []);

  return (
    <header className="header">
      <div className="logo-header">
        <span className="dev-header">DEV</span>
        <span className="bank-header">BANK</span>
      </div>

      <div className="header-right">
        <div className="user-box">
          <p>Nome: {user?.name}</p>
          <p>Agência: {user?.agency}</p>
          <p>Conta: {user?.account}</p>
        </div>

        <div className="help" onClick={() => navigate('/documentation')}>?</div>
      </div>
    </header>
  );
}