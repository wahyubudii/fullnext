import { NextApiRequest, NextApiResponse } from "next";
import authorization from "../../../../middlewares/authorization";
import db from '../../../../libs/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "GET") return res.status(401).end()

    const auth = await authorization(req, res)

    const { id } = req.query
    const data = await db('posts').where({ id }).first()
    if (!data) return res.status(404).end()

    res.status(200).json({ data })
}