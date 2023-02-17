import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from "@heroicons/react/24/outline";





export default function Location(){
    const [locations, setLocations] = useState([]);

    let token=localStorage.getItem('token');

    const fetchData = () => {
        fetch("http://secure-web-dev.fly.dev/locations",{
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

    /*const deleteData = (location) =>{
        fetch("http://secure-web-dev.fly.dev/locations/" + location._id, {
            method:'delete',
            headers: {Authorization: "Bearer " + token},
        }).then(response => response.json())
    }*/

    /*const deleteTest = (location) =>{
        console.log(location.filmName);
    }*/

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
                                            <th   className="px-6 py-1 pb-0 text-xs font-bold text-left font-light">
                                                {location.filmName}

                                            </th>
                                            <th></th>

                                            <th className=" py-1 pb-0  justify-center items-center">
                                                <button className="bg-transparent py-0 px-0">
                                                    <PencilSquareIcon className="w-5 h-5"/>
                                                </button>

                                            </th>
                                            <th className="py-1 px-9 pb-0  font-light">


                                                <button type={"button"} className="bg-transparent py-0 px-0">
                                                    <TrashIcon className="w-5 h-5"/>
                                                </button>
                                            </th>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );


}