import PopAlert from './PopAlert';
import {fireEvent, render, cleanup} from '@testing-library/react';
import {createStore} from 'redux';
import React from 'react';
import { Provider } from 'react-redux';


const startingState = { 
    canvas: {
        alertMessage: 'this is where we all came from'
    }
};
const reducer = (state= startingState, action) => {
    switch (action.type) {
        case 'UPDATE_ALERT':
            return {
                ...state,
                canvas : { alertMessage: action.payload}
            }
    
        default:
            return state;
    }
}

const renderWithRedux = ( component, {initalState, store=createStore(reducer, initalState) } ={}) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    };
}

describe('Pop Alert', ()=> {
    afterEach(cleanup);

    it('should match snapshot', () => {
        expect(renderWithRedux(<PopAlert />)).toMatchSnapshot();
    })

    it('should show the alert text', ()=> {
        const {getByText} = renderWithRedux(<PopAlert />);
        const alertText = getByText('this is where we all came from');
        expect(alertText).not.toBeNull();
    })
    
    
    it('should update the alert text', ()=> {
        const {getByText} = renderWithRedux(<PopAlert />);
        const alertButton = getByText('click me');
        fireEvent.click(alertButton);
        const alertText = getByText('its me mario');
        expect(alertText).not.toBeNull();
    })
})















