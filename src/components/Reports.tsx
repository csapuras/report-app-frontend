import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';

interface Data {
        lat: string;
        lng: string;
        name: string;
        contact:string;
        municipality: string;
        barangay: string;
        created_at: string;
        address: string;
        details: string;
        status: string;
        id:string;
    }

interface StatusState {
    id: string;
    status: string;
}

export default function Reports ({data, token}:{data:Array<Data>, token :string}) {
    const [statuses, setStatuses] = useState(Array<StatusState>);

    useEffect(()=>{
        const filteredData = data.map(({ id, status }) => ({ id, status }));
        setStatuses(filteredData);
    },[])

    return (
    <>
    <div className="max-h-100 overflow-x-auto rounded border border-gray-300 shadow-sm dark:border-gray-600">
        <table className="min-w-200 divide-y-2 divide-gray-200 dark:divide-gray-700">
            <thead className="sticky top-0 bg-white text-white ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Date</th>
                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Contact</th>
                <th className="px-3 py-2 whitespace-nowrap">Municipality</th>
                <th className="px-3 py-2 whitespace-nowrap">Barangay</th>
                <th className="px-3 py-2 whitespace-nowrap">Address</th>
                <th className="px-3 py-2 whitespace-nowrap">Details</th>
                <th className="px-3 py-2 whitespace-nowrap">Status</th>
                <th className="px-3 py-2 whitespace-nowrap"></th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            { data.map((item)=>{
                const currentStatus = statuses.filter((status)=>{return status?.id === item.id})[0]
                return (
                    <tr className="*:text-gray-900 *:first:font-medium" key={item.id} id={item.id}>
                        <td className="px-3 py-2 whitespace-nowrap">{new Intl.DateTimeFormat('en-US').format(new Date(item.created_at))}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{item.contact}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{item.municipality}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{item.barangay}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{item.address}</td>
                        <td className="max-w-50 px-3 py-2">{item.details}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{currentStatus?.status}</td>
                        { currentStatus?.status === "pending" ? 
                                <td>
                                <a className="inline-flex items-center gap-2 rounded-sm border border-black-300 bg-yellow-300 px-2 py-1 text-yellow hover:bg-transparent hover:text-yellow-600" href="#"
                                    onClick={async () => {
                                        const response = await actions.solve_report({id:item.id, token:token })
                                        if(response?.data?.success){
                                            currentStatus.status = 'done'
                                            setStatuses([...statuses, currentStatus])
                                        }
                                    }}
                                >
                                    <span className="text-sm font-small"> Solve </span>
                                </a>
                            </td> : <td></td>   
                        }
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </>  
    )
}