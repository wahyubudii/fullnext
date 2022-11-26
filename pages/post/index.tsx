import Cookie from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import Nav from "../../components/nav";
import { authPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx: any) {
  const { token }: any = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();

  return {
    props: {
      data: posts.data,
      token
    },
  };
}

export default function PostIndex(props: any) {
  const { token }: string | any = props;
  const [posts, setPosts] = useState(props.data)

  const editHandler = async (id: number) => {
    Router.push(`/post/edit/${id}`)
  }
  
  const deleteHandler = async (id: number) => {
    const ask = confirm('Apakah data ini ingin dihapus?')

    if (ask) {
      const dataReq = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      const dataRes = await dataReq.json()

      const postsFiltered = posts.filter((post: string[] | any) => {
        return post.id !== id && post
      })

      setPosts(postsFiltered)
    }
  }

  return (
    <div className="bg-blue-100 h-screen flex flex-col space-y-4">
      <h1 className="font-bold text-2xl">Posts</h1>
      <Nav />
      {posts.map((post:any) => (
        <div key={post.id} className="border border-black p-2 space-y-2">
          <h1 className="font-semibold">{post.title}</h1>
          <p>{post.content}</p>
          <div className="space-x-4">
            <button onClick={() => editHandler(post.id)} className="w-16 bg-yellow-300 rounded-full">Edit</button>
            <button onClick={() => deleteHandler(post.id)} className="w-16 bg-red-300 rounded-full">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
