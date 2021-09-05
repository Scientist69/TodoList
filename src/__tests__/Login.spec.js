import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Login } from '../Login';

beforeEach(cleanup);

describe('<Login />', () => {
    it('renders the application', () => {
        const { queryByTestId, debug } = render(<Login />);
        expect(queryByTestId('login')).toBeTruthy();
    });

    it('renders the application using prop', () => {
        const { queryByTestId} = render(<Login props />);
        expect(queryByTestId('login')).toBeTruthy();
    });

    it('renders the application using prop', () => {
        const { queryByTestId} = render(<Login  />);
        expect(queryByTestId('btnContainer')).toBeTruthy();
        fireEvent.change(queryByTestId('btnContainer'));
    });

    it('renders the application using prop', () => {
        const { queryByTestId} = render(<Login  />);
        expect(queryByTestId('loginContainer')).toBeTruthy();
        
        fireEvent.change(queryByTestId('loginContainer'));
    });


});