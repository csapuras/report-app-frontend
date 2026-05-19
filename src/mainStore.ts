import { persistentMap } from '@nanostores/persistent'

interface AuthState {
    [key: string]: any;  // TODO
    isLoggedIn: boolean;
    token: string;
    username: string;
    lat: string;
    lng: string;
    error: string;
}
export const persistentAuthState =  persistentMap<AuthState>('authState', {
    isLoggedIn: false,
    token: "",
    username: "",
    lat: "",
    lng: "",
    error: ""
});

