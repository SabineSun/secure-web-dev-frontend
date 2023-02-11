import React, { useEffect, useState } from "react";

export default function Location(){
    const [locations, setLocations] = useState([]);

    let token=localStorage.getItem('token');

    const fetchData = () => {
        fetch("http://localhost:3000/locations",{
            method:'GET',
            headers: {Authorization: "Bearer " + token},
        }).then((response)=> response.json())
            .then((data)=>{
                setLocations(data);
            })
    }

    useEffect(() => {
        fetchData();
    },[])

/* <h1>Locations List</h1>
            <ul>
                {
                    locations.map((location) =>
                        <li key={location._id}>{location.filmName}</li>)
                }
            </ul>*/


   return (
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr >
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-10 py-3"
                                    >
                                    </th>


                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Edit
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Delete
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {
                                    locations.map((location) =>
                                        <tr key={location._id}>
                                            <th   className="px-6 py-1.5 text-xs font-bold text-left font-light">
                                                {location.filmName}
                                            </th>
                                            <th></th>
                                            <th className="py-1.5  flex justify-center items-center font-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </th>
                                            <th className="py-1.5 px-9 font-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </th>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );


}