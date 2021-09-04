import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Breadcrumb({path, path2, path2Name}) {

    // const router = useRouter()
    // const pathName = router.pathname;
    // const path = pathName.slice(1);


    return (
        <div className="breadcrumb">

            <Link href="/">Home </Link>
            <span className="breadcrumb__line"></span>
            <a href={`/${path}`}>{path}</a>
            {path2 ? 
            <>
                <span className="breadcrumb__line"></span>
                <a href={`/${path2}`}>{path2Name}</a>
            </>
            : ""}

        </div>
    )
}
