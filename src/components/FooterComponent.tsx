import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';

export default function FooterComponent ({ path }: { path: string }) {
    const $persistentAuthState = useStore(persistentAuthState); 
    console.log("Dashboard:", $persistentAuthState);
    const hideLoginLink:boolean = (path === "/login");
    const isLoggedIn:boolean  = $persistentAuthState.isLoggedIn === 'true';
    const user = $persistentAuthState.username || "Unknown User";
    
    const logout = () => {
        persistentAuthState.setKey('isLoggedIn', false);
        persistentAuthState.setKey('token', "");
        persistentAuthState.setKey('username', "");
    }

  const logClass = "text-md text-(--text-on-dominant) hover:border-b-1 hover:border-(--color-accent) my-10 p-2";
  return (
  <> 
    <div className="footer-container p-2 text-center fixed inset-x-0 bottom-0 bg-(--color-dominant) border-t-1 border-solid border-(--color-secondary)">
      <div>
          <p className="py-2">{ hideLoginLink ? "" : isLoggedIn ?
                <a onClick={logout} href="#" className={logClass}>Logout <span className="text-(--link-color)">@{user}</span></a> : 
                <a href="/login" className={logClass}>Login</a>
            }</p>
      </div>
      <p className="text-sm text-(--text-on-dominant)">© 2026 Valentia Lab. All rights reserved.</p>
    </div>
  </>  
  )
}