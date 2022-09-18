import { Provider } from '@preact/prerender-data-provider';

export default class App extends Component {
    // ...
    render(props) {
        // https://preactjs.com/guide/v10/cli/pre-rendering/
        return (
            <Provider value={props}>
            // restante do seu aplicativo aqui!
            </Provider>
        )
    }
}
