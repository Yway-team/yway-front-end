import { makeVar } from '@apollo/client';

const emptyUserState =
{
    loggedin: false,
    googleId: '',
    _id: ''
};

export const globalState = makeVar(emptyUserState);