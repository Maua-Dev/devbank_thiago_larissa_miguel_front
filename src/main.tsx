import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// @ts-expect-error: CSS import handled by build tooling
import './index.css'
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AppProvider>  
        <App />
    </AppProvider>
  </React.StrictMode>,
)
