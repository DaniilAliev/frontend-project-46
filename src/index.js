import { readFileSync } from 'fs';
import _ from 'lodash'; 

const genDiff = (filepath1, filepath2, format) => {
    const data1 = readFileSync(filepath1, 'utf-8');
    const data2 = readFileSync(filepath2, 'utf-8');
    const parseData1 = JSON.parse(data1);
    const parseData2 = JSON.parse(data2);

    const entries1 = Object.entries(parseData1);
    const entries2 = Object.entries(parseData2);
    const entries = _.union(entries1, entries2);

    const resultAr = entries.reduce ((acc, [key, value]) => {
        if (Object.hasOwn(parseData1, key) && !Object.hasOwn(parseData2, key)) {
            let resultString = `- ${key} : ${value}`;
            acc.push(resultString)
        } else if (!Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key)) {
            let resultString = `+ ${key} : ${value}`;
            acc.push(resultString)
        } else if (Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key) && parseData1[key] === parseData2[key]) {
            let resultString = `  ${key} : ${value}`;
            acc.push(resultString)
        } else if (Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key) && !_.isEqual(parseData1, parseData2)) {
            const value1 = parseData1[key];
            const value2 = parseData2[key];
            if (value === value1) {
                let resultString = `- ${key} : ${value}`;
                acc.push(resultString)
            } else if (value === value2) {
                let resultString = `+ ${key} : ${value}`;
                acc.push(resultString)
            }
        }
        return acc;
    }, [])


    const resultUnique = _.uniq(resultAr);
    const result = `{\n${resultUnique.join('\n')}\n}`
    console.log(result);
}

export default genDiff;