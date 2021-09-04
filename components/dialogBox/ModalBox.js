import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function ModalBox() {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});

    const openDialog = ({heading, img, btnText, bodyText, classname }) => {
        console.log("clicked")
        setDialogOpen(true);
        setDialogConfig({heading, img, btnText, bodyText, classname});

        const resetDialog = () => {
            console.log("reset");
            setDialogOpen(false);
            setDialogOpen({});
        }

        const onConfirm = () => {
            resetDialog();
            dialogConfig.actionCallback(true);
        }

        const onDismiss = () => {
            resetDialog();
            dialogConfig.actionCallback(false);
        }
    }

    

    console.log()

    return (
        <>
        <div>
        </div>

            <div className="modals-positioning">
              <div className="modals-box">
                    <div className={`modals-content ${classname}`}>

                        <h4>{heading}</h4>
                        <p className="modal__p">{bodyText}</p>
                            <button onClick={onDismiss} className="success__btn">{btnText}</button>
                            <button onClick={onConfirm}>Delete</button>

                        <div className="modals__img">
                            <Image src={img} alt="dialog successfully" width="500" height="500" />
                        </div>
                    </div>
                </div>  
            </div> 


        </>
    )
}
