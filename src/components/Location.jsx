import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Location(){
    const [locations, setLocations] = useState([]);

    let token=localStorage.getItem('token');

    const fetchData = () => {
        //fetch("https://secure-web-dev.fly.dev/locations",{
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


    const deleteData = (id) => {
        fetch("http://localhost:3000/locations/" + id, {
            method:'delete',
            headers:{Authorization:"Bearer " + token},
        })
            .then(response => response.json())
            .then(data => {
                const updatedTableData = locations.filter(location => location._id !== id);
                setLocations( updatedTableData);
            })
    }

    const [rowSelected, setRowSelected] = useState([null]);
    const [showModal, setShowModal] = useState([false]);
    const [isDeleted, setIsDeleted] = useState([false]);

    const handleRowClick = (rowSelected) => {
        setRowSelected(rowSelected);
        setShowModal(true);
    };

    return (
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
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
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {
                                    locations.map((location) =>

                                    <tr key={location._id}
                                            className="hover:bg-gray-100 cursor-pointer h-8"
                                            onClick={()=>{
                                                handleRowClick(location);
                                            }}
                                        >
                                            <th className="px-9 py-1 text-xs  text-left font-light">
                                                {location.filmName}
                                            </th>
                                            <th></th>
                                            <th className=" py-1 pb-0  justify-center items-center">

                                            </th>

                                            <th className="py-1 px-9 pb-0  font-light">
                                                <button
                                                    type={"button"}
                                                    className="bg-transparent py-0 px-0"
                                                    onClick={() => {
                                                        deleteData(location._id);
                                                        setIsDeleted(true);
                                                        }
                                                    }
                                                >
                                                    <TrashIcon className="w-5 h-5"/>
                                                </button>
                                            </th>

                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                            {showModal===true ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="w-96 absolute top-50 left-4 pt-2 pr-2">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="font-semibold">
                                                        {rowSelected.filmName}
                                                        {isDeleted===true?(
                                                         " is deleted"
                                                        ):null}
                                                    </h3>
                                                    <button
                                                        type={"button"}
                                                        className="bg-transparent py-0 px-0"
                                                        onClick={() =>
                                                            deleteData(location._id)
                                                        }
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5"/>
                                                    </button>
                                                </div>
                                                <div className="relative p-6 flex-auto">
                                                    <p className="text-sm text-slate-500 text-left overflow-scroll	">
                                                        {"film type : " + rowSelected.filmType}<br/>
                                                        {"film producer name : " + rowSelected.filmProducerName}<br/>
                                                        {"year : " + rowSelected.year}<br/>
                                                        {"start date : " + rowSelected.startDate}<br/>
                                                        {"end date : " + rowSelected.endDate}<br/>
                                                        {"film director name : " + rowSelected.filmDirectorName}<br/>
                                                        {"adress : " + rowSelected.address}<br/>
                                                        {"district : " + rowSelected.district}<br/>
                                                        {"source location id : " + rowSelected.sourceLocationId}<br/>
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-end p-0.5 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowModal(false);
                                                            setIsDeleted(false);
                                                        }}
                                                    >
                                                        Close
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="opacity-0 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
    );


}