const fs = require('fs');

fs.readFile('./map.json', (err, data) => {
    let province = JSON.parse(data)
    let allCity = []
    let mapObj = {}

    province.forEach(e => {
        e.children.forEach(ele => {
            allCity.push(ele);
        })
    });


    for (let key in allCity) {
        mapObj[allCity[key]["name"]] = [allCity[key]["log"], allCity[key]["lat"]]
    }

    fs.writeFile('./allCity.json', JSON.stringify(mapObj), err => {
        err
            ? console.log(err)
            : console.log('OK !!!');
    })

})
