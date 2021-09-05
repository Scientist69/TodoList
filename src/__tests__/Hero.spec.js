import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Hero } from '../Hero';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        auth: jest.fn(() => ({
            signOut: jest.fn(),
        })),
    },
}));

describe('<Hero />', () => {
    it('renders the application', () => {
        const { queryByTestId, debug } = render(<Hero />);
        expect(queryByTestId('application')).toBeTruthy();
    });

    it('renders the application using dark mode', () => {
        const { queryByTestId, debug } = render(<Hero darkmodeDefault />);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy;
    });
});