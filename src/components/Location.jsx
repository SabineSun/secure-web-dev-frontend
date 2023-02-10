import React, { useEffect, useState } from "react";

export default function Location(){
    const [user, setUser] = useState([]);

    let token=localStorage.getItem('token');
    console.log(token);

    const fetchData = () => {
        return fetch("http://localhost:3000/locations",{
            method:'GET',
            headers: {Authentication: `Bearer ${token}`},
        })

    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <main>
            <h1>Locations List</h1>
            <ul>
                {user && user.length > 0 && user.map((userObj, index) => (
                    <li key={userObj.filmType}>{userObj.filmProducerName}</li>
                ))}
            </ul>
        </main>
    );
}

