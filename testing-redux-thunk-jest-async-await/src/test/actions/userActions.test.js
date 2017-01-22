import axios from 'axios';

import { loginButtonPressed } from '../../main/actions/userActions';
import { LoginType } from '../../main/actions/ActionTypes';

describe('userActions', () => {
    it('Login successful, creates AUTHENTICATION_PENDING and AUTHENTICATION_SUCCESS', async () => {
        // prepare
        const expected = [
            { type: LoginType.AUTHENTICATION_PENDING },
            { type: LoginType.AUTHENTICATION_SUCCESS }
        ];

        // mock the axios.post method, so it will just resolve the Promise.
        axios.post = jest.fn((url) => {
            return Promise.resolve();
        });
        // mock the dispatch and getState functions from Redux thunk.
        const dispatch = jest.fn(),
            getState = jest.fn(() => {url: 'https://endpoint.local'});

        // execute
        await loginButtonPressed('test_user', 'test_password')(dispatch, getState);

        // verify
        expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    });

    it('Login failed, creates AUTHENTICATION_PENDING and AUTHENTICATION_FAILED', async () => {
        // prepare
        const expected = [
            { type: LoginType.AUTHENTICATION_PENDING },
            { type: LoginType.AUTHENTICATION_FAILED }
        ];

        // another way of writing the Promise. The Promise is rejected after a timeout of 1 second.
        axios.post = jest.fn((url) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject();
                }, 1000);
            });
        });
        const dispatch = jest.fn(),
            getState = jest.fn(() => {url: 'https://endpoint.local'});

        // execute
        await loginButtonPressed('test_user', 'test_password')(dispatch, getState);

        // verify
        expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    });
});