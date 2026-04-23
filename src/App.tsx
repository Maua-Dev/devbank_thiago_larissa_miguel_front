import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Deposit from './pages/Deposit'
import History from './pages/History'
import Withdraw from './pages/Withdraw'
import Account from './pages/Account'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/history" element={<History />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App