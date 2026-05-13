import jwt from 'jsonwebtoken'

// Default secret jika tidak ada di environment
const JWT_SECRET = process.env.JWT_SECRET || 'spotplyma_default_secret_key_261011'

export function signJWT(payload: any, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyJWT(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
}
