import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components'
import { ReactNode } from 'react'
import IconCard, { IconCardProps } from '../IconCard'
import { Text } from '@fluentui/react'
import { ChevronDownRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralCardBackground,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium
  },

  header: {
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  iconButton: {
    color: `${tokens.colorNeutralForeground1} !important`
  },

  icon: {
    transition: 'transform 0.2s ease'
  },

  openedIcon: {
    transform: 'rotate(180deg)'
  },

  content: {
    transition: 'all 0.35s ease',
    padding: '20px',
    borderTop: `2px solid transparent`
  },

  openedContent: {
    paddingTop: '12px',
    paddingBottom: '12px',
    borderTopColor: tokens.colorNeutralStroke3
  },

  headerRight: {}
})

export interface CardProps extends IconCardProps {
  children: ReactNode
  actions?: ReactNode
}

const Card = (props: CardProps) => {
  const { children, actions } = props

  const styles = useStyles()

  const contentStyles = mergeClasses(styles.content, styles.openedContent)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <IconCard {...props} />
        {actions && <div className={styles.headerRight}>{actions}</div>}
      </div>

      <div className={contentStyles}>{children}</div>
    </div>
  )
}

export default Card
