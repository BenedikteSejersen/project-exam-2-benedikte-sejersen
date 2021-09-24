import React, { useState } from 'react'
import Image from 'next/image'
import DeleteDialog from '../../public/images/icons-confirmation/delete-dialog.png'

export default function Delete({HandleDelete, HandleCancel}) {

    return (
        <div>
        
            <>
                <div className="modal-background">
                </div>
                <div className="confirmation-box">
                    <div className="delete-box__img">
                        <div className="confirmation__img">
                            <Image src={DeleteDialog.src} width="500" height="500" alt="Message successfully sent" />
                        </div>
                        <div className="confirmation__heading">
                            <h4 className="confirmation__heading--text">Do you want to delete this?</h4>
                        </div>

                        <div className="confirmation__p"> 
                            <p>
                                Once you delete, that item is long gone. Forever ever. 
                            </p>
                        </div>

                        <div>
                            <button onClick={HandleDelete} className="error-btn">Delete</button>

                            <a className="delete__cancel" onClick={HandleCancel}>No, I changed my mind</a>
                        </div>  
                    </div>
                </div>
            </> 
        </div>
    )
}
