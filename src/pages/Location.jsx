import HeaderLocation from "../components/HeaderLocation";
import Location from "../components/Location.jsx";

export default function LocationPage(){
    return(
        <>
            <HeaderLocation

                linkName="logout"
                linkUrl="/"
            />
            <Location/>

        </>
    )
}