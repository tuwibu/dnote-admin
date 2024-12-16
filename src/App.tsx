import { initializeIcons as initializeFluentuiIcons } from '@fluentui/react'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '@redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@redux/store'
import View from './pages'

initializeFluentuiIcons()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <View />
          </AnimatePresence>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
