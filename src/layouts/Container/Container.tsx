import { makeStyles, tokens } from '@fluentui/react-components'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const pageVariants = {
  initial: {
    y: '5vh'
  },
  in: {
    y: 0
  }
}

const pageTransition = {
  duration: 0.2
}

interface ContainerProps {
  children: ReactNode
}

const useStyles = makeStyles({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  }
})

const Container: React.FC<ContainerProps> = ({ children }) => {
  const styles = useStyles()
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.root}
    >
      {children}
    </motion.div>
  )
}

export default Container
