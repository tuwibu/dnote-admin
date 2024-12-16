import {
  Menu as FluentMenu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Slot
} from '@fluentui/react-components'
import { ReactNode } from 'react'
import Button from '../Button'

export type MenuItem = {
  icon?: Slot<'span'>
  label: string
  value: string
  disabled?: boolean
}

export interface MenuProps {
  label: string | ReactNode
  options: MenuItem[]
  onOptionClick: (value: string) => void
}

const Menu = (props: MenuProps) => {
  const { label, options, onOptionClick } = props

  const handleOptionClick = (value: string) => {
    onOptionClick(value)
  }

  return (
    <FluentMenu>
      <MenuTrigger disableButtonEnhancement>
        <Button>{label}</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {options.map((item) => (
            <MenuItem
              key={item.value}
              disabled={item.disabled}
              icon={item.icon}
              onClick={() => handleOptionClick(item.value)}
            >
              {item.label}{' '}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </FluentMenu>
  )
}

export default Menu
