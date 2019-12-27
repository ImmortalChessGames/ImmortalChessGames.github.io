var ypt_thumbs = document.getElementById('ypt_thumbs');
var nowPlaying = "ypt-now-playing"; //For marking the current thumb
var nowPlayingClass = "." + nowPlaying;
var ypt_index = 0; //Playlists begin at the first video by default

let searchParams = new URLSearchParams(window.location.search);
$( document ).ready(function() {
	loadVideos(searchParams.get('p'));
	$(window).scrollTop(0);
});

function loadVideos(id) {
	if(!id) {
		id='PLAkdfPxt07ddIUBQ9U2XYcOdzb05BFcYK';
	}
	$.ajax({
	    url: 'http://immortal-chess-games.org/c/' + id,
	    dataType: "script",
	    cache: true
	}).done(function() {
		  var list_data = ''; //A string container
		  for(i = 0; i < _pV.v.length; i++){ //Do this to each item in the JSON list
		    list_data += '<li data-ypt-index="'+ i +'"><p>' + (_pV.n+', '+_pV.v[i].t) + '</p><span><img class="lazyload" alt="'+ (_pV.n+', '+_pV.v[i].t) + '" src="WhiteQueen.png" data-src="https://i.ytimg.com/vi/'+ _pV.v[i].d +'/mqdefault.jpg"/></span></li>'; //create an element and add it to the list
		  }
		  ypt_thumbs.innerHTML = list_data; //After the for loop, insert that list of links into the html	
		  loadVideo(0, id, _pV.v[0].d);
		  yptThumbHeight();
	});

	function yptThumbHeight(){
	  //ypt_thumbs.style.height = document.getElementById('player').clientHeight + 'px'; //change the height of the thumb list
	  ypt_thumbs.style.height = "330px";
	  //breaks if ypt_player.clientHeight + 'px';
	}

  //When the user changes the window size...
  window.addEventListener('resize', function(event){
    yptThumbHeight(); //change the height of the thumblist
  });

  //When the user clicks an element with a playlist index...
  jQuery(document).on('click','[data-ypt-index]:not(".ypt-now-playing")',function(e){ //click on a thumb that is not currently playing
	jQuery(nowPlayingClass).removeClass(nowPlaying);
	ypt_index = Number(jQuery(this).attr('data-ypt-index')); //Get the ypt_index of the clicked item
    loadVideo(ypt_index, searchParams.get('p'), _pV.v[ypt_index].d);
    e.currentTarget.classList.toggle(nowPlaying); 
  });

function loadVideo(indx, p, vId) {
	var divElt = document.getElementById('player');
	divElt.innerHTML = "";
	divElt.innerHTML = getHtml(indx, p, vId);	
}

function getHtml(indx, p, vId) {
///	return '<div class="video-container"><iframe src="https://www.youtube.com/embed/'+vId+'?listType=playlist&list=' + p + '&index=' + indx + '&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';			
	return '<div class="video-container"><iframe src="https://www.youtube.com/embed/' + vId + '?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
//	return '<div class="video-container"><iframe src="https://www.youtube.com/embed/' + vId + '?listType=playlist&list=PLAkdfPxt07dfI84tuSZWali8JqipEO3ln&index=' + indx + '&mute=0&rel=0&autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';			
//	return '<div class="video-container"><iframe src="https://www.youtube.com/embed/videoseries?list=' + p + '&index=' + indx + '&mute=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';		
}
}


