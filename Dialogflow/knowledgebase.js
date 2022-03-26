
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

/*
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
} */

const AlcoholEffect = () => {
    return ({
        type: "template",
        altText: "ผลกระทบของสุรา",
        template: {
            type: "carousel",
            columns: [
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#FFFFFF",
                  title: "โรคร้ายและผลของสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    type: "message",
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  "actions": [
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
                      }
                  ]
                },
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#000000",
                  title: "โรคร้ายและผลของสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    type: "message",
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  actions: [
                      {
                        type: "message",
                        label: "โรคทางระบบเลือด",
                        text: "โรคทางระบบเลือด"
                      },
                      {
                        type: "message",
                        label: "โรคทางสุขภาพอื่น ๆ",
                        text: "โรคทางสุขภาพอื่น ๆ"
                      },
                      {
                        type: "message",
                        label: "ผลกระทบอื่น ๆ",
                        text: "ผลกระทบอื่น ๆ"
                      }
                  ]
                }
            ],
            imageAspectRatio: "rectangle",
            imageSize: "cover"
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
                    type: "message",
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  "actions": [
                      {
                        type: "message",
                        label: "การเลิกสุราด้วยตัวเอง",
                        text: "การเลิกสุราด้วยตัวเอง"
                      },
                      {
                        type: "message",
                        label: "การเลิกสุรากับหมอ",
                        text: "การเลิกสุรากับหมอ"
                      },
                      {
                        type: "message",
                        label: "การป้องกันการกลับไปดื่มซ้ำ",
                        text: "การป้องกันการกลับไปดื่มซ้ำ"
                      }
                  ]
                },
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#000000",
                  title: "วิธีช่วยคนให้เลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    type: "message",
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
                        label: "เมื่อเสี่ยงทำร้ายตัวเอง",
                        text: "เมื่อเสี่ยงทำร้ายตัวเอง"
                      },
                      {
                        type: "message",
                        label: "ใครบ้างที่ควรพบแพทย์",
                        text: "ใครบ้างที่ควรพบแพทย์"
                      }
                  ]
                },
                {
                  thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",
                  imageBackgroundColor: "#000000",
                  title: "เทคนิคการเลิกสุรา",
                  text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
                  defaultAction: {
                    type: "message",
                    label: "วิธีการใช้งาน",
                    text: "วิธีการใช้งาน"
                  },
                  actions: [
                      {
                        type: "message",
                        label: "เทคนิคแก้เมาค้าง",
                        text: "เทคนิคแก้เมาค้าง"
                      },
                      {
                        type: "message",
                        label: "น้ำดื่มทางเลือก",
                        text: "น้ำดื่มทางเลือก"
                      },
                      {
                        type: "message",
                        label: "-",
                        text: "-"
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

const Contact = () => {
    return({
        type: "template",
        altText: "เบอร์ติดต่อฉุกเฉิน",
        template: {
            type: "buttons",
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2FDocument.jpg?alt=media&token=e9d7be53-561e-44c0-b7c2-4b8ae76164b0",              
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            imageBackgroundColor: "#FFFFFF",
            title: "เบอร์โทรติดต่อฉุกเฉิน",
            text: "เชิญเลือกหัวข้อที่สนใจได้เลยค่ะ",
            defaultAction: {
                type: "message",
                  label: "วิธีการใช้งาน",
                  text: "วิธีการใช้งาน"
            },
            actions: [
                {
                  type: "message",
                  label: "ศูนย์พึ่งได้",
                  text: "ศูนย์พึ่งได้"
                },
                {
                    type: "message",
                    label: "บ้านพักเด็กและครอบครัว",
                    text: "บ้านพักเด็กและครอบครัว"
                },
                {
                    type: "message",
                    label: "สถานีตำรวจที่มีพนักงานหญิง",
                    text: "สถานีตำรวจที่มีพนักงานสอบสวนหญิง"
                },
                {
                    type: "message",
                    label: "รวมโทรศัพท์กรณีฉุกเฉิน",
                    text: "รวมโทรศัพท์กรณีฉุกเฉิน"
                }
            ]
        }
      })
}


const HelpCenter = () => {
    return ({
                "type": "template",
                "altText": "ข้อมูลติดต่อศูนย์พึ่งได้",
                "template": {
                "type": "image_carousel",
                "columns": [
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE01_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF).png?alt=media&token=c292dd21-4256-437d-951b-0da675ef5304",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE01_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF).png?alt=media&token=c292dd21-4256-437d-951b-0da675ef5304"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE02_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87).png?alt=media&token=0bb25a39-6bba-48ab-91ff-dcd031d493ef",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE02_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87).png?alt=media&token=0bb25a39-6bba-48ab-91ff-dcd031d493ef"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE03_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(3)(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%872).png?alt=media&token=9ef54607-bc88-4ee1-9bba-76adab080182",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE03_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(3)(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%872).png?alt=media&token=9ef54607-bc88-4ee1-9bba-76adab080182"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE04_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81).png?alt=media&token=8de6ac8d-cd2b-4f3c-99c9-3618f92825fd",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE04_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81).png?alt=media&token=8de6ac8d-cd2b-4f3c-99c9-3618f92825fd"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE05_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD).png?alt=media&token=bd646272-5f2b-41ec-94ee-284349204570",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE05_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD).png?alt=media&token=bd646272-5f2b-41ec-94ee-284349204570"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE06_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD2).png?alt=media&token=0f9144db-2529-4eeb-9c68-ee6577f2bb6b",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE06_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%95%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD2).png?alt=media&token=0f9144db-2529-4eeb-9c68-ee6577f2bb6b"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE07_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(7)(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD).png?alt=media&token=a5442023-3e4a-4b83-9a90-421cba8ccb09",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE07_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(7)(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD).png?alt=media&token=a5442023-3e4a-4b83-9a90-421cba8ccb09"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE08_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%83%E0%B8%95%E0%B9%89).png?alt=media&token=296602ae-00ad-490d-ba58-3713b8ae1bae",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE08_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%83%E0%B8%95%E0%B9%89).png?alt=media&token=296602ae-00ad-490d-ba58-3713b8ae1bae"
                    }
                    },
                    {
                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE09_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%83%E0%B8%95%E0%B9%892).png?alt=media&token=ca8b5051-db4c-4903-959b-d5fd4170e992",
                    "action": {
                        "type": "uri",
                        "label": "กดเพื่อดูรูป",
                        "uri": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE09_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B9%83%E0%B8%95%E0%B9%892).png?alt=media&token=ca8b5051-db4c-4903-959b-d5fd4170e992"
                    }
                    }
                ]
                }
            })
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

module.exports = {Flex,MainMenu,IncludingAlcohol,AlcoholEffect,AlcoholIllness,AlcoholTreatment,Contact}