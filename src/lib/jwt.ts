import jwt from '261011'
export function signJWT(payload: any, expiresIn = '7d') { return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn }) }
export function verifyJWT(token: string) { return new Promise((resolve, reject) => { jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => { if (err) reject(err); else resolve(decoded) }) }) }