import { Text } from '@fluentui/react'
import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components'
import { ChevronDownRegular } from '@fluentui/react-icons'
import { ReactNode, useRef, useState } from 'react'
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

  iconButton: {
    color: `${tokens.colorNeutralForeground1} !important`
  },

  icon: {
    transition: 'transform 0.2s ease'
  },

  openedIcon: {
    transform: 'rotate(180deg)'
  },

  headerRight: {},

  value: {
    color: tokens.colorNeutralForeground1,
    marginRight: '20px'
  },

  content: {
    overflow: 'hidden',
    height: 0,
    transition: 'all 0.35s ease',
    padding: '0 12px 0 42px',
    borderTop: `2px solid transparent`
  },

  openedContent: {
    paddingTop: '12px',
    paddingBottom: '12px',
    borderTopColor: tokens.colorNeutralStroke2,
    height: 'auto'
  }
})

export interface AccordionCard extends IconCardProps {
  value?: string
  children: ReactNode
}

const AccordionCard = (props: AccordionCard) => {
  const { value, children } = props

  const styles = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => {
    if (ref.current) {
      const height = !isOpen ? ref.current.scrollHeight + 'px' : '0'
      ref.current.style.height = height
    }

    setIsOpen((prevOpen) => !prevOpen)
  }

  const contentStyles = mergeClasses(styles.content, isOpen && styles.openedContent)
  const iconStyles = mergeClasses(styles.icon, isOpen && styles.openedIcon)

  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={toggle}>
        <IconCard {...props} />
        <div className={styles.headerRight}>
          {value && <Text className={styles.value}>{value}</Text>}
          <Button
            appearance="subtle"
            icon={<ChevronDownRegular className={styles.iconButton} />}
            className={iconStyles}
          />
        </div>
      </div>

      <div className={`${contentStyles}`} ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default AccordionCard
