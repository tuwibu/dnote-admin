import {
  Button as FluentButton,
  ButtonProps as FluentButtonProps,
  makeStyles,
  mergeClasses,
  tokens
} from '@fluentui/react-components'
import { forwardRef } from 'react'

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      border: `1px solid ${tokens.colorNeutralBackground2Hover}`
    }
  }
})

export type ButtonProps = FluentButtonProps & {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { appearance, icon, className, children } = props

  const styles = useStyles()

  return (
    <FluentButton
      appearance={appearance}
      icon={icon}
      className={mergeClasses(styles.root, className && className)}
      ref={ref}
      {...props}
    >
      {children && children}
    </FluentButton>
  )
})

export default Button
