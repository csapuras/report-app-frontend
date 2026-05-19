import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore.js';


export default function Dashboard() {
    const $persistentAuthState = useStore(persistentAuthState); 
    console.log("Dashboard:", $persistentAuthState);
    const name = $persistentAuthState.username || "User";

    return (
        <>
        <div>
            <h1>Welcome to the Dashboard, {name}!</h1>
            <p>This is a protected page that only authenticated users can access.</p>
        </div>
        </> 
    );
}