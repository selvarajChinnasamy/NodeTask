var fs = require('fs');

var LoadFile = function () {
    console.log('Reading Starts...');
    fs.readFile('development.log', { encoding: 'utf-8' }, function (err, res) {
        console.log('Reading ends...');
        extract(res);
    });
};

var Splitby = "Processing by";

var extract = function (data) {
    console.log('Parsing starts...');

    var FinalList = [];

    data.split(Splitby).forEach(function (str, index) {

        if (index > 0) {

            str = str.trim();

            var array = str.slice(0, str.indexOf(' ')).split('#');


            if (array && array.length === 2) {

                var existIndex = FinalList.findIndex(function (obj) {

                    return obj.name === array[0] && obj.action === array[1];
                });

                if (existIndex >= 0) {
                    FinalList[existIndex].nooccurred++

                }
                else {
                    FinalList.push({ name: array[0], action: array[1], nooccurred: 1 });
                }

            }
        }
    });

    console.log('Parsing ends...');
    displayLog(FinalList);
};

var displayLog = function (data) {
    var str = '\n------------------------------------------------------------------ \n';
    data.forEach(function (obj, index) {
        str += ('\n ' + obj.name + ' --> ' + obj.action + ' action ran ' + obj.nooccurred + ' times. \n');
    });
    str += '\n------------------------------------------------------------------ \n';
    console.log(str);
}

LoadFile();