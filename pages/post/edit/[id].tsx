import Router from "next/router";
import React, { FormEvent, useState } from "react";
import Nav from "../../../components/nav";
import { authPage } from "../../../middlewares/authorizationPage";

type BodyReq = {
    title: string,
    content: string
}

export async function getServerSideProps(ctx: any) {
    const { token }:any = await authPage(ctx)
    const { id }:number | any = ctx.query;

    const postReq = await fetch(`http://localhost:3000/api/post/detail/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const postRes = await postReq.json()

    return {
        props: {
            data: postRes.data,
            token
        }
    }
}

export default function PostEdit(props: any) {
    const { token, data } = props
    const [status, setStatus] = useState('normal')
    const [fields, setFields] = useState<BodyReq>({
        title: data.title,
        content: data.content
    })

    const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setStatus('loading')

        const dataReq = await fetch(`/api/post/update/${data.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(fields)
        })

        if (!dataReq.ok) return setStatus('error')

        const dataRes = await dataReq.json()

        setStatus('success')

        Router.push('/post')
    }

    const changeHandler = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
        const name: any = e.currentTarget.getAttribute('name')

        setFields({
            ...fields,
            [name]: e.currentTarget.value
        })
    }

  return (
    <div className="h-screen bg-blue-200 space-y-4">
      <h1>Edit a Post</h1>
      <Nav />
      <p>Post ID: {data.id}</p>
      <form
        onSubmit={updateHandler}
        method="POST"
        action=""
        className="flex flex-col space-y-4"
      >
        <input
          onChange={changeHandler}
          defaultValue={fields.title}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <textarea
          onChange={changeHandler}
          defaultValue={fields.content}
          name="content"
          placeholder="Content"
          required
        />
        <button type="submit" className="bg-yellow-200">
          Save Changes
        </button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
