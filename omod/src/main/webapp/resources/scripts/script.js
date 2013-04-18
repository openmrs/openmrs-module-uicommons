$(document).ready(function() {
	$('#menu-list').scrollspy();
	$('#menu-list.nav > li').removeClass('active');
  if(window.location.hash == "") {
    $('#menu-list.nav > li:first').addClass('active');
  }

	$(window).scroll(function() {
  	if ($(this).scrollTop() > 130) {
    	$('#menu-container').css('position', 'fixed').css('top', 0).css('width', '18.8%');
    	$('#content').css('margin-left', '254px');
  	} else {
    	$('#menu-container').css('position', 'relative').css('width', '24%');
    	$('#content').css('margin-left', '0px');
  	}
	});
});