import AsyncRoute from 'preact-async-route';
import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from './assets/vite.svg'
import './app.css'
import { getConfig } from './Helpers/AppHelpers'
import Header from './components/header'
import Router from 'preact-router'
import Home from './routes/home'
import Profile from './routes/profile'
import Loading from './components/loading';

/**
    arguments passed to getComponent:
      url -- matched url
      cb  -- in case you are not returning a promise
      props -- props that component will recive upon being loaded
  */
const getProfile = function (url: any, cb: any, props: any) {
    return import('./routes/profile').then(module => module.default);
}

export function App() {
    const [count, setCount] = useState(0)
    const appRouteInfo = {
        currentUrl: '/'
    }

    const handleRoute = (actionData: any) => {
        appRouteInfo.currentUrl = actionData.url
    };

    return (
        <>
            <Header />
            <Router>
                <Home path="/" />
                <AsyncRoute
                    path="/profile" user="Me"
                    getComponent={() => import('./routes/profile').then(module => module.default)}
                />
                <AsyncRoute path="/profile/:user" getComponent={getProfile}
                    // loading={()=>{return <Loading/>}} // Works
                    loading={() => <div>loading...</div>}
                />
                <AsyncRoute
                    path="/friends/:id"
                    getComponent={() => import('./routes/profile').then(module => module.default)}
                    loading={() => <div>loading...</div>}
                />
            </Router>


            {/* <Router onChange={handleRoute}>
                <Home path="/" />
                <Profile path="/profile/" user="me" />
                <Profile path="/profile/:user" />
            </Router> */}
        </>
    )
}
