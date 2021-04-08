const request = require('request');
const cheerio = require('cheerio')
fs = require('fs');

var scan = setInterval(() => {
    fs.readFile('./lastcode.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log("loading Lastcode from file : " + data);
      
        request('https://nhentai.net', function (error, response, body) {
            let  lastcode = data.toString()
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var $ = cheerio.load(body)
            var siteHeading = $(".cover")
            var output = siteHeading[5].attribs.href
            var output = output.toString().split('/')
            var lcode = parseInt(output[2])
            console.log('Voici Lcode: ' +lcode + "            " + "voici lastcode: " + lastcode)
            console.log(typeof lastcode)
            if(lcode === Number(lastcode)){
                console.log('scan : pas de nouveaux code')
            }
            else{
                console.log(lcode)
                 lastcode = lcode
                console.log(lastcode)
                fs.writeFile('lastcode.txt', lastcode.toString(), function (err) {
                    if (err) return console.log(err);
                    
                  });
            }       
        
            
        });
      });


}, 60000);
scan
