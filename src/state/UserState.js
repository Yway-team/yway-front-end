import { makeVar } from '@apollo/client';

const emptyUserState =
{
    _id: "",
};


export const globalState = makeVar(emptyUserState);

export const globalLoggedIn = makeVar(false);

export const loggedInChanged = makeVar(false);

