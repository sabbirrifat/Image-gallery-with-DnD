import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


export const renderWithRedux = (component, reducer) => {
    const store = createStore(reducer, applyMiddleware(thunk));
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}