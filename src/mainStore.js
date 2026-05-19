import { persistentMap } from '@nanostores/persistent'

export const persistentAuthState = persistentMap('authState', {
    isLoggedIn: false,
    token: null,
    username: null,
    lat: 0,
    lng: 0,
});
