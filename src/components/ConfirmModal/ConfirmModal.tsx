import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  tokens
} from '@fluentui/react-components'
import { ReactNode } from 'react'
import { Button } from 'antd'

const useStyles = makeStyles({
  root: {
    borderRadius: 0
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderTop: `1px solid ${tokens.colorNeutralBackground5}`,
    background: tokens.colorNeutralBackground5,
    margin: '0 -24px -24px -24px',
    padding: '24px',
    gap: '12px'
  },

  button: {
    flex: 1
  },

  content: {
    padding: '24px 0'
  }
})

export interface ModalProps {
  label: string
  icon: ReactNode
  title?: string
  content: string | ReactNode
  onConfirm?: () => void
  onClose?: () => void
  disabled?: boolean
  loading?: boolean
}

const Modal = (props: ModalProps) => {
  const { label, icon, content, title, disabled, loading, onConfirm } = props
  const styles = useStyles()

  const handleConfirm = () => {
    onConfirm && onConfirm()
  }

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button danger icon={icon} disabled={disabled} loading={loading}>
          {label}
        </Button>
      </DialogTrigger>

      <DialogSurface className={styles.root}>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent className={styles.content}>{content}</DialogContent>
        </DialogBody>
        <div className={styles.actions}>
          <DialogTrigger disableButtonEnhancement>
            <Button type="primary" className={styles.button} onClick={handleConfirm}>
              OK
            </Button>
          </DialogTrigger>
          <DialogTrigger disableButtonEnhancement>
            <Button type="default" className={styles.button}>
              Cancel
            </Button>
          </DialogTrigger>
        </div>
      </DialogSurface>
    </Dialog>
  )
}

export default Modal
