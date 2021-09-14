import Image from 'next/image';
import React from 'react'
import SuccessCircle from '../../public/images/icons-confirmation/success-dialog.png';

export default function Success({confirm}) { 
    return (
        <>
        <div className="modal-background">
        </div>

            <div className="confirmation-box">
                <div class="success-box__img">
                    <div className="confirmation__img">
                        <Image src={SuccessCircle.src} width="500" height="500" alt="Message successfully sent" />
                    </div>
                    <div className="confirmation__heading">
                        <h4 className="confirmation__heading--text">Yes, message is sent!</h4>
                    </div>

                    <div className="confirmation__p">
                        <p>
                            Thank you for contacting us. We will be answering you as fast as possible.
                        </p>
                    </div>

                    <div>
                        <button onClick={confirm} className="success-btn">Continue</button>
                    </div>  
                </div>
            </div>

            
            
        </>
    )
}
