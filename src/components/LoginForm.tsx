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
    {   
      data: { success:false, token: "", username:""},
      error: undefined
    },
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
        <form method="POST" action={formAction} className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
          <div>
            <input className="text-md mt-2 p-2 w-full rounded-lg focus:border-1 border-1 border-(--color-secondary) focus:border-(--color-accent) focus:outline-none" type="text" placeholder="Username" name="username" required />
          </div>
          <div>
            <input className="text-md mt-2 p-2 w-full rounded-lg focus:border-1 border-1 border-(--color-secondary) focus:border-(--color-accent) focus:outline-none" type="password" placeholder="Password" name="password" required />
          </div>
          <button className="text-lg block w-full rounded-lg border border-(--color-accent) bg-(--color-accent) px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-(--link-color)" type="submit">
            Log In
          </button>
        </form>
    </>
  )
}