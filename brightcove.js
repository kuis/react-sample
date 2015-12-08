$(function() {
// Brightcove video overlay
  $('.video-overlay').click(function(event) {
    if (typeof BCL.videoPlayer != "undefined") {
      $(this).hide();
      BCL.videoPlayer.play();
    }
  });
});

// Brightcove Learning namespace
var BCL = {};
//template loaded event handler
BCL.onTemplateLoad = function (experienceID) {
  BCL.log("BCL.onTemplateLoad");
  // get references to the player and API Modules and Events
  BCL.player = brightcove.api.getExperience(experienceID);
  BCL.APIModules = brightcove.api.modules.APIModules;
  BCL.adEvent = brightcove.api.events.AdEvent;
  BCL.captionsEvent = brightcove.api.events.CaptionsEvent;
  BCL.contentEvent = brightcove.api.events.ContentEvent;
  BCL.cuePointEvent = brightcove.api.events.CuePointEvent;
  BCL.mediaEvent = brightcove.api.events.MediaEvent;
};

// logging
BCL.log = function (message) {
  if (window["console"] && console["log"]) {
    //var d = new Date();
    //console.log(d + ": ");
    console.log(message);
  };
};
BCL.dir = function (message) {
  if (window["console"] && console["dir"]) {
    //var d = new Date();
    //console.log(d + ": ");
    console.dir(message);
  };
};

// template ready event handler
BCL.onTemplateReady = function (evt) {
  BCL.log("BCL.onTemplateReady");
  BCL.videoPlayer = BCL.player.getModule(BCL.APIModules.VIDEO_PLAYER);
  BCL.log("BCL.videoPlayer: " + BCL.videoPlayer);
  BCL.dir(BCL.videoPlayer);
  BCL.log("BCL.videoPlayer.canPlayWithoutInteraction(): " + BCL.videoPlayer.canPlayWithoutInteraction());
  BCL.log("BCL.videoPlayer.experience.id: " + BCL.videoPlayer.experience.id);
  BCL.log("BCL.videoPlayer.experience.type: " + BCL.videoPlayer.experience.type);

  BCL.videoPlayer.getCurrentVideo( function(videoDTO) {
    //for(var propertyName in videoDTO) {
    //  BCL.log(propertyName + ": " + videoDTO[propertyName]);
    //}
    BCL.log("videoDTO.defaultURL: " + videoDTO.defaultURL);
    BCL.log("videoDTO.playlistID: " + videoDTO.playlistID);
    BCL.log("videoDTO.id: " + videoDTO.id);
    BCL.log("videoDTO.linkText: " + videoDTO.linkText);
    BCL.log("videoDTO.longDescription: " + videoDTO.longDescription);
    BCL.log("videoDTO.displayName: " + videoDTO.displayName);
    BCL.log("videoDTO.shortDescription: " + videoDTO.shortDescription);

    BCL.log("videoDTO.customFields: " + videoDTO.customFields);
    BCL.log("videoDTO.customFields ... (length: " + videoDTO.customFields.length + ")");
    for(var field in videoDTO.customFields) {
      BCL.dir(videoDTO.customFields[field]);
    }

    BCL.log("videoDTO.publishedDate: " + videoDTO.publishedDate);

    BCL.log("videoDTO.renditions: " + videoDTO.renditions);
    BCL.log("videoDTO.renditions ... (length: " + videoDTO.renditions.length + ")");
    for(var rendition in videoDTO.renditions) {
      BCL.dir(videoDTO.renditions[rendition]);
    }

    BCL.log("videoDTO.tags: " + videoDTO.tags);
    BCL.log("videoDTO.linkURL: " + videoDTO.linkURL);
    BCL.log("videoDTO.thumbnailURL: " + videoDTO.thumbnailURL);
    BCL.log("videoDTO.startDate: " + videoDTO.startDate);
    BCL.log("videoDTO.length: " + videoDTO.length);
    BCL.log("videoDTO.isStreaming: " + videoDTO.isStreaming);
    BCL.log("videoDTO.endDate: " + videoDTO.endDate);
    BCL.log("videoDTO.captions: " + videoDTO.captions);
    BCL.log("videoDTO.adKeys: " + videoDTO.adKeys);
    BCL.log("videoDTO.videoStillURL: " + videoDTO.videoStillURL);
    BCL.log("videoDTO.publisherID: " + videoDTO.publisherID);
    BCL.log("videoDTO.referenceID: " + videoDTO.referenceID);
  });

  BCL.videoPlayer.addEventListener(BCL.mediaEvent.BEGIN, BCL.onMediaBegin);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.COMPLETE, BCL.onMediaComplete);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.CHANGE, BCL.onMediaChange);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.ERROR, BCL.onMediaError);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.PLAY, BCL.onMediaPlay);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.PROGRESS, BCL.onProgress);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.SEEK_NOTIFY, BCL.onMediaSeekNotify);
  BCL.videoPlayer.addEventListener(BCL.mediaEvent.STOP, BCL.onMediaStop);

  setupVideoOverlay();
};

// Video Event handlers
BCL.onMediaBegin = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaBegin");
  BCL.dir(evt);
};
BCL.onMediaComplete = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaComplete");
  BCL.dir(evt);
};
BCL.onMediaChange = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaChange");
  BCL.dir(evt);
};
BCL.onMediaError = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaError");
  BCL.dir(evt);
};
BCL.onMediaPlay = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaPlay");
  BCL.dir(evt);
};
BCL.onProgress = function(evt) {
  //BCL.log("----------------------");
  BCL.log("BCL.onProgress");
  //BCL.dir(evt);
}
BCL.onMediaSeekNotify = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaSeekNotify");
  BCL.dir(evt);
};
BCL.onMediaStop = function(evt) {
  BCL.log("----------------------");
  BCL.log("BCL.onMediaStop");
  BCL.dir(evt);
};


// Custom video controls

$('.custom-video-controls .play-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.play-vid clicked');
  if (BCL.videoPlayer.canPlayWithoutInteraction()) {
    BCL.videoPlayer.play();
  }
});
$('.custom-video-controls .pause-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.pause-vid clicked');
  BCL.videoPlayer.pause();
});
$('.custom-video-controls .seek-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.seek-vid clicked');
  BCL.videoPlayer.seek(10);
});
$('.custom-video-controls .getCurrentVideo-id-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.getCurrentVideo-id-vid clicked');
  BCL.videoPlayer.getCurrentVideo(function(result) {
    BCL.dir(result);
    BCL.log('result.id: ' + result.id);
  });
});
$('.custom-video-controls .getIsPlaying-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.getIsPlaying-vid clicked');
  BCL.videoPlayer.getIsPlaying(function(result) {
    BCL.log('BCL.videoPlayer.getIsPlaying(): ' + result);
  })
});
$('.custom-video-controls .getVideoDuration-vid').on('click',function(event){
  event.preventDefault();
  BCL.log('.getVideoDuration-vid clicked');
  BCL.videoPlayer.getVideoDuration(true, function(result) {
    BCL.log('BCL.videoPlayer.getVideoDuration(): ' + result);
  })
});
$('.custom-video-controls .getVideoPosition-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.getVideoPosition-vid clicked');
  BCL.videoPlayer.getVideoPosition(true, function(result) {
    BCL.log('BCL.videoPlayer.getVideoPosition(): ' + result);
  })
});
$('.custom-video-controls .loadVideoByID-vid').on('click', function(event){
  event.preventDefault();
  BCL.log('.loadVideoByID-vid clicked');
  var id = $(this).data("id");
  BCL.log('id: ' + id);
  BCL.videoPlayer.loadVideoByID(id);
});