import { makeVar } from '@apollo/client';

const emptyUserState =
{
    loggedin: false,
    googleId: '',
    numbers: null,
    _id: ''
};

export const globalState = makeVar(emptyUserState);