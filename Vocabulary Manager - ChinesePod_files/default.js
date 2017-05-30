/*jQuery.browser*/
(function(jQuery,window,undefined){"use strict";var matched,browser;jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};};if(!jQuery.browser){matched=jQuery.uaMatch(window.navigator.userAgent);browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}browser.webkit=false;browser.safari=false;if(browser.chrome){browser.webkit=true;}else if(browser.webkit){browser.safari=true;}jQuery.browser=browser;}})(jQuery,window);

function autoIframeHeight(ifm) {
	var subWeb = document.frames ? document.frames[ifm.name].document : ifm.contentDocument; 
	if(ifm != null && subWeb != null) { 
		ifm.height = subWeb.body.scrollHeight; 
	} 
}

function initModal(title, content, headShow, footShow, closeShow) {
	if ( 'undefined' == typeof title ) {
		title = '';
	}
	if ( 'undefined' == typeof content ) {
		content = '';
	}
	if ( 'undefined' == typeof headShow ) {
		headShow = true;
	}
	if ( 'undefined' == typeof footShow ) {
		footShow = true;
	}
	if ( 'undefined' == typeof closeShow ) {
		closeShow = true;
	}
	
	if ( $('#myCommonBsModal').length > 0 ) {
		$('#myCommonBsModal .modal-title').html(title);
		$('#myCommonBsModal .modal-body').html(content);
	} else {
		$('body').append(
				'<div class="modal fade" id="myCommonBsModal" style="overflow:hidden">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
								<h4 class="modal-title">' + title + '</h4>\
							</div>\
							<div class="modal-body" style="">' + content + '</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary bs-modal-close" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>\
							</div>\
						</div>\
					</div>\
				</div>'
		);
	}

	if( title || content ) {
		$('#myCommonBsModal').modal('show').on('shown.bs.modal', function (e) {
			var contentMaxHeight = $('body').height() - 30;
			if(headShow) {
				$('#myCommonBsModal .modal-header').show();
				contentMaxHeight -= 56;
			} else {
				$('#myCommonBsModal .modal-header').hide();
			}
			if(footShow) {
				$('#myCommonBsModal .modal-footer').show();
				contentMaxHeight -= 74;
			} else {
				$('#myCommonBsModal .modal-footer').hide();
			}
			if(closeShow) {
				$('#myCommonBsModal .bs-modal-close').show();
				if(footShow) {
					contentMaxHeight -= 34;
				}
			} else {
				$('#myCommonBsModal .bs-modal-close').hide();
			}
			$('#myCommonBsModal .modal-content .modal-body').css({'max-height':contentMaxHeight,'overflow-y':'auto'});
			$('input,.btn,textarea', $('#myCommonBsModal .modal-content')).first().focus();
		});
	}
}

function showInfo(content, title) {
	if ( 'undefined' == typeof title ) {
		title = 'Attention';
	}
	if ( 'undefined' == typeof content ) {
		content = '';
	}
	initModal(title, content);
}

function showError(content, title) {
	if ( 'undefined' == typeof title ) {
		title = 'Oops...';
	}
	if ( 'undefined' == typeof content ) {
		content = '';
	}
	initModal(title, content);
}

function showLoadingWindow(message, title){
	if ( 'undefined' == typeof title ) {
		title = 'Attention';
	}
	var content = '<div class="message"><img src="/images/assets/loader.gif" /> ' + message + ', Please wait...</div>';

	initModal(title, content);
}

function showConfirm(message, call){
	title = message;
	content = '<p align="center" style="margin-top: 10px">\
				<a href="javascript:" onclick="$(\'.modal\').modal(\'hide\');' + call + '" class="btn btn-primary" style="margin-right: 5px;"><i class="fa fa-check"></i> Yes</a>\
				<a href="javascript:" onclick="$(\'.modal\').modal(\'hide\');" class="btn btn-default" style="margin-left:15px"><i class="fa fa-times"></i> No</a>\
			</p>\
		</div>';
	initModal(title, content, true, false);
}

function showCustomConfirm(message, button){
	if ( 'undefined' == typeof title ) {
		title = 'Attention';
	}
	content = '<div class="modalContent" style="margin-top: 10px !important;"><input type="hidden" name="a" /><div class="message">' + message + '</div>' + button;
	initModal(title, content, false, false);
}

$(function(){
	$(document).on('click', 'a[rel="bs-window"]', function(){
		var content = '<div style="line-height: 40px; text-align: center">' + $($(this).attr('href')).html() + '</div>';
		initModal($(this).attr('title') ? $(this).attr('title') : $(this).text(), content, $(this).hasClass('hideheader') ? false : true, $(this).hasClass('hidefooter') ? false : true, $(this).hasClass('hideclose') ? false : true);
		return false;
	});
	$(document).on('click', 'a[rel="bs-ajax"]', function(){
		var content = '<div style="min-height:50px"><p align="center"><img src="/images/assets/loader.gif" /></p></div>';
		initModal($(this).attr('title') ? $(this).attr('title') : $(this).text(), content, $(this).hasClass('hideheader') ? false : true, $(this).hasClass('hidefooter') ? false : true, $(this).hasClass('hideclose') ? false : true);
		$.get($(this).attr('href'), function(content){
			$('#myCommonBsModal .modal-body div').hide().html(content).slideDown();
		});
		return false;
	});
	$(document).on('click', 'a[rel*="bs-iframe"]', function(){
		var rel = $(this).attr('rel');
		var size = rel.match(/\[(\d+)x(\d+)\]/);
		var width, height;
		if(size){
			width = size[1];
			height = size[2];
		} else {
			width = '100%';
			height = '';
		}
		var content = '<p align="center" style="height:50px; line-height:50px"><img src="/images/assets/loader.gif" /></p><iframe style="display:none;min-height:314px" width="' + width + '" height="' + height + '" name="myModalIframe" scrolling="no" frameborder="0" onload="$(this).show().prev().remove();' + (height ? '' : 'autoIframeHeight(this)') + '" src="' + $(this).attr('href') + '"></iframe>';
		initModal($(this).attr('title') ? $(this).attr('title') : $(this).text(), content, $(this).hasClass('hideheader') ? false : true, $(this).hasClass('hidefooter') ? false : true, $(this).hasClass('hideclose') ? false : true);
		return false;
	});
	
	if( $('body div.mainbody').length && $('body div.mainbody').height() < $(window).height() - 162 ) {
		$('body div.mainbody').css('min-height', ($(window).height() - 162) + 'px');
	} else if( $('body').children('div.container').length && $('body').children('div.container').height() < $(window).height() - 225 ) {
		$('body').children('div.container').css('min-height', ($(window).height() - 225) + 'px');
	}
});