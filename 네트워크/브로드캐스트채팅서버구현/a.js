const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;

// 정적 파일 서비스 (예: public/index.html)
app.use(express.static(path.join(__dirname, 'public')));

// 루트 요청 처리 (선택사항: 정적 파일로 대체되면 이 줄은 생략 가능)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
