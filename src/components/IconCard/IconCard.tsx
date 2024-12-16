import { Text } from '@fluentui/react'
import { makeStyles, tokens } from '@fluentui/react-components'
import { ReactNode } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },

  icon: {
    fontSize: '18px'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '16px'
  },

  title: {
    color: tokens.colorNeutralForeground1,
    fontSize: '0.875rem',
    fontWeight: 600
  },

  description: {
    color: tokens.colorNeutralForeground4,
    fontWeight: 400,
    fontSize: '0.8rem'
  }
})

export interface IconCardProps {
  icon: ReactNode
  title: string
  description?: string
}

const IconCard = (props: IconCardProps) => {
  const { icon, title, description } = props

  const styles = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        {description && <Text className={styles.description}>{description}</Text>}
      </div>
    </div>
  )
}

export default IconCard
