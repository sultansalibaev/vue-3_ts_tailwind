const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const secret = 'secret_code'

server.use(jsonServer.bodyParser)
server.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))

function getDb () {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
}

const filePath = path.resolve(__dirname, 'db.json')
function updateDb (cb = data => (data)) {
    let jsonData = getDb()
    const tempData = cb(jsonData)

    if (!tempData) return

    jsonData = tempData

    const updatedData = JSON.stringify(jsonData, null, 4) // Stringify with indentation

    fs.writeFile(filePath, updatedData, 'UTF-8', (err) => {
        if (err) {
            console.error('writeFile Error: ', err)
            return
        }

        console.log('File updated successfully!')
    })
}

server.use(async (req, res, next) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 800)
    })
    next()
})
server.use((req, res, next) => {
    // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    // res.setHeader('Pragma', 'no-cache')
    // res.setHeader('Expires', 0)

    if (isNotPublicPath(req.path)) {
        return next()
    }

    const accessToken = getCookie('access_token', req.headers.cookie)

    jwt.verify(accessToken, secret, (err, decoded) => {
		console.log(err, decoded)
        if (err) {
            return res.sendStatus(401)
        }
        req.user = decoded?.user
        next()
    })
})

server.post('/auth/login', (req, res) => {
    const { email, password } = req.body

    const { users } = getDb()

    const userIndex = users.findIndex(user => (user.email === email && user.password === password))
    const user = users[userIndex]

    if (user) {
        const { id, email, password } = user
        const accessToken = jwt.sign({ user: { id, email, password } }, secret, { expiresIn: '1m' })
        const refreshToken = jwt.sign({ user: { id, email, password } }, secret, { expiresIn: '14d' })
        users[userIndex].accessToken = accessToken
        users[userIndex].refreshToken = refreshToken

        updateDb(data => {
            return {
                ...data,
                users
            }
        })

        const expiryTimeInMilliseconds = 1000 * 60 * 60 * 24 * 14

        user.accessToken = accessToken

        res.setHeader('Set-Cookie', `access_token=${accessToken}; expires=${new Date(Date.now() + expiryTimeInMilliseconds).toUTCString()}; path=/; SameSite=Strict; Secure; HttpOnly`)

        res.json({ id, email, password })
    }

    return res.sendStatus(401)
})

server.post('/auth/logout', (req, res) => {
    const { users } = getDb()
    const userIndex = users.findIndex(user => (
        user.email === req?.user?.email &&
        user.password === req?.user?.password
    ))

    if (userIndex !== -1) {
        users[userIndex].accessToken = null
        users[userIndex].refreshToken = null

        updateDb(data => {
            return {
                ...data,
                users
            }
        })
    }

    res.setHeader('Set-Cookie', `access_token=; expires=${new Date().toUTCString()}; path=/; SameSite=Strict; Secure; HttpOnly`)

    return res.sendStatus(200)
})

server.use(middlewares)

// function isAuthorized (req) {
//     return req.header.authorization
// }
function getCookie (name, cookie = '') {
    if (!(cookie || '').includes(name)) return ''
    const value = '; '
    const parts = cookie.split(value)
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=')
        if (part[0].trim() === name) {
            return part[1].trim()
        }
    }
    return ''
}

function isNotPublicPath (path) {
    return [
        '/auth/login',
        '/auth/logout',
        '/auth/refresh'
    ].includes(path)
}

server.get('/profile', async (req, res, next) => {
	const accessToken = getCookie('access_token', req.headers.cookie)

	const decoded = jwt.decode(accessToken)
	const { user: decodedUser } = decoded

	const { users, profile } = getDb()
	const userIndex = users.findIndex(user => (
		user.email === decodedUser?.email &&
		user.password === decodedUser?.password
	))
	console.log(userIndex, decodedUser)

	if (userIndex !== -1) {
		return res.json({
			...users[userIndex],
			...(profile?.find(user => user?.userId == decodedUser?.id) ?? {}),
			accessToken: undefined,
			refreshToken: undefined,
		})
	} else {
		res.sendStatus(404)
	}
})

server.post('/auth/refresh', async (req, res, next) => {

	const accessToken = getCookie('access_token', req.headers.cookie);
	const decoded = jwt.decode(accessToken);
	const { user: decodedUser } = decoded;

	const { users } = getDb();
	const userIndex = users.findIndex((user) => (
		user.email === decodedUser?.email &&
		user.password === decodedUser?.password
	));

	const refreshToken = users?.[userIndex]?.refreshToken;

	if (userIndex !== -1 && refreshToken) {
		try {
			const decoded = await jwt.verify(users[userIndex].refreshToken, secret);
			const { id, email, password } = users[userIndex];
			const newAccessToken = jwt.sign({ user: { id, email, password } }, secret, { expiresIn: '2h' });
			users[userIndex].accessToken = newAccessToken;
			updateDb((data) => ({
				...data,
				users
			}));

			const expiryTimeInMilliseconds = 1000 * 60 * 60 * 24 * 14

			res.setHeader('Set-Cookie', `access_token=${newAccessToken}; expires=${new Date(Date.now() + expiryTimeInMilliseconds).toUTCString()}; path=/; SameSite=Strict; Secure; HttpOnly`)

			return res.sendStatus(200)
		} catch (err) {
			users[userIndex].accessToken = null;
			users[userIndex].refreshToken = null;
			return res.status(403).send('Forbidden (invalid token)');
		}
	} else {
		res.sendStatus(401);
	}
})

server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(8000, () => {
    console.log('JSON Server is running')
})
