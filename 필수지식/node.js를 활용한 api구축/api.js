const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/product', (req, res) => {
  try {
    const productData = JSON.parse(fs.readFileSync('a.json', { encoding: 'utf-8' }));
    res.json(productData);
  } catch (error) {
    console.error('JSON 파일 읽기 오류:', error);
    res.status(500).send('서버 오류');
  }
});

app.listen(port, () => {
  console.log(`서버가 http://127.0.0.1:${port} 에서 실행 중입니다.`);
});
