(function (WIN, DOC) {
	"use strict";

	var Page = WIN.Page || {},
	
	initFlikrApi = (function () {
	
		// Build Flikr API Url
		function buildFlikrAPIUrl () {
			var href = "http://api.flickr.com/services/rest/",
				method = "flickr.photosets.getPhotos",  		// Flikr API Method goes here
				key = "cc1bcb9a1e5c62de76976c1d79239bac", 		// Flikr API Key
				id = "bwolvin14";						  		// Flikr User ID
			
			return href + "?method=" + method +  "&photoset_id=" + getPhotoSetID() + "&api_key=" + key +  "&user_id=" + id + "&format=json";
		}
		
		// Get Photoset ID from hash string in URL
		function getPhotoSetID() {
			var photoset = WIN.location.hash.substring(1);
			switch (photoset) {							  		// convert string to flikr photoset id
			case "decks":
				photoset = "72157626337904479"
				break;
			case "bathrooms":
				photoset = "72157629682777453"
				break;
			case "kitchens":
				photoset = "72157629318222372"
				break;
			default:
				photoset = "72157626337904479" 
				break;
			}
			return photoset;
		}
		
		// Get Flikr Photo Set from hash 
		var getFlikrPhotoSet =  function () {
			var setIDstr = window.location.hash;
			if (setIDstr.length > 0) {
				$.ajax({
					url: buildFlikrAPIUrl(),
					dataType: "jsonp",
					jsonp: 'jsoncallback',
					success: function(data) {
						var photos = data.photoset.photo,
							i = 0,
							$list = $("#photo-list"),
							len;
							
						$list.empty();
						
						for (len = photos.length; i < len; i += 1) {
							var htmlStr = "<li>" + "<img src=" + "http://farm" + photos[i].farm + ".static.flickr.com/" + photos[i].server + "/";
								htmlStr += photos[i].id + "_" + photos[i].secret + ".jpg>" + "</img></li>";
							
							$list.append(htmlStr);
						}
					}
				});
			}
		}
	
		// Add click event to add photoset id to href
		$(".nav-link").bind("click", function() {
			var photoSetId = $(this).attr("rel");
			WIN.location.hash = "#" + photoSetId;
			getFlikrPhotoSet();
			return false;
		});	
		
		return getFlikrPhotoSet();
		
	}())
	
	WIN.Page = {
		init : initFlikrApi
	};

}(this, this.document));
