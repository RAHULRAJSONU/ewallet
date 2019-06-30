import { isArray } from 'util';

/**
 * Alternative of Array.includes for array of object
 * @param array 
 * @param key 
 * @param value 
 */
export function exist(array: any = [], key = '', value = '') {
    let existence = false;
    if (isArray(array)) {
        existence = (array.map(col => col[key]).indexOf(value)) > -1
    }
    return existence;
}

/**
 * Function to group array, based on input key and column
 * @param collection 
 * @param key 
 * @param column 
 */
export const group = (collection, key, column) => {
    var obj = {};
    var gKey = new Set(collection.map(d => d[key]));
    gKey.forEach(k => {
        var result = 0;
        collection.map(d => {
            if (d[key] === k) {
                result += parseInt(d[column]);
            }
            obj[String(k)] = result;
        });
    });
    return obj;
};

var monthMap = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
};

export const sortByMonthComparator = (a, b) => {
    return monthMap[a['month']] - monthMap[b['month']];
}