/*global onDeviceReady device cordova $*/

// overwrite default logging so we can turn it off for production,
// or in environments without a console
window.console=(function(origConsole){

    if(!window.console)
      console = {};
    var isDebug = false, 
    logArray = {
      logs: [],
      errors: [],
      warns: [],
      infos: []
    }
    return {
        log: function(){
          logArray.logs.push(arguments)
          isDebug && origConsole.log && origConsole.log.apply(origConsole,arguments);
        },
        warn: function(){
          logArray.warns.push(arguments)
          isDebug && origConsole.warn && origConsole.warn.apply(origConsole,arguments);
        },
        error: function(){
          logArray.errors.push(arguments)
          isDebug && origConsole.error && origConsole.error.apply(origConsole,arguments);
        },
        info: function(v){
          logArray.infos.push(arguments)
          isDebug && origConsole.info && origConsole.info.apply(origConsole,arguments);
        },
        debug: function(bool){
          isDebug = bool;
        },
        logArray: function(){
          return logArray;
        }
    };

}(window.console));


$(document).ready(function () {

    // are we running in native app or in a browser?
    /*
     window.isphone = false;
     if(document.URL.indexOf('http://') === -1
     && document.URL.indexOf('https://') === -1) {
     window.isphone = true;
     }
     */
    if (window.isCordovaApp) {
        console.log('ENVIRONMENT: CORDOVA');

        //if (window.indexedDB) { alert('WKWebView'); } else { alert('UIWebView'); }

        document.addEventListener('deviceready', onDeviceReady, false);
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);


        $("a").click(function (event) {
            event.preventDefault();
            window.location = $(this).attr("href");
        });

    } else {
        console.log('ENVIRONMENT: NOT CORDOVA');
        // timer moet erin voor desktop browser, contentflash kunt je negeren
        //setTimeout(onDeviceReady, 20);
        //onDeviceReady();
    }

});


function onPause() {
    // Handle the APP pause event
    // stop all video
    var videos = $('.container').find('video');
    if (videos.length > 0) {
        videos.each(function () {
            console.log('about to stop video: ' + this.id);
            this.pause();
            console.log(this.id + ' should be stopped.');
        });
    }

    console.log('-- APP Paused --');
}

function onResume() {
    // Handle the APP resume event
    console.log('-- APP Resumed --');
}


function getPlatform() {

    window.isAndroid = false;
    window.isiOS = false;

    // get the platform for later use Android / iOS
    window.platform = device.platform;

    if (window.platform === 'Android') {
        window.isAndroid = true;
    }

    if (window.platform === 'iOS') {
        window.isiOS = true;
    }

    console.log('PLATFORM = ' + window.platform);

    // get the root path for later use
    window.root = cordova.file.applicationDirectory + 'www/';
    console.log('FILESYSTEM = ' + cordova.file.applicationDirectory);

}


function videoPath(element, filename) {

    console.log('in videopath for ' + window.platform + ', element: ' + element);

    var src = '';

    if (window.isAndroid === true) {
        //console.log('videopath android');
        //android.resource://com.michelb.beaerospace/raw/demo1
        // LET OP!! android verwacht een file reference ZONDER extensies! (dus geen .mp4)
        var src = 'android.resource://com.michelb.beaerospace/raw/' + filename;
    }

    if (window.isiOS === true) {
        //console.log('videopath ios');
        var src = window.root + 'video/' + filename + '.mp4';
    }

    var element = '#' + element; //zucht
    $(element).attr('src', src);
    //$(element).get(0).load(); //autoplays video!
    //$(element).on('tap', function(event) { videoplayer(element) }); // iscroll shit
    console.log('video source should be ' + src + ', and is: ' + $(element).attr('src'));


}


function deviceClass() {
    if (device.platform == "Android") {
        var classNames = ['android'];
    }

    if (device.platform == "iOS") {
        var classNames = ['iOS'];
    }

    var html = document.getElementsByTagName('html')[0];
    if (html.classList) html.classList.add.apply(html.classList, classNames);
}


function addScroller() {
    // add iscroller to elements with class .overthrow
    if (document.querySelector('.overthrow') !== null) {
        var myScroll = new IScroll('.overthrow', {tap: true, click: true});
        console.log('scroller aanwezig');
    }
}

function init() {
	console.log('Entering INIT...');
	
    getPlatform();
    deviceClass();
    addScroller();

    //detect video(s), get data-id
    var videos = $('.container').find('video');
    if (videos.length > 0) {
        videos.each(function () {
            console.log('found video: ' + this.id);
            var datafile = $(this).attr("data-id");
            //console.log('datafile: ' + datafile);
            videoPath(this.id, datafile);
        });
    }


}


/*
 document.addEventListener('backbutton', handleDeviceBackButton, false );
 function handleDeviceBackButton( event ) {
 // do whatever here
 }
 */
