import { useStore } from '@nanostores/react';
import { authState } from '../mainStore.js';


export default function Dashboard() {
    const $authState = useStore(authState); 

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <p>This is a protected page that only authenticated users can access.</p>
            <p>Your token: {$authState.token}</p>
        </div>
    );
}