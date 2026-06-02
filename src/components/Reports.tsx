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
            <div className="max-h-90 overflow-x-auto rounded border-solid border-1 border-(--color-secondary) shadow-sm">
            <table className=" divide-y-2 divide-(--color-secondary)">
                <thead className="sticky top-0 bg-(--link-color) ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-(--text-on-dominant)">
                    <th className="px-3 py-2 whitespace-nowrap">Date</th>
                    <th className="px-3 py-2 whitespace-nowrap">Name</th>
                    <th className="px-3 py-2 whitespace-nowrap">Contact</th>
                    <th className="px-3 py-2 whitespace-nowrap">Municipality</th>
                    <th className="px-3 py-2 whitespace-nowrap">Barangay</th>
                    <th className="px-3 py-2 whitespace-nowrap">Address</th>
                    <th className="px-3 py-2 whitespace-nowrap">Details</th>
                    <th className="px-3 py-2 whitespace-nowrap">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-(color-dominant)">
                { data.map((item:DataType)=>{
                    const currentStatus = statuses.filter((status)=>{return status?.id === item.id})[0]
                    console.log(currentStatus?.status)
                    return (
                        <tr className="*:text-(--text-on-dominant) *:first:font-medium" key={item.id} id={item.id}>
                            <td className="px-3 py-2 whitespace-nowrap text-blue-600">{new Intl.DateTimeFormat('en-US').format(new Date(item.created_at))}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{item.contact}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{item.municipality}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{item.barangay}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{item.address}</td>
                            <td className="max-w-50 px-3 py-2">{item.details}</td>
                             { currentStatus?.status === 'pending' ?
                                <td className="text-center">
                                      <a data-id={item.id} className="inline-flex items-center gap-2 rounded-sm hover:bg-(--color-secondary) rounded p-3" href="#"
                                            onClick={async (event) => {
                                                const selectedId = event.currentTarget.dataset.id ?? "";
                                                setSelectedReport({id:selectedId, status:"pending"})
                                                setShowDialog(true)
                                            }}
                                        >
                                        <span className="text-(--link-color)"><svg className="fill-(--link-color)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></span>
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
                    <h2 id="modalTitle" className="text-xl font-bold text-(--text-on-dominant) sm:text-2xl">Confirmation</h2>
                    <button type="button" className="-me-4 -mt-4 rounded-full p-2 text-(--text-on-dominant) transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none" aria-label="Close">
                    </button>
                    </div>

                    <div className="mt-4">
                    <p className="text-pretty  text-(--text-on-dominant)">
                        Resolve report?
                    </p>
                    </div>

                    <footer className="mt-6 flex justify-end gap-2">
                    <button type="button" className="rounded bg-gray-100 px-4 py-2 text-sm font-medium  text-(--text-on-dominant)transition-colors hover:bg-gray-200"
                            onClick={()=>setShowDialog(false)}>
                        Cancel
                    </button>

                    <button type="button" className="rounded bg-(--color-accent) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--color-secondary)"
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