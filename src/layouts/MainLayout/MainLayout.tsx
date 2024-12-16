import { generate } from '@ant-design/colors'
import { useApp } from '@contexts/AppContext'
import {
  BrandVariants,
  FluentProvider,
  Theme,
  createDarkTheme,
  createLightTheme,
  makeStyles,
  tokens
} from '@fluentui/react-components'
import Header from '@layouts/Header'
import { useAppSelector } from '@redux/hooks'
import { isDarkMode } from '@redux/reducers/appSlice'
import { ConfigProvider, theme } from 'antd'
import React from 'react'

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralBackground4,
    display: 'flex'
  }
})

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { children } = props
  const styles = useStyles()
  const { appColor } = useApp()
  const { themeMode } = useAppSelector((state) => state.app)
  const darkMode = isDarkMode(themeMode)

  const colors = generate(appColor)

  const myLightTheme: BrandVariants = {
    10: colors[9],
    20: colors[8],
    30: colors[7],
    40: colors[6],
    50: colors[6],
    60: colors[6],
    70: colors[4],
    80: colors[5],
    90: colors[4],
    100: colors[3],
    110: colors[2],
    120: colors[1],
    130: colors[0],
    140: colors[0],
    150: colors[0],
    160: colors[0]
  }

  const myDarkTheme: BrandVariants = {
    10: colors[9],
    20: colors[8],
    30: colors[7],
    40: colors[7],
    50: colors[6],
    60: colors[6],
    70: colors[6],
    80: colors[5],
    90: colors[4],
    100: colors[3],
    110: colors[2],
    120: colors[1],
    130: colors[0],
    140: colors[0],
    150: colors[0],
    160: colors[0]
  }

  const lightTheme: Theme = {
    ...createLightTheme(myLightTheme),
    colorNeutralBackground4: '#f0f4f9',
    colorNeutralBackground2: '#F7F9FC',
    colorNeutralBackground1Selected: '#E6EAF0',
    colorNeutralStroke1: '#E5E6E9',
    colorNeutralStroke2: '#F2F3F4',
    colorNeutralStroke3: '#F2F3F4',
    colorNeutralForeground2: '#000000',
    colorNeutralForeground1: '#000000',
    colorNeutralBackground3: '#FEFEFF',
    colorNeutralBackground3Hover: '#f9f9f9',
    colorNeutralBackground6: '#f3f5f7', // for card
    borderRadiusMedium: '0px',
    fontFamilyBase: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, sans-serif',
    colorNeutralCardBackground: '#FCFDFE',
    colorNeutralCardBackgroundSelected: '#E6EAF0',
    colorBrandBackgroundStatic: '#ffffff',
    colorBrandBackground2: '#f2f2f2',
    colorBrandBackground3Static: '#000000',
    colorBrandBackground4Static: '#4B5563',
    colorCompoundBrandBackground: '#fefefe',
    colorCompoundBrandBackgroundHover: '#f4f4f4',
    colorBackgroundOverlay: 'rgba(200, 200, 200, 0.5)',
    colorNeutralBackground5: '#f3f4f6',
    colorNeutralBackground5Hover: '#E6EAF0',
    colorNeutralBackground5Selected: '#bae0ff',
    shadow4Brand: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 2px inset, #1890ff 0px 0px 0px 2px'
  }

  const darkTheme: Theme = {
    ...createDarkTheme(myDarkTheme),
    colorNeutralBackground4: '#202020',
    colorNeutralBackground2: '#272727',
    colorNeutralBackground1Selected: '#282828',
    colorNeutralStroke1: '#424242',
    colorNeutralStroke2: 'rgb(32 32 32)',
    colorNeutralStroke3: '#282828',
    colorNeutralBackground3: '#373737', // for button
    colorNeutralBackground3Hover: '#464545', // for button
    colorNeutralStroke1Hover: '#424242',
    colorNeutralForeground2: '#ffffff',
    colorNeutralBackground6: '#1a1a1a', // for card
    borderRadiusMedium: '0px',
    fontFamilyBase: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, sans-serif',
    colorNeutralCardBackground: '#202020',
    colorNeutralCardBackgroundSelected: '#282828',
    colorBrandBackgroundStatic: '#252525',
    colorBrandBackground2: '#1E1E1E',
    colorBrandBackground3Static: '#ffffff',
    colorBrandBackground4Static: '#bebebe',
    colorCompoundBrandBackground: '#1e1e1e',
    colorCompoundBrandBackgroundHover: '#434343',
    colorBackgroundOverlay: 'rgba(60, 60, 60, 0.5)',
    colorNeutralBackground5: '#373737',
    colorNeutralBackground5Hover: '#464545',
    colorNeutralBackground5Selected: '#202020',
    shadow4Brand: 'rgb(39 39 39) 0px 0px 0px 2px inset, #1890ff 0px 0px 0px 2px'
  }

  return (
    <FluentProvider theme={darkMode ? darkTheme : lightTheme}>
      <ConfigProvider
        theme={{
          algorithm: [darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm],
          token: {
            colorPrimary: appColor,
            borderRadius: 0,
            colorBgBase: darkMode ? '#101010' : '#ffffff',
            padding: 10
          },
          components: {
            Divider: {
              margin: 0
            },
            Table: {
              headerBg: darkMode ? '#252523' : '#fafafa'
            },
            Button: {
              primaryShadow: 'none'
            },
            Input: {
              activeShadow: 'none'
            },
            Tabs: {
              itemSelectedColor: darkMode ? '#ffffff' : '#000000',
              itemHoverColor: darkMode ? '#ffffff' : '#000000'
            },
            Select: {
              optionSelectedBg: darkMode ? '#1f1f1f' : 'rgba(0, 0, 0, 0.04)'
            }
          }
        }}
      >
        <div className={styles.root}>
          <Header />
          {children}
        </div>
      </ConfigProvider>
    </FluentProvider>
  )
}

export default MainLayout
