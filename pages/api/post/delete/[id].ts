import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../libs/db'
import authorization from "../../../../middlewares/authorization";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(405).end()
    
    const auth = await authorization(req, res)

    const { id } = req.query
    const data = await db('posts').where({ id }).del()
    if (!data) return res.status(404).end()

    res.status(200).json({ message: "Delete successfully" })
}