import React from "react"
import { IntlProvider} from "react-intl"

import messages_ko from "../../assets/data/locales/kr.json"
import messages_en from "../../assets/data/locales/en.json"
import messages_de from "../../assets/data/locales/de.json"
import messages_fr from "../../assets/data/locales/fr.json"
import messages_pt from "../../assets/data/locales/pt.json"



const menu_messages = {
  ko: messages_ko,
  en: messages_en,
  de: messages_de,
  fr: messages_fr,
  pt: messages_pt
}

const Context = React.createContext()

class IntlProviderWrapper extends React.Component {
  state = {
    locale: "ko",
    messages: menu_messages["ko"]
  }

  // state = {
  //   locale: "en",
  //   messages: menu_messages["en"]
  // }

  render() {
    const { children } = this.props
    const { locale, messages } = this.state
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: language => {
            this.setState({
              locale: language,
              messages: menu_messages[language]
            })
          }
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="ko"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    )
  }
}

export { IntlProviderWrapper, Context as IntlContext }
