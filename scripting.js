module.exports = {
    filter: {
        odd : elm => elm % 2 !== 0,
        even: !odd,
        divides: div => elm => elm % div == 0,
        match: pattr => elm => pattr.test(elm)
    },
    reduce: {
        plus: (accu, val) => val + accu,
        mult: (accu, val) => val * accu,
        avg: (accu, val, curId, arr) => {
            accu += val;
            return curId === arr.length - 1 ? accu / arr.length : accu
        },
        max: (accu, val) => val > accu ? val : accu,
        min: (accu, val) => val < accu ? val : accu,
        distinct: (accu, val, curId, arr) => {
            if (accu.indexOf(val) === -1){
                accu[accu.length] = val;
            }
            return accu;
        },
        join: deli => (accu, val) => accu + deli + val,
        preOrder: (accu, val, curId, arr) => {accu[curId] = arr[(arr.length - 1) - curId]; return accu},
        toIndexOfMatch: arr1 => (accu, elm, curId, arr2) => {
            if (arr1[curId] === elm){
                accu[accu.length] = curId;
            }
            return accu;
        },
        toMap: idField => (accu, elm, curId, arr2) => { accu[elm[idField]] = elm; return accu }
    },
    map: {
        toByteArray: boolFun => elm => boolFun(elm)
    },
    sort: {
        numComp: (elm1, elm2) =>  elm1 - elm2,
        alphaNumComp: (elm1, elm2) =>  elm2.localeCompare(elm1),
        objectSort: field => comprFun => (elm1, elm2) => comprFun(elm1[field], elm2[field])
    }
};