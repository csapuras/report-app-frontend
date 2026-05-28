import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore.js';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import Reports from './Reports.js';

export default function Dashboard () {
    const $persistentAuthState = useStore(persistentAuthState); 
    console.log("Dashboard:", $persistentAuthState);
    const name = $persistentAuthState.username || "Unknown User";

    return (
        <>
        <div>
            <h1>Welcome to the Dashboard, <span className="text-yellow-500">{name}</span>!</h1>
            <p>This is a protected page that only authenticated users can access.</p>
            <Reports />
        </div>
        </> 
    );
}