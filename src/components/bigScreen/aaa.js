
function compare(prop) { // 排序
    return function (a, b) {
        var v1 = a[prop].split('-')[0];
        var v2 = b[prop].split('-')[0];
        return v1 - v2;
    }
};
const arr = [
    { count: '13', range: '0-25', type: 'credit' },
    { count: '53', range: '0-25', type: 'loan' },
    { count: '36', range: '25-50', type: 'credit' },
    { count: '17', range: '25-50', type: 'loan' },
    { count: '35', range: '50-75', type: 'credit' },
    { count: '2', range: '50-75', type: 'loan' },
    { count: '34', range: '75-100', type: 'credit' },
    { count: '2', range: '75-100', type: 'loan' },
    { count: '16', range: '100-125', type: 'credit' },
    { count: '9', range: '125-150', type: 'credit' },
    { count: '3', range: '150-175', type: 'credit' },
    { count: '13', range: '175-200', type: 'credit' },
    { count: '10', range: '200-', type: 'credit' }
];

// Array.prototype.diff = function (a) {
//     return b.filter(function (i) { return a.indexOf(i) < 0; });
// };

function diff(arr,arr2){
    return arr2.filter(i=>{ return arr.indexOf(i)<0})
}

// console.log(diffff([1,2,3],[1,2,3,4,5]));

function listFilter(arr){
    const range = ["0-25", "25-50", "50-75", "75-100", "100-125", "125-150", "150-175", "175-200", "200-"];
    let creditList = arr.filter(v => {
        return v.type == 'credit'
    });
    let loanList = arr.filter(v => {
        return v.type == 'loan'
    });
    let creditListLeft = creditList.map(v => {
        return v.range
    })
    let loanListLeft = loanList.map(v => {
        return v.range
    });
    if (creditListLeft.length!=0){
        diff(creditListLeft,range).forEach(v=>{
            creditList.push({
                "count":"0",
                "range":v,
                "type":"credit"
            })
        })
    }
    if (loanListLeft.length!=0){
        diff(loanListLeft,range).forEach(v=>{
            loanList.push({
                "count":"0",
                "range":v,
                "type":"loan"
            })
        })
    }
    let res = range.map((v,i)=>{
        return {
            "range":v,
            "credit":creditList.filter(sub_v=>{return sub_v.range==v})[0].count,
            "loan":loanList.filter(sub_v2=>{return sub_v2.range==v})[0].count
        }
    });
    return res;
}

console.log(listFilter(arr));