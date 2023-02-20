import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useNavigate} from 'react-router-dom';
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/outline";




export default function Location(){
    const [locations, setLocations] = useState([]);
    const [rowSelected, setRowSelected] = useState([null]);
    const [showModal, setShowModal] = useState([false]);
    const [isDeleted, setIsDeleted] = useState([false]);
    const [showEdit, setShowEdit] = useState([false]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);


    let token=localStorage.getItem('token');
    const navigate = useNavigate();


    const fetchData = () => {
        fetch("https://secure-web-dev.fly.dev/locations",{
        //fetch("http://localhost:3000/locations",{
            method:'GET',
            headers: {Authorization: "Bearer " + token},
        }).then((response)=> response.json())
            .then((data)=>{
                setLocations(data);
            })
            .catch(error => {
                alert("Your are not connected. You will be redirected to the login page.")
                navigate('/');
            })
    }

    const Pagination = async () => {
        const response = await fetch(`http://localhost:3000/locations?limit=${limit}&offset=${offset}`,
            { method:'GET',
            headers: {Authorization: "Bearer " + token},} );
        const data = await response.json();
        setLocations(data);
    };

    useEffect(() => {
        fetchData();
        Pagination();
    }, [limit, offset]);

    const deleteData = (id) => {
        fetch("https://secure-web-dev.fly.dev/locations/" +id,{

         //   fetch("http://localhost:3000/locations/" + id, {
            method:'delete',
            headers:{Authorization:"Bearer " + token},
        })
            .then(response => response.json())
            .then(data => {
                const updatedTableData = locations.filter(location => location._id !== id);
                setLocations( updatedTableData);
            })
    }

    const handleRowClick = (rowSelected) => {
        setRowSelected(rowSelected);
        setShowModal(true);
    };

    const handleRowEditClick = (rowSelected) => {
        setRowSelected(rowSelected);
        setShowEdit(true);
    }

    function handlePrevClick() {
        setOffset(Math.max(0, offset - limit));
        console.log(offset);
    }

    function handleNextClick() {
        setOffset(offset + limit);
        console.log(offset);
    }



    return (
        <>
        <div className="absolute top-6  ">
            <button onClick={handlePrevClick}
                    disabled={offset === 0}
                    className="bg-transparent p-0">
                <ArrowLeftIcon className="w-5 h-5 "/>
            </button>
        </div>
        <div className= "absolute top-6 m-10">
            <button onClick={handleNextClick} className="bg-transparent p-0">
                <ArrowRightIcon className="w-5 h-5"/>
            </button>
        </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto ">

                    <div className=" w-full inline-block align-middle ">

                        <div className="overflow-hidden border rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-8 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-8 py-3"
                                    >
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-8 py-3"
                                    >
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-9 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        <button
                                            type={"button"}
                                            className="bg-transparent py-0 px-0"
                                            onClick={() => {
                                                console.log("test");
                                                }
                                            }
                                        >
                                            <PlusIcon className="w-5 h-5"/>
                                        </button>

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
                                            <th className="pl-8 py-1 text-xs  text-left font-light">
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
                                                        window.location.reload();
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
                                                    {isDeleted===false
                                                        ? <button
                                                            type={"button"}
                                                            className="bg-transparent py-0 px-0"
                                                            onClick={() =>
                                                                handleRowEditClick(rowSelected)
                                                            }
                                                        >
                                                            {showEdit===false
                                                                ? <PencilSquareIcon className="w-5 h-5"/>
                                                                :null
                                                            }

                                                        </button>
                                                        :null}

                                                </div>
                                                {showEdit === true
                                                    ? <div>
                                                        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 ">
                                                            <div  className="text-left flex-col">
                                                                <div>
                                                                    <label
                                                                        className="text-sm text-slate-500 text-left p-1"
                                                                        htmlFor="filmType">
                                                                        film type
                                                                    </label>
                                                                    <input
                                                                        className=" appearance-none  rounded p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                        id="filmType" type="text" placeholder={`${rowSelected.filmType}`}/>
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className="text-sm text-slate-500 text-left p-1"
                                                                        htmlFor="filmType">
                                                                        producer name
                                                                    </label>
                                                                    <input
                                                                        className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                        id="filmType" type="text" placeholder={`${rowSelected.filmProducerName}`}/>
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className="text-sm text-slate-500 text-left p-1"
                                                                        htmlFor="filmType">
                                                                        year
                                                                    </label>
                                                                    <input
                                                                        className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                        id="filmType" type="text" placeholder={`${rowSelected.year}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    start date
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.startDate}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    end date
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.endDate}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    film director name
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.filmDirectorName}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    address
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.address}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    district
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.district}`}/>
                                                                </div>
                                                                <div>
                                                                <label
                                                                    className="text-sm text-slate-500 text-left p-1"
                                                                    htmlFor="filmType">
                                                                    source location id
                                                                </label>
                                                                <input
                                                                    className=" appearance-none  rounded  p-1 text-sm text-slate-500 text-left leading-tight focus:outline-none "
                                                                    id="filmType" type="text" placeholder={`${rowSelected.sourceLocationId}`}/>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    : <div className="relative p-6 flex-auto">
                                                        <p className="text-sm text-slate-500 text-left p-4 overflow-scroll	">
                                                            {"film type : " + rowSelected.filmType}<br/>
                                                            {"film producer name : " + rowSelected.filmProducerName}<br/>
                                                            {"year : " + rowSelected.year}<br/>
                                                            {"start date : " + rowSelected.startDate}<br/>
                                                            {"end date : " + rowSelected.endDate}<br/>
                                                            {"film director name : " + rowSelected.filmDirectorName}<br/>
                                                            {"address : " + rowSelected.address}<br/>
                                                            {"district : " + rowSelected.district}<br/>
                                                            {"source location id : " + rowSelected.sourceLocationId}<br/>
                                                        </p>
                                                    </div>
                                                }


                                                <div className="flex items-center justify-end p-0.5 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowModal(false);
                                                            setIsDeleted(false);
                                                            setShowEdit(false);
                                                        }}
                                                    >
                                                        {showEdit===true
                                                            ? "Submit"
                                                            : "Close"
                                                        }
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
        </>
    );


}