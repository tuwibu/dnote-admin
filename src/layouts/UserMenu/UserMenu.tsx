import { APP_PREFIX_PATH } from '@configs/index'
import {
  makeStyles,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
  tokens
} from '@fluentui/react-components'
import { NavItem } from '@fluentui/react-nav-preview'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { logoutUser } from '@redux/reducers/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineAccountCircle, MdLogout } from 'react-icons/md'
import { TbAdjustmentsCog } from 'react-icons/tb'

const useStyles = makeStyles({
  info: {
    display: 'flex',
    gap: '10px'
  },

  infoText: {
    display: 'flex',
    flexDirection: 'column'
  },

  nav: {
    marginBottom: '7px',
    cursor: 'pointer',
    ':hover': {
      background: tokens.colorNeutralBackground1Selected
    }
  },

  menuItem: {
    cursor: 'pointer'
  },

  link: {
    color: tokens.colorNeutralForeground2,
    textDecoration: 'unset',
    minWidth: '160px'
  }
})

export interface UserMenuProps {
  labelStyles?: string
}

const UserMenu = (props: UserMenuProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { labelStyles } = props

  const styles = useStyles()

  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <Menu positioning="after-top">
      <MenuTrigger disableButtonEnhancement>
        <NavItem value="/profile" icon={<MdOutlineAccountCircle />} className={styles.nav}>
          <span className={labelStyles}>Profile</span>
        </NavItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <Link to={`${APP_PREFIX_PATH}/profile-info`} className={styles.link} draggable={false}>
            <MenuItem className={styles.menuItem}>
              <Persona
                name={user.username}
                secondaryText={user.username}
                presence={{ status: 'available' }}
                size="large"
                avatar={{
                  image: {
                    src: '/avatar.jpg'
                  }
                }}
                {...props}
              />
            </MenuItem>
            <MenuDivider />
          </Link>
          {/* <Link to={`${APP_PREFIX_PATH}/profile-info`} className={styles.link} draggable={false}>
            <MenuItem icon={<MdOutlineAccountCircle />} className={styles.menuItem}>
              Manage account profile
            </MenuItem>
          </Link> */}
          <Link to={`${APP_PREFIX_PATH}/app-setting`} className={styles.link} draggable={false}>
            <MenuItem icon={<TbAdjustmentsCog />} className={styles.menuItem}>
              App Settings
            </MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem icon={<MdLogout />} className={styles.menuItem} onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

export default UserMenu
