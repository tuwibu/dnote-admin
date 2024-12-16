import { APP_PREFIX_PATH } from '@configs/index'
import { useApp } from '@contexts/AppContext'
import { Button, makeStyles, mergeClasses, Slot, tokens, Tooltip } from '@fluentui/react-components'
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup
} from '@fluentui/react-nav-preview'
import { useAppSelector } from '@redux/hooks'
import { getPathName } from '@util'
import { useEffect, useRef, useState } from 'react'
import { MdMenu, MdMenuOpen, MdOutlineAccountCircle, MdOutlineSpaceDashboard } from 'react-icons/md'
import { TbAdjustmentsCog } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import UserMenu from '../UserMenu'
import PageDashboard from '@pages/Dashboard/Dashboard'
import AnimateHeight from 'react-animate-height'

const useStyles = makeStyles({
  drawer: {
    width: '63px',
    boxShadow: 'none',
    transition: 'width .3s ease !important',
    top: '50px',
    height: 'calc(100dvh - 50px)',
    zIndex: '999'
  },

  link: {
    color: tokens.colorNeutralForeground2,
    textDecoration: 'unset'
  },

  label: {
    display: 'none !important',
    whiteSpace: 'nowrap'
  },

  openDrawer: {
    width: '250px'
  },

  openLabel: {
    display: 'inline-block'
  },

  navItem: {
    marginBottom: '0px',
    fontWeight: 400,
    cursor: 'pointer',
    border: `1px solid ${tokens.colorNeutralStroke2}`,

    ':hover': {
      background: tokens.colorNeutralBackground1Selected
    },

    ':after': {
      transition: 'background 0.3s ease',
      marginInlineStart: '-10px',
      height: '16px',
      width: '3px',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  },

  activedNavItem: {
    background: tokens.colorNeutralBackground1Selected,

    ':after': {
      marginInlineStart: '-10px',
      height: '16px',
      width: '3px',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  },

  tooltip: {
    background: tokens.colorNeutralBackground5
  },

  hideTooltip: {
    display: 'none'
  },

  toggleIcon: {
    color: tokens.colorNeutralForeground2,
    width: '20px',
    height: '20px'
  },

  toggle: {
    width: '42px !important',
    height: '42px !important',
    maxWidth: '42px !important',
    maxHeight: '42px !important',

    ':hover': {
      background: tokens.colorNeutralBackground1Selected
    }
  },

  hideChild: {
    display: 'none'
  },

  drawerBody: {
    overflowX: 'hidden',
    '::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '20px'
    },
    '::-webkit-scrollbar-thumb': {
      width: '4px',
      background: '#898A8B',
      borderRadius: '20px'
    },
    '::-webkit-scrollbar-track': {
      width: '4px',
      borderRadius: '20px'
    }
  },

  drawerFooter: {
    padding: '2px 10px'
  },

  sectionHeader: {
    display: 'block',
    paddingLeft: '12px',
    fontWeight: 600,
    margin: '7px 0'
  },

  hideSection: {
    display: 'none'
  }
})

export type SidebarItem = {
  icon?: Slot<'span'>
  label: string
  key: string
  href?: string
  path?: string
  element?: React.ReactNode
  children?: SidebarItem[]
  isSection?: boolean
}

export type SidebarProps = Partial<NavDrawerProps> & {
  items: SidebarItem[]
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { items } = props
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [menus, setMenus] = useState<SidebarItem[]>(items)
  const styles = useStyles()
  const location = useLocation()
  const [expands, setExpands] = useState<{
    [key: string]: boolean
  }>({})
  const [openNav, setOpenNav] = useState<string>('dashboard')
  const [selectedNav, setSelectedNav] = useState<string>('dashboard')
  const { openSidebar, toggleSidebar } = useApp()
  const toggle = () => {
    toggleSidebar()
  }

  const filterMenu = (menu: SidebarItem[]): SidebarItem[] => {
    return menu.map((item) => {
      return {
        ...item,
        children: filterMenu(item.children || [])
      }
    })
  }

  useEffect(() => {
    setMenus(filterMenu(items))
  }, [])

  useEffect(() => {
    const navPaths = getPathName(location.pathname) || ['dashboard']
    const openNav = navPaths?.[0] || 'dashboard'
    setOpenNav(openNav)
    setSelectedNav(navPaths.length > 1 ? `${openNav}-${navPaths.slice(1).join('-')}` : openNav)
  }, [location.pathname])

  const drawerStyles = mergeClasses(styles.drawer, openSidebar && styles.openDrawer)
  const labelStyles = mergeClasses(styles.label, openSidebar && styles.openLabel)
  const tooltipStyles = mergeClasses(styles.tooltip, openSidebar && styles.hideTooltip)
  const sectionStyles = mergeClasses(styles.hideSection, openSidebar && styles.sectionHeader)

  return (
    <>
      <NavDrawer
        open
        type="inline"
        size="small"
        className={drawerStyles}
        selectedValue={selectedNav}
        id="nav-drawer"
      >
        <NavDrawerHeader>
          <NavDrawerHeaderNav>
            <Tooltip
              content={{ children: 'Expand menu', className: tooltipStyles }}
              positioning="after"
              withArrow
              relationship="label"
            >
              <Button
                appearance="subtle"
                icon={
                  openSidebar ? (
                    <MdMenu className={styles.toggleIcon} />
                  ) : (
                    <MdMenuOpen className={styles.toggleIcon} />
                  )
                }
                onClick={toggle}
                className={styles.toggle}
              />
            </Tooltip>
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody className={styles.drawerBody}>
          {menus.length > 0 &&
            menus.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <NavCategory value={item.key} key={item.key}>
                    <Tooltip
                      content={{
                        children: `Expand ${item.label.toLowerCase()}`,
                        className: tooltipStyles
                      }}
                      relationship="label"
                      positioning="after"
                      withArrow
                    >
                      <NavCategoryItem
                        icon={item.icon}
                        className={mergeClasses(
                          styles.navItem,
                          openNav === item.key && styles.activedNavItem
                        )}
                        expandIcon={{
                          className: labelStyles
                        }}
                        onClick={() => {
                          if (!openSidebar) {
                            toggle()
                          }
                          setSelectedNav('')
                          setOpenNav(openNav === item.key ? '' : item.key)
                          setExpands((prev) => {
                            return {
                              ...prev,
                              [item.key]: !prev[item.key]
                            }
                          })
                        }}
                      >
                        <span className={labelStyles}>{item.label}</span>
                      </NavCategoryItem>
                    </Tooltip>
                    <AnimateHeight duration={200} height={expands[item.key] ? 'auto' : 0}>
                      <div className="fui-NavSubItemGroup">
                        {item.children.map((child) => (
                          <div key={child.key}>
                            {child.href ? (
                              <Link to={child.href} className={styles.link} draggable={false}>
                                <NavSubItem
                                  value={child.key}
                                  className={mergeClasses(
                                    styles.navItem,
                                    selectedNav == child.key && styles.activedNavItem,
                                    !openSidebar && styles.hideChild
                                  )}
                                >
                                  <span className={labelStyles}>{child.label}</span>
                                </NavSubItem>
                              </Link>
                            ) : (
                              <NavSubItem
                                value={child.key}
                                className={mergeClasses(
                                  styles.navItem,
                                  selectedNav === child.key && styles.activedNavItem,
                                  !openSidebar && styles.hideChild
                                )}
                              >
                                <span className={labelStyles}>{child.label}</span>
                              </NavSubItem>
                            )}
                          </div>
                        ))}
                      </div>
                    </AnimateHeight>
                  </NavCategory>
                )
              }

              if (item.isSection) {
                return (
                  <NavSectionHeader key={item.key} className={sectionStyles}>
                    {item.label}
                  </NavSectionHeader>
                )
              }

              return item.href ? (
                <Link to={item.href} className={styles.link} key={item.key} draggable={false}>
                  <Tooltip
                    content={{ children: item.label, className: tooltipStyles }}
                    relationship="label"
                    positioning="after"
                    withArrow
                  >
                    <NavItem
                      as="button"
                      icon={item.icon}
                      value={item.key}
                      className={mergeClasses(
                        styles.navItem,
                        openNav === item.key && styles.activedNavItem
                      )}
                    >
                      <span className={labelStyles}>{item.label}</span>
                    </NavItem>
                  </Tooltip>
                </Link>
              ) : (
                <Tooltip
                  content={{ children: item.label, className: tooltipStyles }}
                  relationship="label"
                  key={item.key}
                  positioning="after"
                  withArrow
                >
                  <NavItem
                    as="button"
                    icon={item.icon}
                    value={item.key}
                    key={item.key}
                    className={mergeClasses(
                      styles.navItem,
                      openNav === item.key && styles.activedNavItem
                    )}
                  >
                    <span className={labelStyles}>{item.label}</span>
                  </NavItem>
                </Tooltip>
              )
            })}
        </NavDrawerBody>
        <NavDrawerFooter className={styles.drawerFooter}>
          {isAuthenticated ? (
            <UserMenu labelStyles={labelStyles} />
          ) : (
            <Link to={`/login`} className={styles.link} draggable={false}>
              <NavItem icon={<MdOutlineAccountCircle />} value="login" className={styles.navItem}>
                <span className={labelStyles}>Login</span>
              </NavItem>
            </Link>
          )}
          <Link to={`${APP_PREFIX_PATH}/app-setting`} className={styles.link} draggable={false}>
            <NavItem
              icon={<TbAdjustmentsCog />}
              value="app-setting"
              className={mergeClasses(
                styles.navItem,
                openNav === 'app-setting' && styles.activedNavItem
              )}
            >
              <span className={labelStyles}>App Setting</span>
            </NavItem>
          </Link>
        </NavDrawerFooter>
      </NavDrawer>
    </>
  )
}

export default Sidebar
