
import { useActionState, useEffect, useState} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions } from 'astro:actions';
import { persistentAuthState } from '../mainStore';
import { useStore } from '@nanostores/react';
import  data from '../data/data.json';
import MapComponent from './MapComponent';

export default function ReportForm() {
    const $persistentAuthState = useStore(persistentAuthState);
    console.log("ReportForm", $persistentAuthState);

    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [result, formAction, isPending] = useActionState(
        withState(actions.report),
        {   status: null, error: null }
    );

    useEffect(() => {
        console.log("ReportForm API result:", result);
    }, [result]);

    const handleMunicipality = (e) => {
        setSelectedMunicipality(e.target.value);
    }

  return (
    <div className="report-container p-4 text-left  w-lg max-w-lg">
        {result?.data?.success && <p className="text-green-500 mb-4">Report submitted successfully!</p>}
      <form action={formAction} className="mx-auto max-w-2xl space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6 dark:border-gray-600 dark:bg-gray-800">
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
        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="municipality">
            Municipality
            </label>

            <select onChange={handleMunicipality} className="mt-1 w-full rounded-lg border-gray-100 focus:border-indigo-500 focus:outline-none" id="municipality" name="municipality">
                <option value={selectedMunicipality}>Select a municipality</option>
                {Object.values(data.municipalities).map((mun) => (
                    <option key={mun.name.trim()} value={mun.name}>
                        {mun.name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="barangay">
            Barangay
            </label>

            <select className="mt-1 w-full rounded-lg border-gray-100 focus:border-indigo-500 focus:outline-none" id="barangay" name="barangay">
                <option value="">Select a barangay</option>
                {Object.values(data.municipalities.filter((mun) => mun.name === selectedMunicipality)).flatMap((mun) => mun.barangays).map((bar) => (
                    <option key={bar.trim()} value={bar}>
                        {bar}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">
            Street / Purok
            </label>

            <input className="p-2 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white" name="address" type="text" placeholder="Address"/>
        </div>
        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="details">
            Details
            </label>

            <input className="p-2 mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white" name="details" type="text" placeholder="Brownout, burning pole..."/>
        </div>
        <div>
            <label className="p-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="details">
            Map
            </label>
            <MapComponent />
        </div>
        <input type="hidden" name="lat" value={$persistentAuthState.lat} />
        <input type="hidden" name="lng" value={$persistentAuthState.lng} />

        <button className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 dark:hover:bg-indigo-700 dark:hover:text-white" type="submit">
            Send Report
        </button>
        </form>
    </div>
  );
}