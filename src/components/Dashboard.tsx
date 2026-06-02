import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore.js';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import Reports from './Reports.js';

export default function Dashboard () {
    const $persistentAuthState = useStore(persistentAuthState); 
    console.log("Dashboard:", $persistentAuthState);

    return (
        <>
        <div>
            <Reports />
        </div>
        </> 
    );
}