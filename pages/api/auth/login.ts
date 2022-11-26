import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../libs/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

type Data = {
    message: string,
    token: string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body;

    const data = await db('users').where({ email }).first()
    if (!data) return res.status(401).end()

    const checkPassword = await bcrypt.compareSync(password, data.password)
    if (!checkPassword) return res.status(401).end()

    const token = jwt.sign({
        id: data.id,
        email: data.email
    }, 'cobalatihan', {
        expiresIn: '7d'
    })

    res.status(200).json({ message: "Login successfully", token })
}