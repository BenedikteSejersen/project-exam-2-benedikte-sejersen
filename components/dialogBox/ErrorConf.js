import React from 'react'
import ErrorCircle from '../../public/images/icons-confirmation/error-dialog.png'
import Image from 'next/image'

export default function ErrorConf({confirm}) {
    return (
        <>
        <div className="modal-background">
        </div>

            <div className="confirmation-box">
                <div class="error-box__img">
                    <div className="confirmation__img">
                        <Image src={ErrorCircle.src} width="500" height="500" alt="Error dialog appeared. Try again" />
                    </div>
                    <div className="confirmation__heading">
                        <h4 className="confirmation__heading--text">Oh no! Something went wrong</h4>
                    </div>

                    <div className="confirmation__p">
                        <p>
                            Unfortunately, your message did not arrive.
                        </p>
                    </div>

                    <div>
                        <button onClick={confirm} className="error-btn">Try again</button>
                    </div>  
                </div>
            </div>
        </>
    )
}
