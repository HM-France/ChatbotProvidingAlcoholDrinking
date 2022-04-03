// NTJ-TEST
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const { patch } = require('request');
const { userDB } = require('../firebase');
const imageCarousels = require('./imageCarousels');
const knowladgeBase = require('./knowledgebase');

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
        }, { sendAsMessage: true }));
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

    const checkUserDrinkingIn3Month = async () => {
        return agent.add(createQuickReply(
            'ลองทบทวนดูนะคะว่า ในช่วง 3 เดือนที่ผ่านมานี้ คุณดื่มเครื่องดื่มแอลกอฮอล์บ้างไหม',
            ['ดื่ม', 'ไม่ได้ดื่ม']
        ));
    }

    const riskAssessment_DrinkIn3Month = async () => {
        let { second, third, fourth, fifth, sixth, seventh } = agent.parameters;
        if (!second) {
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
        var points = parseInt(second) + parseInt(third) + parseInt(fourth) + parseInt(fifth) + parseInt(sixth) + parseInt(seventh);
        let ASSIST_STATUS = "";
        console.log('points :', points)
        console.log('ASSIST_STATUS : ', ASSIST_STATUS);
        if (points < 11) {
            ASSIST_STATUS = "ความเสี่ยงค่ำ";
        } else if (points > 10 && points < 27) {
            ASSIST_STATUS = "ความเสี่ยงปานกลาง";
        } else {
            ASSIST_STATUS = "ความเสี่ยงสูง";
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
                                "text": `กรอกข้อมูลวันนี้`
                            }
                        }
                    ]
                },
            },
            { sendAsMessage: true }
        ))
    }

    const riskAssessment_DontDrinkIn3Month = async () => {
        let { sixth, seventh } = agent.parameters;
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

        var points = parseInt(sixth) + parseInt(seventh);
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
                                "text": `กรอกข้อมูลวันนี้`
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
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน'];

        if (dayInWeek[thisDay] === 'วันนี้') {
            agent.add('หากคุณรู้ปริมาณความเข้มข้นของแอลกอฮอล์ของเครื่องดื่มที่คุณดื่มในแต่ละวันแล้ว คุณสามารถเลือกกำหนดเองได้เลยค่ะ เพื่อความถูกต้องแม่นยำมากที่สุด');
            agent.add('การระบุความเข้มข้นนั้นให้พิมพ์เฉพาะตัวเลข และจุดทศนิยม ถ้ามีนะคะ เช่น หากฉลากระบุว่า “ALC 8.0% VOL” ให้พิมพ์ว่า “8.0” ค่ะ');
            agent.add('หากคุณไม่สามารถระบุความเข้มข้นได้ น้องตั้งใจก็มีรายชื่อเครื่องดื่มชนิดต่างๆ ให้คุณเลือกได้ค่ะ');
        }

        if (thisDay !== 0 && !user.drinkingInWeek[dayInWeek[thisDay - 1]]) {
            return agent.add(createQuickReply(`คุณยังไม่ได้ให้ข้อมูลของ${dayInWeek[thisDay - 1]}เลยนะคะ`, [
                `กรอกข้อมูลของ${dayInWeek[thisDay - 1]}`]))
        }

        return agent.add(createQuickReply(
            `${dayInWeek[thisDay]}คุณดื่มอะไรคะ หากว่าดื่มหลายชนิด ให้เลือกเครื่องดื่มที่ดื่มปริมาณมากที่สุดมาเพียงชนิดเดียวค่ะ`,
            ["ขอเลือกจากเมนู", `${dayInWeek[thisDay]}ไม่ได้ดื่ม`]
        ));
    }

    const setNoDrinkingInWeek = async () => {
        let { thisDay, type, percent, container, volume, numberOfDrinks } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน'];
        var standardDrink;

        if(!type){
            type = 'ไม่ได้ดื่ม';
        }
        if (!percent) {
            percent = '0';
        }
        if (!container) {
            container = 'ไม่ได้ดื่ม';
        }
        if (!volume) {
            volume = '0';
        }
        if (!numberOfDrinks){
            numberOfDrinks = '0';
        }

        console.log('this day:', thisDay);
        console.log('type:', type);
        console.log('percent:', percent);
        console.log('container:', container);
        console.log('volume:', volume);
        console.log('number of drink:', numberOfDrinks);
        console.log('-------------------');

        standardDrink = calculateStandardDrink(percent, volume, numberOfDrinks);
        console.log('standardDrink:',standardDrink);
        await userDB.setDrinkingInWeek(userId, dayInWeek[thisDay], {
            type, percent, container, volume, numberOfDrinks, standardDrink
        })

        if (thisDay !== 3) {
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

    const setDrinkingInWeek_pick = async () => {
        let { thisDay, type, percent, container, volume, numberOfDrinks } = agent.parameters;
        thisDay = parseInt(thisDay);
        const dayInWeek = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน'];
        var standardDrink;

        console.log('this day:', thisDay);
        console.log('type:', type);
        console.log('percent:', percent);
        console.log('container:', container);
        console.log('volume:', volume);
        console.log('number of drink:', numberOfDrinks);
        console.log('-------------------');

        if (!type) {
            agent.add(`กรุณาเลือกเครื่องดื่มด้วยค่ะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
        } else {
            if (type === 'สุราสี' || type === 'สุราขาว') {
                if (!percent) {
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
            } else {
                if (!percent) {
                    var aclPercent;
                    if (type === 'ไวน์คูลเลอร์' || type === 'เบียร์') {
                        aclPercent = 5;
                    } else if (type === 'ไวน์' || type === 'สุราพื้นเมือง') {
                        aclPercent = 13;
                    } else if (type === 'เครื่องดื่มอื่นๆ') {
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

        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน'];
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)];
        var sumSdPoint = (sdPoint[0] + sdPoint[1] + sdPoint[2]).toFixed(1);

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
        const day = ['วันนี้', 'เมื่อวาน', 'เมื่อวานซืน'];
        var maxDay = '';
        var result;
        const { profile: { gender, age } } = await userDB.get(userId);
        var { drinkingInWeek } = await userDB.get(userId);
        var sdPoint = [parseFloat(drinkingInWeek[day[0]].standardDrink), parseFloat(drinkingInWeek[day[1]].standardDrink), parseFloat(drinkingInWeek[day[2]].standardDrink)];

        var maxSdPoint = Math.max(...sdPoint);
        for (var i = 0; i <= 2; i++) {
            if (maxSdPoint = sdPoint[i]) {
                maxDay = day[i];
                break;
            }
        }

        if (gender === 'หญิง' || age >= 66) {
            if (maxSdPoint > 3) {
                result = 'เกิน';
                console.log("result : ", result);
                await userDB.setDrinkingStandard(userId, result);
            } else {
                result = 'ไม่เกิน';
                console.log("result : ", result);
                await userDB.setDrinkingStandard(userId, result);
            }
        } else if (gender === 'ชาย') {
            if (maxSdPoint > 4) {
                result = 'เกิน';
                console.log("result : ", result);
                await userDB.setDrinkingStandard(userId, result);
            } else {
                result = 'ไม่เกิน';
                console.log("result : ", result);
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

    const riskAssessmentResultRisk = async () => {
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

        if (assistPoint <= 10) {
            resultRisk = 'ต่ำ';
        } else if (10 < assistPoint <= 26) {
            resultRisk = 'สูง';
        } else if (assistPoint >= 27) {
            resultRisk = 'สูงมาก';
        }

        if (resultWeek === 'ไม่เกิน' && resultDay === 'ไม่เกิน' && resultRisk === 'ต่ำ') {
            result = 'และ';
        } else if (((resultWeek === 'เกิน' && resultDay === 'ไม่เกิน') || (resultWeek === 'ไม่เกิน' && resultDay === 'เกิน')) && resultRisk !== 'ต่ำ') {
            result = 'และ';
        } else {
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
        let { motivation } = agent.parameters;
        console.log("motivation", motivation);
        if (motivation === "ไม่เห็นปัญหา") {
            agent.add("ตอนนี้ คุณยังไม่เห็นว่าการดื่มเช่นนี้จะก่อให้เกิดปัญหาใดๆ");
            console.log("motivation : ", motivation);
            await userDB.setMotivation(userId, motivation);
        } else if (motivation === "ลังเล") {
            agent.add("เหมือนว่าคุณเริ่มรู้สึกลังเลเกี่ยวกับการดื่ม คุณอาจกังวลถึงผลเสียที่อาจจะเกิดขึ้น หากคุณยังคงดื่มเช่นนี้ต่อไป หรือคุณอาจกำลังคิดว่า อะไรๆน่าจะดีขึ้นถ้าคุณหยุดดื่มได้");
            console.log("motivation : ", motivation);
            await userDB.setMotivation(userId, motivation);
        } else if (motivation === "ตัดสินใจ") {
            agent.add("เหมือนคุณตัดสินใจแล้วว่าคุณอยากที่จะปรับเปลี่ยนตัวเองเกี่ยวกับเรื่องการดื่ม");
            console.log("motivation : ", motivation);
            await userDB.setMotivation(userId, motivation);
        } else if (motivation === "ลงมือ") {
            agent.add("เยี่ยมมากค่ะ คุณกำลังจะลงมือทำอย่างจริงจังแล้ว");
            console.log("motivation : ", motivation);
            await userDB.setMotivation(userId, motivation);
        } else if (motivation === "ทำต่อเนื่อง") {
            agent.add("เยี่ยมมากค่ะ คุณลงมือเปลี่ยนแปลงตัวเองมาช่วงหนึ่งแล้ว");
            console.log("motivation : ", motivation);
            await userDB.setMotivation(userId, motivation);
        } else {
            agent.add(`พบปัญหาในการแสดงผล | motivation : ${motivation}`);
        }

        agent.add("ถ้าน้องตั้งใจพูดถึงสิ่งต่อไปนี้ คุณคิดว่าเรื่องไหนที่จะเป็นเป้าหมายของคุณในการปรับเปลี่ยนพฤติกรรมการดื่มคะ");

        return agent.add(new Payload(`LINE`, imageCarousels.goal(), { sendAsMessage: true }
        ))
    }

    const assessGoal = async () => { // ขั้นตอนที่ 7 และ 8
        let { goal } = agent.parameters;
        await userDB.setGoal(userId, goal);
        const { Motivation, ASSIST_STATUS, IsStandard, profile: { age, gender } } = await userDB.get(userId);

        console.log("Goal :", goal);
        console.log("motivation: ", Motivation);
        console.log("ASSIST_STATUS: ", ASSIST_STATUS);
        console.log("IsStandard: ", IsStandard);
        console.log("Gender :", gender);
        console.log("Age :", age);
        console.log("================");

        console.log("Enter assessGoal");
        if (ASSIST_STATUS === "ความเสี่ยงต่ำ") {
            if (Motivation === "ไม่เห็นปัญหา") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`);
                } else if (IsStandard === 'เกิน') {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และก็ดูเหมือนว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มชึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ`);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลังเล") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย และปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่ดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation} และการที่ยังคงดื่มอยู่ ก็อาจจะทำ${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                } else if (IsStandard === 'เกิน') {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และดูเหมือนว่าคุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation} และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ตัดสินใจ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`จากการประเมินลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่เพราะเรื่อง${Motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`);
                } else if (IsStandard === 'เกิน') {
                    agent.add(`จากการประเมิน ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อยแต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้น สูงเกินกว่าระดับที่แนะนำ และอาจสัมพันธ์กับเรื่อง${Motivation} เพราะเรื่อง${Motivation}ที่ทำให้คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเอง`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลงมือ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้น ก็มีโอกาสที่จะเกิดปัญหาได้น้อย รวมถึงปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำ`);
                } else if (IsStandard === 'เกิน') {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${Motivation} ซึ่งน้องตั้งใจเห็นว่าดีมากเลยค่ะ เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้นหากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ทำต่อเนื่อง") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${Motivation}เป็นแรงผลักดัน แม้ว่าลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อยและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ`);
                } else if (IsStandard === 'เกิน') {
                    agent.add(`ก่อนอื่นน้องตั้งใจขอชื่นชมที่คุณได้ตัดสินใจอย่างเด็ดขาดแล้ว โดยมีเรื่อง${Motivation}เป็นแรงผลักดันแม้ว่า ลักษณะการดื่มของคุณในปัจจุบันนั้น หากไม่ได้รุนแรงเพิ่มขึ้นก็มีโอกาสที่จะเกิดปัญหาได้น้อย แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ ซึ่งน้องตั้งใจอยากให้กำลังใจคุณและแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else {
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${Motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        } else if (ASSIST_STATUS === "ความเสี่ยงปานกลาง") {
            if (Motivation === "ไม่เห็นปัญหา") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณมีความเห็นว่า การดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่ดูเหมือนว่าลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`แม้ว่าตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไป คุณอาจประสบปัญหาในอนาคตได้`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลังเล") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณ มีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้และอาจทำให้คุณเริ่มเป็นห่วง ปัญหาเรื่อง${Motivation}และการที่ยังคงดื่มอยู่ ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้น ถ้าคุณหยุดดื่มได้`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งอาจทำให้คุณเริ่มเป็นห่วงปัญหาเรื่อง${Motivation}และการที่ยังคงดื่มอยู่ก็อาจจะทำให้ปัญหา${Motivation}นี้แย่ลง ซึ่งน้องตั้งใจหวังว่ามันอาจจะดีขึ้นถ้าคุณหยุดดื่มได้`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ตัดสินใจ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation} แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation} เพราะปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำและลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลงมือ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation} น้องตั้งใจขอเป็นกำลังใจให้นะคะ ลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหา และหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ทำต่อเนื่อง") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำแต่จากการประเมินลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณมีความเสี่ยงที่จะเกิดปัญหาและหากดื่มเช่นนี้ต่อไปคุณอาจประสบปัญหาในอนาคตได้ แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำซึ่งน้องตั้งใจอยากให้กำลังใจคุณ และแนะนำให้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างค่ะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else {
                console.log(`พบปัญหาค่า MOTIVATION มีสถานะไม่ปกติ : MOTIVATION = ${Motivation} `);
                agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
            }
        } else if (ASSIST_STATUS === "ความเสี่ยงสูง") {
            if (Motivation === "ไม่เห็นปัญหา") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใด ๆ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนำ แต่ดูเหมือนว่าลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`ตอนนี้คุณมีความเห็นว่าการดื่มนั้นยังไม่ก่อให้เกิดปัญหาใดๆ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ และลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมาก หรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลังเล") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้น ก็ไม่ได้เกินระดับที่แนะนำแต่คุณกำลังคิดถึงปัญหาเรื่อง${Motivation}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่ และปัญหา${Motivation}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`คุณกำลังคิดถึงปัญหาเรื่อง${Motivation}ที่อาจจะแย่ลงหากว่าคุณยังคงดื่ม และคุณกำลังคิดถึงการเปลี่ยนแปลงตัวเองอยู่และปัญหา${Motivation}นี้อาจดีขึ้นเมื่อคุณหยุดดื่มได้ และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนำ น้องตั้งใจเห็นด้วยและอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้าง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ตัดสินใจ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่างๆอย่างมากหรืออาจกำลังมีภาวะติดสุรา แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`น้องตั้งใจเห็นด้วยนะคะที่คุณตัดสินใจได้ว่าคุณต้องปรับเปลี่ยนเรื่องการดื่มของตัวเองเพราะเรื่อง${Motivation}เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ลงมือ") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้วเพราะเรื่อง${Motivation}น้องตั้งใจขอเป็นกำลังใจให้นะคะ แม้ว่าปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา แต่จากการประเมินลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`ตอนนี้คุณได้เริ่มลงมือเปลี่ยนแปลงตนเองแล้ว เพราะเรื่อง${Motivation}น้องตั้งใจขอเป็นกำลังใจให้นะคะ เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุราและปริมาณการดื่มใน 7 วันที่ผ่านมานั้นสูงเกินกว่าระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            } else if (Motivation === "ทำต่อเนื่อง") {
                if (IsStandard === "ไม่เกิน") {
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา แต่ปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else if (IsStandard === "เกิน") {
                    agent.add(`น้องตั้งใจขอเป็นกำลังใจให้คุณสามารถลดการดื่มให้ได้ต่อเนื่องนะคะ เพื่อให้เรื่อง${Motivation}ที่เป็นสาเหตุหลักที่ทำให้คุณตั้งใจเปลี่ยนแปลงตนเองนั้นดีขึ้นอย่างต่อเนื่อง เพราะลักษณะการดื่มของคุณตอนนี้เสี่ยงสูงที่จะเกิดปัญหาต่าง ๆ อย่างมากหรืออาจกำลังมีภาวะติดสุรา และปริมาณการดื่มใน 7 วันที่ผ่านมานั้นก็ไม่ได้เกินระดับที่แนะนํา ซึ่งน้องตั้งใจอยากให้คุณได้ปรึกษากับผู้เชี่ยวชาญของเราเพื่อดูว่าเราสามารถให้การช่วยเหลือคุณเพิ่มอย่างไรได้บ้างนะคะ`);
                } else {
                    console.log(`พบปัญหาค่า IsStandard มีสถานะไม่ปกติ : IsStandard = ${IsStandard} `);
                    agent.add(`พบปัญหาระหว่างการประมวลผลคำ`);
                }
            }
        } else {
            agent.add(`พบข้อผิดพลาดในการแสดงผลการสรุป`);
        }

        agent.add("น้องตั้งใจอยากจะขอแนะนำปริมาณการดื่มในหนึ่งสัปดาห์ และในหนึ่งวันที่คุณจะสามารถดื่มได้โดยที่ไม่เพิ่มความเสี่ยงต่อสุขภาพและสังคมของคุณนะคะ");
        agent.add(`จากข้อมูลของคุณนั้น คุณเป็นเพศ${gender} และคุณมีอายุ ${age} ปี น้องตั้งใจขอแนะนำดังนี้ค่ะ`);

        if (age > 65) {
            if (gender === "ชาย") { // 1A
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ ต้องดื่มไม่เกิน 7 กระป๋อง หรือ หากดื่มไวน์ต้องดื่มไม่เกิน 10 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 2 แก้ว");
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 3 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว");
                // แนบ Infographic
            } else if (gender === "หญิง") { // 1B
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ ต้องดื่มไม่เกิน 7 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 8 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่ืไม่เกิน 2 แก้ว");
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือ หากดื่มไวน์ ต้องดื่มไม่เกิน 3 แก้ว หรือ หากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว");
                // แนบ Infographic
            } else {
                console.log("Gender value error : ", gender);
            }
        } else if (age <= 65 && age >= 20) {
            if (gender === "ชาย") { // 1C
                agent.add("ในหนึ่งสัปดาห์ หากคุณดื่มเบียร์ต้องดื่ไม่เกิน 15 กระป๋อง หรือ หากดื่มไวน์ต้องดื่มไม่เกิน 16 แก้ว หรือ หากดื่มสุราสี 35 ดีกรีต้องดื่มไม่เกิน 4 แก้ว");
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 4 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 4 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่กิน 1 แก้ว");
                // แนบ Infographic
            } else if (gender === "หญิง") { // 1D
                agent.add("ในหนึ่งสัปดาห์ หากคุณดืมเบียร์ต้องดื่มไม่เกิน 7 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 8 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 2 แก้ว");
                agent.add("และในหนึ่งวัน คุณดื่มเบียร์ได้ไม่เกิน 3 กระป๋อง หรือหากดื่มไวน์ต้องดื่มไม่เกิน 3 แก้ว หรือหากดื่มสุราสี 35 ดีกรี ต้องดื่มไม่เกิน 1 แก้ว");
                // แนบ Infographic
            } else {
                console.log("Gender value error : ", gender);
            }
        } else if (age < 20) { // 1E
            agent.add("กฏหมายได้ห้ามขายเครื่องดื่มแอลกออฮอล์ให้้คุณ หากอายุของคุณต่ำกว่า 20 ปี ดังนั้นการดื่มไม่ว่าในปริมาณเท่าใดก็อาจยังไม่เหมาะสมนะคะ");
        } else {
            console.log("age value error : ", age);
        }

        agent.add("อย่างไรก็ตาม คุณไม่ควรดื่มเครื่องดื่มแอลกออฮล์เลย หากคุณกำลังวางแผนหรือตั้งครรภ์อยู่ หรือมีประวัติติดแอลกอฮอล์หรือสารเสพติดชนิดอื่น หรือมีโรคตับหรือข้อห้ามอื่น ๆ ");
        agent.add("หากคุณไม่สามารถควบคุมการดื่่มของคุณให้ต่ำกว่านะดับที่น้องตั้งใจบอกนี้ได้ คุณมีความเสี่ยงที่จะเกิดปัญหา หรือเสี่ยงที่จะติดแอลกอฮอล์ได้นะคะ");
    }

    const measureAlcohalInBlood = async () => {

        let { gender, weight, types, container, numberofDrinks, volume } = agent.parameters;

        console.log('gender:', gender);
        console.log('weight:', weight);
        console.log('types:', types);
        console.log('container:', container);
        console.log('number of drink:', numberofDrinks);
        console.log('volume:', volume);
        console.log('-------------------');



        if (!gender) {
            return agent.add(createQuickReply('ขอทราบเพศของคุณได้ไหมคะ?', ["ชาย", "หญิง"]));
        }
        if (!weight) {
            return agent.add(`น้ำหนักเท่าไรคะ?`);
        }
        if (!types) {
            agent.add(`ดื่มอะไรมาหรอคะ?`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().types.all, { sendAsMessage: true }));
        }
        if (!container) {
            agent.add(`เลือกภาชนะที่ใกล้เคียงที่สุดค่ะ`);
            return agent.add(new Payload('LINE', imageCarousels.alcohol().containerSize[types], { sendAsMessage: true }));
        }
        if (!numberofDrinks) {
            return agent.add(`ดื่มไปปริมาณกี่${container}คะ?`);
        }

        agent.add(`น้องตั้งใจขอทบทวนข้อมูลนะคะ`);
        agent.add(`จากข้อมูลที่น้องตั้งใจได้รับมาคือ คุณเป็น ผู้${gender} น้ำหนัก ${weight} กิโลกรัม ดื่ม${types}ไปทั้งหมด ${numberofDrinks} ${container} โดยหนึ่ง${container}มีปริมาณ ${volume} มิลลิลิตร  `);
        console.log('Redirecting to : measureAlcohalInBloodCalculated');
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
        }, { sendAsMessage: true }));
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
        }, { sendAsMessage: true }));
    }

    const measureAlcohalInBloodCalculated = async () => {
        agent.add(`ขอบคุณสำหรับข้อมูลค่ะ น้องตั้งใจขอเวลาคำนวณสักครู่นะคะ`);
        let { gender, weight, types, container, numberofDrinks, volume } = agent.parameters;
        let rho, value, percent;
        console.log('gender:', gender);
        console.log('weight:', weight);
        console.log('types:', types);
        console.log('container:', container);
        console.log('number of drink:', numberofDrinks);
        console.log('volume:', volume);
        console.log('percent : ', percent);
        console.log('-------------------');


        // assign rho value
        if (gender === "ชาย") {
            rho = 0.73;
            console.log("assign Gender conplete : ", rho);
        } else if (gender === "หญิง") {
            rho = 0.66;
            console.log("assign Gender conplete : ", rho);
        }
        // assign percent
        if (types === 'ไวน์คูลเลอร์' || types === 'เบียร์') {
            percent = 0.05;
        } else if (types === 'ไวน์' || types === 'สุราพื้นเมือง') {
            percent = 0.13;
        } else if (types === 'เครื่องดื่มอื่นๆ' || types === 'สุราสี40') {
            percent = 0.40;
        } else if (types === 'สุราสี35') {
            percent = 0.35;
        } else {
            percent = 0;
        }
        console.log('percent : ', percent);
        // Response back data
        value = ((((volume * numberofDrinks) / 29.574) * percent * 5.14) / ((weight / 0.454) * rho)) * 1000;
        console.log("value :", value);
        agent.add(`จากการคำนวณถ้าคุณเป็นผู้${gender} มีน้ำหนัก  ${weight} กก. และดื่มเครื่องดื่มตามปริมาณดังกล่าว จะทำให้มีระดับแอลกอฮอล์ในเลือดอยู่ที่ประมาณ ${value.toFixed(2)} มิลลิกรัมเปอร์เซ็นต์ค่ะ`);
        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าปริมาณแอลกอฮอล์ที่ดื่มเข้าไปนี้ ว่าต้องใช้เวลานานแค่ไหนร่างกายถึงจะขับออกไปได้หมด', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }

    const alcoholComposing = async () => { //กรณีอยากรู้ปริมาณการขับออก
        let { gender, weight, types, container, numberofDrinks, volume } = agent.parameters;
        console.log('gender:', gender);
        console.log('weight:', weight);
        console.log('types:', types);
        console.log('container:', container);
        console.log('number of drink:', numberofDrinks);
        console.log('volume:', volume);
        console.log('-------------------');
        let rho, value, percent;
        // assign rho value
        if (gender === "ชาย") {
            rho = 0.68;
            console.log("assign Gender conplete : ", rho);
        } else if (gender === "หญิง") {
            rho = 0.55;
            console.log("assign Gender conplete : ", rho);
        }
        // assign percent
        if (types === 'ไวน์คูลเลอร์' || types === 'เบียร์') {
            percent = 0.05;
        } else if (types === 'ไวน์' || types === 'สุราพื้นเมือง') {
            percent = 0.13;
        } else if (types === 'เครื่องดื่มอื่นๆ' || types === 'สุราสี40') {
            percent = 0.40;
        } else if (types === 'สุราสี35') {
            percent = 0.35;
        } else {
            percent = 0;
        }
        value = ((volume * numberofDrinks) * percent * 0.79);
        console.log(value);
        let timeResult = value / 7;
        agent.add(`ถ้าคุณเป็นผู้${gender} น้ำหนัก ${weight} กก. ดื่ม${types} ปริมาณ ${numberofDrinks} ${container} ต้องใช้เวลาอย่างน้อย ${timeResult.toFixed(0)} ชั่วโมง แอลกอฮอล์ในร่างกายถึงจะถูกขับออกไปได้หมด`);
        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าถ้าหากผ่านไปกี่ชั่วโมง แล้วระดับแอลกอฮอล์ในเลือดจะเหลือเท่าไร หากไม่มีการดื่มเพิ่มระหว่างนั้น', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }

    const NOalcoholComposing = async () => { //กรณีไม่อยากรู้ปริมาณการขับออก
        let { gender, weight, types, container, numberofDrinks, volume } = agent.parameters;
        console.log('gender:', gender);
        console.log('weight:', weight);
        console.log('types:', types);
        console.log('container:', container);
        console.log('number of drink:', numberofDrinks);
        console.log('volume:', volume);
        console.log('-------------------');

        return agent.add(createQuickReply('แล้วคุณอยากรู้ไหมคะ ว่าถ้าหากผ่านไปกี่ชั่วโมง แล้วระดับแอลกอฮอล์ในเลือดจะเหลือเท่าไร หากไม่มีการดื่มเพิ่มระหว่างนั้น', ["อยากรู้", "ไม่อยากรู้", "แก้ไขข้อมูลแอลกอฮอล์"]));
    }

    const alcoholLessThan = async () => { //กรณีอยากรู้ เวลาลดลงของแอลกอฮอล์
        let { gender, weight, types, container, numberofDrinks, volume, time } = agent.parameters;
        console.log('gender:', gender);
        console.log('weight:', weight);
        console.log('types:', types);
        console.log('container:', container);
        console.log('number of drink:', numberofDrinks);
        console.log('volume:', volume);
        console.log('-------------------');
        let rho, value, percent;
        // assign rho value
        if (gender === "ชาย") {
            rho = 0.73;
            console.log("assign Gender conplete : ", rho);
        } else if (gender === "หญิง") {
            rho = 0.66;
            console.log("assign Gender conplete : ", rho);
        }
        // assign percent
        if (types === 'ไวน์คูลเลอร์' || types === 'เบียร์') {
            percent = 0.05;
        } else if (types === 'ไวน์' || types === 'สุราพื้นเมือง') {
            percent = 0.13;
        } else if (types === 'เครื่องดื่มอื่นๆ' || types === 'สุราสี40') {
            percent = 0.40;
        } else if (types === 'สุราสี35') {
            percent = 0.35;
        } else {
            percent = 0;
        }

        if (!time) {
            return agent.add(`ระบุจำนวนชั่วโมงที่ต้องการคำนวนได้เลยค่ะ`);
        }

        value = ((((volume * numberofDrinks) / 29.574) * percent * 5.14) / ((weight / 0.454) * rho)) * 1000;
        result = value - (0.015 * time * 1000);

        if (result < 0) // กำหนดค่า mg% ไม่ให้เกินจริง
        {
            result = 0;
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
        }, { sendAsMessage: true }));
    }

    const recommendMore = async () => { //กรณีไม่อยากรู้ เวลาลดลงของแอลกอฮอล์
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
        agent.add(new Payload('LINE', imageCarousels.Survey(), { sendAsMessage: true }));
    }

    const knowladgeSection = async () => {
        agent.add("ฟังก์ชั่นข้อมูลการเลิกเหล้า เป็นฟังก์ชั่นที่รวบรวมข้อมูลต่าง ๆ ที่เกี่ยวข้องกับการเลิกเหล้าไว้ด้วยกัน เพื่อให้คุณได้ทราบข้อเท็จจริงจากต่าง ๆ และนำไปประยุกต์ใช้ได้ค่ะ");
        return agent.add(new Payload(`LINE`, knowladgeBase.MainMenu(), { sendAsMessage: true }));
    }

        const knowladge_IncludingAlcohol = async () => {
            return agent.add(new Payload(`LINE`, knowladgeBase.IncludingAlcohol(), { sendAsMessage: true }));
        }

            const knowladge_WhatIsAlcohol = async () => {
                return agent.add(new Payload(`LINE` , {
                    "type": "text",
                    "text": "   🍺 สุรา จัดเป็นสารเสพติดชนิดหนึ่ง เนื่องจากมีเอธิลแอลกอฮอล์เป็นส่วนผสม ซึ่งเอทิลแอกอฮอล์เป็นแอลกอฮอล์ที่ได้จากการแปรรูปจากพืชจำพวกแป้งและน้ำตาล เช่น อ้อย ข้าว ข้าวโพด มันสำปะหลัง \n\n   ฤทธิ์ในทางเสพติด คือ ออกฤทธิ์กดประสาท😵‍💫 มีการเสพติดทั้งร่างกายและจิตใจ🧠 ทั้งเบียร์และสุราเป็นเครื่องดื่มที่มีแอลกอฮอล์ มีคุณค่าทางอาการต่ำแต่มีแคลอรี่สูง\n\n   ปัจจุบันสุราเป็นสารเสพติดอีกชนิดหนึ่งที่มีผู้ใช้เกือบทุกกลุ่มวัยเพราะหาซื้อง่าย ใช้ในหลายโอกาสที่สำคัญ\n\n   ซึ่งคนส่วนใหญ่ยังไม่ได้ตระหนักว่ามันคือ ❗️สารเสพติดที่อันตราย❗️ ทั้งจากตัวของมันเองและเป็นอันตรายในฐานะที่เป็นจุดเริ่มต้นที่นำไปสู่การเสพยาเสพติดอื่น ๆ ตามมา ซึ่งก่อให้เกิดผลเสียทั้งทางด้านร่างกาย จิตใจ อารมณ์และสังคม"
                  } , { sendAsMessage:true} ));
            }

            const knowladge_Drunkenness = async () => {
                agent.add("อาการเมาสุราจะแสดงออกชัดเจนมากเพียงใด ขึ้นอยู่กับว่าในร่างกายนั้นมีปริมาณแอลกอฮอล์อยู่มากน้อยเพียงใด ซึ่งแบ่งได้ตามนี้ค่ะ ⬇️") ;
                return agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B2%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=2bcaef0b-a3af-4972-9919-44c759befff1",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B2%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=2bcaef0b-a3af-4972-9919-44c759befff1"
                  } , { sendAsMessage:true }));
            }

            const knowladge_AlcoholAddiction = async () => {
                agent.add("ผู้ที่ติดสุราจะมีพฤติกรรมบ่งชี้โดยคร่าว 7 ข้อ ซึ่งหากมีพฤติกรรมที่เข้าข่ายอย่างน้อย 3 ใน 7 ข้อ ก็อาจสรุปได้ว่าเป็นผู้ติดสุราค่ะ");
                agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F7%20%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B8%B0%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=a31e4a8c-8b87-48c9-a827-a66eb65d0fbd",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F7%20%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B8%B0%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%99%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=a31e4a8c-8b87-48c9-a827-a66eb65d0fbd"
                  } , { sendAsMessage:true }));
                return agent.add(" ‼️ แต่อย่างไรก็ตามการที่จะยืนยันอย่างเป็นทางการได้ว่าใครเป็นผู้ติดสุราหรือไม่จะขึ้นอยู่กับดุลยพินิจของแพทย์นะคะ 👩‍⚕️ ") ;
            }

            const knowladge_WithdrawalkSymptoms = async () => {
                return agent.add(new Payload(`LINE` , {
                    "type": "text",
                    "text": "   อาการถอนถอนพิษสุรา หรือที่เรียกว่า ‘อาการขาดสุรา’ เป็นอาการที่มักจะเกิดขึ้นกับผู้ที่ดื่มสุรามานานติดกันเป็นระยะเวลานาน ๆ หรือดื่มจนถึงขั้นอยู่ในอาการติดสุรา 🥴\n\n   โดยสำหรับผู้ที่ดื่มสุรามานานหรือผู้ที่ดื่มติดต่อกันมานานหลายวันแล้วทำการหยุดดื่มสุราลงหรือลดปริมาณลงอย่างกระทันหันจะก่อให้การตื่นตัวของระบบประสาทอัตโนมัติ\n\n   ซึ่งนำไปสู่อาการผิดปกติต่างๆ เช่น วิตกกังวล รู้สึกกระวนกระวาย มือสั่น ใจสั่น พูดเพ้อ สับสน ประสาทหลอนและเกิดอาหารชักในบางกรณี 🤮😵‍💫 ซึ่งโดยส่วนใหญ่แล้วในผู้ป่วยกลุ่มนี้จะมีอาการถอนเกิดขึ้นหลังหยุดดื่ม 2 - 3 วันจนถึง 1 สัปดาห์ขึ้นไป\n\n    สำหรับผู้ที่ดื่มจนถึงขั้นติดสุราโดยทั่วไปแล้วจะเกิดอาการถอนสุราภายใน 6 - 8 ชม. แรกหลังจากหยุดดื่ม และมีอาการผิดปกติต่างๆ เช่น มีอาการสั่น คลื่นไส้ อาเจียน เหงื่อแตก หัวใจเต้นเร็ว ความดันโลหิตสูง วิตกกังวล หงุดหงิดกระสับกระส่าย 😖😫\n\n    โดยอาการถอนมักจะรุนแรงที่สุดในช่วง 24 - 26 ชม. หลังจากที่ทำการหยุดดื่มและหลังจากนั้นอาการจะค่อยๆหายไปภายใน 3 - 4 วันและจะเรียกอาการช่วงนั้นว่า ‘การถอนสุราแบบธรรมดา’ 😮‍💨"
                  } , { sendAsMessage:true }));
            }

        const knowladge_Effect = async () => {
            return agent.add(new Payload(`LINE`, knowladgeBase.AlcoholEffect(), { sendAsMessage: true }));
        }

            const knowladge_Neural = async () => {
                return agent.add(new Payload(`LINE` , {
                    "type": "text",
                    "text": "โรคร้ายทางประสาทที่เกิดจากสุรามีดังนี้\n\n   🧠 โรคความจำเสื่อมและสมองเสื่อม\n   หากผู้ป่วยยังคงดื่มสุราต่อไป ก็อาจเกิดโรคสมองเสื่อมจากสุราได้ ซึ่งจะทำให้เกิดปัญหาด้านความจำ การเรียนรู้ และทักษะต่างๆ โดยสุรานั้นมีผลต่อสมองโดยตรง ทำให้การตัดสินใจแย่ลง ขาดการเข้าใจปัญหา อาการเตือนมีได้หลายแบบ เช่น หงุดหงิดง่าย อารมณ์ไม่มั่นคง ไม่สามารถตัดสินใจได้ ไม่สามารถทำกิจวัตรเดิมได้ ปัญหาการใช้คำศัพท์ การถามซ้ำๆ ความงุนงงสับสน\n\n   😴 โรคนอนไม่หลับ\n   การดื่มสุราเป็นประจำเพิ่มความเสี่ยงต่อการเกิดภาวะหยุดหายใจขณะหลับ โดยเฉพาะอย่างยิ่งหากนอนกรนอยู่เดิม ซึ่งการดื่มสุราในปริมาณปานกลางถึงสูงในเวลาเย็น พบว่าจะทำให้ทางเดินหายใจแคบลง\n\n   เป็นสาเหตุการเกิดการหยุดหายใจได้แม้ในคนที่ไม่เคยแสดงอาการอย่างอื่นของภาวะหยุดหายใจขณะหลับ ซึ่งส่งผลมีปัญหาการนอน ทำให้ตื่นบ่อย และทำให้ง่วงในเวลากลางวันเช่นกัน\n\n   😵 โรคลมชัก\n   โรคลมชัก เกิดจากการที่สมองปลดปล่อยกระแสไฟฟ้าที่ผิดปกติออกมาชั่วครู่ เนื่องจากสมองส่วนใดส่วนหนึ่งหรือทั้งหมดทำงานมากเกินไปจากปกติชั่วขณะ\n\n   โดยผู้ป่วยจะมีอาการเกร็ง กระตุกทั่วทั้งตัว ไม่รู้สึกตัว มีการอุจจาระหรือปัสสาวะราดและโรคลมชักสามารถเกิดขึ้นได้กับทุกเพศทุกวัยโดยมีอัตราเกิดขึ้นประมาณร้อยละ 1 ของประชากรทั้งหมด\n\n   ซึ่งการดื่มสุราเป็นสาเหตุหนึ่งที่ทำให้เกิดอาหารชักได้ ยิ่งถ้าหากผู้ดื่มเป็นโรคลมชักก็สามารถทำให้เกิดผลที่ร้ายแรง\n\n   ⛈ โรคซึมเศร้า\n   จากการศึกษาพบความสัมพันธ์ระหว่างการดื่มสุราและภาวะซึมเศร้า โดยสำหรับผู้ที่ดื่มสุราเป็นเวลานานแอลกอฮอล์ลจะลดระดับ serotonin และ norepinephrine ในสมองของคุณ\n\n   ซึ่งสารเคมีเหล่านี้เป็นสารเคมีที่ทำให้คนเรารู้สึกดี แอลกอฮอล์จึงทำให้เกิดภาวะซึมเศร้าและเพื่มความรุนแรงของอาการขึ้นทุกครั้งที่ดื่ม\n\n   🥴 โรคทางจิตเวช \n   การดื่มสุราสามารถทำให้เกิดโรคทางจิตเวชได้ เช่น โรคจิต โรคซึมเศร้า อารมณ์แปรปรวน พฤติกรรมก้าวร้าว เป็นต้น โรคจิตจากแอลกอฮอล์มักมีอาการหลงผิด และอาการประสาทหลอน ซึ่งเกิดได้ทั้งช่วงที่ยังดื่มอยู่ หรือช่วงหยุดดื่มก็ได้ สามารถพบได้ทุกอายุแต่มักพบในผู้ที่ดื่มสุรามานาน \n\n   ในบางรายที่มีอาการหลงผิดชนิดหวาดระแวง อาจมีพฤติกรรมก้าวร้าวรุนแรง เป็นอันตรายได้ ซึ่งสมควรได้รับการบำบัดรักษาจากแพทย์ โรคจิตจากแอลกอฮอล์สามารถหายได้เพียงแค่หยุดดื่ม"
                  } , { sendAsMessage:true }));
            }

            const knowladge_Cancer = async () => {
                agent.add("โรคมะเร็งที่เกิดจากสุรามีดังนี้\n\n   👄 มะเร็งในปากและช่องปาก\n   ปัจจัยที่ทำให้เกิดมะเร็งในช่องปาก โดยสันนิษฐานว่า การได้รับการสัมผัสโดยตรงระหว่างเยื่อบุผิวกับแอลกอฮอล์เป็นตัวกระตุ้นทำให้เกิดการสร้างเซลล์มะเร็ง การทำลายดีเอ็นเอโดยสารที่ได้จากการเผาผลาญแอลกอฮอล์ หรือการขาดสารอาหาร เช่น วิตามิน เอ ยังมีการศึกษาเพพิ่มเติมพบว่า ผู้ที่ดื่ม 7-21 ดื่มต่อสัปดาห์ สามารถทำให้เกิดมะเร็งในช่องปาก 3 เท่าของผู้ที่ไม่ดื่ม และหากดื่มมากกว่า 21 ดื่มต่อสัปดาห์จะเพิ่มเป็น 5.2 เท่า\n\n   🍚 มะเร็งหลอดอาหาร\n     สาเหตุของโรคมะเร็งหลอดอาหาร เกิดจากการระคายเคืองภายในหลอดอาหาร อันเนื่องมาจากการดื่มสุรา เพราะการดื่มสุราจะทำลายเซลล์เยื่อบุของทางเดินอาหารและขัดขวางการไหลเวียนโลหิต ทำให้เยื่อบุเกิดการถูกกัดกร่อนเป็นบริเวณกว้าง ทำให้เกิดเป็นแผลในทางเดินอาหารและอาจรุนแรงต่อไปถึงขั้นมะเร็งในหลอดอาหาร\n\n     อาการที่เกิดขึ้นก็ได้แก่ กลืนอาหารไม่สะดวก รู้สึกติด หรือสำลัก อาจมีเสลดปนเลือด ไอ สำลัก ขณะรับประทาน อาจคลำพบต่อมน้ำเหลืองที่คอได้ ผอมลงเพราะรับประทานไม่ได้หรือได้น้อย การกลืนลำบาก กลืนแล้วเจ็บหรือติดที่ตำแหน่งต่าง ๆ ตั้งแต่คอจนถึงระดับลิ้นปี่ \n\n   💊 มะเร็งตับ\n   โดยมีปัจจัยเสี่ยงหลายปัจจัยที่สามารถทำให้เกิดโรคมะเร็งตับได้ แต่ไม่ได้เป็นการบอกว่าหากท่านมีปัจจัยเสี่ยงแล้วต้องเป็นโรคมะเร็งตับทุกราย แต่หากลดปัจจัยเสี่ยงให้น้อยลงท่านก็จะเสี่ยงต่อการเกิดโรคน้อยลงเช่นกัน ปัจจัยเสี่ยงมีได้ดังนี้\n\n   1. โรคตับอักเสบเรื้อรัง  การเป็นโรคไวรัสตับอักเสบเรื้อรังชนิดบีและซีสามารถนำไปสู่การเกิดภาวะท้องบวมน้ำ และทำให้เกิดโรคมะเร็งตามมา \n\n   2. โรคเบาหวาน  โดยเฉพาะคนที่ดื่มสุราหรือเป็นโรคตับอักเสบเรื้อรัง\n   \n   3. โรคอ้วน  เนื่องมาจากสามารถเกิดโรคไขมันเกาะตับและภาวะท้องบวมน้ำได้\n\n   4. สารอัลฟ่าท๊อกซิน  ซึ่งพบได้ใน ถั่วลิสง ข้าวโพด กระเทียม เป็นสารก่อมะเร็ง\n\n   5. การสูบบุหรี่\n\n   6. ภาวะท้องบวมน้ำ  คือการที่เซลล์ตับถูกทำลาย จะเป็นการเพิ่มความเสี่ยงต่อการเกิดมะเร็ง ซึ่งมีผลมาจากการดื่มสุราและโรคตับอักเสบเรื้อรังนั่นเอง\n\n   จะเห็นได้ว่าสุราเป็นส่วนหนึ่งของปัจจัยเสี่ยง และการดื่มมากกว่า 25 กรัมต่อวัน จะเพิ่มความเสี่ยงต่อการเกิดมะเร็งตับ ดังนั้นการหยุดดื่มตั้งแต่วันนี้ช่วยลดความเสี่ยงลงได้อย่างมาก");
                agent.add("   🍖 มะเร็งลำไส้ใหญ่\n   อาการพบได้ดังนี้ ถ่ายอุจจาระเป็นเลือด อุจจาระลำเล็กลง ปวดท้อง ถ่ายท้องผูกสลับท้องเสีย คลำได้ก้อนในท้อง และอ่อนเพลีย ปัจจัยเสี่ยงมีได้ดังนี้\n\n   1. อายุ พบว่าจะเพิ่มความเสี่ยงมากขึ้นหากอายุมากกว่า 50 ปี โดยพบว่า 9ใน10 รายเป็นโรคมะเร็งลำไส้ใหญ่เมื่ออายุมากกว่า 50 ปี\n\n   2. ประวัติเคยมีก้อนเนื้อในลำไส้มาก่อน\n\n   3. ประวัติครอบครัวเป็นมะเร็งลำไส้ใหญ่\n\n   4. ส่วนปัจจัยที่สามารถควบคุมได้ เช่น ชนิดของอาหารที่ทาน ออกกำลังกายน้อย โรคอ้วน การสูบบุหรี่ โรคเบาหวาน และการดื่มสุรา\n\n     เห็นได้ว่าการดื่มสุราเป็นปัจจัยเสี่ยงหนึ่ง มีการศึกษาพบว่าการดื่มสุราจะไปกระตุ้นการสร้างเซลล์มะเร็ง โดยสันนิษฐานว่าแอลกอฮอล์เป็นสารก่อมะเร็งโดยตรง ซึ่งพบความสัมพันธ์ระหว่างผู้ดื่มสุรากับการเกิดโรคมะเร็งลำไส้ใหญ่มากกว่าผู้ที่ไม่ดื่ม 2-3 เท่าตัว และเพิ่มความเสี่ยงหากดื่มมากกว่า 25 กรัมต่อวัน\n\n   👧🏻 มะเร็งเต้านม\n     ผู้ป่วยที่เป็นมะเร็งเต้านมจะเริ่มทราบเมื่อ คลำได้ก้อนที่รักแร้หรือบริเวณเต้านม ผิวบริเวณเต้านมลักษณะคล้ายเปลือกส้ม เจ็บบริเวณหัวนม มีน้ำไหลออกมาจากหัวนม เป็นต้น ผู้หญิงที่ดื่มสุราเสี่ยงต่อการเกิดมะเร็งเต้านม และความเสี่ยงนั้นเกี่ยวข้องโดยตรงกับปริมาณการดื่ม \n\n     การดื่มสุรายิ่งดื่มปริมาณมากยิ่งเสี่ยงต่อการเกิดมะเร็งเต้านมมากเท่านั้น ระดับฮอร์โมนเพศหญิงขึ้นกับความผันผวนของรอบเดือนและอายุที่เพิ่มขึ้น การเพิ่มปัจจัยการดื่มเป็นสาเหตุหนึ่งโดยไปเพิ่มระดับฮอร์โมนเอสโตรเจนมากขึ้น พบว่าปริมาณที่สัมพันธ์นั้นคือการดื่มในปริมาณปานกลางถึงสูง และการที่เนื้อเยื่อเต้านมต้องเผชิญกับฮอร์โมนที่มากเกินไปจะกระตุ้นทำให้เกิดมะเร็งเต้านมได้ \n   \n   แม้ว่าสำหรับผู้หญิงที่ดื่มเครื่องดื่มสุรา 1 ดื่มต่อวันเพิ่มความเสี่ยงต่อการเป็นเล็กน้อย แต่มีการศึกษาพบว่าการดื่มสุรามากกว่า 24 กรัมต่อวัน (หรือประมาณ 2 ดื่มต่อวัน) เพิ่มความเสี่ยงมากกว่ากลุ่มไม่ดื่ม 1.4-1.7 เท่า มากกว่านั้นหากดื่ม 3 ดื่มต่อวันจะเพิ่มความเสี่ยงที่เท่ากับการสูบบุหรี่หนึ่งซองต่อวันหรือการใช้ฮอร์โมนทดแทน     ");
                agent.add("   👧🏻 มะเร็งรังไข่\n   มะเร็งรังไข่ พบได้มากเป็นอันดับ 6 และมีอัตราการตายเป็นอันดับ 4 ในผู้หญิง อาการมักพบในระยะท้ายของโรค เช่น เลือดออกทางช่องคลอด เบื่ออาหาร คลื่นไส้ แน่นท้อง เป็นต้น โดยมีปัจจัยเสี่ยงดังนี้\n\n   1. อายุ ปัจจัยเสี่ยงเพิ่มสูงขึ้นตามอายุ ส่วนมากพบหลังวัยหมดประจำเดือน โดยครึ่งหนึ่งของผู้ที่เป็นโรคมะเร็งรังไข่จะพบหลังอายุ 63 ปี\n   \n   2. โรคอ้วน มีการศึกษาพบว่าผู้หญิงที่เป็นโรคอ้วน เสี่ยงเพิ่มขึ้นถึงร้อยละ 50\n   \n   3. ประวัติการไม่มีบุตร\n\n   4. การใช้ฮอร์โมนทดแทน\n\n   5. มีประวัติในครอบครัวเป็น โรคมะเร็งรังไข่ มะเร็งเต้านมหรือมะเร็งลำไส้ใหญ่\n\n   6. ประวัติมะเร็งเต้านม\n\n   7. การสูบบุหรี่\n\n   8. การดื่มสุรา\n\n   มีการศึกษาความสัมพันธ์ระหว่างมะเร็งรังไข่กับการดื่มสุรา พบว่าในผู้หญิงที่เริ่มดื่มสุราในระยะ 5 ปีแรก พบว่าสามารถเกิดโรคมะเร็งรังไข่ได้มากกว่ากลุ่มที่ไม่ดื่ม 0.9 เท่า");
                return agent.add(new Payload(`LINE` , {
                    "type": "template",
                    "altText": "ข้อมูลโรคมะเร็งกับสุราเพิ่มเติม",
                    "template": {
                      "type": "buttons",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "ข้อมูลโรคมะเร็งกับสุรา ฉบับละเอียด",
                      "text": "หากคุณต้องการอ่านรายละเอียดเพิ่มเติมของโรคมะเร็งแต่ละชนิด",
                      "actions": [
                        {
                          "type": "uri",
                          "label": "✨ กดที่นี่ ✨",
                          "uri": "http://www.1413.in.th/categories/view/11"
                        }
                      ]
                    }
                  } , { sendAsMessage:true })) ;
            }

            const knowladge_Chronic = async () => {
                agent.add("โรคเรื้อรังที่เกิดจากสุรามีดังนี้\n\n   📍 ภาวะบกพร่องของลำไส้เล็ก\n   การดื่มสุราอย่างหนักทำให้เยื่อบุผนังลำไส้เล็กเกิดการอักเสบและมีเลือดไหลได้ ซึ่งมีสาเหตุมาจากการที่สุราไปทำความเสียหายโดยตรง หรือสุราอาจไปกระตุ้นให้เกิดการปล่อยสารที่เป็นอันตรายต่อเยื่อบุลำไส้เล็ก เช่น ไซโตคิน ฮีสตามีน ลิวโคตริน เป็นต้น \n\n   ซึ่งการเกิดบาดแผลเหล่านี้ที่ลำไส้เล็กมีผลทำให้สารพิษต่างๆสามารถเข้าสู่กระแสเลือดและระบบน้ำเหลือง สร้างความเสียหายต่อไปสู่ตับและอวัยวะส่วนอื่นได้\n\n    🛡 โรคทางระบบภูมิคุ้มกัน\n   โดยในภาวะปกติ ระบบภูมิคุ้มกันจะมีตรวจตรา แยกแยะประเภทของสิ่งแปลกปลอมที่เข้าสู่ร่างกาย และทำการกำจัดสิ่งแปลกปลอมที่จะเป็นอันตรายให้หมดไปจากร่างกายโดยเซลล์เม็ดเลือดขาวประเภทต่างๆ แต่การดื่มสุราจะไปส่งผลต่อกระบวนการและประสิทธิภาพในการทำงานของระบบภูมิคุ้มกัน \n\n   ทำให้มีเซลล์เม็ดเลือดขาวออกไปกำจัดเชื้อโรคหรือสิ่งแปลกปลอมต่างได้น้อยลง และมีประสิทธิภาพในการกำจัดสิ่งแปลกปลอมแย่ลงอีกด้วย ดังนั้น จึงมีเชื้อโรคหรือสิ่งแปลกปลอมต่างๆอยู่ในร่างกายมากขึ้น และสร้างความเสียหายต่อระบบและอวัยวะต่างๆในร่างกาย ก่อเกิดเป็นความเจ็บป่วยต่างๆได้มากมาย\n\n    🫁 โรคปอด\n   ผู้ที่มีภาวะติดสุรา มีความเสี่ยงที่จะเกิดโรคปอดบวมและโรคระบบทางเดินหายใจล้มเหลวเฉียบพลัน ได้มากกว่าคนที่ไม่ดื่ม ทั้งนี้เนื่องจากสุราจะไปรบกวนการทำงานของโปรตีนคลอดิน (claudin proteins) ซึ่งทำหน้าที่เกี่ยวกับการกักเก็บอากาศในปอดและกั้นของเหลวไม่ให้ไหลเข้าสู่ปอด  \n\n   ดังนั้นเมื่อการทำงานของโปรตีนคลอดินเสียไป ก็จะทำให้น้ำไหลเข้าสู่ปอดได้ ซึ่งคนปกติที่มีสุขภาพปอดดี หากมีของเหลวไหลเข้าสู่ปอด ปอดก็จะมีการสูบออกได้ในทันทีอย่างง่ายดาย แต่สำหรับคนที่ปอดได้รับความเสียหายหรือติดเชื้อ ปอดจะไม่สามารถสูบน้ำส่วนเกินนี้ออกได้ \n\n   จึงกลายเป็นโรคปอดบวม หรืออาจเกิดเป็นภาวะระบบทางเดินหายใจล้มเหลวเฉียบพลันได้ในที่สุด  ดังนั้น การลดอัตราเสี่ยงของการเกิดโรคดังกล่าวนี้ ก็คือการหยุดดื่มสุรานั่นเอง");
                return agent.add(new Payload(`LINE` , {
                    "type": "template",
                    "altText": "ข้อมูลโรคเรื้อรังกับสุราเพิ่มเติม",
                    "template": {
                      "type": "buttons",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "ข้อมูลโรคเรื้อรังกับสุรา ฉบับละเอียด",
                      "text": "หากคุณต้องการอ่านรายละเอียดเพิ่มเติมของโรคเรื้อรังแต่ละชนิด",
                      "actions": [
                        {
                          "type": "uri",
                          "label": "✨ กดที่นี่ ✨",
                          "uri": "http://www.1413.in.th/categories/view/12"
                        }
                      ]
                    }
                  } , { sendAsMessage:true })) ;
            }

            const knowladge_Circulatory = async () => {
                agent.add("โรคระบบไหลเวียนเลือดและหัวใจที่เกิดจากสุรามีดังนี้\n\n   🫀ภาวะหัวใจล้มเหลว\n   การดื่มสุราปริมาณมากมักจะมีผลกระทบต่อหัวใจและหลอดเลือด เช่น การทำงานของหัวใจเสื่อมลง เกิดภาวะความดันเลือดสูง หัวใจเต้นผิดปกติอันเนื่องมาจากโรคหลอดเลือดหัวใจตีบตัน ซึ่งอาจทำให้เสียชีวิตโดยเฉียบพลัน\n\n   การมีแอลกอฮอล์ปริมาณสูงและอยู่เป็นระยะเวลานานในร่างกาย  จะทำให้การทำงานของหัวใจแย่ลง  และยังมีผลต่อการทำงานของหัวใจทั้งในช่วงคลายตัวและช่วงบีบตัว และหากยังดื่มสุราต่อไป ผู้ดื่มมักจะเกิดภาวะหัวใจล้มเหลว \n   \n   การหยุดดื่มสุราหรือลดปริมาณการดื่มสุราลงจากเดิม สามารถทำให้สภาวะการทำงานของหัวใจที่เสื่อมลงกลับมาดีขึ้นได้ โดยการทำงานของหัวใจอาจจะเริ่มดีขึ้นตั้งแต่ 6 เดือนแรกจนถึง 2-4 ปี\n\n   🩸โรคความดันโลหิตสูง\n   การดื่มสุราปริมาณมากมีผลทำให้เกิดโรคความดันโลหิตสูงได้ เนื่องจากการดื่มสุราจะไปกระตุ้นหัวใจให้สูบฉีดเลือดได้เร็ว และแรงขึ้น \n\n   ทำให้เกิดความดันสูงในหลอดเลือด นอกจากนี้แล้ว การดื่มสุรายังนำไปสู่โรคทางระบบหลอดเลือดและหัวใจอื่นๆ เช่น โรคไขมันในเลือดสูง  โรคหลอดเลือดหัวใจตีบตัน โรคกล้ามเนื้อหัวใจผิดปกติ ซึ่งผลพวงจากโรคต่างๆเหล่านี้ก็คือ ทำให้เกิดความดันโลหิตสูงนั่นเอง\n\n   ที่น่ากลัวยิ่งไปกว่านั้นคือภาวะต่างๆเหล่านี้อาจทำให้การทำงานของหัวใจเสื่อมลง หัวใจเต้นผิดปกติ และอาจเกิดภาวะหัวใจวาย ซึ่งอาจทำให้เสียชีวิตได้โดยเฉียบพลัน\n\n   การหลีกเลี่ยงโรคความดันโลหิตสูงสามารถทำได้โดยออกกำลังกายอย่างสม่ำเสมอ ทำจิตใจให้แจ่มใส พักผ่อนให้เพียงพอ และงดการดื่มสุราซึ่งเป็นปัจจัยเสี่ยงต่อการเกิดโรค");
                return agent.add(new Payload(`LINE` , {
                    "type": "template",
                    "altText": "ข้อมูลโรคกับสุราเพิ่มเติม",
                    "template": {
                      "type": "buttons",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "ข้อมูลโรคประเภทนี้กับสุรา ฉบับละเอียด",
                      "text": "หากคุณต้องการอ่านรายละเอียดเพิ่มเติมของโรคประเภทนี้",
                      "actions": [
                        {
                          "type": "uri",
                          "label": "✨ กดที่นี่ ✨",
                          "uri": "http://www.1413.in.th/categories/view/13"
                        }
                      ]
                    }
                  } , { sendAsMessage:true })) ;
            }

            const knowladge_etc = async () => {
                agent.add("นอกจากสุราจะก่อให้เกิดผลกระทบทางด้านสุขภาพมากมายแล้ว สุรายังทำให้เกิดลกระทบต่าง ๆ นอกจากสุขภาพด้วยเช่นกัน") ;
                agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%9C%E0%B8%A5%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%9A%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86.png?alt=media&token=8d9e5071-5d4c-44cd-b9bf-40744f208121",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%9C%E0%B8%A5%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%9A%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86.png?alt=media&token=8d9e5071-5d4c-44cd-b9bf-40744f208121"
                  } , { sendAsMessage:true }));
                return agent.add("ดังนั้น ทางที่ดีที่สุดคือการไม่ดื่มแอลกออฮฮล์เลยค่ะ");
            }

            const knowladge_Disease = async () => {
                agent.add("โรคทางสุขภาพอื่น ๆ ที่เกิดจากสุรามีดังนี้\n\n   🍩 โรคอ้วน\n   โรคอ้วน หมายถึงการสะสมของไขมันส่วนเกินในร่างกาย โดยเมื่อคำนวณดัชนีมวลกาย(BMI) จะมากกว่าหรือเท่ากับ 30 \n\n   ซึ่งการดื่มสุราที่มากเกินไปก็เป็นสาเหตุหนึ่งที่ทำให้น้ำหนักเพิ่มขึ้นอย่างรวดเร็ว เนื่องจากเครื่องดื่มแอลกอฮอล์มีแคลลอรี่ที่สูงทำให้ผู้ที่ดื่มเข้าไปในร่างกายเป็นปริมาณเยอะ ๆ อาจได้รับปริมาณแคลอรี่ต่อวันมากเกินไปกว่าปกติที่ควรได้รับต่อวัน \n\n   ทำให้ร่างกายไม่สามารถที่จะเผาผลาญได้ทันในเวลาต่อวันและเริ่มที่จะสะสมไขมันแทน เมื่อสะสมเพิ่มขึ้นเรื่อยๆก็กลายเป็นไขมันส่วนเกินซึ่งก่อให้เกิดโรคอ้วนตามมานั่นเอง\n\n   😌 ริ้วรอยบนหน้า\n   กระบวนการของริ้วรอยและความเหี่ยวย่นบนใบหน้าเริ่มต้นขึ้นมาจากหลอดเลือด เพราะหลอดเลือดคือท่อลำเลียงอาหารเข้าสู่ร่างกายและนำเอาของเสียออกจากร่างกาย \n   หลอดเลือดที่มีความสะอาดจะช่วยให้ระบบลำเลียงอาหารและขับถ่ายของเสียนั้นเป็นไปได้อย่างมีประสิทธิภาพ ซึ่งในทางกลับกันหากหลอดเลือดสกปรกก็จะทำให้การไหลเวียนของเลือดนั้นมีปัญหา \n\n     ดังนั้นเมื่อเราดื่มสุราหรือแอลกอฮอล์เข้าไปและร่างกายได้ทำการดูดซึมแอลกอฮอล์เข้าไปในเส้นเลือดทำให้เกิดสารพิษขึ้นรบกวนในหลอดเลือดและส่งผลให้การละเลียงอาหารไปบำรุงส่วนต่างๆในร่างกายไม่ค่อยดี \n\n   ก่อให้เกิดริ้วรอยต่างๆเร็วกว่าที่ควร อีกทั้งสุรายังส่งผลต่อการนอนหลับทำให้เราไม่สามารถนอนหลับได้อย่างปกติ พักผ่อนได้ไม่เพียงพอและยังมีอาการปวดหัวในตอนเช้า\n\n   👶อันตรายต่อทารกในครรภ์\n   เมื่อคุณดื่มแอลกอฮอล์ขณะตั้งครรภ์ แอลกอฮอล์จะเข้าสู่กระแสเลือดของคุณถูกดูดซึมผ่านรกเข้าไปสู่ทารกภายในครรภ์อย่างรวดเร็ว และเนื่องจากว่าทารกมีการเผาผลาญแอลกอฮอล์ที่ช้ากว่าคุณแม่ \n\n   จึงทำให้ทารกมีความเข้มข้นของแอลกอฮอล์ในเลือดสูงกว่าในร่างกายของคุณแม่ นอกจากนั้นแอลกอฮอล์ยังรบกวนการเจริญเติบโตของสมองและอวัยวะต่างๆของทารกในครรภ์ ซึ่งอาจส่งผลให้ทารกที่เกิดออกมามีอาการผิดปกติแต่กำเนิด \n\n    โดยทารกที่เกิดออกมาจะมีลักษณะอาการ ดังต่อไปนี้\n\n1. เด็กตัวเล็ก น้ำหนักน้อย กะโหลกศรึษะเล็ก\n\n2. พัฒนาการล่าช้า ปัญญาอ่อน\n\n3. ความผิดปกติของอวัยวะ\n\n4. มีปัญหากับระบบประสาทส่วนกลาง\n\n5. มีปัญหาทางด้านพฤติกรรม\n\n\n   ดังนั้นหากคุณกำลังตั้งครรภ์อยู่ควรหยุดหรือเลิกดื่มแอลกอฮอล์เพื่อลดความเสี่ยงอาการผิดปกติให้กับลูกของคุณ");
                return agent.add(new Payload(`LINE` , {
                    "type": "template",
                    "altText": "ข้อมูลโรคกับสุราเพิ่มเติม",
                    "template": {
                      "type": "buttons",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "ข้อมูลโรคประเภทนี้กับสุรา ฉบับละเอียด",
                      "text": "หากคุณต้องการอ่านรายละเอียดเพิ่มเติมของโรคประเภทนี้",
                      "actions": [
                        {
                          "type": "uri",
                          "label": "✨ กดที่นี่ ✨",
                          "uri": "http://www.1413.in.th/categories/view/14"
                        }
                      ]
                    }
                  } , { sendAsMessage:true })) ;
            }


        const knowladge_Treatment = async () => {
            agent.add(new Payload(`LINE` , knowladgeBase.AlcoholTreatment() , { sendAsMessage:true }));
        }
        
            const knowladge_SelfTreatment = async () => {
                return agent.add("   การดื่มสุราลดลง จะทำให้สุขภาพดีขึ้น ความเสี่ยงต่อการเกิดโรคต่างๆก็ลดลงตาม หรือโรคที่เป็นอยู่สามารถควบคุมได้ดีขึ้น และอาจเป็นอีกหนทางหนึ่งในการหยุดดื่มสุราอย่างเด็ดขาดต่อไป \n\n   อย่างไรก็ตาม ❗️ พึงระลึกไว้เสมอว่า ไม่มีปริมาณการดื่มใดที่ไม่เสี่ยง และผู้ที่อยู่ในขั้นติดสุราแล้วมักจะไม่ประสบความสำเร็จในการลดปริมาณการดื่มลง \n\n    การหยุดดื่มสุราทั้งหมดจะทำให้ประสบความสำเร็จในการเลิกระยะยาวมากกว่า องค์การอนามัยโลกได้ทำการศึกษาปริมาณการดื่มสุราที่เป็นอันตราย ดังนั้น ผู้ที่ต้องการลดปริมาณการดื่มลง ควรลดปริมาณการดื่มให้ต่ำกว่าปริมาณการดื่มสุราที่เคยดื่ม\n\n   🌟วิธีการลดปริมาณการดื่มให้สำเร็จ มีแนวทางดังต่อไปนี้ 🌟 \n\n   1. 📉 กำหนด และจำกัดปริมาณที่จะดื่ม แล้วให้ดื่มช้าๆ เพื่อจะได้มีสติในการยั้งคิด\n\n   2. 🍛 ทานอาหารก่อนดื่ม หรือดื่มพร้อมอาหาร ทำให้การดูดซึมของแอลกอฮอล์ช้าลง\n\n   3. ❌🧂❌ หลีกเลี่ยงอาหารรสเค็ม เพราะจะทำให้กระหายน้ำ จนต้องดื่มบ่อยขึ้น\n\n   4. 🍷 เลือกเครื่องดื่มที่มีความเข้มข้นของแอลกอฮอล์ต่ำ เช่น การดื่มเบียร์แทนสุราหรือไวน์ เป็นต้น\n\n   5. 🍶 ดื่มแบบผสมให้เจือจาง เพื่อลดความเข้มข้นของแอลกอฮอล์\n\n   6. ☕️ ดื่มน้ำเปล่าสลับบ้างในระหว่างที่ดื่มสุรา เพื่อทิ้งช่วงในการดื่มให้ห่างขึ้น\n\n   7. 💃🏻 วางแผนกิจกรรมที่ให้ความสุขใจอย่างอื่นทดแทน เช่น กิจกรรมดนตรี เล่นกีฬา ทำงานศิลปะ งานอดิเรกต่างๆ ปฏิบัติธรรม โดยเฉพาะในช่วงเวลาที่เคยดื่มเป็นประจำ\n\n   8. 🙋🏻‍♂️ หลีกเลี่ยงกลุ่มเพื่อนที่เคยดื่มด้วยกัน พบปะหรือเข้าร่วมกิจกรรมกับเพื่อนที่ไม่ดื่มแทน\n\n   9. 🙅🏽‍♂️ หากถูกชักชวนให้ดื่ม ปฏิเสธโดยตรงว่ามีปัญหาสุขภาพ หมอสั่งไม่ให้ดื่ม\n\n   10. ไม่ควรขับขี่ยานพาหนะหลังดื่มสุรา ❗️❗️\n\n   11. งดการดื่ม เมื่อมีปัญหาสุขภาพเกิดขึ้น และไม่ควรดื่มสุราเมื่อมีการทานยาทุกชนิด\n\n   🥀 หากผู้ดื่มไม่ประสบความสำเร็จในการลดปริมาณการดื่มลง ควรปรึกษาแพทย์เพื่อรับความช่วยเหลือต่อไป 👩‍⚕️");
            }

            const knowladge_DoctorTreatment = async () => {
                return agent.add("   การหยุดดื่มโดยการพบแพทย์เหมาะสำหรับผู้ดื่มที่มีประวัติอาการถอนพิษสุราที่รุนแรงหลังหยุดดื่มสุรา หรือหยุดดื่มแล้วมีอาการถอนพิษสุรารุนแรง เช่น อาการชัก กระสับกระส่ายอย่างรุนแรง สมองสับสน หูแว่ว ประสาทหลอน 😟\n\n   รวมถึงผู้ที่เคยเลิกสุรามาแล้ว แต่ไม่ประสบความสำเร็จ และผู้ที่ต้องการหยุดดื่มแต่ไม่ต้องการทรมานจากการหยุดดื่ม\n\n     ✅ การหยุดดื่มโดยการพบแพทย์นี้ เป็นวิธีที่จะช่วยให้ผู้ติดสุราประสบความสำเร็จในการหยุดดื่มได้มากขึ้น  สมองมีโอกาสฟื้นตัว อาการต่างๆของการเสพติดก็จะทุเลาลง ที่สำคัญเป็นวิธีการที่ปลอดภัยที่สุด และไม่ทรมาน \n\n   ✨ ทำให้ทานอาหารได้ดีขึ้น นอนหลับได้ดีขึ้น อารมณ์ดีขึ้น  และสามารถกลับไปดำเนินชีวิตได้ตามปกติ โดยแพทย์จะทำการตรวจประเมินระดับปัญหาการดื่ม ความเจ็บป่วยที่เกิดขึ้น รวมถึงความเสี่ยงที่จะเกิดอาการถอนพิษสุรา และช่วยเหลือให้สามารถผ่านพ้นช่วงที่ถอนพิษสุราไปได้อย่างปลอดภัย ไม่ทรมาน ✨ \n\n   เสร็จแล้วจึงเข้าสู่กระบวนการบำบัดรักษาทางจิตใจ และการฟื้นฟูสมรรถภาพ รวมถึงติดตามผลอย่างต่อเนื่อง เพื่อช่วยเหลือให้ผู้ป่วยสามารถหยุดดื่มได้อย่างถาวรต่อไป\n\n    📌 ขึ้นตอนการพบแพทย์👨🏾‍⚕️  \n\n   1️⃣ เตรียมเอกสารที่ต้องใช้ติดต่อกับทางโรงพยาบาลให้ครบถ้วน\n\n   2️⃣ ไปยังสถานพยาบาล หรือโรงพยาบาลที่มีการบำบัดรักษาเพื่อเลิกสุรา\n\n   3️⃣ ติดต่อทางเคาน์เตอร์ที่ทำบัตร หรือแผนกเวชระเบียนผู้ป่วยนอก (OPD) ว่าต้องการมารับการบำบัดรักษาเพื่อเลิกสุรา โดยอาจเน้นว่าต้องการรับการรักษา หรือขอคำปรึกษาจากจิตแพทย์)\n\n   4️⃣ ติดต่อทางเคาน์เตอร์ที่ทำบัตร หรือแผนกเวชระเบียนผู้ป่วยนอก (OPD) ว่าต้องการมารับการบำบัดรักษาเพื่อเลิกสุรา โดยอาจเน้นว่าต้องการรับการรักษา หรือขอคำปรึกษาจากจิตแพทย์\n   \n   5️⃣ หากผู้ป่วยยังไม่ไปพบแพทย์ ญาติสามารถไปรับคำปรึกษาก่อนได้ ");
            }

            const knowladge_Immunity = async () => {
                agent.add("ถึงแม้จะเลิกดื่มสุราไปแล้วก็ยังมีโอกาสกลับมาติดสุราได้อีก นัองตั้งใจจึงขอแนะนำข้อมูลต่อไปนี้เพื่อป้องกันไม่ให้กลับไปดื่มอีกค่ะ")
                return agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%9B%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%8B%E0%B9%89%E0%B8%B3.png?alt=media&token=15f2c86b-448d-4ce7-9dd8-fadfd569a9e2",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%9B%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%8B%E0%B9%89%E0%B8%B3.png?alt=media&token=15f2c86b-448d-4ce7-9dd8-fadfd569a9e2"
                  } , { sendAsMessage:true }));
            }

            const knowladge_Helping = async () => {
                agent.add("เมื่อผู้ดื่มมีอาการขาดสุราควรอย่างไร น้องตั้งใจขอแนะนำดังนี้ค่ะ")
                return agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%B2%E0%B8%94%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=4294a5a0-812a-4c54-a74f-236d6a775264",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%B2%E0%B8%94%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2.png?alt=media&token=4294a5a0-812a-4c54-a74f-236d6a775264"
                  } , { sendAsMessage:true }));
            }

            const knowladge_RiskToSelfHarm = async () => {
                agent.add("เมื่อผู้ติดสุรามีความเสี่ยงที่จะทำร้ายตัวเองควรทำอย่างไร น้องตั้งใจขอแนะนำดังนี้ค่ะ");
                return agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%87%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B8%87.png?alt=media&token=7f5671c5-49e3-4fa2-b50f-2b56eacd5b2f",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%87%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B8%87.png?alt=media&token=7f5671c5-49e3-4fa2-b50f-2b56eacd5b2f"
                  } , { sendAsMessage:true }));
            }


            const knowladge_Hangover = async () => {
                agent.add("มีอาการเมาค้างทำยังไงดี ? น้องตั้งใจขอแนะนำ 8 เทคนิคแก้อาการเมาค้างค่ะ");
                return agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%87.png?alt=media&token=dde87ddd-0fd4-4ffd-a1a5-5ca192ff3b30",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%87.png?alt=media&token=dde87ddd-0fd4-4ffd-a1a5-5ca192ff3b30"
                  } , { sendAsMessage:true }));
            }

            const knowladge_AlternativeDrink = async () => {
                agent.add("ในขณะที่คุณกำลังอยู่ในขั้นการเลิกดื่มสุรา หากคุณมีอากาอยากสุราคุณสามารถดื่มเครื่องดื่มเหล่านี้ได้ค่ะ ถึงแม้ว่าเครื่องดื่มเหล่านี้จะไม่ใช่แอลกอฮอล์แต่สามารถช่วยลดอาการอยากได้ อีกทั้งยังดีต่อสุขภาพอีกด้วยค่ะ ") ;
                agent.add(new Payload(`LINE` , {
                    "type": "image",
                    "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81.png?alt=media&token=5c6d6a55-4cbd-4ef1-abb0-5ab6413c12ea",
                    "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81.png?alt=media&token=5c6d6a55-4cbd-4ef1-abb0-5ab6413c12ea"
                  } , { sendAsMessage:true }));
            }

        const knowladge_Contact = async () => {
            return agent.add(new Payload(`LINE` , knowladgeBase.Contact() , { sendAsMessage:true }));
        }

            const knowladge_HelpingCenter = async () => {
                return agent.add(new Payload(`LINE` , knowladgeBase.HelpCenter() , { sendAsMessage:true } ));
            }

            const knowladge_Housing = async () => {
                return agent.add(new Payload(`LINE` , knowladgeBase.Housing() , { sendAsMessage:true }));
            }

            const knowladge_FemaleInvestigators = async () => {
                return agent.add(new Payload(`LINE` , knowladgeBase.FemaleInvestigators() , { sendAsMessage:true }));
            }

            const knowladge_EmergencyCall = async () => {
                return agent.add(new Payload(`LINE` , knowladgeBase.EmergencyCall() , { sendAsMessage:true }));
            }

    const LocationAndMap = async () => {
        agent.add(new Payload(`LINE` , imageCarousels.LocationAndMapData() , { sendAsMessage:true }));
    }

    const Contact = async () => {
        agent.add("Waiting for content");
    }

    const knowladge_HowToUse = async () => {
        agent.add("วิธีการใช้งานน้องตั้งใจในส่วนของข้อมูลเลิกเหล้าค่ะ") ;
    }



    const drinkingStandardData = async () => {
        agent.add(`ดื่มมาตรฐาน หรือ Standard Drink เป็นหน่วยมาตรฐานของเครื่องดื่มที่มีแอลกอฮอล์บริสุทธิ์ผสมอยู่ 10 กรัม ตามนิยามที่ใช้ในประเทศไทย เพราะเครื่องดื่มแอลกอฮอล์แต่ละชนิด จะมีแอลกอฮอล์บริสุทธิ์ผสมอยู่ไม่เท่ากัน ขึ้นอยู่กับจำนวนเปอร์เซนต์ของแอลกอฮอล์ในเครื่องดื่มนั้น หากคุณดื่มเครื่องดื่มแอลกอฮอล์ปริมาณ 1 ดื่มมาตรฐาน ตับของคุณจะต้องใช้เวลาถึง 1 ชั่วโมง จึงจะกำจัดพิษแอลกอฮอล์นั้นออกจากร่างกายได้`);
        agent.add(createQuickReply("น้องตั้งใจจะนำคุณไปสู่ขั้นตอนถัดไปนะคะ", ["กรอกข้อมูลของวันนี้"]));
    }

    const Test = async () => {
        agent.add("กำลังทดสอบ");
        agent.add("สิ้นสุดการทดสอบ");
    }



    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('check connect', checkConnect);
    intentMap.set('SET_USER_PROFILE', setUserProfile);
    intentMap.set('SET_USER_PROFILE - next', SetUserPrepNext);
    intentMap.set('EDIT_USER_PROFILE', setUserProfile);
    intentMap.set('RISK_ASSESSMENT', checkUserDrinking); //ถามคำถาม assit ข้อ 1
    intentMap.set('RISK_ASSESSMENT - yes', checkUserDrinkingIn3Month); //รับคำตอบข้อ 1 กรณีตอบว่าเคยดื่ม จะถามคำถามข้อ 2 ของ assist 
    intentMap.set('RISK_ASSESSMENT - drink in 3 month', riskAssessment_DrinkIn3Month);
    intentMap.set('RISK_ASSESSMENT - dont drink in 3 month', riskAssessment_DontDrinkIn3Month);
    intentMap.set('SET_DRINKING_IN_WEEK', setDrinkingInWeekInputType);
    intentMap.set('SET_DRINKING_IN_WEEK - pick alcohol', setDrinkingInWeek_pick);
    intentMap.set('SET_DRINKING_IN_WEEK - edit', setDrinkingInWeekInputType);
    intentMap.set('SET_DRINKING_IN_WEEK - next',setNoDrinkingInWeek);
    intentMap.set('RISK_ASSESSMENT_RESULT', setDrinkingInWeekInputType);
    intentMap.set('RISK_ASSESSMENT_RESULT - week', riskAssessmentResultWeek);
    intentMap.set('RISK_ASSESSMENT_RESULT - day', riskAssessmentResultDay);
    intentMap.set('RISK_ASSESSMENT_RESULT - risk', riskAssessmentResultRisk);
    intentMap.set('DRINK_STANDARD', drinkingStandardData);
    intentMap.set('ASSESS_MOTIVATION', assessMotivation);
    intentMap.set('ASSESS_MOTIVATION - result', assessMotivationResult);
    intentMap.set('ASSESS_MOTIVATION - goal', assessGoal);
    intentMap.set('Survey', DoSurvey);
    intentMap.set('ResponseTest', Test);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST', measureAlcohalInBlood);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - yes', measureAlcohalInBloodCalculated);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes', alcoholComposing);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no', NOalcoholComposing);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes - yes', alcoholLessThan);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no - yes', alcoholLessThan);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - yes - no', recommendMore);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - compose - no - no', recommendMore);
    intentMap.set('MEASURE_ALCOHAL_IN_BLOOD_TEST - edit', alcoholEdit);
    intentMap.set('knowladge', knowladgeSection);
        intentMap.set('select_IncludingAlcohol', knowladge_IncludingAlcohol);
            intentMap.set('select_WhatIsAlcohol', knowladge_WhatIsAlcohol);
            intentMap.set('select_drunkenness', knowladge_Drunkenness);
            intentMap.set('select_AlcoholAddiction', knowladge_AlcoholAddiction);
            intentMap.set('select_WithdrawalSymptoms', knowladge_WithdrawalkSymptoms);
            intentMap.set('select_HowToUseIncludingAlcohol', knowladge_HowToUse);
        intentMap.set('select_effect', knowladge_Effect);
            intentMap.set('select_Neural', knowladge_Neural);
            intentMap.set('select_Cancer', knowladge_Cancer);
            intentMap.set('select_Chronic', knowladge_Chronic);
            intentMap.set('select_Circulatory', knowladge_Circulatory);
            intentMap.set('select_Disease', knowladge_Disease) ;
            intentMap.set('select_etc', knowladge_etc);
            intentMap.set('select_HowToUseEffect', knowladge_HowToUse);
        intentMap.set('select_Treatment', knowladge_Treatment);
            intentMap.set('select_SelfTreatment', knowladge_SelfTreatment);
            intentMap.set('select_DoctorTreatment',knowladge_DoctorTreatment);
            intentMap.set('select_Immunity',knowladge_Immunity);
            intentMap.set('select_Helping', knowladge_Helping);
            intentMap.set('select_RiskToSelfHarm', knowladge_RiskToSelfHarm);
            intentMap.set('select_Hangover', knowladge_Hangover);
            intentMap.set('select_AlternativeDrink', knowladge_AlternativeDrink);
            intentMap.set('select_HowToUseTreatment', knowladge_HowToUse);
        intentMap.set('select_Contact', knowladge_Contact);
            intentMap.set('select_HelpingCenter', knowladge_HelpingCenter);
            intentMap.set('select_Housing', knowladge_Housing);
            intentMap.set('select_FemaleInvestigators', knowladge_FemaleInvestigators);
            intentMap.set('select_EmergencyCall', knowladge_EmergencyCall);
    intentMap.set('LocationAndMap', LocationAndMap);
    intentMap.set('contact', Contact)
    agent.handleRequest(intentMap);
});
module.exports = myexp