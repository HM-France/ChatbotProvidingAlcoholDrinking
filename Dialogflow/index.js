const { generateKey } = require('crypto');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { userDB } = require('../firebase');
const  imageCarousels = require('./imageCarousels');
const  knowladgeBase = require('./knowledgebase');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


const myexp = ((request, response) => {
    //Create an instance
    const agent = new WebhookClient({ request, response });
    const { source: { userId } } = request.body.originalDetectIntentRequest.payload.data;

    function checkConnect(agent) {
        agent.add('Success');
    }

    const createQuickReply = (text, options) => {
        if (options.length) {
            let items = options.map((option) => ({ type: "action", action: { type: "message", label: option, text: option } }))
            return new Payload(
                `LINE`,
                {
                    type: "text",
                    text: text,
                    quickReply: {
                        items: [...items]
                    }
                },
                { sendAsMessage: true }
            );
        }
    }

    const calculateStandardDrink = (percent, volume, numberOfDrinks) => ((((percent / 100) * 0.79 * volume) / 10) * numberOfDrinks).toFixed(1);

    const limitDrink = (gender, percent, volume, phase) => {
        var genderPoint;
        if (phase === 'day') {
            if (gender === 'ชาย') {
                genderPoint = 4;
            } else if (gender === 'หญิง') {
                genderPoint = 3;
            }
        } else if (phase === 'week') {
            if (gender === 'ชาย') {
                genderPoint = 14;
            } else if (gender === 'หญิง') {
                genderPoint = 7;
            }
        }
        return ((genderPoint / (((percent / 100) * 0.79 * volume) / 10))).toFixed(1);
    }

    const setUserProfile = async () => {
        let { age, gender, weight, workStatus, education, salary, useWith } = agent.parameters;

        if (!age) {
            return agent.add('ปีนี้คุณอายุเท่าไหร่แล้วคะ');
        } else if (!gender) {
            return agent.add(createQuickReply(
                'คุณเป็นผู้ชาย หรือผู้หญิงคะ',
                ["ชาย", "หญิง"]
            ));
        } else if (!weight) {
            return agent.add('น้ำหนักของคุณประมาณเท่าไหร่คะ');
        } else if (!workStatus) {
            return agent.add(createQuickReply(
                'สถานะการทำงานปัจจุบันของคุณคือ',
                ["ศึกษาอยู่", "ทำงาน", "ว่างงาน"]
            ));
        } else if (!education) {
            return agent.add(createQuickReply(
                workStatus === 'ศึกษาอยู่' ? 'ตอนนี้คุณกำลังศึกษาอยู่ระดับใดคะ' : 'การศึกษาสูงสุดของคุณอยู่ระดับใดคะ',
                ["สูงกว่าปริญญาตรี", "ปริญญาตรี", "ปวส", "ปวช", "มัธยมศึกษาตอนปลาย", "มัธยมศึกษาตอนต้น", "ประถมศึกษา"]
            ));
        } else if (!salary) {
            return agent.add('คุณมีรายได้เฉลี่ยต่อเดือนเท่าไหร่คะ');
        } else if (!useWith) {
            return agent.add(createQuickReply(
                'ในการปรึกษาครั้งนี้ คุณอยากทราบข้อมูลเพื่อนำไปใช้อย่างไรคะ',
                ["ใช้กับตนเอง", "ใช้กับคนรอบข้าง"]
            ));
        }

        await userDB.setProfile(userId, { age, gender, weight, workStatus, education, salary, useWith });
        return agent.add(createQuickReply(
            'ขอบคุณมากค่ะ คุณสามารถเลือกหัวข้อที่คุณสนใจปรึกษาจากเมนูด้านล่าง หรือต้องการพูดคุยกับฉันต่อก็ได้นะคะ',
            ["ขอเลือกเอง", "พูดคุยต่อ"]
        ));
    }

    const SetUserPrepNext = async () => {
        console.log("Enter SetUserPrepNext")
        return agent.add(new Payload('LINE', {
            "type": "text",
            "text": "ต่อไปจะขอสอบถามข้อมูลการดื่มเครื่องดื่มแอลกอฮอล์ของคุณเพื่อที่จะนำไปประเมินความเสี่ยงหน่อยนะคะ",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": `เริ่มการประเมินความเสี่ยง`,
                            "text": `ประเมินความเสี่ยง`
                        }
                    }
                ]
            }
        } , { sendAsMessage: true }));
    }

    const checkUserDrinking = async () => {
        agent.add(new Payload(
            `LINE`,
            {
                type: "text",
                text: 'ในชีวิตของคุณ คุณเคยดื่มเครื่องดื่มแอลกอฮอล์บ้างไหม',
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: 'เคย',
                                text: 'เคย'
                            }
                        },
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: 'ไม่เคย',
                                text: 'ไม่เคย'
                            }
                        },
                    ]
                }
            },
            { sendAsMessage: true }
        ))
    }

    const checkUserDrinkingIn3Month = async () =>{
        return agent.add(createQuickReply(
            'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์บ้างไหม',
            ['ดื่ม', 'ไม่ได้ดื่ม']
        ));
    }

    const riskAssessment_DrinkIn3Month = async () =>{
        let {second, third, fourth, fifth, sixth, seventh } = agent.parameters;
        if(!second){
            return agent.add(createQuickReply(
                'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์ เช่น เบียร์ สุรา ไวน์ บ่อยแค่ไหน',
                ['ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }
        else if (!third) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมานี้ คุณเคยรู้สึกอยากที่จะดื่มแอลกอฮอล์อย่างรุนแรงบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fourth) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา การใช้เครื่องดื่มแอลกอฮอล์ทำให้เกิดปัญหาสุขภาพ ครอบครัว สังคม กฎหมายหรือการเงินกับคุณบ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!fifth) {
            return agent.add(createQuickReply(
                'ในช่วง 3 เดือนที่ผ่านมา คุณไม่สามารถทำกิจกรรมที่คุณควรจะทำได้ตามปรกติ เนื่องจากการดื่มเครื่องดื่มแอลกอฮอล์บ่อยแค่ไหน',
                ['ไม่เลย', 'ครั้งสองครั้ง', 'ทุกเดือน', 'ทุกสัปดาห์', 'ทุกวันหรือเกือบทุกวัน']
            ));
        }

        else if (!sixth) {
            return agent.add(createQuickReply(
                'เพื่อนฝูง ญาติ หรือคนอื่น เคยแสดงความกังวลหรือตักเตือนคุณเกี่ยวกับการดื่มเครื่องดื่มแอลกอฮอล์ของคุณบ้างไหม',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        else if (!seventh) {
            return agent.add(createQuickReply(
                'คุณเคยพยายามหยุดหรือดื่มเครื่องดื่มแอลกอฮอล์ให้น้อยลง แต่ทำไม่สำเร็จบ้างหรือไม่',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        if (fourth !== 0) {
            fourth++;
        }
        var points =parseInt(second) + parseInt(third) + parseInt(fourth) + parseInt(fifth) + parseInt(sixth) +parseInt(seventh);
        let ASSIST_STATUS = "";
        console.log('points :', points)
        console.log('ASSIST_STATUS : ', ASSIST_STATUS);
        if ( points < 11 ){
            ASSIST_STATUS = "ความเสี่ยงค่ำ" ;
        }else if ( points > 10 && points < 27 ){
            ASSIST_STATUS = "ความเสี่ยงปานกลาง" ;
        }else{
            ASSIST_STATUS = "ความเสี่ยงสูง" ;
        }
        console.log('ASSIST_STATUS : ', ASSIST_STATUS);
        await userDB.setASSIST_STATUS(userId, ASSIST_STATUS);
        await userDB.setAssistPoint(userId, points);
        agent.add('เพื่อให้น้องตั้งใจให้คำแนะนำปริมาณการดื่มที่เหมาะสมแก่คุณได้');
            agent.add('น้องตั้งใจอยากให้คุณนึกทบทวนการดื่มในช่วง 7 วันที่ผ่านมา');
            agent.add('ทั้งรายละเอียดชนิดเครื่องดื่ม และปริมาณที่ดื่ม เพื่อนำมาหาค่าดื่มมาตรฐาน และให้คำแนะนำต่อไปค่ะ');
            agent.add('แต่การให้คำแนะนำอาจมีความคลาดเคลื่อนได้ เนื่องจากปริมาณของแอลกอฮอล์ที่มีอยู่จริงในเครื่องดื่มแต่ละยี่ห้อนั้น อาจแตกต่างไปบ้างจากข้อมูลที่น้องตั้งใจมีอยู่นะคะ');
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "ก่อนอื่น คุณอยากรู้รายละเอียดเกี่ยวกับเพิ่มเติมเกี่ยวกับคำว่า “ดื่มมาตรฐาน” ไหมคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `ข้อมูลเกี่ยวกับดื่มมาตรฐาน`,
                                    "label": `อยากรู้`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ และกรอกข้อมูลการดื่ม",
                                    "text": `กรอกข้อมูลของวันนี้`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
    }

    const riskAssessment_DontDrinkIn3Month = async () =>{
        let {sixth, seventh } = agent.parameters;
        console.log('points :', points)
        console.log('ASSIST_STATUS : ', ASSIST_STATUS);
        if (!sixth) {
            return agent.add(createQuickReply(
                'เพื่อนฝูง ญาติ หรือคนอื่น เคยแสดงความกังวลหรือตักเตือนคุณเกี่ยวกับการดื่มเครื่องดื่มแอลกอฮอล์ของคุณบ้างไหม',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        else if (!seventh) {
            return agent.add(createQuickReply(
                'คุณเคยพยายามหยุดหรือดื่มเครื่องดื่มแอลกอฮอล์ให้น้อยลง แต่ทำไม่สำเร็จบ้างหรือไม่',
                ['ไม่เคยเลย', 'เคยในช่วง 3 เดือน', 'เคยแต่ก่อนหน้า 3 เดือนนี้']
            ));
        }

        var points = parseInt(sixth) +parseInt(seventh);
        await userDB.setAssistPoint(userId, points);
        agent.add('เพื่อให้น้องตั้งใจให้คำแนะนำปริมาณการดื่มที่เหมาะสมแก่คุณได้');
            agent.add('น้องตั้งใจอยากให้คุณนึกทบทวนการดื่มในช่วง 7 วันที่ผ่านมา');
            agent.add('ทั้งรายละเอียดชนิดเครื่องดื่ม และปริมาณที่ดื่ม เพื่อนำมาหาค่าดื่มมาตรฐาน และให้คำแนะนำต่อไปค่ะ');
            agent.add('แต่การให้คำแนะนำอาจมีความคลาดเคลื่อนได้ เนื่องจากปริมาณของแอลกอฮอล์ที่มีอยู่จริงในเครื่องดื่มแต่ละยี่ห้อนั้น อาจแตกต่างไปบ้างจากข้อมูลที่น้องตั้งใจมีอยู่นะคะ');
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "ก่อนอื่น คุณอยากรู้รายละเอียดเกี่ยวกับเพิ่มเติมเกี่ยวกับคำว่า “ดื่มมาตรฐาน” ไหมคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `ข้อมูลเกี่ยวกับดื่มมาตรฐาน`,
                                    "label": `อยากรู้`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ และกรอกข้อมูลการดื่ม",
                                    "text": `กรอกข้อมูลของวันนี้`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
    }

    const setDrinkingInWeekInputType = async () => {
        let { thisDay } = agent.parameters;
        const user = await userDB.get(userId);
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];

        if (dayInWeek[thisDay] === 'วันนี้') {
            agent.add('หากคุณรู้ปริมาณความเข้มข้นของแอลกอฮอล์ของเครื่องดื่มที่คุณดื่มในแต่ละวันแล้ว คุณสามารถเลือกกำหนดเองได้เลยค่ะ เพื่อความถูกต้องแม่นยำมากที่สุด');
            agent.add('การระบุความเข้มข้นนั้นให้พิมพ์เฉพาะตัวเลข และจุดทศนิยม ถ้ามีนะคะ เช่น หากฉลากระบุว่า “ALC 8.0% VOL” ให้พิมพ์ว่า “8.0” ค่ะ');
            agent.add('หากคุณไม่สามารถระบุความเข้มข้นได้ น้องตั้งใจก็มีรายชื่อเครื่องดื่มชนิดต่างๆ ให้คุณเลือกได้ค่ะ');
        }

        if (thisDay !== 0 && !user.drinkingInWeek[dayInWeek[thisDay - 1]]) {
            return agent.add(createQuickReply(`คุณยังไม่ได้ให้ข้อมูลของ${dayInWeek[thisDay - 1]}เลยนะคะ`, [
                `กรอกข้อมูลของ${dayInWeek[thisDay - 1]}`
            ]))
        }

        return agent.add(createQuickReply(
            `${dayInWeek[thisDay]}คุณดื่มอะไรคะ หากว่าดื่มหลายชนิด ให้เลือกเครื่องดื่มที่ดื่มปริมาณมากที่สุดมาเพียงชนิดเดียวค่ะ`,
            ["ขอเลือกจากเมนู"]
        ));
    }

    // const setDrinkingInWeek_fill = async () => {
    //     let { thisDay ,type, percent, container, volume, numberOfDrinks } = agent.parameters;
    //     thisDay = parseInt(thisDay);
    //     const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
    //     var standardDrink;

    //     console.log('this day:',thisDay);
    //     console.log('type:' , type);
    //     console.log('percent:' , percent);
    //     console.log('container:' , container);
    //     console.log('volume:' , volume);
    //     console.log('number of drink:' , numberOfDrinks);
    //     console.log('-------------------');

    //     if (!type) {
    //         return agent.add(`กรุณาระบุเครื่องดื่มด้วยค่ะ`);
    //     } else if (!percent) {
    //         return agent.add(`${type}คุณดื่มมีแอลกอฮอล์กี่เปอร์เซ็นค่ะ`);
    //     } else if (!container) {
    //         agent.add(`น้องตั้งใจขอแนะนำให้คุณเลือกภาชนะที่มีขนาดใกล้เคียงที่สุดเพื่อกะปริมาณการดื่มในแต่ละวันได้ดีที่สุดนะคะ`);
    //         return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize.all, { sendAsMessage: true }));
    //     } else if (!numberOfDrinks) {
    //         return agent.add(`ดื่มประมาณกี่${container}คะ`);
    //     }
    //     standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
    //     await userDB.setDrinkingInWeek(userId, dayInWeek[thisDay], {
    //         type, percent, container, volume, numberOfDrinks, standardDrink
    //     })
    //     if (thisDay !== 6) {
    //         agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent}% จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
    //         return agent.add(new Payload(
    //             `LINE`,
    //             {
    //                 "type": "text",
    //                 "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
    //                 "quickReply": {
    //                     "items": [
    //                         {
    //                             "type": "action",
    //                             "action": {
    //                                 "type": "message",
    //                                 "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
    //                                 "label": `แก้ไขข้อมูล`
    //                             }
    //                         },
    //                         {
    //                             "type": "action",
    //                             "action": {
    //                                 "type": "message",
    //                                 "label": "ไม่ ไปวันถัดไป",
    //                                 "text": `กรอกข้อมูลของ${dayInWeek[thisDay + 1]}`
    //                             }
    //                         }
    //                     ]
    //                 },
    //             },
    //             { sendAsMessage: true }
    //         ))
    //     } else {
    //         agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent} จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
    //         return agent.add(new Payload(
    //             `LINE`,
    //             {
    //                 "type": "text",
    //                 "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
    //                 "quickReply": {
    //                     "items": [
    //                         {
    //                             "type": "action",
    //                             "action": {
    //                                 "type": "message",
    //                                 "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
    //                                 "label": `แก้ไขข้อมูล`
    //                             }
    //                         },
    //                         {
    //                             "type": "action",
    //                             "action": {
    //                                 "type": "message",
    //                                 "label": "ไม่",
    //                                 "text": `สรุปผลประเมินความเสี่ยง`
    //                             }
    //                         }
    //                     ]
    //                 },
    //             },
    //             { sendAsMessage: true }
    //         ))
    //     }
    // }

    const setDrinkingInWeek_pick = async () => {
        let { thisDay ,type, percent,container, volume, numberOfDrinks } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var standardDrink;

        console.log('this day:',thisDay);
        console.log('type:' , type);
        console.log('percent:' , percent);
        console.log('container:' , container);
        console.log('volume:' , volume);
        console.log('number of drink:' , numberOfDrinks);
        console.log('-------------------');

        if (!type) {
            agent.add(`กรุณาเลือกเครื่องดื่มด้วยค่ะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true })); 
        }else{
            if(type === 'สุราสี' || type === 'สุราขาว'){
                if(!percent){
                    return agent.add(new Payload(
                        `LINE`,
                        {
                            type: "text",
                            text: `คุณรู้ปริมาณความเข้มข้นของแอลกอฮอล์ของ${type}ที่คุณดื่มไหมค่ะ ว่าเป็นแบบ 35 ดีกรี หรือ 40 ดีกรี`,
                            quickReply: {
                                items: [
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: '35 ดีกรี',
                                            text: '35 ดีกรี'
                                        }
                                    },
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: '40 ดีกรี',
                                            text: '40 ดีกรี'
                                        }
                                    },
                                    {
                                        type: "action",
                                        action: {
                                            type: "message",
                                            label: 'ไม่ทราบ ขอใช้ค่าเฉลี่ย',
                                            text: 'ค่าเฉลี่ย 37 ดีกรี'
                                        }
                                    }
                                ]
                            }
                        },
                        { sendAsMessage: true }
                    ))
                }
            }else{
                if(!percent){
                    var aclPercent;
                    if(type ==='ไวน์คูลเลอร์' || type ==='เบียร์'){
                        aclPercent = 5;
                    }else if(type ==='ไวน์' || type ==='สุราพื้นเมือง'){
                        aclPercent = 13;
                    }else if(type ==='เครื่องดื่มอื่นๆ'){
                        aclPercent = 40;
                    }
                    return agent.add(createQuickReply(
                        `ค่าความเข้มข้นของ${type}ที่คุณดื่ม`,
                        [`${aclPercent}%`]
                    ));
                }
            }
        }
        
        if (!container) {
            agent.add(`น้องตั้งใจขอแนะนำให้คุณเลือกภาชนะที่มีขนาดใกล้เคียงที่สุดเพื่อกะปริมาณการดื่มในแต่ละวันได้ดีที่สุดนะคะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize[type], { sendAsMessage: true }));
        } else if (!numberOfDrinks) {
            return agent.add(`ดื่มประมาณกี่${container}คะ`);
        }
        
        standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
        await userDB.setDrinkingInWeek(userId, dayInWeek[thisDay], {
            type, percent, container, volume, numberOfDrinks, standardDrink
        })
        if (thisDay !== 6) {
            agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent}% จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
                                    "label": `แก้ไขข้อมูล`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่ ไปวันถัดไป",
                                    "text": `กรอกข้อมูลของ${dayInWeek[thisDay + 1]}`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
        } else {
            agent.add(`${dayInWeek[thisDay]} คุณดื่ม${type}ที่มีแอลกอฮอล์ ${percent} จำนวน ${numberOfDrinks} ${container} ที่มีปริมาตร${container}ละ ${volume} มิลลิลิตร`);
            return agent.add(new Payload(
                `LINE`,
                {
                    "type": "text",
                    "text": "คุณต้องการแก้ไขข้อมูลมั้ยคะ",
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "text": `แก้ไขข้อมูลของ${dayInWeek[thisDay]}`,
                                    "label": `แก้ไขข้อมูล`
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่",
                                    "text": `สรุปผลประเมินความเสี่ยง`
                                }
                            }
                        ]
                    },
                },
                { sendAsMessage: true }
            ))
        }
    }

    const riskAssessmentResultWeek = async () => {
        const { assistPoint } = await userDB.get(userId);
        const { profile: { gender, age } } = await userDB.get(userId);
        var result;

        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];
        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2] + sdPoint[2] + sdPoint[3] + sdPoint[4] + sdPoint[5] + sdPoint[6]).toFixed(1);

        agent.add('ขอบคุณค่ะ จากข้อมูลที่ได้ น้องตั้งใจขอสรุปความเสี่ยงและปริมาณการดื่มของคุณในช่วงสัปดาห์ที่ผ่านมาตามนี้นะคะ');

        if (gender === 'หญิง' || age >= 66) {
            if (sumSdPoint > 7) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (sumSdPoint > 14) {
                result = 'เกิน';
            } else {
                result = 'ไม่เกิน';
            }
        }

        agent.add(`ในสัปดาห์นี้ คุณดื่มเป็นจำนวน ${sumSdPoint} ดื่มมาตรฐาน ซึ่ง${result}ตามเกณฑ์แนะนำการดื่มปลอดภัยใน 7 วัน`);
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของระดับการการดื่มที่ปลอดภัยใน 7 วันไหมคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ไว้ก่อน`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessmentResultDay = async () => {
        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var maxDay = '';
        var result;
        const { profile: { gender, age } } = await userDB.get(userId);
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];

        var maxSdPoint = Math.max(...sdPoint);
        for (var i = 0; i <= 6; i++) {
            if (maxSdPoint = sdPoint[i]) {
                maxDay = day[i];
                break;
            }
        }

        if (gender === 'หญิง' || age >= 66) {
            if (maxSdPoint > 3) {
                result = 'เกิน';
                console.log("result : ",result);
                await userDB.setDrinkingStandard(userId, result);
            } else {
                result = 'ไม่เกิน';
                console.log("result : ",result);
                await userDB.setDrinkingStandard(userId, result);
            }
        } else if (gender === 'ชาย') {
            if (maxSdPoint > 4) {
                result = 'เกิน';
                console.log("result : ",result);
                await userDB.setDrinkingStandard(userId, result);
            } else {
                result = 'ไม่เกิน';
                console.log("result : ",result);
                await userDB.setDrinkingStandard(userId, result);
            }
        }


        agent.add(`ในสัปดาห์นี้ วันที่คุณดื่มหนักที่สุดคือ${maxDay} ซึ่ง${result}ตามเกณฑ์แนะนำการดื่มปลอดภัยต่อวัน`)
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของระดับการการดื่มที่ปลอดภัยภายในหนึ่งวันไหมคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ไว้ก่อน`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessmentResultRisk = async () =>{
        const { assistPoint } = await userDB.get(userId);
        const { profile: { gender, age } } = await userDB.get(userId);
        var resultWeek;
        var resultDay;
        var resultRisk;
        var result;

        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน', 'เมื่อ 4 วันที่แล้ว', 'เมื่อ 5 วันที่แล้ว', 'เมื่อ 6 วันที่แล้ว', 'เมื่อ 7 วันที่แล้ว'];
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)
            , parseFloat(drinkingInWeek[day[3]].standardDrink), parseFloat(drinkingInWeek[day[4]].standardDrink), parseFloat(drinkingInWeek[day[5]].standardDrink)
            , parseFloat(drinkingInWeek[day[6]].standardDrink)];

        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2] + sdPoint[2] + sdPoint[3] + sdPoint[4] + sdPoint[5] + sdPoint[6]).toFixed(1);
        var maxSdPoint = Math.max(...sdPoint);

        if (gender === 'หญิง' || age >= 66) {
            if (sumSdPoint > 7) {
                resultWeek = 'เกิน';
            } else {
                resultWeek = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (sumSdPoint > 14) {
                resultWeek = 'เกิน';
            } else {
                resultWeek = 'ไม่เกิน';
            }
        }

        if (gender === 'หญิง' || age >= 66) {
            if (maxSdPoint > 3) {
                resultDay = 'เกิน';
            } else {
                resultDay = 'ไม่เกิน';
            }
        } else if (gender === 'ชาย') {
            if (maxSdPoint > 4) {
                resultDay = 'เกิน';
            } else {
                resultDay = 'ไม่เกิน';
            }
        }

        if(assistPoint <=10 ){
            resultRisk = 'ต่ำ';
        }else if(10 < assistPoint <= 26){
            resultRisk = 'สูง';
        }else if(assistPoint >= 27){
            resultRisk = 'สูงมาก';
        }

        if(resultWeek === 'ไม่เกิน' && resultDay ==='ไม่เกิน' && resultRisk ==='ต่ำ'){
            result = 'และ';
        }else if(((resultWeek === 'เกิน' && resultDay ==='ไม่เกิน') || (resultWeek === 'ไม่เกิน' && resultDay ==='เกิน')) && resultRisk !=='ต่ำ'){
            result = 'และ';
        }else{
            result = 'แต่';
        }

        agent.add(`${result}จากข้อมูลที่ได้ น้องตั้งใจพบว่าลักษณะการดื่มของคุณจัดอยู่ในกลุ่มที่มีความเสี่ยง${resultRisk}ค่ะ`);
        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "คุณอยากรู้รายละเอียดของการดื่มที่เสี่ยงต่ำ เสี่ยงปานกลาง และเสี่ยงสูง ไหมคะว่าคืออะไร และแตกต่างกันอย่างไร",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "text": `ข้อมูลของการดื่มที่ปลอดภัย`,
                                "label": `อยากรู้`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "message",
                                "label": "ไว้ก่อน",
                                "text": `ประเมินแรงจูงใจ`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const assessMotivation = async () => {
        agent.add(`น้องตั้งใจอยากให้คุณอ่านและคิดเกี่ยวกับข้อความ 5 ข้อความต่อไปนี้นะคะ ว่าประโยคไหนที่ตรงกับใจของคุณมากที่สุด`);
        return agent.add(new Payload('LINE', imageCarousels.motivation(), { sendAsMessage: true }));
    }

    const assessMotivationResult = async () => {
        let {motivation} = agent.parameters;
        console.log("motivation", motivation);
        if(motivation === "ไม่เห็นปัญหา"){
            agent.add("ตอนนี้ คุณยังไม่เห็นว่าการดื่มเช่นนี้จะก่อให้เกิดปัญหาใดๆ");
            console.log("motivation : ",motivation);
            await userDB.setMotivation(userId, motivation);
        }else if(motivation === "ลังเล"){
            agent.add("เหมือนว่าคุณเริ่มรู้สึกลังเลเกี่ยวกับการดื่ม คุณอาจกังวลถึงผลเสียที่อาจจะเกิดขึ้น หากคุณยังคงดื่มเช่นนี้ต่อไป หรือคุณอาจกำลังคิดว่า อะไรๆน่าจะดีขึ้นถ้าคุณหยุดดื่มได้");
            console.log("motivation : ",motivation);
            await userDB.setMotivation(userId, motivation);
        }else if(motivation === "ตัดสินใจ"){
            agent.add("เหมือนคุณตัดสินใจแล้วว่าคุณอยากที่จะปรับเปลี่ยนตัวเองเกี่ยวกับเรื่องการดื่ม");
            console.log("motivation : ",motivation);
            await userDB.setMotivation(userId, motivation);
        }else if(motivation === "ลงมือ"){
            agent.add("เยี่ยมมากค่ะ คุณกำลังจะลงมือทำอย่างจริงจังแล้ว");
            console.log("motivation : ",motivation);
            await userDB.setMotivation(userId, motivation);
        }else if(motivation === "ทำต่อเนื่อง"){
            agent.add("เยี่ยมมากค่ะ คุณลงมือเปลี่ยนแปลงตัวเองมาช่วงหนึ่งแล้ว");
            console.log("motivation : ",motivation);
            await userDB.setMotivation(userId, motivation);
        }else{
            agent.add(`พบปัญหาในการแสดงผล | motivation : ${motivation}`);
        }

        agent.add("ถ้าน้องตั้งใจพูดถึงสิ่งต่อไปนี้ คุณคิดว่าเรื่องไหนที่จะเป็นเป้าหมายของคุณในการปรับเปลี่ยนพฤติกรรมการดื่มคะ");
        
        return agent.add(new Payload(`LINE` , imageCarousels.goal() , { sendAsMessage: true }
        ))
    }

    const assessGoal = async () => { // ขั้นตอนที่ 7 และ 8
        let {goal} = agent.parameters ;
        await userDB.setGoal(userId, goal);
        const { Motivation , ASSIST_STATUS , IsStandard , profile:{ age , gender } } = await userDB.get(userId);

        console.log("Goal :",goal);
        console.log("motivation: ",Motivation);
        console.log("ASSIST_STATUS: ",ASSIST_STATUS);
        console.log("IsStandard: ",IsStandard);
        console.log("Gender :",gender);
        console.log("Age :",age);
        console.log("================");
        
        console.log("Enter assessGoal") ;
        if ( ASSIST_STATUS === "ความเสี่ยงต่ำ" ){
            if ( Motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`);
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มชึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);		
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ`);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย และปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่ดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation} และการที่ยังคงดื่มอยู่ ก็อาจจะทำ${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation} และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`จากการประเมินลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่เพราะเรื่อง${Motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อยแต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และอาจสัมพันธ์กับเรื่อง${Motivation} เพราะเรื่อง${Motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย รวมถึงปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${Motivation} ซึ่งน้องตั้งใจเห็นว่าดีมากเลยค่ะ เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${Motivation}เป็นแรงผลักดัน แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${Motivation}เป็นแรงผลักดันแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ ซึ่งน้องตั้งใจอยากให้กำลังใจคุณและแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else{
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${Motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        }else if ( ASSIST_STATUS === "ความเสี่ยงปานกลาง" ){
            if ( Motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่ดูเหมือนว่าลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`แม้ว่าตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณ มีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้และอาจทำให้คุณเริ่มเป็นห่วง ปัญหาเรื่อง${Motivation}และการที่ยังคงดื่มอยู่ ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งอาจทำให้คุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation}และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้นถ้าคุณหยุดดื่มได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation} แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation} เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} น้องตั้งใจขอเป็นกำลังใจให้นะคะ ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งน้องตั้งใจอยากให้กำลังใจคุณ และแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างค่ะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else{
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${Motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        }else if ( ASSIST_STATUS === "ความเสี่ยงสูง" ){
            if ( Motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่ดูเหมือนว่าลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใดๆ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ และลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมาก หรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่คุณกำลังคิดถึงปัญหาเรื่อง${Motivation}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่ และปัญหา${Motivation}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`คุณกำลังคิดถึงปัญหาเรื่อง${Motivation}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่และปัญหา${Motivation}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation}น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่จากการประเมินลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${Motivation}น้องตั้งใจขอเป็นกำลังใจให้นะคะ เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุราและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( Motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }
        }else{
            agent.add(`พบข้อผิดพลาดในการแสดงผลการสรุป`) ;
        }
        
        agent.add("น้องตั้งใจอยากจะขอแนะนำปริมาณการดื่มในหนึ่งสัปดาห์ และในหนึ่งวันที่คุณจะสามารถดื่มได้โดยที่ไม่เพิ่มความเสี่ยงต่อสุขภาพและสังคมของคุณนะคะ") ; 
        agent.add(`จากข้อมูลของคุณนั้น คุณเป็นเพศ${gender} และคุณมีอายุ ${age} ปี น้องตั้งใจขอแนะนำดังนี้ค่ะ`) ;
        
        if( age > 65) {
            if ( gender === "ชาย" ) { // 1A
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ ต้องดื่มไม่เกิน 7 กระป๋อง หรือ หากดื่มไวน์ต้องดื่มไม่เกิน 10 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 2 แก้ว") ;
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 3 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว") ;
                // แนบ Infographic
            }else if ( gender === "หญิง" ) { // 1B
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ ต้องดื่มไม่เกิน 7 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 8 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่ืไม่เกิน 2 แก้ว") ;
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 3 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว");
                // แนบ Infographic
            }else{
                console.log("Gender value error : ",gender) ;
            }
        }else if( age <= 65 && age >= 20 ){
            if ( gender === "ชาย" ) { // 1C
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ต้องดื่ไม่เกิน 15 กระป๋อง หรือ หากดื่มไวน์ต้องดื่มไม่เกิน 16 แก้ว หรือ หากดื่มสุราสี 35 ดีกรีต้องดื่มไม่เกิน 4 แก้ว");
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 4 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 4 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่กิน 1 แก้ว") ;
                // แนบ Infographic
            }else if ( gender === "หญิง" ) { // 1D
                agent.add("ในหนึ่งสัปดาห์ หากคุณดืมเบียร์ต้องดื่มไม่เกิน 7 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 8 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 2 แก้ว") ;
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 3 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว") ;
                // แนบ Infographic
            }else{
                console.log("Gender value error : ",gender) ;
            }
        }else if ( age < 20 ){ // 1E
            agent.add("กฏหมายได้ห้ามขายเครื่องดื่มแอลกออฮอล์ให้้คุณ หากอายุของคุณต่ำกว่า 20 ปี ดังนั้นการดื่มไม่ว่าในปริมาณเท่าใดก็อาจยังไม่เหมาะสมนะคะ") ; 
        }else{
            console.log("age value error : ",age) ;
        }  

        agent.add("อย่างไรก็ตาม คุณไม่ควรดื่มเครื่องดื่มแอลกออฮล์เลย หากคุณกำลังวางแผนหรือตั้งครรภ์อยู่ หรือมีประวัติติดแอลกอฮอล์หรือสารเสพติดชนิดอื่น หรือมีโรคตับหรือข้อห้ามอื่น ๆ ") ;
        agent.add("หากคุณไม่สามารถควบคุมการดื่่มของคุณให้ต่ำกว่านะดับที่น้องตั้งใจบอกนี้ได้ คุณมีความเสี่ยงที่จะเกิดปัญหา หรือเสี่ยงที่จะติดแอลกอฮอล์ได้นะคะ") ;
    }

    const measureAlcohalInBlood = async () => {

        let {gender,weight,types,container,numberofDrinks,volume} = agent.parameters;

        console.log('gender:',gender);
        console.log('weight:' , weight);
        console.log('types:' , types);
        console.log('container:' , container);      
        console.log('number of drink:' , numberofDrinks);
        console.log('volume:' , volume);
        console.log('-------------------');

        

        if( !gender ){
            return agent.add(createQuickReply('ขอทราบเพศของคุณได้ไหมคะ?', ["ชาย", "หญิง"]));
        }
        if( !weight ){
            return agent.add(`น้ำหนักเท่าไรคะ?`);
        }
        if( !types ){
            agent.add(`ดื่มอะไรมาหรอคะ?`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
        }
        if( !container ){
            agent.add(`เลือกภาชนะที่ใกล้เคียงที่สุดค่ะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize[types], { sendAsMessage: true }));
        }
        if( !numberofDrinks ){
            return agent.add(`ดื่มไปปริมาณกี่${container}คะ?`);
        }
        
        console.log('รอครั้งที่1')  
        agent.add(`น้องตั้งใจขอทบทวนข้อมูลนะคะ`);
        await delay(1000);
        console.log('รอครั้งที่2')
        agent.add(`จากข้อมูลที่น้องตั้งใจได้รับมาคือ คุณเป็น ผู้${gender} น้ำหนัก ${weight} กิโลกรัม ดื่ม${types}ไปทั้งหมด ${numberofDrinks} ${container} โดยหนึ่ง${container}มีปริมาณ ${volume} มิลลิลิตร  `);
        await delay(1000);
        console.log('Redirecting to : measureAlcohalInBloodCalculated');
        await delay(1000);
        return agent.add(new Payload('LINE', {
            "type": "text",
            "text": "ข้อมูลนี้ถูกต้องมั๊ยคะ",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": `ถูกต้อง`,
                            "text": `ถูกต้อง`
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": "ไม่ถูกต้อง",
                            "text": `ไม่ถูกต้อง`
                        }
                    }
                ]
            },
        } , { sendAsMessage: true }));
    }

    const alcoholEdit = async () => {
        return agent.add(new Payload('LINE', {
            "type": "text",
            "text": "ต้องการกรอกข้อมูลใหม่ใช่มั๊ยคะ?",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": `ต้องการแก้ไข`,
                            "text": `แก้ไขข้อมูลแอลกอฮอล์`
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": "ไม่ต้องการ",
                            "text": `ยกเลิก`
                        }
                    }
                ]
            },
        } , { sendAsMessage: true }));
    }

    const measureAlcohalInBloodCalculated = async () => {
        agent.add(`ขอบคุณสำหรับข้อมูลค่ะ น้องตั้งใจขอเวลาคำนวณสักครู่นะคะ`); 
        let {gender,weight,types,container,numberofDrinks,volume} = agent.parameters;
        let rho , value , percent ;
        console.log('gender:',gender);
        console.log('weight:' , weight);
        console.log('types:' , types);
        console.log('container:' , container);      
        console.log('number of drink:' , numberofDrinks);
        console.log('volume:' , volume);
        console.log('percent : ',percent);
        console.log('-------------------');

        
        // assign rho value
        if( gender === "ชาย" ){
            rho = 0.73 ;
            console.log("assign Gender conplete : ",rho);
        }else if( gender === "หญิง"){
            rho = 0.66 ;
            console.log("assign Gender conplete : ",rho);
        }
        // assign percent
        if(types ==='ไวน์คูลเลอร์' || types ==='เบียร์'){
            percent = 0.05;
       }else if(types ==='ไวน์' || types ==='สุราพื้นเมือง'){
            percent = 0.13;
       }else if(types ==='เครื่องดื่มอื่นๆ' || types ==='สุราสี40'){
            percent = 0.40;
       }else if(types ==='สุราสี35'){
            percent = 0.35 ;
       }else{
            percent =  0 ;
       }
       console.log('percent : ',percent);
        // Response back data
        value = ((((volume*numberofDrinks) / 29.574 ) * percent * 5.14 ) / ( (weight / 0.454) * rho ) ) * 1000 ;
        console.log("value :",value);
        agent.add(`จากการคำนวณถ้าคุณเป็นผู้${gender} มีน้ำหนัก  ${weight} กก. และดื่มเครื่องดื่มตามปริมาณดังกล่าว จะทำให้มีระดับแอลกอฮอล์ในเลือดอยู่ที่ประมาณ ${value.toFixed(2)} มิลลิกรัมเปอร์เซ็นต์ค่ะ`); 
        return  agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าปริมาณแอลกอฮอล์ที่ดื่มเข้าไปนี้ ว่าต้องใช้เวลานานแค่ไหนร่างกายถึงจะขับออกไปได้หมด', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }

    const alcoholComposing = async () => { //กรณีอยากรู้ปริมาณการขับออก
        let {gender,weight,types,container,numberofDrinks,volume} = agent.parameters;
        console.log('gender:',gender);
        console.log('weight:' , weight);
        console.log('types:' , types);
        console.log('container:' , container);      
        console.log('number of drink:' , numberofDrinks);
        console.log('volume:' , volume);
        console.log('-------------------');
        let rho , value , percent ;
        // assign rho value
        if( gender === "ชาย" ){
            rho = 0.68 ;
            console.log("assign Gender conplete : ",rho);
        }else if( gender === "หญิง"){
            rho = 0.55 ;
            console.log("assign Gender conplete : ",rho);
        }
        // assign percent
        if(types ==='ไวน์คูลเลอร์' || types ==='เบียร์'){
             percent = 0.05;
        }else if(types ==='ไวน์' || types ==='สุราพื้นเมือง'){
             percent = 0.13;
        }else if(types ==='เครื่องดื่มอื่นๆ' || types ==='สุราสี40'){
             percent = 0.40;
        }else if(types ==='สุราสี35'){
             percent = 0.35 ;
        }else{
            percent =  0 ;
        }
        value = ( (volume*numberofDrinks) * percent  * 0.79 ) ;
        console.log(value);
        let timeResult = value/7 ; 
        agent.add(`ถ้าคุณเป็นผู้${gender} น้ำหนัก ${weight} กก. ดื่ม${types} ปริมาณ ${numberofDrinks} ${container} ต้องใช้เวลาอย่างน้อย ${timeResult.toFixed(0)} ชั่วโมง แอลกอฮอล์ในร่างกายถึงจะถูกขับออกไปได้หมด`);
        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าถ้าหากผ่านไปกี่ชั่วโมง แล้วระดับแอลกอฮอล์ในเลือดจะเหลือเท่าไร หากไม่มีการดื่มเพิ่มระหว่างนั้น', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }

    const NOalcoholComposing = async () => { //กรณีไม่อยากรู้ปริมาณการขับออก
        let {gender,weight,types,container,numberofDrinks,volume} = agent.parameters;
        console.log('gender:',gender);
        console.log('weight:' , weight);
        console.log('types:' , types);
        console.log('container:' , container);      
        console.log('number of drink:' , numberofDrinks);
        console.log('volume:' , volume);
        console.log('-------------------');

        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าถ้าหากผ่านไปกี่ชั่วโมง แล้วระดับแอลกอฮอล์ในเลือดจะเหลือเท่าไร หากไม่มีการดื่มเพิ่มระหว่างนั้น', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }
    
    const alcoholLessThan = async() => { //กรณีอยากรู้ เวลาลดลงของแอลกอฮอล์
        let {gender,weight,types,container,numberofDrinks,volume,time} = agent.parameters;
        console.log('gender:',gender);
        console.log('weight:' , weight);
        console.log('types:' , types);
        console.log('container:' , container);      
        console.log('number of drink:' , numberofDrinks);
        console.log('volume:' , volume);
        console.log('-------------------');
        let rho , value , percent ;
        // assign rho value
        if( gender === "ชาย" ){
            rho = 0.73 ;
            console.log("assign Gender conplete : ",rho);
        }else if( gender === "หญิง"){
            rho = 0.66 ;
            console.log("assign Gender conplete : ",rho);
        }
        // assign percent
        if(types ==='ไวน์คูลเลอร์' || types ==='เบียร์'){
            percent = 0.05;
       }else if(types ==='ไวน์' || types ==='สุราพื้นเมือง'){
            percent = 0.13;
       }else if(types ==='เครื่องดื่มอื่นๆ' || types ==='สุราสี40'){
            percent = 0.40;
       }else if(types ==='สุราสี35'){
            percent = 0.35 ;
       }else{
            percent =  0 ;
       }

        if( !time ){
            return agent.add(`ระบุจำนวนชั่วโมงที่ต้องการคำนวนได้เลยค่ะ`) ;
        }

        value = ((((volume*numberofDrinks) / 29.574 ) * percent * 5.14 ) / ( (weight / 0.454) * rho ) ) * 1000 ;
        result = value - ( 0.015 * time * 1000 ) ;

        if( result < 0 ) // กำหนดค่า mg% ไม่ให้เกินจริง
        {
             result = 0 ;
        }
        
        agent.add(`ถ้าหากข้อมูลการดื่มและข้อมูลผู้ดื่มเป็นไปตามที่แจ้งไว้ และเวลาไป ${time} ชั่วโมง ระดับแอลกอฮฮล์จะเหลืออยู่ ${result.toFixed(2)} มิลลิกรัมเปอร์เซ็น`);
        agent.add(`ตามกฏหมายแล้วหากคุณมีอายุเกิน 20 ปี และระดับแอลกอฮอล์ไม่เกินกว่า 50 มิลลิกรัมเปอร์เซ็นต์ จะถือว่าไม่ผิดกฏหมายถ้าคุณขับขี่ยานพาหนะ`)
        agent.add(`อย่างไรก็ตาม น้องตั้งใจย้ำนะคะ ว่าค่าที่น้องตั้งใจคำนวณให้นี้ เป็นค่าโดยประมาณเท่านั้น`);
        agent.add(`ไม่สามารถนำมาใช้อ้างอิงทางกฎหมายได้ ดังนั้นถ้าต้องขับขี่ น้องตั้งใจว่าไม่ดื่มเลยจะดีที่สุดแน่นอนค่ะ`);
        return agent.add(new Payload('LINE', {
            "type": "text",
            "text": "การคำนวนสิ้นสุดแล้ว ต้องการใช้งานอีกครั้งมั๊ยคะ?",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": `ดำเนินการต่อ`,
                            "text": `คำนวนปริมาณแอลกอฮอล์ในเลือด`
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": "ไว้ก่อน",
                            "text": `ยกเลิก`
                        }
                    }
                ]
            },
        } , { sendAsMessage: true }));
    }

    const recommendMore = async() => { //กรณีไม่อยากรู้ เวลาลดลงของแอลกอฮอล์
        agent.add(`อย่างไรก็ตาม น้องตั้งใจย้ำนะคะ ว่าค่าที่น้องตั้งใจคำนวณให้นี้ เป็นค่าโดยประมาณเท่านั้น`);
        agent.add(`ไม่สามารถนำมาใช้อ้างอิงทางกฎหมายได้ ดังนั้นถ้าต้องขับขี่ น้องตั้งใจว่าไม่ดื่มเลยจะดีที่สุดแน่นอนค่ะ`);
        agent.add(new Payload('LINE',
            {
                type: "text",
                text: "$ ถ้ายังไงเชิญคุณเลือกใช้งานเมนูอื่นๆที่สนใจได้อีก จากเมนูเลยนะคะ",
                emojis: [
                    {
                        index: 0,
                        productId: "5ac1bfd5040ab15980c9b435",
                        emojiId: "009"
                    }
                ]
            }
        , { sendAsMessage: true }));
    }

    const DoSurvey = async () => {
        agent.add(`ขอบคุณที่ทดลองใช้น้องตั้งใจนะคะ น้องตั้งใจอยากจะขอรบกวนเวลาคุณไม่นาน เพื่อทำแบบสอบถามความพึงพอใจในการใช้งานน้องตั้งใจค่ะ`);
        agent.add(new Payload('LINE', imageCarousels.Survey() , { sendAsMessage: true} ));
    }

    const knowladgeSection = async () => {
        agent.add("ฟังก์ชั่นข้อมูลการเลิกเหล้า เป็นฟังก์ชั่นที่รวบรวมข้อมูลต่าง ๆ ที่เกี่ยวข้องกับการเลิกเหล้าไว้ด้วยกัน เพื่อให้คุณได้ทราบข้อเท็จจริงจากต่าง ๆ และนำไปประยุกต์ใช้ได้ค่ะ") ;
        return agent.add(new Payload(`LINE` , knowladgeBase.MainMenu() , { sendAsMessage:true }));
    }

    const knowladge_IncludingAlcohol = async () => {
        return agent.add(new Payload(`LINE` , knowladgeBase.IncludingAlcohol() , {sendAsMessage:true}));
    }

        const knowladge_WhatIsAlcohol = async () => {
            agent.add("🍺 สุรา จัดเป็นสารเสพติดชนิดหนึ่ง เนื่องจากมีเอธิลแอลกอฮอล์เป็นส่วนผสม ซึ่งเอทิลแอกอฮอล์เป็นแอลกอฮอล์ที่ได้จากการแปรรูปจากพืชจำพวกแป้งและน้ำตาล เช่น อ้อย ข้าว ข้าวโพด มันสำปะหลัง") ;
            agent.add("ฤทธิ์ในทางเสพติด คือ ออกฤทธิ์กดประสาท😵‍💫 มีการเสพติดทั้งร่างกายและจิตใจ🧠 ทั้งเบียร์และสุราเป็นเครื่องดื่มที่มีแอลกอฮอล์ มีคุณค่าทางอาการต่ำแต่มีแคลอรี่สูง");
            agent.add("ปัจจุบันสุราเป็นสารเสพติดอีกชนิดหนึ่งที่มีผู้ใช้เกือบทุกกลุ่มวัยเพราะหาซื้อง่าย ใช้ในหลายโอกาสที่สำคัญ");
            return agent.add("ซึ่งคนส่วนใหญ่ยังไม่ได้ตระหนักว่ามันคือ ❗️สารเสพติดที่อันตราย❗️ ทั้งจากตัวของมันเองและเป็นอันตรายในฐานะที่เป็นจุดเริ่มต้นที่นำไปสู่การเสพยาเสพติดอื่น ๆ ตามมา ซึ่งก่อให้เกิดผลเสียทั้งทางด้านร่างกาย จิตใจ อารมณ์และสังคม");
        }

        const knowladge_Drunkenness = async () => {
            agent.add("Infographic") ;
        }

        const knowladge_AlcoholAddiction = async () => {
            agent.add("Infographic") ;
        }

        const knowladge_WithdrawalkSymptoms = async () => {
            agent.add("อาการถอนถอนพิษสุรา หรือที่เรียกว่า ‘อาการขาดสุรา’ เป็นอาการที่มักจะเกิดขึ้นกับผู้ที่ดื่มสุรามานานติดกันเป็นระยะเวลานาน ๆ หรือดื่มจนถึงขั้นอยู่ในอาการติดสุรา 🥴") ;
            agent.add("โดยสำหรับผู้ที่ดื่มสุรามานานหรือผู้ที่ดื่มติดต่อกันมานานหลายวันแล้วทำการหยุดดื่มสุราลงหรือลดปริมาณลงอย่างกระทันหันจะก่อให้การตื่นตัวของระบบประสาทอัตโนมัติ");
            agent.add("ซึ่งนำไปสู่อาการผิดปกติต่างๆ เช่น วิตกกังวล รู้สึกกระวนกระวาย มือสั่น ใจสั่น พูดเพ้อ สับสน ประสาทหลอนและเกิดอาหารชักในบางกรณี 🤮😵‍💫 ซึ่งโดยส่วนใหญ่แล้วในผู้ป่วยกลุ่มนี้จะมีอาการถอนเกิดขึ้นหลังหยุดดื่ม 2-3 วันจนถึง 1 สัปดาห์ขึ้นไป") ;
            agent.add("สำหรับผู้ที่ดื่มจนถึงขั้นติดสุราโดยทั่วไปแล้วจะเกิดอาการถอนสุราภายใน 6-8 ชม. แรกหลังจากหยุดดื่ม และมีอาการผิดปกติต่างๆ เช่น มีอาการสั่น คลื่นไส้ อาเจียน เหงื่อแตก หัวใจเต้นเร็ว ความดันโลหิตสูง วิตกกังวล หงุดหงิดกระสับกระส่าย 😖😫");
            agent.add("โดยอาการถอนมักจะรุนแรงที่สุดในช่วง 24-26 ชม. หลังจากที่ทำการหยุดดื่มและหลังจากนั้นอาการจะค่อยๆหายไปภายใน 3-4 วันและจะเรียกอาการช่วงนั้นว่า ‘การถอนสุราแบบธรรมดา’ 😮‍💨");
        }

    const knowladge_Effect = async () => {
        return agent.add(new Payload(`LINE`, knowladgeBase.AlcoholEffect() , { sendAsMessage:true}));
    }

        const knowladge_Disease = async() => {
            agent.add("สุราหรือแอลกอฮอล์ เป็นสารเสพติดที่มีโทษเป็นอย่างมาก เมื่อดื่มแล้วจะทำให้เกิดผลเสียต่อร่างกายของผู้ดื่ม โทษของสุรานั้นอาจมีตั้งแต่ขั้นเบาไปจนถึงขั้นรุนแรง ซึ่งผลเสียของสุราแบ่งออกได้หลายด้านดังนี้") ;
            return agent.add(new Payload(`LINE` , knowladgeBase.AlcoholIllness() , { sendAsMessage:true })) ;
        }

            const knowladge_Neural = async() => {
                agent.add("Infographic") ;
            }

            const knowladge_Cancer = async() => {
                agent.add("Infographic") ;
            }

            const knowladge_Chronic  = async() => {
                agent.add("Infographic") ;
            }

            const knowladge_Circulatory = async() => {
                agent.add("Infographic") ;
            }

        

    const drinkingStandardData = async () => {
        agent.add(`ดื่มมาตรฐาน หรือ Standard Drink เป็นหน่วยมาตรฐานของเครื่องดื่มที่มีแอลกอฮอล์บริสุทธิ์ผสมอยู่ 10 กรัม ตามนิยามที่ใช้ในประเทศไทย เพราะเครื่องดื่มแอลกอฮอล์แต่ละชนิด จะมีแอลกอฮอล์บริสุทธิ์ผสมอยู่ไม่เท่ากัน ขึ้นอยู่กับจำนวนเปอร์เซนต์ของแอลกอฮอล์ในเครื่องดื่มนั้น หากคุณดื่มเครื่องดื่มแอลกอฮอล์ปริมาณ 1 ดื่มมาตรฐาน ตับของคุณจะต้องใช้เวลาถึง 1 ชั่วโมง จึงจะกำจัดพิษแอลกอฮอล์นั้นออกจากร่างกายได้`) ;
        agent.add(createQuickReply("น้องตั้งใจจะนำคุณไปสู่ขั้นตอนถัดไปนะคะ",["กรอกข้อมูลของวันนี้"]));
    }
   
      const Test = async () => {
            agent.add("กำลังทดสอบ") ; 
            setInterval(agent.add("กำลังนับถอยหลัง"),3000);
            agent.add("สิ้นสุดการทดสอบ");
      }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('check connect', checkConnect);
    intentMap.set('SET_USER_PROFILE', setUserProfile);
    intentMap.set('SET_USER_PROFILE - next', SetUserPrepNext ) ;
    intentMap.set('EDIT_USER_PROFILE', setUserProfile);
    intentMap.set('RISK_ASSESSMENT', checkUserDrinking); //ถามคำถาม assit ข้อ 1
    intentMap.set('RISK_ASSESSMENT - yes', checkUserDrinkingIn3Month); //รับคำตอบข้อ 1 กรณีตอบว่าเคยดื่ม จะถามคำถามข้อ 2 ของ assist 
    intentMap.set('RISK_ASSESSMENT - drink in 3 month', riskAssessment_DrinkIn3Month);
    intentMap.set('RISK_ASSESSMENT - dont drink in 3 month', riskAssessment_DontDrinkIn3Month); 
    intentMap.set('SET_DRINKING_IN_WEEK', setDrinkingInWeekInputType);
    // intentMap.set('SET_DRINKING_IN_WEEK -  fill alcohol', setDrinkingInWeek_fill);
    intentMap.set('SET_DRINKING_IN_WEEK - pick alcohol', setDrinkingInWeek_pick);
    intentMap.set('SET_DRINKING_IN_WEEK - edit', setDrinkingInWeekInputType);
    intentMap.set('RISK_ASSESSMENT_RESULT', setDrinkingInWeekInputType);
    intentMap.set('RISK_ASSESSMENT_RESULT - week', riskAssessmentResultWeek);
    intentMap.set('RISK_ASSESSMENT_RESULT - day', riskAssessmentResultDay);
    intentMap.set('RISK_ASSESSMENT_RESULT - risk', riskAssessmentResultRisk);
    intentMap.set('DRINK_STANDARD', drinkingStandardData);
    intentMap.set('ASSESS_MOTIVATION', assessMotivation);
    intentMap.set('ASSESS_MOTIVATION - result', assessMotivationResult);
    intentMap.set('ASSESS_MOTIVATION - goal',assessGoal);
    intentMap.set('Survey', DoSurvey);
    intentMap.set('ResponseTest', Test);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST' , measureAlcohalInBlood);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - yes',measureAlcohalInBloodCalculated);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes',alcoholComposing);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no', NOalcoholComposing);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes - yes', alcoholLessThan);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no - yes', alcoholLessThan);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes - no', recommendMore);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no - no', recommendMore);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - edit', alcoholEdit);
    intentMap.set('knowladge', knowladgeSection);
    intentMap.set('select_IncludingAlcohol', knowladge_IncludingAlcohol);
        intentMap.set('select_WhatIsAlcohol', knowladge_WhatIsAlcohol);
        intentMap.set('select_drunkenness', knowladge_Drunkenness) ;
        intentMap.set('select_AlcoholAddiction', knowladge_AlcoholAddiction);
        intentMap.set('select_WithdrawalSymptoms', knowladge_WithdrawalkSymptoms);
    intentMap.set('select_effect', knowladge_Effect) ;
        intentMap.set('select_Kind', knowladge_Disease);
            intentMap.set('select_neural', knowladge_Neural);
            intentMap.set('select_Cancer', knowladge_Cancer) ;
            intentMap.set('select_Chronic', knowladge_Chronic) ;
            intentMap.set('select_Circulatory', knowladge_Circulatory) ;
    agent.handleRequest(intentMap);
});
module.exports = myexp