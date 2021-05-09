import { render } from '@testing-library/react'


const Providers = ({ children }: { children: any }) => {
  return children
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

export interface customeRenderProps {
  ui: any,
  options: any
}

const customRender = (ui: React.ReactElement<any>, options: any) => {
  return render(ui, { wrapper: Providers, ...options })
}
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }