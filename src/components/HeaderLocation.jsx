import {Link} from 'react-router-dom';

export default function HeaderLocation({
   linkUrl="#",
}){

    const deleteToken=()=>{
        localStorage.removeItem('token');
    }

    return(
        <>
            <div className="absolute top-3 left-5 h-16 w-16">
               <h1>Welcome </h1>
            </div>
            <div className="absolute top-0 right-5 h-16 w-16">
                <p className=" text-gray-600">
                    <Link to={linkUrl} onClick={deleteToken} className="text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </Link>
                </p>
            </div>
        </>

    )
}