import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../libs/db'
import bcrypt from 'bcryptjs'

type Data = {
    message: string
    data: string[]
}

export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const register = await db('users').insert({
        email,
        password: passwordHash
    })

    const registeredUser = await db('users').where({ id: register }).first()

    res.status(200).json({ message: "User registerd successfully", data: registeredUser })
}