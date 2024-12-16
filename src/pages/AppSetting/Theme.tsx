import AccordionCard from '@components/AccordionCard'
import { Radio, RadioGroup, makeStyles } from '@fluentui/react-components'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { ThemeMode, setThemeMode } from '@redux/reducers/appSlice'
import { PiPaintBrushBroadBold } from 'react-icons/pi'

const THEME_OPTIONS = [
  {
    label: 'Light',
    value: 'light'
  },
  {
    label: 'Dark',
    value: 'dark'
  },
  {
    label: 'Use system setting',
    value: 'system'
  }
]

const useStyles = makeStyles({
  radio: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  }
})

const ThemeSetting = () => {
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector((state) => state.app)

  const handleSetMode = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode))
  }

  const ThemeOptions = () => {
    return (
      <RadioGroup value={themeMode} onChange={(_, data) => handleSetMode(data.value as ThemeMode)}>
        {THEME_OPTIONS.map((item) => (
          <Radio value={item.value} label={item.label} key={item.value} className={styles.radio} />
        ))}
      </RadioGroup>
    )
  }

  return (
    <AccordionCard
      title="Application theme"
      description="Change the appearance of your application"
      value={THEME_OPTIONS.find((item) => item.value === themeMode)?.label}
      icon={<PiPaintBrushBroadBold />}
    >
      <ThemeOptions />
    </AccordionCard>
  )
}

export default ThemeSetting
