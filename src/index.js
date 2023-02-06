import { readFileSync } from 'fs';
import path from 'path';

//const genDiff = (filepath1, filepath2, format) => {
    const data1 = readFileSync(filepath1, 'utf-8');
    const data2 = readFileSync(filepath2, 'utf-8');
    const parseData1 = JSON.parse(data1);
    const parseData2 = JSON.parse(data2);

    console.log(data1)
    console.log(data2)
//}

export default genDiff;