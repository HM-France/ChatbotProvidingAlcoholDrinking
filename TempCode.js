<<<<<<< HEAD
/*
const Survey = async () => {
    agent.add(`หากคุณพอใจในการใช้งานระบบของเรา กรุณาให้คะแนนกับระบบของเราด้วยนะคะ`) ว
    agent.add(`Google Survey : https://forms.gle/xRgpbMYYy1E5g7pk6 `);
    agent.add(`https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2FQR%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B9%81%E0%B8%8A%E0%B8%97%E0%B8%9A%E0%B8%AD%E0%B8%97%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%B3%E0%B8%9B%E0%B8%A3%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%81%E0%B8%AD%E0%B8%A5%E0%B8%81%E0%B8%AD%E0%B8%AE%E0%B8%AD%E0%B8%A5%E0%B9%8C.png?alt=media&token=5e3d75b1-6de6-41da-9822-fc697f6cec9f`);
}


intentMap.set('Survey', DoSurvey);
*/
=======

// const Survey = async () => {
//     agent.add(`หากคุณพอใจในการใช้งานระบบของเรา กรุณาให้คะแนนกับระบบของเราด้วยนะคะ`) ว
//     agent.add(`Google Survey : https://forms.gle/xRgpbMYYy1E5g7pk6 `);
//     agent.add(`https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2FQR%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B9%81%E0%B8%8A%E0%B8%97%E0%B8%9A%E0%B8%AD%E0%B8%97%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%B3%E0%B8%9B%E0%B8%A3%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%81%E0%B8%AD%E0%B8%A5%E0%B8%81%E0%B8%AD%E0%B8%AE%E0%B8%AD%E0%B8%A5%E0%B9%8C.png?alt=media&token=5e3d75b1-6de6-41da-9822-fc697f6cec9f`);
// }


// intentMap.set('Survey', DoSurvey);
>>>>>>> 61af73a8adff414b5e5a040b866fe81654d93f6d
