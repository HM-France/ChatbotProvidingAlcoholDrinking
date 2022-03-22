const MainMenu = () => {
    return({
        type: "template",
        altText: "This is a buttons template",
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