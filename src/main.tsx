import { AppProvider } from '@contexts/AppContext'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <App />
  </AppProvider>
)
