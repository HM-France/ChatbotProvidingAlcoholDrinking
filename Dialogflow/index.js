const { generateKey } = require('crypto');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const { userDB } = require('../firebase');
const  imageCarousels = require('./imageCarousels');

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
        let motivation = agent.parameters;
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
        }

        return agent.add(new Payload(
            `LINE`,
            {
                "type": "text",
                "text": "ถ้าน้องตั้งใจพูดถึงสิ่งต่อไปนี้ คุณคิดว่าเรื่องไหนที่จะเป็นเป้าหมายของคุณในการปรับเปลี่ยนพฤติกรรมการดื่มคะ",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "text": `สุขภาพดีขึ้น`,
                                "label": `สุขภาพดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "การเรียนและการงานดีขึ้น",
                                "text": `การเรียนและการงานดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "การเงินดีขึ้น",
                                "text": `การเงินดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "ความสัมพันธ์ดีขึ้น",
                                "text": `ความสัมพันธ์ดีขึ้น`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "ปัญหาทางกฎหมายลดลง",
                                "text": `ปัญหาทางกฎหมายลดลง`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "อยากรู้สึกดีต่อตัวเอง",
                                "text": `อยากรู้สึกดีต่อตัวเอง`
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "text",
                                "label": "เพื่อจิตใจที่สงบ",
                                "text": `เพื่อจิตใจที่สงบ`
                            }
                        },
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const assessGoal = async () => {
        let goal = agent.parameters ;
        await userDB.setGoal(userId, goal);
        const { motivation , ASSIST_STATUS , IsStandard } = await userDB.get(userId);

        console.log("Goal :",goal);
        console.log("motivation: ",motivation);
        console.log("ASSIST_STATUS: ",ASSIST_STATUS);
        console.log("IsStandard: ",IsStandard);
        console.log("================");
        
        console.log("Enter assessGoal") ;
        if ( ASSIST_STATUS === "ความเสี่ยงต่ำ" ){
            if ( motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`);
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มชึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);		
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ`);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย และปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่ดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${motivation} และการที่ยังคงดื่มอยู่ ก็อาจจะทำ${motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${motivation} และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`จากการประเมินลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่เพราะเรื่อง${motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อยแต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และอาจสัมพันธ์กับเรื่อง${motivation} เพราะเรื่อง${motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${motivation} แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย รวมถึงปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${motivation} ซึ่งน้องตั้งใจเห็นว่าดีมากเลยค่ะ เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ) {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${motivation}เป็นแรงผลักดัน แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ`) ;
                }else if ( IsStandard === 'เกิน' ) {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${motivation}เป็นแรงผลักดันแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ ซึ่งน้องตั้งใจอยากให้กำลังใจคุณและแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else{
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        }else if ( ASSIST_STATUS === "ความเสี่ยงปานกลาง" ){
            if ( motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่ดูเหมือนว่าลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`แม้ว่าตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณ มีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้และอาจทำให้คุณเริ่มเป็นห่วง ปัญหาเรื่อง${IsStandard}และการที่ยังคงดื่มอยู่ ก็อาจจะทำให้ปัญหา${IsStandard}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งอาจทำให้คุณเริ่มเป็นห่วงปัญหาเรื่อง${IsStandard}และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${IsStandard}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้นถ้าคุณหยุดดื่มได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${IsStandard} แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${IsStandard} เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${IsStandard} น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${IsStandard} น้องตั้งใจขอเป็นกำลังใจให้นะคะ ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${IsStandard}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${IsStandard}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งน้องตั้งใจอยากให้กำลังใจคุณ และแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างค่ะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else{
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        }else if ( ASSIST_STATUS === "ความเสี่ยงสูง" ){
            if ( motivation === "ไม่เห็นปัญหา" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่ดูเหมือนว่าลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใดๆ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ และลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมาก หรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลังเล" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่คุณกำลังคิดถึงปัญหาเรื่อง${IsStandard}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่ และปัญหา${IsStandard}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`คุณกำลังคิดถึงปัญหาเรื่อง${IsStandard}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่และปัญหา${IsStandard}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ตัดสินใจ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${IsStandard}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${IsStandard}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ลงมือ" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${IsStandard}น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่จากการประเมินลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${IsStandard}น้องตั้งใจขอเป็นกำลังใจให้นะคะ เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุราและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }else if ( motivation === "ทำต่อเนื่อง" ){
                if ( IsStandard === "ไม่เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${IsStandard}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else if ( IsStandard === "เกิน" ){
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${IsStandard}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                }else{
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }
        }else{
            agent.add(`พบข้อผิดพลาดในการแสดงผลการสรุป`) ;
        }

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
        // if( !volume ){
        //     agent.add(`ปริมาณโดยคร่าวเท่าไรคะ?`); 
        //     return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize.all, { sendAsMessage: true }));
        // }
        if( !numberofDrinks ){
            return agent.add(`ดื่มไปปริมาณกี่${container}คะ?`);
        }
        
        agent.add(`น้องตั้งใจขอทบทวนข้อมูลนะคะ`);
        agent.add(`จากข้อมูลที่น้องตั้งใจได้รับมาคือ คุณเป็น ผู้${gender} น้ำหนัก ${weight} กิโลกรัม ดื่ม${types}ไปทั้งหมด ${numberofDrinks} ${container} โดยหนึ่ง${container}มีปริมาณ ${volume} มิลลิลิตร  `);
        console.log('Redirecting to : measureAlcohalInBloodCalculated');
        return agent.add(createQuickReply('ข้อมูลนี้ถูกต้องมั๊ยคะ?', ["ถูกต้อง", "ไม่ถูกต้อง"]));
    }

    const measureAlcohalInBloodCalculated = async () => {
        agent.add(`ขอบคุณสำหรับข้อมูลค่ะ น้องตั้งใจขอเวลาคำนวณสักครู่นะคะ`);
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
             percent = 5;
        }else if(types ==='ไวน์' || types ==='สุราพื้นเมือง'){
             percent = 13;a
        }else if(types ==='เครื่องดื่มอื่นๆ'){
             percent = 40;
        }else{
            percent =  0 ;
        }

        // Response back data
        value = (((percent*(volume * numberofDrinks )*0.79) / 100) / weight * rho ) * 10 ;
        agent.add(`จากการคำนวณถ้าคุณเป็นผู้${gender} มีน้ำหนัก  ${weight} กก. และดื่มเครื่องดื่มตามปริมาณดังกล่าว จะทำให้มีระดับแอลกอฮอล์ในเลือดอยู่ที่ประมาณ ${value.toFixed(2)} มิลลิกรัมเปอร์เซ็นต์ค่ะ`);
        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าปริมาณแอลกอฮอล์ที่ดื่มเข้าไปนี้ ว่าต้องใช้เวลานานแค่ไหนร่างกายถึงจะขับออกไปได้หมด', ["อยากรู้", "ไม่อยากรู้"]));
    }

    const alcoholComposing = async () => {
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
             percent = 5;
        }else if(types ==='ไวน์' || types ==='สุราพื้นเมือง'){
             percent = 13;
        }else if(types ==='เครื่องดื่มอื่นๆ'){
             percent = 40;
        }else{
            percent =  0 ;
        }
        value = (((percent*(volume * numberofDrinks )*0.79) / 100) / weight * rho ) * 10 ;
        let timeResult = value/7 ; 
        agent.add(`ถ้าคุณเป็นผู้${gender} น้ำหนัก ${weight} กก. ดื่ม${types} ปริมาณ ${numberofDrinks} ${container} ต้องใช้เวลาอย่างน้อย ${timeResult} ชั่วโมง แอลกอฮอล์ในร่างกายถึงจะถูกขับออกไปได้หมด`);
        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าต้องใช้เวลารอนานแค่ไหน กว่าที่ระดับแอลกอฮอล์ในเลือดของคุณจะลดต่ำลงกว่า 50 มิลลิกรัมเปอร์เซ็นต์ ซึ่งหากไม่มีการดื่มเพิ่มระหว่างนั้นจะถือว่าเป็นระดับที่ไม่ผิดกฎหมายถ้าคุณขับขี่ และมีอายุเกิน 20 ปี', ["อยากรู้", "ไม่อยากรู้"]));
    }

    const DoSurvey = async () => {
        agent.add(`ขอบคุณที่ทดลองใช้น้องตั้งใจนะคะ น้องตั้งใจอยากจะขอรบกวนเวลาคุณไม่นาน เพื่อทำแบบสอบถามความพึงพอใจในการใช้งานน้องตั้งใจค่ะ`);
        agent.add(new Payload('LINE', {            
            type: "template",
            altText: "แบบฟอร์มประเมินความพึงพอใจในการใช้งานระบบแชทบอท",
            template: {
                type: "buttons",
                thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%96%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B6%E0%B8%87%E0%B8%9E%E0%B8%AD%E0%B9%83%E0%B8%88%2Fonline-survey.jpg?alt=media&token=57f00317-4844-4475-809c-8c72ad3ca717",
                imageAspectRatio: "rectangle",
                imageSize: "cover",
                imageBackgroundColor: "#FFFFFF",
                title: "แบบประเมินความพึงพอใจ",
                text: " ",
                defaultAction: {
                    type: "uri",
                    label: "กดที่นี่เพื่อทำแบบสอบถาม",
                    uri: "https://forms.gle/YJXZj2NyZeySvWbJA"
                },
                actions: [
                    {
                      type: "uri",
                      label: "กดที่นี่เพื่อทำแบบสอบถาม",
                      uri: "https://forms.gle/YJXZj2NyZeySvWbJA"
                    }
                ]
            }
          } , { sendAsMessage: true} ));
    }


    
      const Test = async () => {
          agent.add("กำลังทดสอบ") ;
         agent.add(new Payload('LINE',{
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
                        actions: [
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
        }, { sendAsMessage: true} ));
          agent.add("สิ้นสุดการทดสอบ");
      }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('check connect', checkConnect);
    intentMap.set('SET_USER_PROFILE', setUserProfile);
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
    intentMap.set('ASSESS_MOTIVATION', assessMotivation);
    intentMap.set('ASSESS_MOTIVATION - result', assessMotivationResult);
    intentMap.set('ASSESS_MOTIVATION - goal',assessGoal);
    intentMap.set('Survey', DoSurvey);
    intentMap.set('ResponseTest', Test);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST' , measureAlcohalInBlood);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - yes',measureAlcohalInBloodCalculated);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes',alcoholComposing);
    agent.handleRequest(intentMap);
});
module.exports = myexp