import Container from '@layouts/Container'
import LanguageSetting from './Language'
import ThemeSetting from './Theme'

const PageAppSetting = () => {
  return (
    <>
      <Container>
        <ThemeSetting />
        <LanguageSetting />
      </Container>
    </>
  )
}

export default PageAppSetting
