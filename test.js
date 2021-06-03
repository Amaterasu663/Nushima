const http = require('http');//ライブラリの召喚

const hostname = '127.0.0.1';
const port = 3000;
//ポート番号：TCP/IP通信において、 コンピュータが通信に使用するプログラムを識別するための番号
//他のアプリケーションが使っていないものなら何でも基本大丈夫、開発中は基本3000

//function f(a,b){...}
//const f = (a,b) -> {...}※const f =は省略可
//127.0.0.1はローカル（自分のPCってこと）
//これを人のPCでもアクセスできるよう調整することをデプロイという

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');//test/htmlとかapplication/pdfもある
  res.end('Hello World;D');
});
//reqを定義して、resでアウトプット
//terminalの終了はctrl+c

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});