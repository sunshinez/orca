import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { applyDocumentTheme } from './lib/document-theme'
import { initI18n } from './i18n'

if (import.meta.env.DEV) {
  import('react-grab').then(({ init }) => init())
  import('react-grab/styles.css')
}

applyDocumentTheme('system', { disableTransitions: false })

const i18n = initI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
)
