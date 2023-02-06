import csv from "csvtojson";
import fs from 'fs';

const task12 = () => {
  try {
    const inFile = '.csv/in12.csv';
    const outFile = 'output/out12.txt';
    const dir = 'output/';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    const readable = fs.createReadStream(inFile);
    const writable = fs.createWriteStream(outFile);
    csv().fromStream(readable).subscribe((json) => {
      writable.write(JSON.stringify(json));
      writable.write('\n');
    });
  
  } catch(err) {
    console.log(err);
  }
}

task12()