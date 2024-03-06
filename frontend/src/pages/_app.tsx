import '../styles/globals.css'

interface Props {
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }:Props) {
  return <Component {...pageProps} />
}