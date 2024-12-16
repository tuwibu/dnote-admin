import { UserOutlined } from '@ant-design/icons'
import AppLayout from '@layouts/AppLayout'
import { SidebarItem } from '@layouts/Sidebar'
import PageAppSetting from '@pages/AppSetting'
import PageDashboard from '@pages/Dashboard'
import PageError from '@pages/Error'
import PageNote from '@pages/Note'
import PageUser from '@pages/User'
import PageView from '@pages/View'
import { MdOutlineEventNote, MdOutlineSpaceDashboard } from 'react-icons/md'
import { Navigate, RouteObject } from 'react-router-dom'
import { APP_PREFIX_PATH } from '.'

export const sidebarItems: SidebarItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: APP_PREFIX_PATH,
    path: '',
    icon: <MdOutlineSpaceDashboard />,
    element: <PageDashboard />
  },
  {
    key: 'resource-section',
    label: 'Resource',
    isSection: true
  },
  {
    key: 'note',
    label: 'Note',
    href: `${APP_PREFIX_PATH}/note`,
    path: 'note',
    icon: <MdOutlineEventNote />,
    element: <PageNote />
  },
  {
    key: 'user',
    label: 'User',
    href: `${APP_PREFIX_PATH}/user`,
    path: 'user',
    icon: <UserOutlined />,
    element: <PageUser />
  }
]

const toRoutes = (menu: SidebarItem[]): RouteObject[] => {
  return menu
    .filter((item) => {
      return !item.isSection
    })
    .map((item) => {
      const { label, ...rest } = item
      const convertedItem: any = {
        element: rest.element,
        path: rest.path,
        index: item.key.toString().includes('item') ? true : false,
        children: rest.children ? toRoutes(rest.children) : undefined
      }

      return convertedItem
    })
}

export const getRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = toRoutes(sidebarItems)
  return [
    {
      path: '/',
      element: <Navigate to={APP_PREFIX_PATH} />
    },
    {
      path: '/login',
      element: <Navigate to={APP_PREFIX_PATH} />
    },
    {
      path: '/*',
      element: <Navigate to={'/error'} />
    },
    {
      path: '/error',
      element: <PageError />
    },
    {
      path: '/view/:slug',
      element: <PageView />
    },
    {
      path: APP_PREFIX_PATH,
      element: <AppLayout />,
      children: [
        ...routes,
        {
          path: 'app-setting',
          element: <PageAppSetting />
        },
        {
          path: '*',
          element: <Navigate to={'/error'} />
        }
      ]
    }
  ]
}
