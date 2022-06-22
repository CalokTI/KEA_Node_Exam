import jwt from "jsonwebtoken";

//supplied video https://www.youtube.com/watch?v=mbsmsi7l3r4
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['cookie']
    const token = authHeader && authHeader.split('=')[1];
    if (token == null) return res.status(401).send("no token");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("not a valid token");
        req.user = user;
        next();
    })

}