var fs = require('fs');



/* fs.readFile('./screen2.json', (err, data) => {
    let fulldata = JSON.parse(data);

    let arr = []
    for (let i = 0; i < 24; i++) {
        arr.push({
            "hour": i + ':00',
            "date24": Math.round(Math.random() * (2000 - 150) + 150),
            "date24_before": Math.round(Math.random() * (2000 - 150) + 150)
        })
    }
    fulldata.fullDayTrade = arr; // 搞定全天24小时

    let arr2 = []
    for (let i = 0; i < 7; i++) {
        arr2.push({
            "date": "07." + (15 + i),
            "data1": Math.round(Math.random() * (1000 - 150) + 150),
            "data2": Math.round(Math.random() * (1000 - 150) + 150)
        })
    }
    fulldata.latest7 = arr2; // 搞定最近7日

    fs.writeFile('./screen2_new.json',JSON.stringify(fulldata),(err)=>{
        console.log('ok');
    })

}) */

/* ************************************************************* */

fs.readFile('./screen3_new.json', (err, data) => {
    let fulldata = JSON.parse(data);

    // let arr = []
    // for (let i = 0; i < 24; i++) {
    //     arr.push({
    //         "hour": i + ':00',
    //         "data1": Math.round(Math.random() * (800 - 150) + 150),
    //         "data2": Math.round(Math.random() * (1000 - 500) + 500),
    //         "data3": Math.round(Math.random() * (2000 - 1000) + 1000)
    //     })
    // }
    // fulldata.daySignAccount = arr; // 搞定全天24小时

    let arr2 = []
    for (let i = 1; i <= 30; i++) {
        arr2.push({
            "date": "07." + (i < 10 ? ('0' + i) : i),
            "data1": Math.round(Math.random() * (300 - 150) + 150),
            "data2": Math.round(Math.random() * (600 - 300) + 300),
            "data3": Math.round(Math.random() * (1000 - 500) + 500),
            "data4": Math.round(Math.random() * (1500 - 1000) + 1000),
            "data5": Math.round(Math.random() * (2000 - 1500) + 1500)
        })
    }
    fulldata.diffTradeWayAmount = arr2; // 搞定最近7日

    fs.writeFile('./screen3_new.json', JSON.stringify(fulldata), (err) => {
        console.log('ok');
    })

})