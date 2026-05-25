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

export default function Reports ({data}:{data:Array<Data>}) {
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
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            { data.map((item)=>{
                return (
                    <tr className="*:text-gray-900 *:first:font-medium" key={item.id}>
                        <td className="px-3 py-2">{new Intl.DateTimeFormat('en-US').format(new Date(item.created_at))}</td>
                        <td className="px-3 py-2">{item.name}</td>
                        <td className="px-3 py-2">{item.contact}</td>
                        <td className="px-3 py-2">{item.municipality}</td>
                        <td className="px-3 py-2">{item.barangay}</td>
                        <td className="px-3 py-2">{item.address}</td>
                        <td className="px-3 py-2">{item.details}</td>
                        <td className="px-3 py-2">{item.status}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    </>  
    )
}