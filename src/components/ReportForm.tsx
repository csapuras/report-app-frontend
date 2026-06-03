
import { useActionState, useEffect, useState} from 'react';
import { withState} from '@astrojs/react/actions';
import { actions } from 'astro:actions';
import { persistentAuthState } from '../mainStore';
import { useStore } from '@nanostores/react';
import  data from '../data/data.json';
import MapComponent from '@components/MapComponent';

export default function ReportForm() {
    const $persistentAuthState = useStore(persistentAuthState);
    console.log("ReportForm", $persistentAuthState);

    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [result, formAction, isPending] = useActionState(
        withState(actions.report),
        {   
            data: { success:false, error:null},
            error: undefined
        },
    );

    useEffect(() => {
        if(result?.data?.success) {
            window.location.href = "/success";
        }
    }, [result]);

    const handleMunicipality = (e:any) => {
        setSelectedMunicipality(e.target.value);
    }

    const inputTextClass="text-md mt-2 p-2 w-full rounded-lg focus:border-1 border-1 border-(--color-secondary) focus:border-(--color-accent) focus:outline-none"

    const selectClass="disabled:bg-gray-300 disabled:text-gray-500 disabled:border- text-md mt-2 w-full rounded-lg border-solid border-1 border-(--color-secondary) focus:border-(--color-accent) focus:outline-none p-2"
  return (
    <div className="report-container p-4 text-left  w-sm max-w-lg">
        {isPending ?
        <div className="text-md text-center">Submitting Report...</div> :
        <form action={formAction} className="mx-auto max-w-2xl space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-800">
            <div>
                <input className={inputTextClass} name="name" type="text" placeholder="Full Name" required />
                <span className="required text-xs">* Required</span> 
            </div>
            <div>
                <input className={inputTextClass} name="contact" type="text" pattern="(\d{11})" placeholder="09XXXXXXXXX" required/>
                <span className="required text-xs">* Required</span>       
            </div>
            <div>
                <select onChange={handleMunicipality} className={selectClass} id="municipality" name="municipality" required>
                    <option value={selectedMunicipality}>Select a municipality</option>
                    {Object.values(data.municipalities).map((mun) => (
                        <option key={mun.name.trim()} value={mun.name}>
                            {mun.name}
                        </option>
                    ))}
                </select>
                <span className="required text-xs">* Required</span>   
            </div>
            <div>
                <select className={selectClass} id="barangay" name="barangay" required disabled={!selectedMunicipality}>
                    <option value="">Select a barangay</option>
                    {Object.values(data.municipalities.filter((mun) => mun.name === selectedMunicipality)).flatMap((mun) => mun.barangays).map((bar) => (
                        <option key={bar.trim()} value={bar}>
                            {bar}
                        </option>
                    ))}
                </select>
                <span className="required text-xs">* Required</span>   
            </div>
            <div>
                <input className={inputTextClass} name="address" type="text" placeholder="Address" required/>
            </div>
            <div>
                <input className={inputTextClass} name="details" type="text" placeholder="Details (burning post, fluctuation...)"/>
            </div>
            {/* TODO: Add map component for location selection */}
            {/* <div>
                <label className=" p-2 block text-md font-medium text-gray-900 dark:text-white" htmlFor="details">
                Map
                </label>
                <MapComponent />
            </div> */}
            <input type="hidden" name="lat" value={$persistentAuthState?.lat ?? ""} />
            <input type="hidden" name="lng" value={$persistentAuthState?.lng ?? ""} />

            <button className="text-lg block w-full rounded-lg border border-(--color-accent) bg-(--color-accent) px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-(--link-color) hover:cursor-pointer" type="submit">
                Send Report
            </button>
        </form>
        }
      
    </div>
  );
}