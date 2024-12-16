import { getRoutes } from '@configs/sidebar'
import MainLayout from '@layouts/MainLayout'
import { useAppSelector } from '@redux/hooks'
import { Navigate, useRoutes } from 'react-router-dom'
import PageError from './Error'
import PageLogin from './Login'
import PageView from './View'
import { APP_PREFIX_PATH } from '@configs/index'

const View = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const appRouting = isAuthenticated
    ? useRoutes(getRoutes())
    : useRoutes([
        {
          path: '/',
          element: <Navigate to={APP_PREFIX_PATH} />
        },
        {
          path: '/login',
          element: <PageLogin />
        },
        {
          path: '/exception',
          element: <PageError />
        },
        {
          path: '/v/:slug',
          element: <PageView />
        },
        {
          path: '*',
          element: <PageLogin />
        }
      ])

  return <MainLayout>{appRouting}</MainLayout>
}

export default View
