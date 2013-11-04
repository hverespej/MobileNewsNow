#SourceReporter 
**(Formerly called MobileNewsNow)**

SourceReporter is a way to democratize news reporting. It is a way to enable citizens record news events in their local neighbourhood. It was built for [https://apphack13seattle.eventbrite.com/](AngelHack AppHack Seattle 2013) Hackathon. 

## Pre-Requisites
1. Install NodeJS from http://nodejs.org
2. Install Bower using `npm install bower -g`
3. Install Grunt using `npm install grunt-cli -g`

## Running the code
1. Download or Clone the project and navigate to the place where the project is placed
2. Run `npm install` to download all node dependencies like express, socket.io, etc
3. Run `node index.js` - this runs the server on port 3000.
4. Open `http://<Machine IP Address>:3000/viewer` on your desktop browser - this is the viewer web page
5. Open `http://<Machine IP Address>:3000/` on your Chrome on Android browser - this is the reporter
6. Hit the `Allow` button on both the browers as the last step to set up the WebRTC video connection. 

The sequence of the steps is important, if you do not see live video form your mobile phone on the desktop browse, kill the `node index.js` process and start again from step 3. 

## Browser Compatiability
Since the project uses WebRTC, a WebRTC compatiable browser on a mobile device would be required. Chrome on Android supports WebRTC and the web page is designed to display well on a Samsung Galaxy S3 mobile phone. 
For the desktop, you would need a browser that supports WebRTC - Chrome or Firefox. The UI is fairly responsive and should work on various screen resolutions. 

## Links
1. (http://blog.nparashuram.com/2013/11/sourcereporter-seattle-anglehack.html)[Blog Post]
2. (https://www.youtube.com/watch?v=5d74jUsTzB8)[Demo Video]
3. (http://3.bp.blogspot.com/-XF3nuspz-qA/Unf2_jHaAyI/AAAAAAAAC5I/rtt9ZoqoCKw/s640/1412242_10152005150344066_1972352706_o.jpg)[Team presenting]
