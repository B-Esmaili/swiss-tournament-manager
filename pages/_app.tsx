import App from 'next/app'
import { Grommet } from 'grommet';
import {FabricTheme} from 'themes/fabric';
import { AppContextProvider } from 'context/app-context';
import {initDb} from '../db';

initDb();

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Grommet theme={FabricTheme}>
        <AppContextProvider>
           <Component {...pageProps} />
        </AppContextProvider>
      </Grommet>
    )
  }
}