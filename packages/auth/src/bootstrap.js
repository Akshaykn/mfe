import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { createMemoryHistory } from 'history';
import { createBrowserHistory } from 'history/cjs/history.min';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);
    return {
        onParentNavigate: ({ pathname: nextPathname }) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById("_auth-dev-root");
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };