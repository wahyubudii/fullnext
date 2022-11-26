import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../libs/db'
import authorization from "../../../middlewares/authorization";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).end()
 
    const auth = await authorization(req, res)

    const data = await db('posts')
    
    res.status(200).json({ data })
}