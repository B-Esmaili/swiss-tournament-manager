// import original module declarations
import { ThemeType } from 'grommet';
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
      validation : {
         color: string
      }  
  }
}