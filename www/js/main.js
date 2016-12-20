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

	var current_path = window.location.pathname.split('/').pop();
	console.log('Path = ' + current_path);

	buttonsArray = [
	'bunwarmer_buttons_Network.html',
	'convectionoven_buttons_Clock.html',
	'convectionoven_buttons_Down.html',
	'convectionoven_buttons_HmiDisplay.html',
	'convectionoven_buttons_Network.html',
	'convectionoven_buttons_NoWater.html',
	'convectionoven_buttons_StartPause.html',
	'convectionoven_buttons_Stop.html',
	'convectionoven_buttons_Up.html',
	'convectionoven_buttons.html',
	'ecm_buttons_Cappuccino.html',
	'ecm_buttons_Clean.html',
	'ecm_buttons_Froth.html',
	'ecm_buttons_LeftEspresso.html',
	'ecm_buttons_LeftRistretto.html',
	'ecm_buttons_Network.html',
	'ecm_buttons_NoWater.html',
	'ecm_buttons_RightEspresso.html',
	'ecm_buttons_RightRistretto.html',
	'ecm_buttons.html',
	'scstrimodechiller_buttons_HmiDisplay.html',
	'scstrimodechiller_buttons_Network.html',
	'scstrimodechiller_buttons.html',
	'steamoven_buttons_Clock.html',
	'steamoven_buttons_Down.html',
	'steamoven_buttons_HmiDisplay.html',
	'steamoven_buttons_Network.html',
	'steamoven_buttons_NoWater.html',
	'steamoven_buttons_StartPause.html',
	'steamoven_buttons_Stop.html',
	'steamoven_buttons_Up.html',
	'steamoven_buttons.html',
	'trimodechiller_buttons_HmiDisplay.html',
	'trimodechiller_buttons_Network.html',
	'trimodechiller_buttons.html'
	];

// -------- low resolution changes
	window.isiPad = navigator.platform;
	maxheight = screen.height;
	//if (window.isiPad == 'iPad') {
	
	if (maxheight < 570 && maxheight > 500) {
		console.log('-= iPhone5 =-');
		// index.html
		if (current_path == 'index.html') {
			console.log('adjusting layout');
			$('.aw_titlescreen').css('height','1170px');
			$('.aw_titlescreen').css('width','100%');
		}
	
		if (current_path == 'trimodechiller_videos.html' || current_path == 'scstrimodechiller_videos.html' || current_path == 'bunwarmer_videos.html' || current_path == 'convectionoven_videos.html') {
			$('.footer_videos_dooroperations').css('height','82.5vw');
		}
		
	}

//------------------------------	
	// tested for iPhone4/S(9.3) + iPhone emulation on iPad(10.2)
	if (maxheight < 500 || window.isiPad == 'iPad') {
		console.log('-= iPhone4/S or iPhone emulation on iPad =-');
		
		// index.html
		if (current_path == 'index.html') {
			console.log('adjusting layout');
			$(".aw_titlescreen").attr("src","images/general/aw_title-small.jpg");
			$('.aw_titlescreen').css('height','880px');
			$('.aw_titlescreen').css('width','100%');
		}
	
		if (current_path != 'index.html' && current_path != 'overview.html') {
			// pad the scrolllist
			//$('#scroll-ul').append('<li>&nbsp;</li><li>&nbsp;</li>');
			// pad the content
			$('#stub').html('&nbsp;<br><br><br><br><br>');
			
			//$('.title_blue').css('font-size','4vw');
			$('.title_blue').remove();
			$('.footer').remove();
		}
		
		if (current_path == 'overview.html') {
			// remove header to save space, removes branding, but who will see this version? iPhone 4?
			$('.header').remove();
		}
		
		if (current_path == 'scstrimodechiller_videos.html' || current_path == 'trimodechiller_videos.html' || current_path == 'bunwarmer_videos.html' || current_path == 'convectionoven_videos.html'	) {
			$('.footer_videos_dooroperations').css('height','68.5vw');
		}
		
		if ( current_path.includes("dooroperations") ) {
			// remove footer to save space
			$('.footer_dooroperations').remove();
		}
		
		if (buttonsArray.indexOf(current_path) > -1) {
			// if in array then 87vw
			$('.txt_btnText').css('height','87vw');
		}
		
		if ( current_path == 'bunwarmer_buttons.html' || current_path == 'trimodechiller_buttons.html' || current_path == 'scstrimodechiller_buttons.html' ) {
			// exceptions to button pages in array
			$('.scrolllist').css('height','125vw');
		}
		
		
	}
	
// --------/ low resolution changes		

		// exceptions for certain pages on all devices
		if (current_path.indexOf('_OnOff') > -1) {
			// change separator because of stupid overlap
			$('.separator').css('overflow','visible');
		}
		
		if (current_path == 'bunwarmer_buttons.html') {
			$('.footer').css('height','30vh');
		}
		
		if (current_path == 'trimodeschiller_buttons.html') {
			$('.footer').css('height','52vh');
		}
		
		if (current_path == 'bunwarmer_basicoperations.html') {
			$('#stub').html('&nbsp;<br><br><br>');
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
