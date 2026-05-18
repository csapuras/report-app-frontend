import { atom } from 'nanostores';
import { persistentMap } from '@nanostores/persistent'


export const current_lat = atom(false);
export const current_lng = atom(false);

export const persistentAuthState = persistentMap('authState', {
    isLoggedIn: false,
    token: null,
    username: null,
});
