// 보통 이런 토큰에 관한 내용은 따로 .env 파일에 놓습니다. 
// 예제이기 때문에 한파일에 놓습니다.

// 토큰을 생성할 때 사용되는 비밀키
// 새로운 비밀키 예시
const ACCESS_TOKEN_SECRET = "7a3b04f6028a472e8e8f762adab3b88b3b227b1c7bc6f104d8c82c9781a9e3b2";
const REFRESH_TOKEN_SECRET = "2d1495f59a831c88146e9f9fdd32e3b5180f3fe8e1b5b8c5b1f041ec6d024ed6";

// 포트 번호 설정
const PORT = 13010;

// 라우팅설정을 쉽게, 미들웨어 설정을 쉽게 도와주는 express 프레임워크
const express = require('express');
// 쿠키 핸들링을 쉽게 해주는 모듈
const cookieparser = require('cookie-parser');
// jwt에 관한 로직을 설정할 수 있게 하는 모듈.
const jwt = require('jsonwebtoken');
// CORS 설정을 쉽게 도와주는 모듈
const cors = require('cors');

const app = express();

// 미들웨어를 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

// DB에 있는 유저 정보를 흉내내는 객체
const userInfo = {
    username: 'sungwoong',    // 변경된 username
    password: 'pass1234',     // 변경된 password
    email: 'sungwoong@example.com'  // 임의의 이메일
};

// 토큰을 만들 때 쓰는 유저 객체
const user = {
    username: userInfo.username,
    email: userInfo.email
};

// 두개의 토큰에 대한 만료기한 옵션 : access토큰은 짧게, refresh토큰은 길게
const accessOpt = {
    expiresIn: '15m'
};
const refreshOpt = { expiresIn: '7d' };

// 쿠키 옵션
const cookieOpt = {
    httpOnly: true,
    sameSite: 'Strict',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
};

// 인증 미들웨어 설정
const isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return next('route');
    }

    let auth = req.headers.authorization;
    if (auth.startsWith("Bearer ")) {
        auth = auth.substring(7, auth.length);
    }

    const user = jwt.verify(auth, ACCESS_TOKEN_SECRET);

    // 인증된 유저가 있다면 다음 미들웨어로. 아니라면 다음 라우팅으로.
    if (user) return next();
    else return next('route');
};

// 기본 라우팅
app.get('/', isAuthenticated, function (req, res) {
    return res.status(200).send("허용된 요청입니다.");
});

app.get('/', (req, res) => {
    return res.status(401).send("허용되지 않은 요청입니다.");
});

// 로그인 라우팅
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username, password);

    if (username === userInfo.username && password === userInfo.password) {
        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, accessOpt);
        const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, refreshOpt);

        // cookie에는 refresh토큰을 담습니다.
        console.log("jwt 토큰이 생성되었습니다.");
        console.log(refreshToken);
        console.log(accessToken);

        res.cookie('jwt', refreshToken, cookieOpt);
        return res.json({ accessToken, refreshToken });
    } else {
        // 인증되지 않은 경우
        return res.status(401).json({ message: "인증되지 않은 요청입니다." });
    }
});

// refresh 토큰을 이용한 access 토큰 재발급 라우팅
app.post('/refresh', (req, res) => {
    console.log("REFRESH 요청");
    console.log(req.cookies);

    if (req.cookies.jwt) {
        const refreshToken = req.cookies.jwt;
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: '인증되지 않은 요청입니다.' });
            } else {
                console.log(decoded);
                const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, accessOpt);
                return res.json({ accessToken });
            }
        });
    } else {
        return res.status(401).json({ message: "인증되지 않은 요청입니다." });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버시작 : http://localhost:${PORT}`);
    console.log(`로그인 요청 : http://localhost:${PORT}/login`);
    console.log(`refresh 요청 : http://localhost:${PORT}/refresh`);
});
