var Rx = require('rx');
var readline = require('readline');
var fs = require('fs');


var occurences = [];
for (var i = 0; i <= 99; i++) {
    occurences[i] = 0;
}


var rl = readline.createInterface({
    input: fs.createReadStream('millionnumbers.txt')
});

console.log('Reading line by line...');
Rx.Observable.fromEvent(rl, 'line')
    .takeUntil(Rx.Observable.fromEvent(rl, 'close'))
    .subscribe((text) => {
        occurences[text]++;
    },
    err => console.log("Error: %s", err),
    writeFile);


function writeFile() {
    console.log('Writing line by line...');
    var str = '';

    // Note for reviewer: I tried using fs.appendFile for each digit, but that takes longer time to write into file
    // hence created the content here and write to the file once
    for (var i = 0; i < occurences.length; i++) {
        for (var j = 0; j < occurences[i]; j++) {
            str += (i + ' \n');
        }
    }

    fs.writeFile("sorted-numbers-output.txt", str);
    console.log('Write operation done!. \n Please check the file lines-output.txt');
}