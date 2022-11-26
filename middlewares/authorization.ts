import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next';

export default function authorization(req:NextApiRequest, res:NextApiResponse) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).end()
    
        const authSplit = authorization.split(' ')
        const [authType, authToken] = authSplit
        if (authType !== "Bearer") return res.status(401).end()
    
        return jwt.verify(authToken, 'cobalatihan', (err, decoded) => {
            if (err) return res.status(401).end()

            return resolve(decoded)
        })
    })
}