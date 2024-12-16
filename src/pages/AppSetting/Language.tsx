import InlineCard from '@components/InlineCard'
import Select from '@components/Select'
import { Text, makeStyles } from '@fluentui/react-components'
import { ChevronDownRegular, LocalLanguageRegular } from '@fluentui/react-icons'
import { useState } from 'react'

const LANGUAGE_OPTIONS = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Vietnamese',
    value: 'vn'
  }
]

const useStyles = makeStyles({
  languageLabel: {
    display: 'flex',
    alignItems: 'center'
  },

  languageLabelText: {
    marginRight: '10px'
  },

  radio: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  }
})

const LanguageSetting = () => {
  const styles = useStyles()

  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value)

  const LanguageOptions = () => {
    return (
      <Select
        label={
          <div className={styles.languageLabel}>
            <Text className={styles.languageLabelText}>
              {LANGUAGE_OPTIONS.find((item) => item.value === language)?.label}
            </Text>
            <ChevronDownRegular />
          </div>
        }
        options={LANGUAGE_OPTIONS}
        onOptionClick={(value) => setLanguage(value)}
      />
    )
  }

  return (
    <InlineCard
      title="Language"
      description="Set your prefered language for UI"
      icon={<LocalLanguageRegular />}
      content={<LanguageOptions />}
    />
  )
}

export default LanguageSetting
