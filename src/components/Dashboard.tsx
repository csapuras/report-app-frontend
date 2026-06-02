import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore.js';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import Reports from './Reports.js';

export default function Dashboard ({ path }: { path: string }) {
    const $persistentAuthState = useStore(persistentAuthState); 
    console.log("Dashboard:", $persistentAuthState);
    const hideLoginLink:boolean = (path === "/login");
    const isLoggedIn  = $persistentAuthState.isLoggedIn;
    const user = $persistentAuthState.username || "Unknown User";
    
    const logout = () => {
        persistentAuthState.setKey('isLoggedIn', false);
        persistentAuthState.setKey('token', "");
        persistentAuthState.setKey('username', "");
    }

  const logClass = "text-2xl text-(--text-on-dominant) hover:border-b-1 hover:border-(--color-accent) my-10 p-2";

    return (
        <>
        <div>
            <p className="py-5">{ hideLoginLink ? "" : isLoggedIn ?
                <a onClick={logout} href="#" className={logClass}>Logout <span className="text-(--link-color)">@{user}</span></a> : 
                <a href="/login" className={logClass}>Login</a>
            }</p>
            <Reports />
        </div>
        </> 
    );
}