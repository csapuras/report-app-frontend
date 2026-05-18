import { persistentMap } from '@nanostores/persistent'


export const persistentAuthState = persistentMap('authState', {
    isLoggedIn: false,
    token: null,
    username: null,
    lat: null,
    lng: null,
});
