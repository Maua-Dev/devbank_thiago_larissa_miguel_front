import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { Deposit } from './pages/Deposit'
import History from './pages/History'
import { Withdraw } from './pages/Withdraw'
import Documentation from './pages/Documentation'
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/history" element={<History />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App