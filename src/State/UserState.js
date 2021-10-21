import { makeVar } from '@apollo/client';

const emptyUserState =
{
    loggedin: false,
    googleId: '',
    number: null,
    _id: ''
};

export const globalState = makeVar(emptyUserState);