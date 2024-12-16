import { APP_NAME } from '@configs/index'
import { useApp } from '@contexts/AppContext'
import { Text } from '@fluentui/react'
import { makeStyles, tokens } from '@fluentui/react-components'
import { useAppDispatch } from '@redux/hooks'
import { useState } from 'react'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    background: tokens.colorNeutralBackground4,
    width: '100vw',
    maxWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px'
  },

  info: {
    display: 'flex',
    alignItems: 'center'
  },

  updater: {},

  img: {
    width: '18px',
    height: '18px',
    marginLeft: '18px'
  },

  appName: {
    marginLeft: '10px',
    color: tokens.colorStrokeFocus2,
    fontWeight: '600',
    fontSize: '0.875rem'
  },

  buttonGroup: {
    display: 'flex',
    height: '100%'
  },

  button: {
    height: '40px',
    maxWidth: '45px',
    minWidth: '45px',
    borderRadius: 0,
    ':hover': {
      color: tokens.colorNeutralForeground2,
      background: tokens.colorNeutralCardBackgroundSelected,
      ':active': {
        color: tokens.colorNeutralForeground2,
        background: tokens.colorNeutralCardBackgroundSelected
      }
    }
  },

  buttonClose: {
    ':hover': {
      background: 'red',
      color: '#fff'
    }
  }
})

interface CheckUpdateState {
  update: boolean
  needUpdate?: boolean
  needRestart?: boolean
  latestVersion?: string
}

const Header = () => {
  const dispatch = useAppDispatch()
  const styles = useStyles()
  const [isMaximised, setIsMaximised] = useState<boolean>()
  const {
    setDownloadLists,
    setReady,
    setLatestVersion,
    setLoadingUpdate,
    setNeedUpdate,
    setNeedRestart
  } = useApp()

  return (
    <div className={styles.root} id="header">
      <div className={styles.info}>
        <img src="/logo.png" alt="app logo" className={styles.img} />
        <Text className={styles.appName}>{APP_NAME}</Text>
      </div>
    </div>
  )
}

export default Header
