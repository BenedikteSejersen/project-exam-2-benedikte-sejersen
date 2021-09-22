import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Breadcrumb({path, path2, path2Name}) {

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
