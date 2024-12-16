import { createContext, useContext, useState } from 'react'

interface AutomationContextProps {
  saved: boolean
  loading: boolean
  running: boolean
  setSaved: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setRunning: React.Dispatch<React.SetStateAction<boolean>>
}

const AutomationContext = createContext<AutomationContextProps | undefined>(undefined)

export const AutomationProvider = ({ children }) => {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [running, setRunning] = useState(false)

  return (
    <AutomationContext.Provider
      value={{
        saved,
        loading,
        running,
        setSaved,
        setLoading,
        setRunning
      }}
    >
      {children}
    </AutomationContext.Provider>
  )
}

export const useAutomation = () => {
  const context = useContext(AutomationContext)
  if (context === undefined) {
    throw new Error('useAutomation must be used within a AutomationProvider')
  }
  return context
}
