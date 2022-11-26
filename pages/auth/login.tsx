import { FormEvent, useState, useEffect } from "react";
import Cookie from 'js-cookie';
import Router from 'next/router'
import { unauthPage } from '../../middlewares/authorizationPage'

type Data = {
  email: string;
  password: string;
};

export async function getServerSideProps(ctx: any) {
  await unauthPage(ctx)

  return {
    props: {}
  }
}

export default function Login() {
  const [fields, setFields] = useState<Data>({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error " + loginReq.status);

    const loginRes = await loginReq.json();
    Cookie.set('token', loginRes.token)

    setStatus("success");
    Router.push('/post')
  };

  const fieldHandler = (e: FormEvent<HTMLInputElement>) => {
    const name: string | any = e.currentTarget.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.currentTarget.value,
    });
  };

  return (
    <div className="flex items-center min-h-screen">
      <div className="h-screen w-5/12 bg-gradient-to-br from-violet-600 via-stone-600 to-zinc-600 text-white">
        <div className="flex flex-col ml-48 mr-32 mt-20">
          <h6 className="pb-12 text-poppins font-bold text-3xl">Login</h6>
          <div className="space-y-6 font-semibold">
            <div>
              <p className="text-[16px]">Quick and free sign-up</p>
              <p className="text-gray-300 text-[14px] leading-6">
                Enter your email address to clean an account.
              </p>
            </div>
            <div>
              <p className="text-[16px]">Global payment methods</p>
              <p className="text-gray-300 text-[14px] leading-6">
                Accept credit cards. Apple Pay, ACH, iDEAL and more.
              </p>
            </div>
            <div>
              <p className="text-[16px]">Start accepting payments</p>
              <p className="text-gray-300 text-[14px] leading-6">
                Use Stripe's API or pick a pre-built solution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <form
        className="h-screen w-7/12 bg-white pl-32 pr-80 py-20"
        onSubmit={loginHandler}
      >
        <h1 className="text-xl font-semibold text-3xl pb-10">
          Login your account
        </h1>
        {status !== "normal" ? (
          <div className="mb-14 bg-green-100 text-green-800 text-sm font-bold p-4 rounded rounded-md w-full">
            Successfully to login...
          </div>
        ) : (
          <>
            <div className="space-y-2 pb-6">
              <p className="font-bold">Email</p>
              <input
                onChange={fieldHandler}
                name="email"
                type="text"
                className="px-4 py-2 border-2 rounded-md w-full"
                placeholder="Input your email"
                required
              />
            </div>
            <div className="space-y-2 pb-12">
              <p className="font-bold">Password</p>
              <input
                onChange={fieldHandler}
                name="password"
                type="password"
                className="px-4 py-2 border-2 rounded-md w-full"
                placeholder="Input your password"
                required
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer px-4 py-4 text-center bg-gradient-to-br from-violet-600 via-stone-600 to-zinc-600 text-white border-2 rounded-lg w-full font-bold"
            >
              Login account
            </button>
          </>
        )}
      </form>
    </div>
  );
}
