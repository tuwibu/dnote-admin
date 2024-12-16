import { sidebarItems } from '@configs/sidebar'
import { makeStyles, tokens } from '@fluentui/react-components'
import Sidebar from '@layouts/Sidebar'
import { Outlet } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
    minHeight: 'calc(100dvh - 50px)',
    maxHeight: 'calc(100dvh - 50px)',
    overflowY: 'auto',

    '::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '20px'
    },

    '::-webkit-scrollbar-thumb': {
      width: '4px',
      background: '#898A8B',
      borderRadius: '20px'
    },

    '::-webkit-scrollbar-track': {
      width: '4px',
      borderRadius: '20px'
    },
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    background: tokens.colorNeutralBackground2,
    boxSizing: 'border-box',
    flex: 1
  }
})

const AppLayout = () => {
  const styles = useStyles()

  return (
    <>
      <Sidebar items={sidebarItems} />

      <div className={styles.root}>
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout
