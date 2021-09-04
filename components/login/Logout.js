import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import UseLocalStorage from '../../hooks/UseLocalStorage'

export default function Logout() {
    
    const history = useRouter();

        const handleLogout = () => {

            const confirmLogout = confirm("Are you sure  you want to log out");

            if (confirmLogout) {
               localStorage.removeItem("auth");
                localStorage.removeItem("user");
                history.push("/"); 
            }
        }

    return (
        <div>

            <p className="logout" onClick={() => {handleLogout();}}>Logout</p>
            
        </div>
    )
}
