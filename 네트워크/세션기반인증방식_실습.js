const express = require('express');
const session = require('express-session');
const escapeHtml = require('escape-html');

const app = express();

// 세션 설정
app.use(session({
  name: "custom-session",
  secret: "9e8821c8ef4ab43ba09310af54e98caedc13e314efdea720bf513b9b3675faf4", // 보안용 해시
  resave: false,
  saveUninitialized: false
}));

// 로그인 여부 체크 미들웨어
const checkLogin = (req, res, next) => {
  if (req.session.user) return next();
  next('route');
};

// 로그인된 사용자에게 보이는 페이지
app.get('/', checkLogin, (req, res) => {
  res.send(`${escapeHtml(req.session.user)} 님, 접속을 환영합니다! <br><a href="/logout">로그아웃</a>`);
});

// 로그인하지 않은 사용자에게 보이는 페이지
app.get('/', (req, res) => {
  res.send(`
    <h2>로그인 페이지</h2>
    <form method="POST" action="/login">
      사용자 이름: <input name="user"><br>
      비밀번호: <input name="pass" type="password"><br>
      <button type="submit">로그인</button>
    </form>
  `);
});

// 로그인 처리
app.post('/login', express.urlencoded({ extended: false }), (req, res, next) => {
  const { user, pass } = req.body;
  
  if (user === "admin" && pass === "pass123") {
    req.session.regenerate(err => {
      if (err) return next(err);
      
      req.session.user = user;

      req.session.save(err => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  } else {
    res.redirect('/');
  }
});

// 로그아웃 처리
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// 서버 실행
app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
