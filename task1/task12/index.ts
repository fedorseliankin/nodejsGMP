import csv from "csvtojson";
import fs from "fs";

const task12 = () => {
	try {
		const outdir = "output/";
		if (!fs.existsSync(outdir)) {
			fs.mkdirSync(outdir);
		}
		const inFile = ".csv/in12.csv";
		const outFile = outdir + "out12.txt";
		const readable = fs.createReadStream(inFile);
		const writable = fs.createWriteStream(outFile);
		csv().fromStream(readable).subscribe((json) => {
			writable.write(JSON.stringify(json) + "\n");
		});
  
	} catch(err) {
		console.log(err);
	}
};

task12();
