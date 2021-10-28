const Peer = window.Peer;
//名前入力
var namedata = ['ポムポムプリン', 'キティ', 'ばつ丸', 'マイメロ', 'はろーきてい'];
var nanashi = choose_at_random(namedata);

function choose_at_random(arrayData) {
  var arrayIndex = Math.floor(Math.random() * arrayData.length);
  return arrayData[arrayIndex];
}

var Myname = prompt("あなたの名前を教えてください");
if (Myname == '' || Myname == null) {
  Myname = nanashi;
};

//留学生用のダイアログ
var group = confirm('留学生用のログイン画面に移行しますか');
var Dialog_1 = document.getElementById('Dialog_1');
var Dialog_2 = document.getElementById('Dialog_2');
var Dialog_3 = document.getElementById('Dialog_3');
const confirmBtn1 = document.getElementById('confirmBtn1');
const confirmBtn2 = document.getElementById('confirmBtn2');
const confirmBtn3 = document.getElementById('confirmBtn3');
var selectEl_1 = document.getElementById('select_1');
var selectEl_2 = document.getElementById('select_2');
var selectEl_3 = document.getElementById('select_3');

var MLanguages = "";
var Enthusiasm = "";
var JPLevels = "";
var joho ="";


const Element1 = document.getElementById('js-messages')
const Element2 = document.getElementById('js-sentfB')

// モーダルダイアログ：閉じるまで、同じアプリケーションの他のウィンドウに対する操作ができないダイアログボックスのこと
// <->モードレスダイアログ
if (group == true) {
  Element1.remove();
  Dialog_1.showModal();
  confirmBtn1.addEventListener('click', function(e) {
    if(MLanguages!==""){
    Dialog_1.close();
    Dialog_2.showModal();
    }
    else{
      // alert("あああああああああ");
      e.stopPropagation();
    }
  });
  confirmBtn2.addEventListener('click', () => {
    Dialog_2.close();
    Dialog_3.showModal();
  });
  confirmBtn3.addEventListener('click', () => {
    Dialog_3.close();

    joho = "\n\n名前："+ Myname + "\n\n母語：" + MLanguages + "\n\n日本語レベル：\n" + JPLevels + "\n\nコメント：\n" + Enthusiasm;
    ryugakusei.textContent += joho;
    // console.log(MLanguages, Enthusiasm, JPLevels);
  });

  function inputChange_1() {
    // alert("あああ" + selectEl_1.value);
    MLanguages = selectEl_1.value;
    if(MLanguages == ""){
      confirmBtn1.disabled = true;
    }
    else{
      confirmBtn1.disabled = false;
    }
  }

  function inputChange_2() {
    Enthusiasm = selectEl_2.value;
    if(Enthusiasm == ""){
      confirmBtn2.disabled = true;
    }
    else{
      confirmBtn2.disabled = false;
    }
  }

  function inputChange_3() {
    JPLevels = selectEl_3.value;
    if(JPLevels == ""){
      confirmBtn3.disabled = true;
    }
    else{
      confirmBtn3.disabled = false;
    }
  }
  // window.open('index.ejs', 'mywindow3','width=400, height=300, menubar=no, toolbar=yes, scrollbars=yes')

}
else{
  Element2.remove();
  }


// Skyway
(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  const localText = document.getElementById('js-local-text');
  const sendTrigger = document.getElementById('js-send-trigger');
  const ryugakusei = document.getElementById('ryugakusei');
  const loginUsers = document.getElementById('loginUsers');
  const messages = document.getElementById('js-messages');
  const sentfB = document.getElementById('js-sentfB');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();
  const getRoomModeByHash = () => (location.hash = 'sfu');
  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => (roomMode.textContent = getRoomModeByHash())
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true
      // video: true,
    })
    .catch(console.error);

  // Render local stream
  // localVideo.muted = true;
  // localVideo.srcObject = localStream;
  // localVideo.playsInline = true;
  // await localVideo.play().catch(console.error);

  // eslint-disable-next-line require-atomic-updates
  // name が半角英数字で問題ない場合
  // const peer = (window.peer = new Peer(Myname, {
  //   key: window.__SKYWAY_KEY__,
  //   debug: 3,
  // }));

  var room = null;
  var peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));


  // Register join handler
  joinTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }
      room = peer.joinRoom(3980, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });
    // const room = peer.joinRoom(roomId.value, {
    //   mode: getRoomModeByHash(),
    //   stream: localStream,
    // });

    var inputnames = new Array();
    MypeerId = room._peerId;

    room.once('open', () => {

      //PeerIDとMynameの紐付け、自分を参加者リストに追加
      let Myitem = document.createElement('li');
      Myitem.id = MypeerId;
      Myitem.textContent = Myname + "(あなた)";
      loginUsers.textContent +="\n\n"
      loginUsers.appendChild(Myitem);
      // console.log(Myitem, Myitem.id, Myitem.textContent);

      // 自分の名前をみんなに送信
      room.send({name: Myname, type: "open"});
      if(group == true){
        room.send({name: Myname, msg: joho, type: "leftdown"});
      }

      // 参加者リストへの表示(1)
      peer.listAllPeers((peers)=>{
        // peersには今接続しているメンバーのpeerIDが配列に格納されてる
        // それを引数にして下記のfor文で使う
        // 例）console.log(peers, MypeerId);参加者1なら一致する
        for(i = 0; i < peers.length; i++){
          if (peers[i] !== MypeerId){
            inputnames[i] = document.createElement('li');
            inputnames[i].id = peers[i];
            loginUsers.appendChild(inputnames[i]);
          }
        }
      });

    });

    // 入ってきた人に対して、元々いた人が送る動作
    room.on('peerJoin', peerId => {

      let Youritem = document.createElement('li');
      Youritem.id = peerId;
      loginUsers.appendChild(Youritem);

      room.send({ name: Myname, type: "login", peerId: MypeerId });

      if(group == true){
        room.send({name: Myname, msg: joho, type: "leftdown"});
        // alert("送ったよ！");
      }

      // messages1.textContent += `=== ${Yourname} joined ===\n`;;
    });

    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // // mark peerId to find it later at peerLeave event
      // newVideo.setAttribute('data-peer-id', stream.peerId);
      // remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
    });

    //自分が誰かからメッセージを受け取ったときのイベント
    room.on('data', ({ data, src }) => {
      switch(data.type){
        //既にログインしている人が他者のログインを確認したとき
        //同時に複数名がログインした場合、ちゃんと動くか怪しい
        case'open':
        loginUsers.children[loginUsers.children.length - 1].textContent = data.name;
        break;

        //既にログインしている人がいる中でログインしたとき
        //既にログインしている人みんなから、新たにログインした人に向けての名乗り
        case'login':
        peer.listAllPeers((peers) => {
          function createUsers(){
            if (loginUsers.children.length < peers.length) {
              setTimeout(createUsers, 1000);
            }
            for (i = 0; i < loginUsers.children.length; i++) {
              if (loginUsers.children[i].id == data.peerId) {
                loginUsers.children[i].textContent = data.name;
              }
            }
          };

          createUsers();

        });                                                                                                                                                                                                                                                                                                                                                                                                                                       
        break;

        //留学生から送られてきたとき
        //代入の時の＝は一個、比較（if文）の中だったら＝は二個
        case'leftdown':
          // alert(data.msg); 
          ryugakusei.textContent += data.msg;            
        break;

        case'text':
        hatsugen(data.msg);
        break;
      

        case 'leave':
          alert("ああああああああああああああ");
          for (i = 0; i < loginUsers.children.length; i++) {
            if (loginUsers.children[i].id == data.id) {
              loginUsers.children[i].remove();
            }
          }
        break;
        }
      // Show a message sent to the room and who sent
      // peer.listAllPeers((peers) => {
      //   console.log("あああ" + loginChildren.length);
      //   console.log(data.name);
      // });
      // messages1.textContent += `${data}\n`;
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      room.send({id: peerId, type: "leave"});
      // alert("いいいいいいいい");クリア
      // const remoteVideo = remoteVideos.querySelector(
      //   `[data-peer-id="${peerId}"]`
      // );
      // remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      // remoteVideo.srcObject = null;
      // remoteVideo.remove();

      // messages.textContent += `=== ${peerId} left ===\n`;
    });

    // for closing myself
    room.once('close', () => {
      // sendTrigger.removeEventListener('click', onClickSend);
      // alert("うううううう");クリア
      room.send({id: MypeerId, type: "leave"});

      // room.send(Myname + "：" + localText.value);
      // messages1.textContent += `→${Myname}(あなた)が退出しました\n`;
      // localText.value = '';

      // room.send({ name: Myname, type: "close" });
      // Array.from(remoteVideos.children).forEach(remoteVideo => {
      //   remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      //   remoteVideo.srcObject = null;
      //   remoteVideo.remove();
      // });
    });

    sendTrigger.addEventListener('click', onClickSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    // 「送る」を押したとき働く関数
    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(Myname + "：" + localText.value);

      messages.textContent += `${Myname}: ${localText.value}\n`;
      localText.value = '';
    }
  });

  const radios = document.getElementsByName('correct');
  const len = radios.length;
  // radios[0].checked = true;

  // 音声認識(分かち書き＋暫定結果の表示なし)
  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'ja-JP';
  // recognition.interimResults = true;
  recognition.continuous = true;
  enableAutomaticPunctuation = true;

  junbanparent = 0;
  var zenbun = new Array();

  recognition.start();
  const segmenter = new TinySegmenter();

  function hatsugen(transcript){
    transcript2 = segmenter.segment(transcript);
      // console.log(transcript2);

      //zenbunのjunbanparent番目に一文ずつ入る
      zenbun[junbanparent] = transcript2;

      junbanparent++;

      junbanko = 0;

    transcript2.forEach(function (t) {
      //junban++と同意
      junbanko = junbanko + 1;
      const a = document.createElement("a");
      a.classList.add('ichigo');
      //分かち書きの一語一語にaっていうタグを追加：htmlのため
      a.innerText = t;
      a.id = "target_" + junbanparent + "_" + junbanko;
      // console.log(a);
      a.onclick = (e) => {
        // var Element = document.getElementById("target");

        n = (a.id.split("_"))[1];
        genbun = zenbun[n - 1];

        junban = (a.id.split("_"))[2];
        // // var s = Element.previousElementSibling;
        // // var u = Element.nextElementSibling;
        shitekibox(genbun, junban);
        // prompt(genbun + "\n「" + t + "」" + "をどう修正しましょうか");
        // alert(t);
      };
      resultDiv.appendChild(a);

      resultDiv.scrollTop = resultDiv.scrollHeight;


      function shitekibox(p, q) {
        // console.log(p, q);
        moji = "";
        r = 0;
        p.forEach(function (t) {
          r++;
          if (r == q) {
            moji = moji + "□" + " ";
          }
          else {
            moji = moji + t + " ";
          }
        });
        // console.log(moji);
        messages.textContent += "\n\n" + p.join(" ") + "\n" + moji;

      }
    });
  }

  //自分の発言の認識
  recognition.onresult = (event) => {
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = Myname + "：" + event.results[i][0].transcript + "。\n\n";
      // transcript = segmenter.segment(transcript).join("|");
      // alert(transcript +"ああああああ");
      room.send({ name: Myname, msg: transcript, type: "text", peerId: MypeerId });
      hatsugen(transcript);
      
    }
  }

  // 音声認識パート2(暫定結果の表示あり)
  // SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  // const recognition = new SpeechRecognition();

  // recognition.lang = 'ja-JP';
  // recognition.interimResults = true;
  // recognition.continuous = true;

  // let finalTranscript = ''; // 確定した(黒の)認識結果
  // recognition.start();
  // const segmenter = new TinySegmenter()
  // recognition.onresult = (event) => {
  //   let interimTranscript = ''; // 暫定(灰色)の認識結果
  //   for (let i = event.resultIndex; i < event.results.length; i++) {
  //     let transcript = event.results[i][0].transcript + "。";
  //     // transcript = segmenter.segment(transcript).join("|");
  //     transcript = segmenter.segment(transcript)
  //     // console.log(transcript[0]);
  //     if (event.results[i].isFinal) {
  //       finalTranscript += transcript;
  //     } else {
  //       interimTranscript = transcript;
  //     }
  //       transcript.forEach(function (t) {
  //         const a = document.createElement("a");
  //         a.classList.add('ichigo');
  //         //分かち書きの一語一語にaっていうタグを追加：htmlのため
  //         a.innerText = t;
  //         console.log(a);
  //         a.onclick = (e) => {
  //           alert(t);
  //         };
  //         resultDiv.appendChild(a);
  //     });
  //   }

  //   // resultDiv.innerHTML = name + "：" + finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
  // }

  recognition.onend = function () {
    console.log('Speech has stopped being detected');
    recognition.start();
  }

  peer.on('error', console.error);
})();