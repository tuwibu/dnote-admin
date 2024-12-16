import type { MenuButtonProps } from '@fluentui/react-components'
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton
} from '@fluentui/react-components'
import * as React from 'react'

interface ButtonProps {
  onClick: () => void
  title: string
  icon: JSX.Element
}

interface DropdownButtonProps {
  items: ButtonProps[]
  onClick: () => void
  title: string
  icon: JSX.Element
}

export const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { items, onClick, title, icon } = props
  return (
    <Menu positioning="below-end">
      <MenuTrigger disableButtonEnhancement>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton={{
              onClick
            }}
            appearance="primary"
            icon={icon}
          >
            {title}
          </SplitButton>
        )}
      </MenuTrigger>

      {items.length > 0 && (
        <MenuPopover>
          <MenuList>
            {items.map((item, index) => (
              <MenuItem key={index} onClick={item.onClick} icon={item.icon}>
                {item.title}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      )}
    </Menu>
  )
}

export default DropdownButton
