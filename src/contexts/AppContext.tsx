import { DEFAULT_APP_COLOR } from '@configs/index'
import React, { createContext, useContext, useState } from 'react'

export interface DownloadItemProps {
  key: string
  title: string
  description: string
  progress: number
}

interface AppContextProps {
  appColor: string
  openSidebar: boolean
  downloadLists: DownloadItemProps[]
  ready: boolean
  needUpdate: boolean
  needRestart: boolean
  latestVersion: string
  loadingUpdate: boolean
  setAppColor: (color: string) => void
  toggleSidebar: () => void
  setDownloadLists: React.Dispatch<React.SetStateAction<DownloadItemProps[]>>
  setReady: React.Dispatch<React.SetStateAction<boolean>>
  setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>
  setNeedRestart: React.Dispatch<React.SetStateAction<boolean>>
  setLatestVersion: React.Dispatch<React.SetStateAction<string>>
  setLoadingUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }) => {
  const [appColor, setAppColorState] = useState(DEFAULT_APP_COLOR)
  const [openSidebar, setOpenSidebarState] = useState(true)
  const [downloadLists, setDownloadLists] = useState<DownloadItemProps[]>([])
  const [ready, setReady] = useState(false)
  const [needUpdate, setNeedUpdate] = useState(true)
  const [needRestart, setNeedRestart] = useState(false)
  const [latestVersion, setLatestVersion] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const setAppColor = (color: string) => setAppColorState(color)

  const toggleSidebar = () => setOpenSidebarState((prev) => !prev)

  return (
    <AppContext.Provider
      value={{
        needUpdate,
        needRestart,
        loadingUpdate,
        latestVersion,
        appColor,
        openSidebar,
        downloadLists,
        ready,
        setAppColor,
        toggleSidebar,
        setDownloadLists,
        setReady,
        setNeedUpdate,
        setNeedRestart,
        setLatestVersion,
        setLoadingUpdate
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
