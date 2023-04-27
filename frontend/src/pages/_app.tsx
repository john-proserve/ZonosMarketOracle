import '@zonos/amino/reset.css'
import '@zonos/amino/theme.css'
import '@zonos/amino/amino.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
