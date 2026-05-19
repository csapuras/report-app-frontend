import { useActionState, useEffect} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions, type SafeResult } from 'astro:actions';
import { persistentAuthState } from '../mainStore';
import { navigate } from "astro:transitions/client";
import { useStore } from '@nanostores/react';

export default function LoginForm() {
  const $persistentAuthState = useStore(persistentAuthState);
  console.log("LoginForm", $persistentAuthState);

  const [result, formAction, isPending ] = useActionState(
    withState(actions.login),
    {   isLoggedIn: false, token: null, username:null, error: null }
  );

  useEffect(() => {
    persistentAuthState.setKey('isLoggedIn', result?.data?.success || false);
    persistentAuthState.setKey('token', result?.data?.token || "");
    persistentAuthState.setKey('username', result?.data?.username || "");

    if(result?.data?.success) {
      navigate('/dashboard');
    }

  }, [result]);
  return (
    <>
        <form method="POST" action={formAction}>
          <label>
            Username:
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


