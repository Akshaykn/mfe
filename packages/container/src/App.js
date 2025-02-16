import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));

export default () => {
    const [isSignin, setIsSignedIn] = useState(false);
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header isSignin={isSignin} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={LazyMarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>);
}