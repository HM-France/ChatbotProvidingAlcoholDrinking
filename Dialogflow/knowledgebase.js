
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

const AlcoholEffect = () => {
    return({
        type: "template",
        altText: "ผลกระทบจากสุรา",
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
                  label: "โรคร้ายจากสุรา",
                  text: "โรคร้ายที่เกิดจากการดื่มสุรา ?"
                },
                {
                    type: "message",
                    label: "ผลกระทบอื่นๆ",
                    text: "ผลกระทบต่าง ๆ ของสุรา"
                }
            ]
        }
      })
}


const AlcoholIllness = () => {
    return({
        type: "template",
        altText: "โรคร้ายที่เกิดจากสุรา",
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
                  label: "โรคทางประสาท",
                  text: "โรคทางประสาท"
                },
                {
                    type: "message",
                    label: "โรคมะเร็ง",
                    text: "โรคมะเร็ง"
                },
                {
                    type: "message",
                    label: "โรคเรื้อรัง",
                    text: "โรคเรื้อรัง"
                },
                {
                    type: "message",
                    label: "โรคทางระบบเลือด",
                    text: "โรคทางระบบเลือด"
                }
            ]
        }
      })
}

const AlcoholTreatment = () => {
    return ({
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [
                {
                  thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
                  imageBackgroundColor: "#FFFFFF",
                  title: "วิธีการเลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
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
                  title: "วิธีช่วยคนให้เลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
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

/*
const AlcoholTreatment = () => {
    return({
        type: "template",
        altText: "เกี่ยวกับการเลิกสุรา",
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
                  label: "วิธีการเลิกสุรา",
                  text: "วิธีการเลิกสุรา"
                },
                {
                    type: "message",
                    label: "วิธีช่วยคนให้เลิกสุรา",
                    text: "วิธีช่วยคนให้เลิกสุรา"
                }
            ]
        }
      })
}


const AlcoholTreatment = () => {
    return ({
        type: "template",
        altText: "เกี่ยวกับการเลิกสุรา",
        template: {
            type: "carousel",
            columns: [
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#FFFFFF",
                  title: "วิธีการเลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  actions: [
                    {
                        type: "message",
                        label: "การเลิกด้วยตัวเอง",
                        text: "การเลิกด้วยตัวเอง"
                      },
                      {
                          type: "message",
                          label: "การเลิกกับหมอ",
                          text: "การเลิกกับหมอ"
                      },
                      {
                          type: "message",
                          label: "การป้องกันการดื่มซ้ำ",
                          text: "การป้องกันการดื่มซ้ำ"
                      },
                      {
                          type: "message",
                          label: "น้ำดื่มทางเลือก",
                          text: "น้ำดื่มทางเลือก"
                      }
                  ]
                },
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#000000",
                  title: "วิธีช่วยคนให้เลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  actions: [
                    {
                        type: "message",
                        label: "การช่วยผู้ติดสุรา",
                        text: "การช่วยผู้ติดสุรา"
                      },
                      {
                          type: "message",
                          label: "การแก้อาการเมาค้าง",
                          text: "การแก้อาการเมาค้าง"
                      },
                      {
                          type: "message",
                          label: "เสี่ยงทำร้ายตัวเอง",
                          text: "เสี่ยงทำร้ายตัวเอง"
                      },
                      {
                          type: "message",
                          label: "ใครที่ควรพบแพทย์",
                          text: "ใครที่ควรพบแพทย์"
                      }
                  ]
                }
            ],
            imageAspectRatio: "rectangle",
            imageSize: "cover"
        }
    })
}
*/

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

module.exports = {Flex,MainMenu,IncludingAlcohol,AlcoholEffect,AlcoholIllness,AlcoholTreatment}