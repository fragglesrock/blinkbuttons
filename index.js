//vars = require('./vars');
var dash_button = require('node-dash-button');
var WebHooks = require('node-webhooks');
//var device;
//var structure;
var dash = dash_button(["AC:63:BE:D0:05:AD","AC:63:BE:38:02:6E","AC:63:BE:39:C4:D2"],null, null, 'all');
var http = require('http');
var url = require('url');
var key = 'doRHgmYNUhK_JXLpO3zQFm';

function MakerWebhook(event, key, value1, value2, value3) {
    var iftttNotificationUrl = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    var postData = JSON.stringify({ value1, value2, value3 });
    var parsedUrl = url.parse(iftttNotificationUrl);
    var post_options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.path,
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            };
        };
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
            res.on('data', function (chunk) {
                        console.log('Response: ' + chunk);
            });
        });
     post_req.write(postData);
     post_req.end();
     console.log(parsedUrl);
};
 
function listenForDash() {
    console.log("Listening For Dash Button...");
        dash.on("detected", function () {
            console.log("Button Pressed!");
              console.log(dash_button);
            if (dash_button == "AC:63:BE:38:02:6E"){
                MakerWebhook('blink_button_on',key);
            }
            else if (dash_button == "AC:63:BE:39:C4:D2"){
                MakerWebhook('blink_button_off',key);
            }
            else {
                 MakerWebhook('blink_button_unknown',key);
            }
          }
    );

 }

listenForDash();
 
 
