import { useStore } from '@nanostores/react';
import { isLoggedIn } from '../mainStore';

export default function FooterComponent ({ path }) {
  console.log("FooterComponent rendered with path:", path);
  console.log("User logged in:", useStore(isLoggedIn));
  const hideLoginLink = path === "/login" || useStore(isLoggedIn);
  
  return (
  <>
    <div className="footer-container p-4 text-center">
      { hideLoginLink ? null : <a href="/login" className="text-2xl text-sm text-gray-100 hover:text-gray-700">Login</a>}
      <p className="text-sm text-gray-500">© 2026 Valentia Lab. All rights reserved.</p>
    </div>
  </>  
  )
}