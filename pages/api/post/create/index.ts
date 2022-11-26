import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'

type Data = {
    message: string
    data: string[]
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") return res.status(405).end()

    const auth = await authorization(req, res)

    const { title, content } = req.body

    const create = await db('posts').insert({ 
        title,
        content
    })
    
    const createdData = await db('posts').where('id', create).first()
    res.status(200).json({
        message: "Post created successfully",
        data: createdData
    })

}