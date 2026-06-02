import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';

export default function FooterComponent () {
  
  return (
  <> 
    <div className="footer-container p-2 text-center fixed inset-x-0 bottom-0 bg-(--color-dominant) border-t-1 border-solid border-(--color-secondary)">
      <p className="text-sm text-(--text-on-dominant)">© 2026 Valentia Lab. All rights reserved.</p>
    </div>
  </>  
  )
}