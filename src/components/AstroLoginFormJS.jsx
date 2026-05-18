import { useActionState, useEffect, startTransition} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions } from 'astro:actions';
import { authState } from '../mainStore';
import { navigate } from "astro:transitions/client";
import { useStore } from '@nanostores/react';

export default function AstroLoginFormJS() {
  const [result, action, isPending] = useActionState(
    withState(actions.login),
    {   success: null, token: null, error: null }
  );

  const $authState = useStore(authState);
  

  useEffect(() => {
    console.log('Login result:', result);
    authState.set({
      isLoggedIn: result?.data?.success || false,
      token: result?.data?.token || null,
    });

    if(result?.data?.success) {
      navigate('/dashboard');
    }

  }, [result]);
  return (
    <>
        <form method="POST" action={action}>
          <label>
            Email:
            <input type="text" name="username" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
        
          
          <button type="submit">Log In</button>
        </form>
    </>
  )
}


