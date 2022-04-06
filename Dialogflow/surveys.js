const Prep = () => {
    return ({
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2Fonline-survey.jpg?alt=media&token=57f00317-4844-4475-809c-8c72ad3ca717",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "https://forms.gle/h76ETgDCsWnaTwYv5?openExternalBrowser=1"
            }
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
              {
                "type": "text",
                "text": "แบบประเมินความพึงพอใจ",
                "wrap": true,
                "weight": "bold",
                "gravity": "center",
                "size": "xl",
                "align": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "📋 ขอบคุณที่ทดลองใช้น้องตั้งใจนะคะ น้องตั้งใจอยากจะขอรบกวนเวลาคุณไม่นาน เพื่อทำแบบสอบถามความพึงพอใจในการใช้งานน้องตั้งใจค่ะ",
                    "wrap": true
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "xxl",
                "contents": [
                  {
                    "type": "button",
                    "color": "#00cc00",
                    "style": "primary",
                    "action": {
                      "type": "uri",
                      "label": "เริ่มต้นทำแบบสอบถาม",
                      "uri": "https://forms.gle/h76ETgDCsWnaTwYv5?openExternalBrowser=1",
                      "altUri": {
                        "desktop": "https://forms.gle/h76ETgDCsWnaTwYv5?openExternalBrowser=1"
                      }
                    }
                  }
                ]
              }
            ]
          },
          "action": {
            "type": "uri",
            "label": "เริ่มต้นทำแบบสอบถาม",
            "uri": "https://forms.gle/h76ETgDCsWnaTwYv5?openExternalBrowser=1",
            "altUri": {
              "desktop": "https://forms.gle/h76ETgDCsWnaTwYv5?openExternalBrowser=1"
            }
          }
        }
      })
}

const level = () => {
    return({
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
          "type": "carousel",
          "contents": [
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2F%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94.png?alt=media&token=e10354fc-2a00-4e87-a421-2dc766aba5e4",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "1:1",
                    "gravity": "top"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ความพึงพอใจน้อยที่สุด",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "weight": "bold",
                        "color": "#ffffff",
                        "size": "xl"
                      }
                    ],
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "backgroundColor": "#03303Acc",
                    "paddingAll": "10px"
                  }
                ],
                "paddingAll": "0px"
              },
              "action": {
                "type": "message",
                "label": "พึงพอใจน้อยที่สุด",
                "text": "พึงพอใจน้อยที่สุด"
              }
            },
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2F%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2.png?alt=media&token=125507f4-4483-4325-a96b-48b38d8673da",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "1:1",
                    "gravity": "top"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ความพึงพอใจน้อย",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "weight": "bold",
                        "color": "#ffffff",
                        "size": "xl"
                      }
                    ],
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "backgroundColor": "#03303Acc",
                    "paddingAll": "10px"
                  }
                ],
                "paddingAll": "0px"
              },
              "action": {
                "type": "message",
                "label": "ความพึงพอใจน้อย",
                "text": "พึงพอใจน้อย"
              }
            },
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2F%E0%B8%9B%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87.png?alt=media&token=5bc1cf72-a814-4936-92ab-338a3e22c89d",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "1:1",
                    "gravity": "top"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ความพึงพอใจปานกลาง",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "weight": "bold",
                        "color": "#ffffff",
                        "size": "xl"
                      }
                    ],
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "backgroundColor": "#03303Acc",
                    "paddingAll": "10px"
                  }
                ],
                "paddingAll": "0px"
              },
              "action": {
                "type": "message",
                "label": "ความพึงพอใจปานกลาง",
                "text": "พึงพอใจปานกลาง"
              }
            },
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2F%E0%B8%A1%E0%B8%B2%E0%B8%81.png?alt=media&token=b293741f-c1c4-4139-a07b-415dcaf669c5",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "1:1",
                    "gravity": "top"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ความพึงพอใจมาก",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "weight": "bold",
                        "color": "#ffffff",
                        "size": "xl"
                      }
                    ],
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "backgroundColor": "#03303Acc",
                    "paddingAll": "10px"
                  }
                ],
                "paddingAll": "0px"
              },
              "action": {
                "type": "message",
                "label": "ความพึงพอใจมาก",
                "text": "พึงพอใจมาก"
              }
            },
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2F%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94.png?alt=media&token=b7792bed-29c5-435b-aa15-490973599b66",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "1:1",
                    "gravity": "top"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "ความพึงพอใจมากที่สุด",
                        "align": "center",
                        "gravity": "center",
                        "wrap": true,
                        "weight": "bold",
                        "color": "#ffffff",
                        "size": "xl"
                      }
                    ],
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "backgroundColor": "#03303Acc",
                    "paddingAll": "10px"
                  }
                ],
                "paddingAll": "0px"
              },
              "action": {
                "type": "message",
                "label": "ความพึงพอใจมากที่สุด",
                "text": "พึงพอใจมากที่สุด"
              }
            }
          ]
        }
      })
}

module.exports = {Prep,level}