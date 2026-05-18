import { useStore } from '@nanostores/react';
import { authState } from '../mainStore';

export default function FooterComponent ({ path }) {
  const $authState = useStore(authState); 
  console.log("FooterComponent rendered with path:", path);
  console.log("User logged in:", ($authState.isLoggedIn ? "Yes" : "No"));
  const hideLoginLink = path === "/login" || ($authState.isLoggedIn && path === "/dashboard");
  
  return (
  <> 
    <div className="footer-container p-4 text-center">
      { hideLoginLink ? null : <a href="/login" className="text-2xl text-sm text-gray-100 hover:text-gray-700">Login</a>}
      <p className="text-sm text-gray-500">© 2026 Valentia Lab. All rights reserved.</p>
    </div>
  </>  
  )
}