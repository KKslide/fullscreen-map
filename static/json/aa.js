var fs = require('fs');

let obj = {}
let arr = []
for (let i = 0; i < 5; i++) {
    arr.push({
        "reson": '原因' + (i + 1),
        "data1": Math.round(Math.random() * (300 - 150) + 150),
        "data2": Math.round(Math.random() * (600 - 300) + 300),
        "data3": Math.round(Math.random() * (1000 - 500) + 500),
        "data4": Math.round(Math.random() * (1500 - 1000) + 1000),
        "data5": Math.round(Math.random() * (2000 - 1500) + 1500)
    })
}

obj.diffTradeWayAmount = arr

fs.writeFile('./haha.json', JSON.stringify(obj), (err) => {
    console.log('ok');
})