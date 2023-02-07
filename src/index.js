import { readFileSync } from 'fs';
import _ from 'lodash'; 

const genDiff = (filepath1, filepath2, format) => {
    const data1 = readFileSync(filepath1, 'utf-8');
    const data2 = readFileSync(filepath2, 'utf-8');
    const parseData1 = JSON.parse(data1);
    const parseData2 = JSON.parse(data2);

    // const entries1 = Object.entries(parseData1);
    // const entries2 = Object.entries(parseData2);
    const keys1 = Object.keys(parseData1)
    const keys2 = Object.keys(parseData2)
    const keys = [...keys1, ...keys2];
    console.log(keys)
    const sortedKeys = _.sortBy(keys);

    console.log(sortedKeys)

    const resultAr = sortedKeys.reduce ((acc, key) => {
        const value1 = parseData1[key];
        const value2 = parseData2[key];
        if (Object.hasOwn(parseData1, key) && !Object.hasOwn(parseData2, key)) {
            let resultString = `- ${key} : ${value1}`;
            acc.push(resultString)
        } else if (!Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key)) {
            let resultString = `+ ${key} : ${value2}`;
            acc.push(resultString)
        } else if (Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key) && parseData1[key] === parseData2[key]) {
            let resultString = `  ${key} : ${value1}`;
            acc.push(resultString)
        } else if (Object.hasOwn(parseData1, key) && Object.hasOwn(parseData2, key) && !_.isEqual(parseData1, parseData2)) {
            const valueFile1 = parseData1[key];
            const valueFile2 = parseData2[key];
            console.log(valueFile1, valueFile2, value1, value2)
            if (value1 === valueFile1 && value1 !== valueFile2) {
                let resultString = `- ${key} : ${value1}`;
                acc.push(resultString)
            } else if (value2 === valueFile2 && value2 !== valueFile1) {
                let resultString = `+ ${key} : ${value2}`;
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