import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nabvar from './components/navbar';
import injectContext from './store/appContext';
import Home from './views/home';
import Login from './views/login';
import NotFound from './views/notfound';

function App() {
    return (
        <BrowserRouter>
            <Nabvar />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(App);