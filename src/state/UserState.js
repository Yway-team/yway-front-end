import { makeVar } from '@apollo/client';

const emptyUserState =
{
    loggedin: false,
};

export const globalState = makeVar(emptyUserState);