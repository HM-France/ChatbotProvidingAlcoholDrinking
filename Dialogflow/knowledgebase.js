const { generateKey } = require('crypto');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { userDB } = require('../firebase');
const  imageCarousels = require('./imageCarousels');

const MainMenu = () => {
    return({
        type: "template",
        altText: "หมวดหมู่ความรู้",
        template: {
            type: "buttons",
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",              
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            imageBackgroundColor: "#FFFFFF",
            title: "Menu",
            text: "เชิญเลือกหมวดหมู่ที่สนใจได้เลยค่ะ",
            defaultAction: {
                type: "message",
                  label: "วิธีการใช้งาน",
                  text: "วิธีการใช้งาน"
            },
            actions: [
                {
                  type: "message",
                  label: "เกี่ยวกับสุรา",
                  text: "เกี่ยวกับสุรา"
                },
                {
                    type: "message",
                    label: "ผลกระทบจากสุรา",
                    text: "ผลกระทบจากสุรา"
                },
                {
                    type: "message",
                    label: "เกี่ยวกับการเลิกสุรา",
                    text: "เกี่ยวกับการเลิกสุรา"
                },
                {
                    type: "message",
                    label: "เบอร์ติดต่อฉุกเฉิน",
                    text: "เบอร์ติดต่อฉุกเฉิน"
                }
            ]
        }
      })
}

const IncludingAlcohol = () => {
    return({
        type: "template",
        altText: "เกี่ยวกับสุรา",
        template: {
            type: "buttons",
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",              
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            imageBackgroundColor: "#FFFFFF",
            title: "Menu",
            text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
            defaultAction: {
                type: "message",
                  label: "วิธีการใช้งาน",
                  text: "วิธีการใช้งาน"
            },
            actions: [
                {
                  type: "message",
                  label: "สุราคืออะไร",
                  text: "สุราคืออะไร ?"
                },
                {
                    type: "message",
                    label: "อาการคนเมาสุรา",
                    text: "คนเมาสุรามีอาการอย่างไร ?"
                },
                {
                    type: "message",
                    label: "อาการคนติดสุรา",
                    text: "คนติดสุรามีพฤติกรรมอย่างไร ?"
                },
                {
                    type: "message",
                    label: "อาการถอนพิษสุรา",
                    text: "อาการถอนพิษสุราเป็นอย่างไร ?"
                }
            ]
        }
      })
}

const WhatIsAlcohol = () => {
    agent.add("🍺 สุรา จัดเป็นสารเสพติดชนิดหนึ่ง เนื่องจากมีเอธิลแอลกอฮอล์เป็นส่วนผสม ซึ่งเอทิลแอกอฮอล์เป็นแอลกอฮอล์ที่ได้จากการแปรรูปจากพืชจำพวกแป้งและน้ำตาล เช่น อ้อย ข้าว ข้าวโพด มันสำปะหลัง") ;
    agent.add("ฤทธิ์ในทางเสพติด คือ ออกฤทธิ์กดประสาท😵‍💫 มีการเสพติดทั้งร่างกายและจิตใจ🧠 ทั้งเบียร์และสุราเป็นเครื่องดื่มที่มีแอลกอฮอล์ มีคุณค่าทางอาการต่ำแต่มีแคลอรี่สูง");
    agent.add("ปัจจุบันสุราเป็นสารเสพติดอีกชนิดหนึ่งที่มีผู้ใช้เกือบทุกกลุ่มวัยเพราะหาซื้อง่าย ใช้ในหลายโอกาสที่สำคัญ");
    return agent.add("ซึ่งคนส่วนใหญ่ยังไม่ได้ตระหนักว่ามันคือ ❗️สารเสพติดที่อันตราย❗️ ทั้งจากตัวของมันเองและเป็นอันตรายในฐานะที่เป็นจุดเริ่มต้นที่นำไปสู่การเสพยาเสพติดอื่น ๆ ตามมา ซึ่งก่อให้เกิดผลเสียทั้งทางด้านร่างกาย จิตใจ อารมณ์และสังคม");;
}

const Drunkenness = async () => {
    return agent.add("Infographic ยังไม่สามารถใช้งานได้ในขณะนี้") ;
}

const Flex = () => {
    return ({
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [
                {
                  thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
                  imageBackgroundColor: "#FFFFFF",
                  title: "this is menu",
                  text: "description",
                  defaultAction: {
                      type: "uri",
                      label: "View detail",
                      uri: "http://example.com/page/123"
                  },
                  "actions": [
                      {
                          type: "postback",
                          label: "Buy",
                          data: "action=buy&itemid=111"
                      },
                      {
                          type: "postback",
                          label: "Add to cart",
                          data: "action=add&itemid=111"
                      },
                      {
                          type: "uri",
                          label: "View detail",
                          uri: "http://example.com/page/111"
                      }
                  ]
                },
                {
                  thumbnailImageUrl: "https://example.com/bot/images/item2.jpg",
                  imageBackgroundColor: "#000000",
                  title: "this is menu",
                  text: "description",
                  defaultAction: {
                      type: "uri",
                      label: "View detail",
                      uri: "http://example.com/page/222"
                  },
                  actions: [
                      {
                          type: "postback",
                          label: "Buy",
                          data: "action=buy&itemid=222"
                      },
                      {
                          type: "postback",
                          label: "Add to cart",
                          data: "action=add&itemid=222"
                      },
                      {
                          type: "uri",
                          label: "View detail",
                          uri: "http://example.com/page/222"
                      }
                  ]
                }
            ],
            imageAspectRatio: "rectangle",
            imageSize: "cover"
        }
    })
}

module.exports = {Flex,MainMenu,IncludingAlcohol,WhatIsAlcohol,Drunkenness}