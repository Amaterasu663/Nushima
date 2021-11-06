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
var joho = "";


const Element1 = document.getElementById('js-messages')
const Element2 = document.getElementById('js-sentfB')
const GobackButton = document.getElementById('js-goback')
const NextButton = document.getElementById('js-next')
const Already = document.getElementById('already');
const OthersCorrect = document.getElementById("otherscorrect");
const SmallExplanation = document.getElementById("smallexplanation");

const ShitekiButton = document.getElementById('shitekiButton')
const metoosend = document.getElementById("Metoosend");

const checkmine = document.getElementById("CheckMine");
const checkedmine = document.getElementById("CheckedMine");

// モーダルダイアログ：閉じるまで、同じアプリケーションの他のウィンドウに対する操作ができないダイアログボックスのこと
// <->モードレスダイアログ
if (group == true) {
  Element1.remove();
  ShitekiButton.remove();
  Already.style.display = "none";
  OthersCorrect.style.display = "none";
  SmallExplanation.style.display = "none";
  metoosend.style.display = "none";
  checkmine.style.display = "none";
  checkedmine.style.display = "none";

  Dialog_1.showModal();
  confirmBtn1.addEventListener('click', function (e) {
    if (MLanguages !== "") {
      Dialog_1.close();
      Dialog_2.showModal();
    }
    else {
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

    joho = "名前：" + Myname + "<br><br>母語：" + MLanguages + "<br><br>日本語レベル：<br>" + JPLevels + "<br><br>コメント：<br>" + Enthusiasm + "<br><br>";
    ryugakusei.innerHTML += joho;
    // console.log(MLanguages, Enthusiasm, JPLevels);
  });

  function inputChange_1() {
    // alert("あああ" + selectEl_1.value);
    MLanguages = selectEl_1.value;
    if (MLanguages == "") {
      confirmBtn1.disabled = true;
    }
    else {
      confirmBtn1.disabled = false;
    }
  }

  function inputChange_2() {
    JPLevels = selectEl_2.value;
    if (JPLevels == "") {
      confirmBtn2.disabled = true;
    }
    else {
      confirmBtn2.disabled = false;
    }
  }

  function inputChange_3() {
    Enthusiasm = selectEl_3.value;
    if (Enthusiasm == "") {
      confirmBtn3.disabled = true;
    }
    else {
      confirmBtn3.disabled = false;
    }
  }
  // window.open('index.ejs', 'mywindow3','width=400, height=300, menubar=no, toolbar=yes, scrollbars=yes')

}
else {
  Element2.remove();
  GobackButton.remove();
  NextButton.remove();
  document.getElementById("already").style.display = "none";
  document.getElementById("otherscorrect").style.display = "none";
  SmallExplanation.style.display = "none";
  metoosend.style.display = "none";
  checkmine.style.display = "none";
  checkedmine.style.display = "none";
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

  // const onoffSwitch = () => {
  //   const OnOff = document.getElementById("switch1");
  //   if (OnOff.checked == "false") {
  //     localStream.getAudioTracks().forEach((track) => (track.enabled = true));
  //   } 
  //   //ミュートにする場合
  //   else {
  //     localStream.getAudioTracks().forEach((track) => (track.enabled = false));
  //   }
  // }
  // setInterval(onoffSwitch, 1000);


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
      Myitem.innerHTML = Myname + "(あなた)";
      loginUsers.innerHTML += "<br>"
      loginUsers.appendChild(Myitem);
      // console.log(Myitem, Myitem.id, Myitem.textContent);

      // 自分の名前をみんなに送信
      room.send({ name: Myname, type: "open" });
      if (group == true) {
        room.send({ name: Myname, msg: joho, type: "leftdown" });
      }

      // 参加者リストへの表示(1)
      peer.listAllPeers((peers) => {
        // peersには今接続しているメンバーのpeerIDが配列に格納されてる
        // それを引数にして下記のfor文で使う
        // 例）console.log(peers, MypeerId);参加者1なら一致する
        for (i = 0; i < peers.length; i++) {
          if (peers[i] !== MypeerId) {
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

      if (group == true) {
        room.send({ name: Myname, msg: joho, type: "leftdown" });
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
      switch (data.type) {
        //既にログインしている人が他者のログインを確認したとき
        //同時に複数名がログインした場合、ちゃんと動くか怪しい
        case 'open':
          loginUsers.children[loginUsers.children.length - 1].innerHTML = data.name;
          break;

        //既にログインしている人がいる中でログインしたとき
        //既にログインしている人みんなから、新たにログインした人に向けての名乗り
        case 'login':
          peer.listAllPeers((peers) => {
            function createUsers() {
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
        case 'leftdown':
          // alert(data.msg); 
          ryugakusei.innerHTML = data.msg;
          break;

        case 'text':
          hatsugen(data.msg);
          break;

        //他の人の指摘をここで蓄積（二次元配列で）＋自分の指摘は送るときに別途蓄積
        case 'teisei':
          AllShiteki.push([data.msg1, data.msg2, data.name, data.genbun]);
          //いいねの数をカウントアップ→表示用のAllshitekiをつくる

          // NextButton.disabled = false;
          // GobackButton.disabled = false;
          for (i = 0; i < NewAllShiteki.length; i++) {
            if (NewAllShiteki[i][0] == data.msg1 && NewAllShiteki[i][1] == data.msg2) {
              NewAllShiteki[i][4]++;
              // sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[i][0] + "<br><br>" + NewAllShiteki[i][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[i][2] + "　👍" + NewAllShiteki[i][4];
              // CurrentShiteki = i;
              // if(i == NewAllShiteki.length-1){
              //   NextButton.disabled = true;
              // }
              // if(i == 0){
              //   GobackButton.disabled = true;
              // }
              break;
            }
          }

          if (NewAllShiteki.length == i) {
            NewAllShiteki.push([data.msg1, data.msg2, data.name, data.genbun, 0]);
            if (NewAllShiteki.length == 1) {
              sentfB.innerHTML = "◎届いた指摘<br>" + data.msg1 + "<br><br>" + data.msg2 + "<br><br>訂正してくれた人：" + data.name;
              NextButton.disabled = true;
              GobackButton.disabled = true;
            }
            else if(CurrentShiteki == 0){
              NextButton.disabled = false;
              GobackButton.disabled = true;
            }
            else{
              NextButton.disabled = false;
              GobackButton.disabled = false;
            }
            // sentfB.innerHTML = "◎届いた指摘<br>" + data.msg1 + "<br><br>" + data.msg2 + "<br><br>訂正してくれた人：" + data.name;
            // CurrentShiteki = NewAllShiteki.length-1;
            // NextButton.disabled = true;
            // if(NewAllShiteki.length == 1){
            //   GobackButton.disabled = true;
            // }
          }

          // for(i=0; i<numberofI.length;i++){
          // if(numberofI[i][0] == numberofI[i+1][0]){
          //   ThumbsUp++;
          // }
          // // else{

          // // }
          // }

          // console.log(AllShiteki);

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
      for (i = 0; i < loginUsers.children.length; i++) {
        if (loginUsers.children[i].id == peerId) {
          loginUsers.children[i].remove();
        }
      }
      // alert("いいいいいいいい");クリア
      // const remoteVideo = remoteVideos.querySelector(
      //   `[data-peer-id="${peerId}"]`
      // );
      // remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      // remoteVideo.srcObject = null;
      // remoteVideo.remove();

      // messages.textContent += `=== ${peerId} left ===\n`;
    });

    leaveTrigger.addEventListener('click', () => room.close(), { once: true });
    // for closing myself
    room.once('close', () => {
      // sendTrigger.removeEventListener('click', onClickSend);
      // alert("うううううう");クリア
      // room.send({id: MypeerId, type: "leave"});
      for (i = 0; i < loginUsers.children.length; i++) {
        if (loginUsers.children[i].id == MypeerId) {
          loginUsers.children[i].remove();
        }
      }
      alert("退室完了");
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

    NextButton.addEventListener('click', onClickNext);
    GobackButton.addEventListener('click', onClickGoback);
    function onClickNext() {
      GobackButton.disabled = false;
      CurrentShiteki++;
      // "◎届いた指摘<br>" + data.msg1 + "<br><br>" + data.msg2 + "<br><br>訂正してくれた人：" + data.name + "　👍" + ThumbsUp;
      sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[i][4];
      if (CurrentShiteki == NewAllShiteki.length - 1) {
        NextButton.disabled = true;
      }
    }

    function onClickGoback() {
      NextButton.disabled = false;
      CurrentShiteki--;
      sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[i][4];
      if (CurrentShiteki == 0) {
        GobackButton.disabled = true;
      }
    }

    sendTrigger.addEventListener('click', onClickSend);
    // leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    // 「送る」を押したとき働く関数
    function onClickSend() {
      var moji2 = "";
      for (var j = 0; j < radios.length; j++) {
        if (radios[j].checked == true) {
          sendTrigger.disabled = false;
          switch (radios[j].value) {
            case 'remove':
              moji2 = moji;
              break;
            case 'justcorrect':
              moji2 = moji.replace("□", "<font color = green>" + localText.value + "</font>");
              break;
            case 'allcorrect':
              moji2 = namae + "<font color = green>" + localText.value + "</font>";
              break;
            // // Send message to all of the peers in the room via websocket
            // room.send(Myname + "：" + localText.value);

            // messages.textContent += `${Myname}: ${localText.value}\n`;
            // localText.value = '';
          }

          AllShiteki.push([jimo, moji2, Myname, genbun]);
          // console.log(AllShiteki);

          room.send({ name: Myname, type: 'teisei', msg1: jimo, msg2: moji2, genbun: genbun });
          var checkresults = document.getElementById("checkresults");
          if (group == false) {
            checkresults.innerHTML = "送信完了！";

            var kakunin = function () {
              checkresults.innerHTML = "";
            }
            setInterval(kakunin, 3000);
          }

          for (var j = 0; j < radios.length; j++) {
            radios[j].checked = false;
          }
          sendTrigger.disabled = true;
          localText.value = "";
          messages.innerHTML = "";
        }
      }
    }
  });

  const radios = document.getElementsByName('correct');

  // radios[0].checked = true;

  for (var i = 0; i < radios.length; i++) {
    radios[i].onchange = function () { //配列を取り出し一つ一つにonchangeを設定
      for (var j = 0; j < radios.length; j++) {
        if (radios[j].checked == true) {
          sendTrigger.disabled = false;
          switch (radios[j].value) {
            case 'remove':
              jimo = "";
              moji = "";
              r = 0;
              genbun.forEach(function (t) {
                r++;
                if (r != junban) {
                  jimo = jimo + t + " ";
                  //moji += t + " "と下は同意
                  moji = moji + t + " ";
                }
                else {
                  jimo = jimo + "<font color = red>" + t + "</font>" + " ";
                }
              });
              // console.log(moji);
              messages.innerHTML = "◎指摘欄<br>" + jimo + "<br><br>" + moji;
              break;

            case 'justcorrect':
              jimo = "";
              moji = "";
              r = 0;
              genbun.forEach(function (t) {
                r++;
                if (r == junban) {
                  jimo = jimo + "<font color = red>" + t + "</font>" + " ";
                  moji = moji + "□" + " ";
                }
                else {
                  jimo = jimo + t + " ";
                  moji = moji + t + " ";
                }
              });
              // console.log(moji);
              messages.innerHTML = "◎指摘欄<br>" + jimo + "<br><br>" + moji;
              break;

            case 'allcorrect':
              jimo = "";
              moji = "";
              namae = "";

              for (i = 0; i < genbun.length; i++) {
                if (genbun[i] == "：") {
                  koitsu = i;
                  // console.log(koitsu);
                }
              }
              for (t = 0; t < koitsu + 1; t++) {
                namae = namae + genbun[t];
                // console.log(namae);
              }

              // namae = genbun[0] + genbun[1];
              jimo = namae + "<font color = red>" + genbun.slice(koitsu + 1).join(" ") + "</font>";
              moji = namae + "？？？";
              messages.innerHTML = "◎指摘欄<br>" + jimo + "<br><br>" + moji;
              break;
          }

        }
      }
    }
  }

  const othersShitekibox = document.getElementById('othersShitekibox');
  const MyShiteki = document.getElementById("MyShiteki");
  const metoosend = document.getElementById("Metoosend");
  const Yes = document.getElementById('yesbutton');
  const No = document.getElementById('nobutton');
  const radios2 = document.getElementsByName('bestanswer');
  checkedmine.addEventListener('click', onClickedMine);
  Yes.addEventListener('click', onClickYes);
  No.addEventListener('click', onClickNo);
  metoosend.addEventListener('click', onClickMeToo);

  function onClickedMine() {
    MyShiteki.style.display = "none";
    checkmine.style.display = "none";
    messages.style.display = "block";
    ShitekiButton.style.display = "block";
  }

  //既にある指摘と別の指摘を送る場合
  function onClickYes() {
    Already.style.display = "none";
    OthersCorrect.style.display = "none";
    othersShitekibox.style.display = "none";
    messages.style.display = "block";
    ShitekiButton.style.display = "block";
  }
  //ラジオボタン（いいね！）の選択をさせる場合
  function onClickNo() {
    SmallExplanation.style.display = "block";
    metoosend.style.display = "block";
    metoosend.disabled = false;
  }

  function onClickMeToo() {
    for (var i = 0; i < radios2.length; i++) {
      if (radios2[i].checked == true) {
        console.log(AllShiteki[i][1]);
        AllShiteki.push([AllShiteki[i][0], AllShiteki[i][1], Myname, genbun]);
        room.send({ name: Myname, type: 'teisei', msg1: AllShiteki[i][0], msg2: AllShiteki[i][1], genbun: genbun });
      }
    }
    Already.style.display = "none";
    OthersCorrect.style.display = "none";
    othersShitekibox.style.display = "none";
    messages.style.display = "block";
    ShitekiButton.style.display = "block";
  }

  // 音声認識(分かち書き＋暫定結果の表示なし)
  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'ja-JP';
  // recognition.interimResults = true;
  recognition.continuous = true;
  enableAutomaticPunctuation = true;

  junbanparent = 0;
  var zenbun = new Array();
  var genbun;
  var junban;
  var jimo;
  var moji;
  var namae;
  var koitsu;
  var AllShiteki = new Array();
  var NewAllShiteki = new Array();
  // var numberofI = new Array();
  var CurrentShiteki = 0;
  // var othersShiteki1;
  // var othersShiteki2;

  recognition.start();
  const segmenter = new TinySegmenter();

  function hatsugen(transcript) {
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
        // shitekibox(genbun, junban);
        for (var j = 0; j < radios.length; j++) {
          radios[j].checked = false;
        }
        if (group == false) {
          sendTrigger.disabled = true;
          localText.value = "";
        }
        jimo = "";
        r = 0;

        genbun.forEach(function (t) {
          r++;
          if (r != junban) {
            jimo = jimo + t + " ";
          }
          else {
            jimo = jimo + "<font color = red>" + t + "</font>" + " ";
          }
        });
        // console.log(moji);
        messages.innerHTML = "◎指摘欄<br>" + jimo;
        // prompt(genbun + "\n「" + t + "」" + "をどう修正しましょうか");
        // alert(t);
        if (group == false) {
          MyShiteki.innerHTML = "";
          othersShitekibox.innerHTML = "";

          for (i = 0; i < AllShiteki.length; i++) {
            if (AllShiteki[i][3] == genbun) {
              // console.log(i + "あああああああああああああああ");
              ShitekiButton.style.display = "none";
              messages.style.display = "none";
              MyShiteki.style.display = "none";
              checkmine.style.display = "none";
              checkedmine.style.display = "none";
              Already.style.display = "block";
              OthersCorrect.style.display = "block";
              othersShitekibox.style.display = "block";
              othersShiteki1 = "<label><input type=\'radio\' name = \'bestanswer\' value=" + i + ">👍<p>";
              othersShiteki2 = AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] + "</p></label></div><br><br>";
              othersShitekibox.innerHTML += othersShiteki1;
              othersShitekibox.innerHTML += othersShiteki2;

            }
          }

          for (i = 0; i < AllShiteki.length; i++) {
            if (AllShiteki[i][3] == genbun && AllShiteki[i][2] == Myname) {
              // messages.innerHTML ="";
              ShitekiButton.style.display = "none";
              messages.style.display = "none";
              checkmine.style.display = "block";
              MyShiteki.style.display = "block";
              checkedmine.style.display = "block";
              MyShiteki.innerHTML += AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] + "</p></label></div><br>";
            }
          }

        }
      };
      resultDiv.appendChild(a);

      resultDiv.scrollTop = resultDiv.scrollHeight;

      //genbunがp（配列）で、junbanがq
      // function shitekibox(p, q) {
      //   // console.log(p, q);
      //   moji = "";
      //   r = 0;
      //   p.forEach(function (t) {
      //     r++;
      //     if (r == q) {
      //       moji = moji + "□" + " ";
      //     }
      //     else {
      //       moji = moji + t + " ";
      //     }
      //   });
      //   // console.log(moji);
      //   messages.textContent = "\n\n" + p.join(" ") + "\n" + moji;

      // }
    });
  }

  //自分の発言の認識
  recognition.onresult = (event) => {
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = Myname + "：" + event.results[i][0].transcript + "\n\n";
      // transcript = segmenter.segment(transcript).join("|");
      // alert(transcript +"ああああああ");
      room.send({ name: Myname, msg: transcript, type: "text", peerId: MypeerId });
      hatsugen(transcript);

    }
  }

  recognition.onend = function () {
    console.log('Speech has stopped being detected');
    recognition.start();
  }

  peer.on('error', console.error);
})();