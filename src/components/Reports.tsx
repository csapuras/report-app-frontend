import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore.js';

interface StatusState {
    id: string;
    status: string;
}

interface DataType {
    id: string;
    lat: string;
    lng: string;
    name: string;
    contact: string;
    date: Date;
    created_at: Date;
    status: string;
    municipality: string;
    barangay: string;
    address: string;
    details: string;
}

interface ResponseData {
    error: string | undefined;
    data?: {
        data: Array<DataType>
    }
}


export default function Reports () {
    const $persistentAuthState = useStore(persistentAuthState); 
    const [statuses, setStatuses] = useState(Array<StatusState>);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedReport, setSelectedReport] = useState({id:"",status:""});
    const [data, setData] = useState(Array<DataType>);
    const [error, setError] = useState({status:false, message:''});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(Number(import.meta.env.PUBLIC_DEFAULT_PAGINATION_LIMIT));
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        const token = $persistentAuthState.token;
        const {data, error} =  await actions.get_reports({page,limit,totalPages,token});
        
        console.log(data)
        if(error){
            console.warn("client_error:", error.code)
            setError({status:true, message:"Client Error"})
        }else if(data.error){
            console.warn("server_error:", data.error)
            setError({status:true, message:"Server Error"})
        }else{
            setData(data.data.data);
            setPage(data.data.page);
            setLimit(data.data.limit);
            setTotalPages(data.data.pages);
            setTotalItems(data.data.total)
        }
    }

    useEffect(()=>{
        setLoading(true);
        getData()
        setLoading(false);
    },[])

    // useEffect(()=>{
    //    console.log(data)
    //    console.log(error)
    // },[data, error])



    useEffect(()=>{
        const filteredData = data.map(({ id, status }) => ({ id, status }));
        setStatuses(filteredData);
    },[data])

    return (
    <>
        {loading && <p>Loading</p>}
        {error.status ? 
            <h2>{error.message}</h2> :
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
                { data.map((item:DataType)=>{
                    const currentStatus = statuses.filter((status)=>{return status?.id === item.id})[0]
                    // console.log(currentStatus?.id)
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
                             { currentStatus?.status === 'pending' ?
                                <td>
                                        <a data-id={item.id} className="inline-flex items-center gap-2 rounded-sm border border-black-300 bg-yellow-300 px-2 py-1 text-yellow hover:bg-transparent hover:text-yellow-600" href="#"
                                            onClick={async (event) => {
                                                const selectedId = event.currentTarget.dataset.id ?? "";
                                                setSelectedReport({id:selectedId, status:"pending"})
                                                setShowDialog(true)
                                            }}
                                        >
                                            <span className="text-sm font-small"> Solve </span>
                                        </a>
                                </td> : 
                                <td></td>
                             }
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        }
        

        {/* Modal  */}
        {showDialog && 
            <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                    <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Confirmation</h2>

                    <button type="button" className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none" aria-label="Close">
                    </button>
                    </div>

                    <div className="mt-4">
                    <p className="text-pretty text-gray-700">
                        Resolve report?
                    </p>
                    </div>

                    <footer className="mt-6 flex justify-end gap-2">
                    <button type="button" className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            onClick={()=>setShowDialog(false)}>
                        Cancel
                    </button>

                    <button type="button" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            onClick={async () => {
                                const response = await actions.solve_report({id:selectedReport.id, token:$persistentAuthState.token })
                                if(response?.data?.success){
                                    selectedReport.status = 'done'
                                    console.log(selectedReport)
                                    console.log(statuses)
                                    setStatuses([...statuses, selectedReport])
                                    setShowDialog(false)
                                }
                            }}>
                        Confirm
                    </button>
                    </footer>
                </div>
            </div>
        }
    </>  
    )
}