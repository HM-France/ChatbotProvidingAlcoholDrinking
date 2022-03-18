const general = () => {
    return({
        type: "template",
        altText: "This is a buttons template",
        template: {
            type: "buttons",
            thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            imageBackgroundColor: "#FFFFFF",
            title: "Menu",
            text: "Please select",
            defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/123"
            },
            actions: [
                {
                  type: "message",
                  label: "สุราคืออะไร",
                  text: "สุราคืออะไร"                
                },
                {
                    type: "message",
                    label: "ร่างกายเผาผลาญแอลกอฮอล์อย่างไร",
                    text: "ร่างกายเผาผลาญแอลกอฮอล์อย่างไร"                
                },
                {
                    type: "message",
                    label: "อาการคนเมาสุรา",
                    text: "อาการคนเมาสุรา"                
                },
                {
                    type: "message",
                    label: "อาการคนติดสุรา",
                    text: "อาการคนติดสุรา"                
                },
                {
                    type: "message",
                    label: "อาการถอนพิษสุรา",
                    text: "อาการถอนพิษสุรา"                
                }
            ]
        }
      })
}