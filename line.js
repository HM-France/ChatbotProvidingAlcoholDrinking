const { post, get } = require("axios");
const crypto = require("crypto");
const { userDB } = require("./firebase");

const { CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET } = require("./config");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_PROFILE_API = "https://api.line.me/v2/bot/profile";
const LINE_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
};
const wait = async (timeInSec) =>
  new Promise((resolve) => setTimeout(resolve, timeInSec * 1000));

const verifyXLineSignature = (request, response) => {
  const signature = crypto
    .createHmac("SHA256", CHANNEL_SECRET)
    .update(JSON.stringify(request.body))
    .digest("base64")
    .toString();
  if (signature !== request.headers["x-line-signature"]) {
    response.status(401).send("Unauthorized");
    return false;
  }
  return true;
};

const push = (userId, messages) => {
  return post(
    `${LINE_MESSAGING_API}/push`,
    { to: userId, messages },
    { headers: LINE_HEADERS }
  );
};

const reply = (replyToken, messages) => {
  return post(
    `${LINE_MESSAGING_API}/reply`,
    { replyToken, messages },
    { headers: LINE_HEADERS }
  );
};

const delayReply = async (userId, replyToken, messages) => {
  const delaytime = 2;
  const messagesMapped = messages.map((message) => ({
    type: "text",
    text: message,
  }));

  for (let index = 0; index < messagesMapped.length; index++) {
    if (index === 0) await reply(replyToken, [messagesMapped[index]]);
    else await push(userId, [messagesMapped[index]]);
    await wait(delaytime);
  }
};

const getUserDisplayName = (userId) => {
  return get(`${LINE_PROFILE_API}/${userId}`, { headers: LINE_HEADERS });
};

const follow = async (userId, replyToken) => {
  const { displayName: name } = (await getUserDisplayName(userId)).data;
  await userDB.create(userId);
  await delayReply(userId, replyToken, [
    "ฉันชื่อ น้องตั้งใจ เป็นบอทที่จะมาช่วยดูแลเรื่องการดื่มแอลกอฮอล์ของคุณนะคะ 🙇🏽‍♀️",
    "การสนทนาของเราจะถูกเก็บไว้เป็นความลับ และจะถูกใช้เพื่อการวิจัยและพัฒนาเท่านั้น ตัวตนของคุณจะไม่ถูกเปิดเผยแน่นอนค่ะ",
    "เนื่องจากน้องตั้งใจ เป็นบอทให้คำแนะนำมือใหม่ และระบบยังต้องการการพัฒนาอีกมาก",
  ]); 
  await push(userId, [
    {
      type: "text",
      text: "หากเกิดปัญหาขัดข้องระหว่างพูดคุย 🤷🏽‍♀️ กรุณากดเลือก “บล็อค” ที่ปุ่มคำสั่งที่มุมบนขวาของหน้าจอ และกด “ปลดบล๊อค” เพื่อให้น้องตั้งใจเริ่มต้นการทำงานใหม่นะคะ"
    },
  ]);
};

const unfollow = async (userId) => {
  return await userDB.delete(userId);
};

const sentToDialogflow = (request) => {
  request.headers.host = "dialogflow.cloud.google.com"; // webhook URL
  return post(
    //"https://dialogflow.cloud.google.com/v1/integrations/line/webhook/5c439291-fec7-4ab9-9e84-7f0993efd633",
    "https://bots.dialogflow.com/line/a05a1e09-11fa-45da-8582-354d255ce5f2/webhook",
    JSON.stringify(request.body),
    { headers: request.headers }
  );
};

const myexp = (request, response) => {
  const event = request.body.events[0];
  const { type, source } = event;
  console.log(event);
  if (verifyXLineSignature(request, response)) {
    if (type === "message" && event.message.type === "text") {
      sentToDialogflow(request)
        .then(() => {
          response.status(200).send("Sent to dialogflow is ok.");
        })
        .catch((err) => console.error("Sent to dialogflow Error: ", err));
    } else if (type === "follow") {
      follow(source.userId, event.replyToken)
        .then(() => {
          response.status(200).send("Follow is ok.");
          console.log("New User: ", source.userId);
        })
        .catch((err) => console.error("Follow Error: ", err));
    } else if (type === "unfollow") {
      unfollow(source.userId);
    }
  }
};

module.exports = myexp;
