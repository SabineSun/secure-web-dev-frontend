import {Link} from 'react-router-dom';

export default function HeaderLocation({
   linkName,
   linkUrl="#",
}){
    return(
        <>
            <div className="absolute top-3 left-5 h-16 w-16">
               <h1>Welcome </h1>
            </div>
            <div className="absolute top-0 right-5 h-16 w-16">
                <p className=" text-gray-600">
                    <Link to={linkUrl} className="font-bold text-gray-900 hover:text-black">
                        {linkName}
                    </Link>
                </p>
            </div>
        </>

    )
}