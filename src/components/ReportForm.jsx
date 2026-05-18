
import { useActionState, useEffect, startTransition} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions } from 'astro:actions';
import { persistentAuthState } from '../mainStore';
import { navigate } from "astro:transitions/client";
import { useStore } from '@nanostores/react';

export default function ReportForm({lat, lng}) {
    const [result, formAction, isPending] = useActionState(
        withState(actions.report),
        {   status: null, error: null }
    );


    useEffect(() => {
        console.log("ReportForm result:", result);
    }, [result]);


  return (
    <div className="report-container p-4 text-left ">
        {result?.data?.success && <p className="text-green-500 mb-4">Report submitted successfully!</p>}
      <form action={formAction} className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-800">
        <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">
            Name
            </label>

            <input className="p-2 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white" name="name" type="text" placeholder="Name" />
        </div>

        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="contact">
            Contact Number
            </label>

            <input className="p-2 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white" name="contact" type="text" placeholder="09XXXXXXXXX"/>
        </div>
        <input type="hidden" name="lat" value={"lat"} />
        <input type="hidden" name="lng" value={"lng"} />

        <button className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 dark:hover:bg-indigo-700 dark:hover:text-white" type="submit">
            Send Report
        </button>
        </form>
    </div>
  );
}