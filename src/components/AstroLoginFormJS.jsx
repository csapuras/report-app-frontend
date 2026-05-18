import { useActionState, useEffect, startTransition} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions } from 'astro:actions';
import { useStore } from '@nanostores/react';
import { isLoggedIn, token } from '../mainStore';


export default function AstroLoginFormJS() {
  const [result, action, isPending] = useActionState(
    withState(actions.login),
    {   success: null, token: null, error: null }
  );
  

  useEffect(() => {
    console.log('Login result updated:', result);
    // isLoggedIn.set(result?.data?.success || false);
    // token.set(result?.data?.token || null);

    // console.log("isLoggedIn:", useStore(isLoggedIn));
    // console.log("token:", useStore(token));
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


