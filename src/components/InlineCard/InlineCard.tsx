import { makeStyles, tokens } from '@fluentui/react-components'
import { ReactNode } from 'react'
import IconCard, { IconCardProps } from '../IconCard'

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4
  },

  header: {
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  headerRight: {},

  content: {}
})

export interface InlineCard extends IconCardProps {
  content: ReactNode
}

const InlineCard = (props: InlineCard) => {
  const { content } = props

  const styles = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <IconCard {...props} />
        <div className={styles.headerRight}>
          {content && <div className={styles.content}>{content}</div>}
        </div>
      </div>
    </div>
  )
}

export default InlineCard
