import Link from "next/link"
import Cookies from "js-cookie"
import Router from "next/router"

export default function Nav() {
    const logoutHandler = () => {
        Cookies.remove('token')
        Router.replace('/auth/login')
    }

    return (
        <div className="flex">
            <Link href='/post'>Post</Link>
            &nbsp; | &nbsp;
            <Link href="/post/create">Create Post</Link>
            &nbsp; | &nbsp;
            <a href="" onClick={logoutHandler}>Logout</a>
        </div>
    )
}