import { render } from '../../test-utils'
import Home from 'pages/index'

describe('Home page', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Home />, {})
        expect(asFragment()).toMatchSnapshot()
    });
})