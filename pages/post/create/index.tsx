import Router from "next/router";
import React, { FormEvent, useState } from "react";
import Nav from "../../../components/nav";
import { authPage } from "../../../middlewares/authorizationPage";

type BodyReq = {
  title: string;
  content: string;
};

export async function getServerSideProps(ctx: any) {
  const { token }:any = await authPage(ctx)

  return {
    props: {
      token
    }
  }
}

export default function PostCreate(props:any) {
  const [fields, setFields] = useState<BodyReq>({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState('normal')

  const createHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { token } = props

    setStatus('loading')

    const dataReq = await fetch('/api/post/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(fields)
    })

    if (!dataReq.ok) return setStatus('error')

    const dataRes = await dataReq.json()
    setStatus("success");
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
      <h1>Create a Post</h1>
      <Nav />
      <form onSubmit={createHandler} method="POST" action="" className="flex flex-col space-y-4">
        <input onChange={changeHandler} type="text" name="title" placeholder="Title" />
        <textarea onChange={changeHandler} name="content" placeholder="Content" />
        <button type="submit" className="bg-yellow-200">
          Submit Data
        </button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
