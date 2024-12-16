import type { DropdownProps, TagGroupProps } from '@fluentui/react-components'
import {
  Dropdown,
  makeStyles,
  mergeClasses,
  Option,
  Tag,
  TagGroup,
  tokens
} from '@fluentui/react-components'

export interface Option {
  label: string
  value: string
}

export interface ComboBoxProps extends Partial<DropdownProps> {
  id: string
  label?: string
  options: Option[]
  values: string[]
  setValues: (options: string[]) => void
}

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
  },

  dropdown: {
    width: '100%',
    borderBottomColor: tokens.colorNeutralStroke1,

    ':hover': {
      borderBottomColor: tokens.colorNeutralStroke1Hover
    }
  },

  option: {
    fontSize: '1rem',
    margin: '3px 0'
  },

  checkedOption: {
    background: tokens.colorNeutralBackground1Hover
  },

  optionCheckbox: {
    width: '18px',
    height: '18px',
    marginRight: '3px',
    border: `1px solid ${tokens.colorNeutralStroke1} !important`
  },

  dismissIcon: {
    marginLeft: '5px'
  },

  tagGroup: {
    flexWrap: 'wrap',
    gap: '8px'
  }
})

const ComboBox = (props: ComboBoxProps) => {
  const { id, label, placeholder, options, values, setValues } = props

  const styles = useStyles()

  const handleSelect: (typeof props)['onOptionSelect'] = (_ev, data) => {
    setValues(data.selectedOptions)
  }

  const handleRemove: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setValues([...values].filter((tag) => tag !== value))
  }

  return (
    <div className={styles.root}>
      {label && <label id={id}>{label}</label>}
      <Dropdown
        aria-labelledby={id}
        multiselect={true}
        placeholder={placeholder}
        onOptionSelect={handleSelect}
        selectedOptions={values}
        className={styles.dropdown}
        button={
          values.length > 0 ? (
            <TagGroup size="small" dismissible onDismiss={handleRemove} className={styles.tagGroup}>
              {values.map((item) => (
                <Tag
                  dismissible
                  dismissIcon={{
                    'aria-label': 'remove',
                    className: styles.dismissIcon
                  }}
                  value={item}
                  key={item}
                >
                  {options.find((option) => option.value === item)?.label}
                </Tag>
              ))}
            </TagGroup>
          ) : undefined
        }
        {...props}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            className={mergeClasses(
              styles.option,
              values.includes(option.value) && styles.checkedOption
            )}
            checkIcon={{
              className: styles.optionCheckbox
            }}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
    </div>
  )
}

export default ComboBox
