import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../libs/db'
import authorization from "../../../../middlewares/authorization";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).end()

    const auth = await authorization(req, res)

    const { id } = req.query;
    const { title, content } = req.body;

    const update = await db('posts')
    .where({ id })
    .update({
        title,
        content
    })

    const updatedData = await db('posts').where('id', id).first()
    if (!updatedData) return res.status(404).end()

    res.status(200).json({ message: "Post update successfully", data: updatedData })
}