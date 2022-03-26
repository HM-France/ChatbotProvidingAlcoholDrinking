const alcohol = () => {
    return ({
        types: {
            all: {
                type: "template",
                altText: "เลือกชนิดเครื่องดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fเบียร์.png?alt=media&token=d438c20b-e14b-4e59-b1a2-247e48a3675b",
                            action: {
                                type: "message",
                                label: "เบียร์",
                                text: "เบียร์"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fสุราสี35.png?alt=media&token=7f56c2d6-b968-4d07-b70a-eaaa92d5e67a",
                            action: {
                                type: "message",
                                label: "สุราสี35",
                                text: "สุราสี35"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fสุราสี40.png?alt=media&token=eae024a4-c36b-4c58-a83e-a65b323bca8f",
                            action: {
                                type: "message",
                                label: "สุราสี40",
                                text: "สุราสี40"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fสุราขาว40.png?alt=media&token=033ca21c-2c7d-416a-9996-af5dd62de9c7",
                            action: {
                                type: "message",
                                label: "สุราขาว",
                                text: "สุราขาว"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fสุราพื้นเมือง.png?alt=media&token=4494fb81-8910-426a-b935-999d15f5ecc8",
                            action: {
                                type: "message",
                                label: "สุราพื้นเมือง",
                                text: "สุราพื้นเมือง"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fไวน์.png?alt=media&token=b43ad284-ee37-4b3d-8f9c-7b330501a04c",
                            action: {
                                type: "message",
                                label: "ไวน์",
                                text: "ไวน์"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fไวน์คลูเลอร์.png?alt=media&token=4f7a7eec-4b66-499c-9171-9a53858c8118",
                            action: {
                                type: "message",
                                label: "ไวน์คูลเลอร์",
                                text: "ไวน์คูลเลอร์"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/ประเภทเครื่องดื่ม%2Fเครื่องดื่มอื่นๆ.png?alt=media&token=ce78acf3-4c55-4edc-a452-98525f6dfae2",
                            action: {
                                type: "message",
                                label: "เครื่องดื่มอื่นๆ",
                                text: "เครื่องดื่มอื่นๆ"
                            }
                        }
                    ]
                }
            }
        },
        containerSize: {
            all: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C100%E0%B8%A1%E0%B8%A5.png?alt=media&token=3dfa6f40-f64e-4bb4-88ad-195df9aadc92",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B9%83%E0%B8%8D%E0%B9%88165.png?alt=media&token=09931385-07af-4dc1-8bb1-e3618b791263",
                            action: {
                                type: "message",
                                label: "แก้วเบียร์ใหญ่ 165mL",
                                text: "แก้วเบียร์ใหญ่ 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81250%E0%B8%A1%E0%B8%A5.png?alt=media&token=564b5c39-8750-46b7-acd4-eefe5ee53e2c",
                            action: {
                                type: "message",
                                label: "กระป๋อง 250mL",
                                text: "กระป๋อง 250mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81330%E0%B8%A1%E0%B8%A5.png?alt=media&token=06226e23-6e3c-40dc-ae50-1c1aedc9fa56",
                            action: {
                                type: "message",
                                label: "กระป๋อง 330mL",
                                text: "กระป๋อง 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88500%E0%B8%A1%E0%B8%A5.png?alt=media&token=f8554819-142b-41ce-9fd4-b51cc2a618d8",
                            action: {
                                type: "message",
                                label: "กระป๋อง 500mL",
                                text: "กระป๋อง 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81330%E0%B8%A1%E0%B8%A5.png?alt=media&token=06226e23-6e3c-40dc-ae50-1c1aedc9fa56",
                            action: {
                                type: "message",
                                label: "ขวดแก้ว 150mL",
                                text: "ขวดแก้ว 150mL"
                            }
                        },
                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81275%E0%B8%A1%E0%B8%A5.png?alt=media&token=1bacb999-1e63-4c41-8a5e-6d6fbc485fed",
                            action: {
                                type: "message",
                                label: "ขวด 275mL",
                                text: "ขวด 275mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81330%E0%B8%A1%E0%B8%A5.png?alt=media&token=e5a274b9-c847-43e8-b8ba-d2ccad1fe248",
                            action: {
                                type: "message",
                                label: "ขวด 330mL",
                                text: "ขวด 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1350%E0%B8%A1%E0%B8%A5.png?alt=media&token=19e70173-6a98-4c33-91b1-f5ecdf14426e",
                            action: {
                                type: "message",
                                label: "ขวด 350mL",
                                text: "ขวด 350mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%99400%E0%B8%A1%E0%B8%A5.png?alt=media&token=d095613b-0871-4ae8-8f2e-bb75261f1e85",
                            action: {
                                type: "message",
                                label: "ขวด 400mL",
                                text: "ขวด 400mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1500%E0%B8%A1%E0%B8%A5.png?alt=media&token=76e6416f-92ef-423d-811c-a4c5a22dff3c",
                            action: {
                                type: "message",
                                label: "ขวด 500mL",
                                text: "ขวด 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88640%E0%B8%A1%E0%B8%A5.png?alt=media&token=b10201c7-dce4-4db4-b132-b5da797aa98a",
                            action: {
                                type: "message",
                                label: "ขวด 640mL",
                                text: "ขวด 640mL"
                            }
                        },
                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1700%E0%B8%A1%E0%B8%A5.png?alt=media&token=f1bbf119-9939-4816-af22-db301d20d884",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88750%E0%B8%A1%E0%B8%A5.png?alt=media&token=e7c7e8de-d1cf-43cf-8c10-8b5d35e8de97",
                            action: {
                                type: "message",
                                label: "ขวด 750mL",
                                text: "ขวด 750mL"
                            }
                        },
                                                
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%80%E0%B8%AB%E0%B8%A2%E0%B8%B7%E0%B8%AD%E0%B8%811000%E0%B8%A1%E0%B8%A5.png?alt=media&token=1e9c1d08-802d-479d-aae7-9b304f6e15dc",
                            action: {
                                type: "message",
                                label: "เหยือก 1000mL",
                                text: "เหยือก 1000mL"
                            }
                        }
                    ]
                }
            },
            ไวน์คูลเลอร์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C100%E0%B8%A1%E0%B8%A5.png?alt=media&token=3dfa6f40-f64e-4bb4-88ad-195df9aadc92",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81250%E0%B8%A1%E0%B8%A5.png?alt=media&token=564b5c39-8750-46b7-acd4-eefe5ee53e2c",
                            action: {
                                type: "message",
                                label: "กระป๋อง 250mL",
                                text: "กระป๋อง 250mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88750%E0%B8%A1%E0%B8%A5.png?alt=media&token=e7c7e8de-d1cf-43cf-8c10-8b5d35e8de97",
                            action: {
                                type: "message",
                                label: "ขวด 275mL",
                                text: "ขวด 275mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81330%E0%B8%A1%E0%B8%A5.png?alt=media&token=06226e23-6e3c-40dc-ae50-1c1aedc9fa56",
                            action: {
                                type: "message",
                                label: "ขวด 330mL",
                                text: "ขวด 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88640%E0%B8%A1%E0%B8%A5.png?alt=media&token=b10201c7-dce4-4db4-b132-b5da797aa98a",
                            action: {
                                type: "message",
                                label: "ขวด 640mL",
                                text: "ขวด 640mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88750%E0%B8%A1%E0%B8%A5.png?alt=media&token=e7c7e8de-d1cf-43cf-8c10-8b5d35e8de97",
                            action: {
                                type: "message",
                                label: "ขวด 750mL",
                                text: "ขวด 750mL"
                            }
                        }
                    ]
                }
            },
            เบียร์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มเบียร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C100%E0%B8%A1%E0%B8%A5.png?alt=media&token=3dfa6f40-f64e-4bb4-88ad-195df9aadc92",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81250%E0%B8%A1%E0%B8%A5.png?alt=media&token=564b5c39-8750-46b7-acd4-eefe5ee53e2c",
                            action: {
                                type: "message",
                                label: "กระป๋อง 250mL",
                                text: "กระป๋อง 250mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B9%8B%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88500%E0%B8%A1%E0%B8%A5.png?alt=media&token=f8554819-142b-41ce-9fd4-b51cc2a618d8",
                            action: {
                                type: "message",
                                label: "กระป๋อง 500mL",
                                text: "กระป๋อง 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88640%E0%B8%A1%E0%B8%A5.png?alt=media&token=b10201c7-dce4-4db4-b132-b5da797aa98a",
                            action: {
                                type: "message",
                                label: "ขวด 640mL",
                                text: "ขวด 640mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%80%E0%B8%AB%E0%B8%A2%E0%B8%B7%E0%B8%AD%E0%B8%811000%E0%B8%A1%E0%B8%A5.png?alt=media&token=1e9c1d08-802d-479d-aae7-9b304f6e15dc",
                            action: {
                                type: "message",
                                label: "เหยือก 1000mL",
                                text: "เหยือก 1000mL"
                            }
                        },
                    ]
                }
            },
            ไวน์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C100%E0%B8%A1%E0%B8%A5.png?alt=media&token=3dfa6f40-f64e-4bb4-88ad-195df9aadc92",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81275%E0%B8%A1%E0%B8%A5.png?alt=media&token=1bacb999-1e63-4c41-8a5e-6d6fbc485fed",
                            action: {
                                type: "message",
                                label: "ขวด 275mL",
                                text: "ขวด 275mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1350%E0%B8%A1%E0%B8%A5.png?alt=media&token=19e70173-6a98-4c33-91b1-f5ecdf14426e",
                            action: {
                                type: "message",
                                label: "ขวด 350mL",
                                text: "ขวด 350mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88750%E0%B8%A1%E0%B8%A5.png?alt=media&token=e7c7e8de-d1cf-43cf-8c10-8b5d35e8de97",
                            action: {
                                type: "message",
                                label: "ขวด 750mL",
                                text: "ขวด 750mL"
                            }
                        },
                    ]
                }
            },
            สุราพื้นเมือง: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มสุราพื้นเมืองค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81275%E0%B8%A1%E0%B8%A5.png?alt=media&token=1bacb999-1e63-4c41-8a5e-6d6fbc485fed",
                            action: {
                                type: "message",
                                label: "ขวด 275mL",
                                text: "ขวด 275mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1500%E0%B8%A1%E0%B8%A5.png?alt=media&token=76e6416f-92ef-423d-811c-a4c5a22dff3c",
                            action: {
                                type: "message",
                                label: "ขวด 500mL",
                                text: "ขวด 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1700%E0%B8%A1%E0%B8%A5.png?alt=media&token=f1bbf119-9939-4816-af22-db301d20d884",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        }
                    ]
                }
            },
            สุราสี: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มสุราสีค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%99400%E0%B8%A1%E0%B8%A5.png?alt=media&token=d095613b-0871-4ae8-8f2e-bb75261f1e85",
                            action: {
                                type: "message",
                                label: "ขวด 400mL",
                                text: "ขวด 400mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1500%E0%B8%A1%E0%B8%A5.png?alt=media&token=76e6416f-92ef-423d-811c-a4c5a22dff3c",
                            action: {
                                type: "message",
                                label: "ขวด 500mL",
                                text: "ขวด 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1700%E0%B8%A1%E0%B8%A5.png?alt=media&token=f1bbf119-9939-4816-af22-db301d20d884",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        }
                    ]
                }
            },
            สุราสี35: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มสุราสี35ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%99400%E0%B8%A1%E0%B8%A5.png?alt=media&token=d095613b-0871-4ae8-8f2e-bb75261f1e85",
                            action: {
                                type: "message",
                                label: "ขวด 400mL",
                                text: "ขวด 400mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1500%E0%B8%A1%E0%B8%A5.png?alt=media&token=76e6416f-92ef-423d-811c-a4c5a22dff3c",
                            action: {
                                type: "message",
                                label: "ขวด 500mL",
                                text: "ขวด 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1700%E0%B8%A1%E0%B8%A5.png?alt=media&token=f1bbf119-9939-4816-af22-db301d20d884",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        }
                    ]
                }
            },
            สุราสี40: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มสุราสี40ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%99400%E0%B8%A1%E0%B8%A5.png?alt=media&token=d095613b-0871-4ae8-8f2e-bb75261f1e85",
                            action: {
                                type: "message",
                                label: "ขวด 400mL",
                                text: "ขวด 400mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1500%E0%B8%A1%E0%B8%A5.png?alt=media&token=76e6416f-92ef-423d-811c-a4c5a22dff3c",
                            action: {
                                type: "message",
                                label: "ขวด 500mL",
                                text: "ขวด 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%A1700%E0%B8%A1%E0%B8%A5.png?alt=media&token=f1bbf119-9939-4816-af22-db301d20d884",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        }
                    ]
                }
            },
            สุราขาว: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มสุราขาวค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81330%E0%B8%A1%E0%B8%A5.png?alt=media&token=e5a274b9-c847-43e8-b8ba-d2ccad1fe248",
                            action: {
                                type: "message",
                                label: "ขวด 330mL",
                                text: "ขวด 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%99400%E0%B8%A1%E0%B8%A5.png?alt=media&token=d095613b-0871-4ae8-8f2e-bb75261f1e85",
                            action: {
                                type: "message",
                                label: "ขวด 400mL",
                                text: "ขวด 400mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88640%E0%B8%A1%E0%B8%A5.png?alt=media&token=b10201c7-dce4-4db4-b132-b5da797aa98a",
                            action: {
                                type: "message",
                                label: "ขวด 640mL",
                                text: "ขวด 640mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%82%E0%B8%A7%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%881000%E0%B8%A1%E0%B8%A5.png?alt=media&token=10da010e-49a6-4946-8ed6-3fb5a3752ef8",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        }
                    ]
                }
            },
            เครื่องดื่มอื่นๆ: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B8%9D%E0%B8%B2%2015%20%E0%B8%A1%E0%B8%A5.png?alt=media&token=0f1f7b3d-d503-4a66-a4f6-08e99bf84e5c",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9B%E0%B9%8A%E0%B8%8150%E0%B8%A1%E0%B8%A5.png?alt=media&token=0e649987-5622-494d-8d5e-05dc6dbef86e",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B9%8C100%E0%B8%A1%E0%B8%A5.png?alt=media&token=3dfa6f40-f64e-4bb4-88ad-195df9aadc92",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },                        
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%B9%E0%B8%87165%E0%B8%A1%E0%B8%A5.png?alt=media&token=2542ce16-29e8-49c8-84af-06d4fa70f0b2",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B9%8C%E0%B9%83%E0%B8%AB%E0%B9%83%E0%B8%8D%E0%B9%88165.png?alt=media&token=09931385-07af-4dc1-8bb1-e3618b791263",
                            action: {
                                type: "message",
                                label: "แก้วใหญ่ 165mL",
                                text: "แก้วใหญ่ 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%88%E0%B8%B8%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%2F%E0%B9%80%E0%B8%AB%E0%B8%A2%E0%B8%B7%E0%B8%AD%E0%B8%811000%E0%B8%A1%E0%B8%A5.png?alt=media&token=1e9c1d08-802d-479d-aae7-9b304f6e15dc",
                            action: {
                                type: "message",
                                label: "เหยือก 1000mL",
                                text: "เหยือก 1000mL"
                            }
                        }
                    ]
                }
            }
        }
    })
}

const motivation = () => {
    return ({
        type: "template",
        altText: "This is an image carousel template",
        template: {
          type: "image_carousel",
          columns: [
            {
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%3F%2F%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%A1%E0%B8%B5%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3.png?alt=media&token=5a7bd0f4-2d73-4b3d-812b-b402fe955ded",
              action: {
                type: "message",
                label: "ไม่มีปัญหา",
                text: "ฉันคิดว่าการดื่มของฉันไม่มีปัญหาอะไร"
              }
            },
            {
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%3F%2F%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%A5%E0%B8%87%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%873.png?alt=media&token=8e650b86-4e83-437f-8372-f191ba2cb6bb",
              action: {
                type: "message",
                label: "คิดดื่มน้อยลง",
                text: "ฉันคิดเกี่ยวกับการดื่มให้น้อยลงบ้าง"
              }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%3F%2F%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%B1%E0%B8%94%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B9%83%E0%B8%88%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%A5%E0%B8%87.png?alt=media&token=804ae325-2e5e-418c-966c-9e73d9f1fbbe",
                action: {
                    type: "message",
                    label: "อยากดื่มน้อยลง",
                    text: "ฉันต้องสินใจว่าจะต้องดื่มให้น้อยลง"
                  }
              },
              {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%3F%2F%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%A5%E0%B8%87.png?alt=media&token=8fc966ce-d0c3-4341-a858-deb8d99264b2",
                action: {
                    type: "message",
                    label: "พร้อมดื่มน้อยลง",
                    text: "ฉันพร้อมแล้วที่จะเริ่มดื่มให้น้อยลง"
                  }
              },
              {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%3F%2F%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%A5%E0%B8%87%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7.png?alt=media&token=a7bc825d-8e6b-4cf9-9500-0a3868593ee9",
                action: {
                    type: "message",
                    label: "ฉันดื่มน้อยลง",
                    text: "ตอนนี้ฉันดื่มน้อยลงกว่าเมื่อก่อนแล้ว"
                  }
              },
          ]
        }
      })
}

const goal = () => {
    return ({
        type: "template",
        altText: "This is an image carousel template",
        template: {
            type: "image_carousel",
            columns: [
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99.png?alt=media&token=b94b46e6-5e0d-4a4e-a911-40f124724c15",
                action: {
                    type: "message",
                    label: "สุขภาพ",
                    text: "สุขภาพดีขึ้น"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99.png?alt=media&token=9fcbe8c6-9bf2-4add-95b9-dbf522aabee0",
                action: {
                    type: "message",
                    label: "Job & study",
                    text: "การงานและการเรียนดีขึ้น"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99.png?alt=media&token=f6af9c5a-0d31-48a8-97e2-3268495928c4",
                action: {
                    type: "message",
                    label: "การเงิน",
                    text: "การเงินดีขึ้น"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%99%E0%B8%A3%E0%B8%AD%E0%B8%9A%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B8%B5%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99.png?alt=media&token=68eebd90-05bc-43d6-b348-9bd168a432f8",
                action: {
                    type: "message",
                    label: "มิตรภาพ",
                    text: "ความสัมพันธ์ดีขึ้น"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%8F%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%94%E0%B8%A5%E0%B8%87.png?alt=media&token=85bf726c-635c-4945-9d76-0bf9fab2ca3e",
                action: {
                    type: "message",
                    label: "กฎหมาย",
                    text: "ปัญหาทางกฎหมายลดลง"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B6%E0%B8%81%E0%B8%94%E0%B8%B5%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%95%E0%B8%99%E0%B9%80%E0%B8%AD%E0%B8%87.png?alt=media&token=18287b1a-6f3b-4dfb-89fc-10b5675c3cec",
                action: {
                    type: "message",
                    label: "ความรู้สึก",
                    text: "อยากรู้สึกดีต่อตัวเอง"
                }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%2F%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%87%E0%B8%9A.png?alt=media&token=5bdbbeca-30fd-4863-b220-337fe35014be",
                action: {
                    type: "message",
                    label: "จิตใจสงบ",
                    text: "เพื่อจิตใจที่สงบ"
                }
            }
        ]
        }
    })
}

const Survey = () => {
    return ({            
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
      })
}


module.exports = {goal,motivation,alcohol,Survey}

/*/ template
{
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "image",
        "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE01_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF).png?alt=media&token=c292dd21-4256-437d-951b-0da675ef5304",
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "1:1",
        "gravity": "center"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "📞 ศูนย์พึ่งได้ ภาคกลาง",
            "size": "xl",
            "color": "#000000"
          }
        ],
        "position": "absolute",
        "offsetBottom": "0px",
        "offsetStart": "0px",
        "offsetEnd": "0px",
        "paddingAll": "20px",
        "backgroundColor": "#ffffff",
        "cornerRadius": "xl"
      }
    ],
    "paddingAll": "0px"
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "กดเพื่อขยาย",
        "color": "#ffffff",
        "weight": "bold",
        "align": "center",
        "size": "md"
      }
    ],
    "backgroundColor": "#0181FFFF"
  }
}



{
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
              "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE01_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF).png?alt=media&token=c292dd21-4256-437d-951b-0da675ef5304",
              "size": "full",
              "aspectMode": "cover",
              "aspectRatio": "1:1",
              "gravity": "center"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "📞 ศูนย์พึ่งได้ ภาคกลาง",
                  "size": "xl",
                  "color": "#000000"
                }
              ],
              "position": "absolute",
              "offsetBottom": "0px",
              "offsetStart": "0px",
              "offsetEnd": "0px",
              "paddingAll": "20px",
              "backgroundColor": "#ffffff",
              "cornerRadius": "xl"
            }
          ],
          "paddingAll": "0px"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "กดเพื่อขยาย",
              "color": "#ffffff",
              "weight": "bold",
              "align": "center",
              "size": "md"
            }
          ],
          "backgroundColor": "#0181FFFF"
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
              "url": "https://firebasestorage.googleapis.com/v0/b/nong-tung-jai-68673.appspot.com/o/%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%B0%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%2F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%89%E0%B8%B8%E0%B8%81%E0%B9%80%E0%B8%89%E0%B8%B4%E0%B8%99%2FE01_%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%9E%E0%B8%B6%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%94%E0%B9%89(%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF).png?alt=media&token=c292dd21-4256-437d-951b-0da675ef5304",
              "size": "full",
              "aspectMode": "cover",
              "aspectRatio": "1:1",
              "gravity": "center"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "📞 ศูนย์พึ่งได้ ภาคกลาง",
                  "size": "xl",
                  "color": "#000000"
                }
              ],
              "position": "absolute",
              "offsetBottom": "0px",
              "offsetStart": "0px",
              "offsetEnd": "0px",
              "paddingAll": "20px",
              "backgroundColor": "#ffffff",
              "cornerRadius": "xl"
            }
          ],
          "paddingAll": "0px"
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "กดเพื่อขยาย",
              "color": "#ffffff",
              "weight": "bold",
              "align": "center",
              "size": "md"
            }
          ],
          "backgroundColor": "#0181FFFF"
        }
      }
    ]
  }
  */