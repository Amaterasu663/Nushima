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
const confirmBtn1 = document.getElementById('confirmBtn1');
const confirmBtn2 = document.getElementById('confirmBtn2');
var selectEl_1 = document.getElementById('select_1');
var selectEl_2 = document.getElementById('select_2');

var MLanguages = "";
var JPLevels = "";
var joho = "";

const FBList = document.getElementById('FBList');
const HahButtons = document.getElementById('remote-bottons');
const NativeSpeakers = document.getElementById('nativeSpeakers');
const Element0 = document.getElementById('TosendFB');
const Element2 = document.getElementById('ToshowFB');
const revisebyKanri = document.getElementById('reviseRecognition');
const GobackButton = document.getElementById('js-goback');
const IgotitButton = document.getElementById('js-igotit');
const IdontgetitButton =document.getElementById('js-idontgetit');
const NextButton = document.getElementById('js-next');
const Already = document.getElementById('already');
const OthersCorrect = document.getElementById("otherscorrect");
const SmallExplanation = document.getElementById("smallexplanation");

const ShitekiButton = document.getElementById('shitekiButton');
const metoosend = document.getElementById("Metoosend");

const checkmine = document.getElementById("CheckMine");
const checkedmine = document.getElementById("CheckedMine");

  Already.style.display = "none";
  OthersCorrect.style.display = "none";
  SmallExplanation.style.display = "none";
  metoosend.style.display = "none";
  checkmine.style.display = "none";
  checkedmine.style.display = "none";

// モーダルダイアログ：閉じるまで、同じアプリケーションの他のウィンドウに対する操作ができないダイアログボックスのこと
// <->モードレスダイアログ
if(group == true　&& Myname=="管理"){
  HahButtons.remove();
  NativeSpeakers.remove();
}
else if(group == true　&& Myname!="管理"){
  Element0.style.display = "none";
  HahButtons.remove();
  NativeSpeakers.remove();
  revisebyKanri.remove();

  Dialog_1.showModal();
  confirmBtn1.addEventListener('click', function (e) {
    if (MLanguages !== "") {
      Dialog_1.close();
      Dialog_2.showModal();
    }
    else {
      e.stopPropagation();
    }
  });
  confirmBtn2.addEventListener('click', () => {
    Dialog_2.close();
    joho = "名前：" + Myname + "<br><br>母語：" + MLanguages + "<br><br>日本語レベル：<br>" + JPLevels + "<br><br>";
    ryugakusei.innerHTML += joho;
  });

  function inputChange_1() {
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

}
else {
  Element0.style.display = "none";
  Element2.remove();
  revisebyKanri.remove();
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
  const FBContent = document.getElementById('FBContent');
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
      if (group == true && Myname !="管理") {
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

      if (group == true && Myname !="管理") {
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
          ryugakusei.innerHTML = "◎参加する留学生の情報<br>"+ data.msg;
          break;

        case 'text':
          if(data.mark == "0"){
            originalHatsugen(data.msg);
          }
          else{
            alert(data.mark);
          }
          break;

        case 'Hah':
          didyousayHah = true;
          HahbyWho.push([data.name]);

          // if(Myname=="管理"){
          //   var div_Hah = document.createElement("div");
          //   revisebyKanri.appendChild(div_Hah);
          //   div_Hah.innerHTML = data.name + "さんによる「え？」<br><br>";
          //   var btn_Hah = document.createElement("button");
          //   btn_Hah.innerText = "確認";
          //   revisebyKanri.appendChild(btn_Hah);
          //   btn_Hah.onclick = (e) => {
          //     btn_Hah.remove();
          //     room.send({ name: data.name, type: "HahBack" });
          //   }  
          // }
          break;
        
        case 'HahBack':
          if(Myname==data.name){
            var div_Eh = document.createElement("div");
            div_Eh.classList.add("Hah");
            div_Eh.innerText = "え？🤔";
            FBContent.appendChild(div_Eh);
            FBContent.appendChild(document.createElement("br"))
            // console.log(dontscroll2 + "お？");
            if(dontscroll2 == false){
              // console.log(dontscroll2 + "か？");
              FBContent.scrollTop = FBContent.scrollHeight;
            }    
          }
          break;

        case 'revised':
          hatsugen(data.msg);
          break;

        case 'understand':
          // console.log(data.genbun+data.name+data.msg);ここで、data.msgは届いてる
          // console.log("オールしてきの長さ" +AllShiteki.length);
          for(i=0; i<AllShiteki.length; i++){
            // console.log(AllShiteki[i][3]);
            // console.log(data.genbun);
            // alert(AllShiteki[i][2]);
            // alert(data.name);
            // if(AllShiteki[i][3].join(",")==data.genbun.join(",")){
            //   console.log("1つ目の条件");
            // }

            if(AllShiteki[i][3].join(",")==data.genbun.join(",") && AllShiteki[i][2]==data.name){
              //表示追加
              // alert("ああああああああ");
              // alert(AllShiteki[i][4]);

              AllShiteki[i][4]=data.msg;
              // alert(AllShiteki[i][4]);
              
              break;
            }
          }
          for(i=0;i<NewAllShiteki.length;i++){
            if(NewAllShiteki[i][3].join(",")==data.genbun.join(",") && NewAllShiteki[i][2]==data.name){
              NewAllShiteki[i][5]=data.msg;
              break;
            }
          }
          break;

        //他の人の指摘をここで蓄積（二次元配列で）＋自分の指摘は送るときに別途蓄積
        case 'teisei':
          AllShiteki.push([data.msg1, data.msg2, data.name, data.genbun, 0]);
          //いいねの数をカウントアップ→表示用のAllshitekiをつくる

          for (i = 0; i < NewAllShiteki.length; i++) {
            if (NewAllShiteki[i][0] == data.msg1 && NewAllShiteki[i][1] == data.msg2) {
              NewAllShiteki[i][4]++;
              break;
            }
          }

          if (NewAllShiteki.length == i) {
            NewAllShiteki.push([data.msg1, data.msg2, data.name, data.genbun, 0, 0]);
            // alert("あああああああああああ"+CurrentShiteki);
            if (NewAllShiteki.length == 1) {
              sentfB.innerHTML = "◎届いた指摘<br>" + data.msg1 + "<br><br>" + data.msg2 + "<br><br>訂正してくれた人：" + data.name + "　👍" + NewAllShiteki[CurrentShiteki][4];
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

    // 退室時の処理（for closing room members
    room.on('peerLeave', peerId => {
      for (i = 0; i < loginUsers.children.length; i++) {
        if (loginUsers.children[i].id == peerId) {
          loginUsers.children[i].remove();
        }
      }
    });

    leaveTrigger.addEventListener('click', () => room.close(), { once: true });
    // for closing myself
    room.once('close', () => {
      for (i = 0; i < loginUsers.children.length; i++) {
        if (loginUsers.children[i].id == MypeerId) {
          loginUsers.children[i].remove();
        }
      }
      alert("退室完了");
    });

    //え？ボタンが押されたとき
    const hahButton = document.getElementById('Button-Hah');

    if(group == false){
    hahButton.addEventListener('click', onClickHah);
    function onClickHah (){
      room.send({ name: Myname, type: 'Hah'});
    }
    }

    // //届いた指摘に対する言語学習者のリアクション
    // IgotitButton.addEventListener('click', onClickIgotit);
    // IdontgetitButton.addEventListener('click', onClickIdontgetit);
    // NextButton.addEventListener('click', onClickNext);
    // GobackButton.addEventListener('click', onClickGoback);

    // function onClickIgotit(){
    //   sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💖";
    //   NewAllShiteki[CurrentShiteki][5] = 1;
    //   room.send({type: "understand", genbun: NewAllShiteki[CurrentShiteki][3], msg:NewAllShiteki[CurrentShiteki][5], name:NewAllShiteki[CurrentShiteki][2] });
    // }

    // function onClickIdontgetit(){
    //   sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💭";
    //   NewAllShiteki[CurrentShiteki][5] = 2;
    //   room.send({type: "understand", genbun: NewAllShiteki[CurrentShiteki][3], msg:NewAllShiteki[CurrentShiteki][5], name:NewAllShiteki[CurrentShiteki][2]  });
    // }

    // function onClickNext() {
    //   GobackButton.disabled = false;
    //   CurrentShiteki++;
    //   if(NewAllShiteki[CurrentShiteki][5]==0){
    //   sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4];
    //   }
    //   else if(NewAllShiteki[CurrentShiteki][5]==1){
    //   sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💖";
    //   }
    //   else if(NewAllShiteki[CurrentShiteki][5]==2){
    //   sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💭";
    //   }
    //   if (CurrentShiteki == NewAllShiteki.length - 1) {
    //     NextButton.disabled = true;
    //   }
    // }

    // function onClickGoback() {
    //   NextButton.disabled = false;
    //   CurrentShiteki--;
    //   if(NewAllShiteki[CurrentShiteki][5]==0){
    //     sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4];
    //     }
    //     else if(NewAllShiteki[CurrentShiteki][5]==1){
    //     sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💖";
    //     }
    //     else if(NewAllShiteki[CurrentShiteki][5]==2){
    //     sentfB.innerHTML = "◎届いた指摘<br>" + NewAllShiteki[CurrentShiteki][0] + "<br><br>" + NewAllShiteki[CurrentShiteki][1] + "<br><br>訂正してくれた人：" + NewAllShiteki[CurrentShiteki][2] + "　👍" + NewAllShiteki[CurrentShiteki][4]+ "　💭";
    //     }
    //     if (CurrentShiteki == 0) {
    //     GobackButton.disabled = true;
    //   }
    // }

    if(group == false){
    sendTrigger.addEventListener('click', onClickSend);
    }

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
          }

          AllShiteki.push([jimo, moji2, Myname, genbun,0]);
          console.log(AllShiteki);

          room.send({ name: Myname, type: 'teisei', msg1: jimo, msg2: moji2, genbun: genbun });
          // var checkresults = document.getElementById("checkresults");

          for (var j = 0; j < radios.length; j++) {
            radios[j].checked = false;
          }
          sendTrigger.disabled = true;
          localText.value = "";
          messages.innerHTML ="";
          Element0.style.display = "none";
          FBList.style.display = "block";
        }
      }
    }
  });

  const radios = document.getElementsByName('correct');

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
              messages.innerHTML = "<br>" + jimo + "<br><br>" + moji;
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
              messages.innerHTML = "<br>" + jimo + "<br><br>" + moji;
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
              messages.innerHTML = "<br>" + jimo + "<br><br>" + moji;
              break;
          }

        }
      }
    }
  }
 
//他の人が既に指摘をしていたときのリアクション
  // const othersShitekibox = document.getElementById('othersShitekibox');
  // const MyShiteki = document.getElementById("MyShiteki");
  // const metoosend = document.getElementById("Metoosend");
  // const Yes = document.getElementById('yesbutton');
  // const No = document.getElementById('nobutton');
  // const radios2 = document.getElementsByName('bestanswer');
  // // const checkｍesults = document.getElementById('checkｍesults');
  // checkedmine.addEventListener('click', onClickedMine);
  // Yes.addEventListener('click', onClickYes);
  // No.addEventListener('click', onClickNo);
  // metoosend.addEventListener('click', onClickMeToo);

  // function onClickedMine() {
  //   MyShiteki.style.display = "none";
  //   checkmine.style.display = "none";
  //   Element0.style.display = "block";
  //   messages.innerHTML = "";
  //   messages.style.display = "block";
  //   // ShitekiButton.style.display = "block";
  // }

  // //既にある指摘と別の指摘を送る場合
  // function onClickYes() {
  //   Already.style.display = "none";
  //   OthersCorrect.style.display = "none";
  //   othersShitekibox.style.display = "none";
  //   Element0.style.display = "block";
  //   ShitekiButton.style.display = "block";
  //   messages.style.display = "block";
  // }
  // //ラジオボタン（いいね！）の選択をさせる場合
  // function onClickNo() {
  //   SmallExplanation.style.display = "block";
  //   metoosend.style.display = "block";
  //   metoosend.disabled = false;
  // }

  // function onClickMeToo() {
  //   for (var i = 0; i < radios2.length; i++) {
  //     if (radios2[i].checked == true) {
  //       // console.log(AllShiteki[i][1]);
  //       Radiojunban = radios2[i].value
  //     }
  //   }
  //   AllShiteki.push([AllShiteki[Radiojunban][0], AllShiteki[Radiojunban][1], Myname, genbun,0]);
  //   room.send({ name: Myname, type: 'teisei', msg1: AllShiteki[Radiojunban][0], msg2: AllShiteki[Radiojunban][1], genbun: genbun });

  //   // if (group == false) {
  //   //   checkｍesults.innerHTML = "👍の送信完了！";

  //   //   var kakunin = function () {
  //   //     checkｍesults.innerHTML = "";
  //   //   }
  //   //   setInterval(kakunin, 3000);
  //   // }

  //   Already.style.display = "none";
  //   OthersCorrect.style.display = "none";
  //   othersShitekibox.style.display = "none";
  //   Element0.style.display = "block";
  //   messages.innerHTML = "";
  //   messages.style.display = "block";
  //   ShitekiButton.style.display = "none";

  //   // ShitekiButton.style.display = "block";
  // }

  // 音声認識(分かち書き＋暫定結果の表示なし)
  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'ja-JP';
  // recognition.interimResults = true;
  recognition.continuous = true;
  enableAutomaticPunctuation = true;

  junbanparent = 0;
  junbanparent2 = 0;
  var transcript;
  var transcript2;
  var zenbun = new Array();
  var genbun;
  var junban;
  var jimo;
  var moji;
  var namae;
  var koitsu;
  var AllShiteki = new Array();
  var NewAllShiteki = new Array();
  var CurrentShiteki = 0;
  var Radiojunban;
  // var othersShiteki1;
  // var othersShiteki2;
  var btn;
  var preparation;
  var didyousayHah = false;
  var HahbyWho = new Array();

  // const Kanri = document.getElementById('js-kanri');

  if(group == true && Myname!="管理"){
  recognition.start();
  }
  const segmenter = new TinySegmenter();

  function originalHatsugen(transcript){
    //zenbunのjunbanparent番目に一文ずつ入る
    zenbun[junbanparent] = transcript;
    junbanparent++;
    // console.log(zenbun);
      var div = document.createElement("div");
      revisebyKanri.appendChild(div);
      div.innerText = transcript;
      div.id = "target_" + junbanparent;
      var btn = document.createElement("button");
      btn.innerText = "送信";
      revisebyKanri.appendChild(btn);

      if(dontscroll == false){
        revisebyKanri.scrollTop = revisebyKanri.scrollHeight;
      }

      div.onclick = (e) => {
        div.contentEditable = 'true';
      }

      btn.onclick = (e) => {
        preparation = div.innerText;
        div.contentEditable = "false";
        btn.remove();
        room.send({ msg: preparation, type: "revised" });
      }
  }
  
  function hatsugen(p) {
    transcript2 = segmenter.segment(p);
    junbanko = 0;

    transcript2.forEach(function (t) {
      //junban++と同意
      genbun = transcript2;
      junbanko = junbanko + 1;
      var a = document.createElement("a");
      a.classList.add('ichigo');
      //分かち書きの一語一語にaっていうタグを追加：htmlのため
      a.innerText = t;
      a.id = "target_" + junbanparent2 + "_" + junbanko;

      // junbanparent2は0から、junbankoは1からスタートする
      a.onclick = (e) => {
      // console.log(a.id);クリア
      FBList.style.display = "none";
      Element0.style.display = "block";
      junban = (a.id.split("_"))[2];
      //   // shitekibox(genbun, junban);
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
        
        messages.innerHTML = "<br>" + genbun.join(" ") + "<br><br>" + jimo;
      }

      //   if (group == false) {
      //     MyShiteki.innerHTML = "";
      //     othersShitekibox.innerHTML = "";

      //  //クリックした文章に対して他の人が既に指摘をしていたときの表示
      //     for (i = 0; i < AllShiteki.length; i++) {
      //       if (AllShiteki[i][3].join(",") == genbun.join(",")　&& AllShiteki[i][2] != Myname) {
      //         Element0.style.display = "none";
      //         MyShiteki.style.display = "none";
      //         checkmine.style.display = "none";
      //         checkedmine.style.display = "none";
      //         Already.style.display = "block";
      //         SmallExplanation.style.display = "none";
      //         OthersCorrect.style.display = "block";
      //         othersShitekibox.style.display = "block";
      //         metoosend.disabled = true;
      //         othersShiteki1 = "<label><input type=\'radio\' name = \'bestanswer\' value=" + i + ">👍<p>";
      //         othersShiteki2 = AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] + "</p></label></div><br>";
      //         othersShitekibox.innerHTML += othersShiteki1;
      //         othersShitekibox.innerHTML += othersShiteki2;

      //       }
      //     }

      //    //自分が送った指摘を確認するための表示
      //     for (i = 0; i < AllShiteki.length; i++) {
      //       if (AllShiteki[i][3].join(",") == genbun.join(",") && AllShiteki[i][2] == Myname) {
      //         Already.style.display = "none";
      //         OthersCorrect.style.display = "none";
      //         othersShitekibox.style.display = "none";
      //         ShitekiButton.style.display = "none";
      //         messages.style.display = "none";
      //         checkmine.style.display = "block";
      //         MyShiteki.style.display = "block";
      //         checkedmine.style.display = "block";
      //         if(AllShiteki[i][4]==0){
      //           MyShiteki.innerHTML = AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] + "</p></label></div><br>";
      //         }
      //         else if(AllShiteki[i][4]==1){
      //           MyShiteki.innerHTML = AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] +"　💖"+ "</p></label></div><br>";
      //         }
      //         else if(AllShiteki[i][4]==2){
      //           MyShiteki.innerHTML = AllShiteki[i][0] + "<br>" + AllShiteki[i][1] + "<br>訂正した人：" + AllShiteki[i][2] +"　💭"+ "</p></label></div><br>";
      //         }
      //       }
      //     }

        // }
      // };
      if(group == false){
      FBContent.appendChild(a);
      }

      // console.log(dontscroll2 + "お");
        if(dontscroll2 == false){
          // console.log(dontscroll2 + "か");
          FBContent.scrollTop = FBContent.scrollHeight;
        }

    });
    junbanparent2++;
  }

  if(group == false){
  var closeShitekibox = document.getElementById('js-close-trigger');
  closeShitekibox.disabled = false;
  closeShitekibox.addEventListener('click', onClickCloseShitekibox);
  }
  function onClickCloseShitekibox() {
    Element0.style.display = "none";
    FBList.style.display = "block";
  }


  var dontscroll = false;
  var dontscroll2 = false;

  revisebyKanri.addEventListener( "mouseenter", function() {
    dontscroll = true;
  })
  revisebyKanri.addEventListener( "mouseleave", function(){
    dontscroll = false;
  })

if(group == false){
  FBContent.addEventListener( "mouseenter", function() {
    dontscroll2 = true;
  })
  FBContent.addEventListener( "mouseleave", function() {
    dontscroll2 = false;
  })
}

  //留学生の発言の認識（更新2021/12/05）
  recognition.onresult = (event) => {
    for (var i = event.resultIndex; i < event.results.length; i++) {
      transcript = Myname + "：" + event.results[i][0].transcript + "\n\n";
      if(didyousayHah == false){
        room.send({ name: Myname, msg: transcript, mark: "0", type: "text"}); 
        // originalHatsugen(transcript); 
      }
      //え？が押されているときの場合
      else{
        room.send({ name: Myname, msg: transcript, mark: HahbyWho, type: "text"}); 
        HahbyWho.splice(0);
        didyousayHah = false;
      }
    }
  }

  recognition.onend = function () {
    console.log('Speech has stopped being detected');
    recognition.start();
  }

  peer.on('error', console.error);
})();