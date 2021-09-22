import { useRouter } from 'next/router';
import React, { useState } from 'react'
import LogoutDialog from '../../public/images/icons-confirmation/logout-dialog.png'
import Image from 'next/image'

export default function Logout({HandleCancel}) {

    const history = useRouter();

    const handleLogout = () => {

        if (handleLogout) {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            history.push("/"); 
        }
    } 

    return (
        <div>
            <div className="modal-background">
            </div>
                <div className="confirmation-box">
                    <div className="log-out__img">
                        <div className="confirmation__img">
                            <Image src={LogoutDialog.src} width="500" height="500" alt="Message successfully sent" />
                        </div>
                        <div className="confirmation__heading">
                            <h4 className="confirmation__heading--text">Do you want to log out?</h4>
                        </div>

                        <div>
                            <button onClick={() => handleLogout()} className="error-btn">Log out</button>

                            <a className="delete__cancel" onClick={HandleCancel}>No, I changed my mind</a>
                        </div>  
                    </div>
                </div> 
        </div>
    )
}
