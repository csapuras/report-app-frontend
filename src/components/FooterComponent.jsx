import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';

export default function FooterComponent ({ path }) {
  const $persistentAuthState = useStore(persistentAuthState); 
  console.log("FooterComponent", $persistentAuthState);

  const hideLoginLink = path === "/login";
  const isLoggedIn  = $persistentAuthState.isLoggedIn;
  
  const logout = () => {
    persistentAuthState.setKey('isLoggedIn', false);
    persistentAuthState.setKey('token', null);
    persistentAuthState.setKey('username', null);
  }

  const logClass = "text-2xl text-gray-100 hover:text-gray-700 py-10";
  
  return (
  <> 
    <div className="footer-container p-4 text-center fixed inset-x-0 bottom-0">
      {/* <p className="py-10">{ hideLoginLink ? "" : isLoggedIn ?
        <a onClick={logout} href="#" className={logClass}>Logout</a> : 
        <a href="/login" className={logClass}>Login</a>
      }</p> */}

      <p className="text-sm text-gray-500">© 2026 Valentia Lab. All rights reserved.</p>
    </div>
  </>  
  )
}