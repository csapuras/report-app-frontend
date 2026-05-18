import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent'


export const current_lat = atom(false);
export const current_lng = atom(false);

export const authState = atom({
    isLoggedIn: false,
    token: null,
});
