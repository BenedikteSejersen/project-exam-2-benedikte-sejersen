import React from 'react'
import ErrorCircle from '../../public/images/icons-confirmation/error-dialog.png'
import Image from 'next/image'

export default function ErrorConf({confirm}) {
    return (
        <>
        <div className="modal-background">
        </div>

            <div className="confirmation-box">
                <div className="error-box__img">
                    <div className="confirmation__img">
                        <Image src={ErrorCircle.src} width="500" height="500" alt="Error dialog appeared. Try again" />
                    </div>
                    <div className="confirmation__heading">
                        <h4 className="confirmation__heading--text">Noe gikk galt</h4>
                    </div>

                    <div className="confirmation__p">
                        <p>
                            Meldingen din ble ikke sendt. Du kan kontakte oss på <a href='tel:92 14 13 12'>92 14 13 12.</a>
                        </p>
                    </div>

                    <div>
                        <button onClick={confirm} className="error-btn confirmation-btns">Prøv igjen</button>
                    </div>  
                </div>
            </div>
        </>
    )
}
