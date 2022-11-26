import cookies from 'next-cookies'

export function unauthPage(ctx: any) {
    return new Promise((resolve, reject) => {
        const allCookies = cookies(ctx)
    
        if (allCookies.token) {
            return ctx.res.writeHead(302, {
                Location: '/post'
            }).end()
        }

        return resolve('unauthorized')
    })
}

export function authPage(ctx: any) {
    return new Promise((resolve, reject) => {
        const allCookies = cookies(ctx)

        if(!allCookies.token) {
            return ctx.res.writeHead(302, {
                Location: '/auth/login'
            }).end()
        }

        return resolve({
            token: allCookies.token
        })
    })
}