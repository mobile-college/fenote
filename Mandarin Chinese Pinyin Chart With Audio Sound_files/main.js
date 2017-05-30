$(function () {
    $('#fixTable td > p').click(function (e) {

        //if (!$(this).hasClass('empty') && ($(this).parent().index()>0)) {
        if (!$(this).hasClass('empty')) {
            e = e || event;
            e.preventDefault();
            var rows=[1,6,9,14,24,33];
            var td = $(this).parent();
   			var col_index = td.index()-2;
		
   			var rIndex = rows[td.parent().index()]+td.children().index(this);
   			
            var btn=["#btntone0","#btntone1","#btntone2","#btntone3"];
            var spn=["#txttone0","#txttone1","#txttone2","#txttone3"];
			var pos=["nü","nüe","lü","lüe"];
			var outtxt=["nv","nve","lv","lve"];
			var stext=outtxt[pos.indexOf($(this).text())];
			stext=(stext)?stext:$(this).text();
			if (col_index>-1){
	            for (var i=0; i<4; i++){
	            	$(btn[i]).attr("data-mp3","http://a.mandarintalk.com.cn/pinyin/raw/"+stext+(i+1).toString()+".mp3");
	            	$(spn[i]).text(pyData[i][col_index][rIndex]);
	            	$(btn[i]).parent().css("display","block");
	        	}
	        }else if(col_index=-1){
		        if (rIndex<14){
		        	col_index=0;
		        	for (var i=0; i<4; i++){
			            	$(btn[i]).attr("data-mp3","http://a.mandarintalk.com.cn/pinyin/raw/"+stext+(i+1).toString()+".mp3");
			            	$(spn[i]).text(pyData[i][col_index][rIndex]);
			            	$(btn[i]).parent().css("display","block");
	        		}	        	
			    }else{
			    	rIndex -= 13;
			    	var sndfile=["yi","ya","yao","ye","you","yan","yang","yin","ying","yong","wu","wa","wo","wei","wai","wan","wen","wang","weng","yu","yue","yuan","yun"];
					for (var i=0; i<4; i++){
			            	$(btn[i]).attr("data-mp3","http://a.mandarintalk.com.cn/pinyin/raw/"+sndfile[rIndex-1]+(i+1).toString()+".mp3");
			            	$(spn[i]).text(vow[i][rIndex-1]);
			            	$(btn[i]).parent().css("display","block");
	        		}
			    	
			    }
	        }
            
            $('#sndPlayModal').modal();
         }
        e.stopPropagation();
    });
    
    $('#fixTable th > p').click(function (e) {

        //if (!$(this).hasClass('empty') && ($(this).parent().index()>0)) {
        if (!$(this).hasClass('empty')) {
            e = e || event;
            e.preventDefault();
            var td = $(this).parent();
   			var col_index = td.index()-2;
            var btn=["#btntone0","#btntone1","#btntone2","#btntone3"];
            var spn=["#txttone0","#txttone1","#txttone2","#txttone3"];
			var stext=$(this).text();
			var sndfile=["","bo","po","mo","fo","de","te","ne","le","ge","ke","he","ji","qi","xi","zi","ci","si","zhi","chi","shi","ri"];
			
        	$(btn[0]).attr("data-mp3","http://a.mandarintalk.com.cn/pinyin/raw/"+sndfile[col_index]+(1).toString()+".mp3");
        	$(spn[0]).text(stext);
        	for (var i=1;i<4;i++){
        		$(btn[i]).parent().css("display","none");
        	}
            
            $('#sndPlayModal').modal();
         }
        e.stopPropagation();
    });

    $('.play').click(function (e) {
        e = e || event;
        e.preventDefault();
        var player = $('#player');
        player.html("");
        dataMp3=$(this).attr("data-mp3");
        if (dataMp3) {
            player.append('<source src="' + dataMp3 + '" type="audio/mpeg">');
        }
        var sound = player[0];

        sound.load();

        sound.loop = false;
        var audio_element = document.getElementById('player');
        audio_element.play();
        audio_element.addEventListener('timeupdate', function () {
            if (this.duration > 0 && this.currentTime > (this.duration)) {
                this.pause();
            }
        }, false);
    });

    $('#fixTable td > p').mouseenter(function () {
        var td = $(this).parent();
        var index = td.index();

        $.each($('#fixTable tr'), function () {
        	if (!$(this).children().eq(index).hasClass('fixside')){
            		$(this).children().eq(index).addClass('hovered');
        	}
        });
        var tr = td.parent();
        var pIndex = td.children().index(this);
        $.each(tr.children(), function () {
            $(this).children().eq(pIndex).addClass('hovered');
        });
	    /*if ($(this).hasClass("comp")){
	    	n=-360;
	    	$(this).css({
				'transform':'rotate('+n+'deg)',
				'-ms-transform':'rotate('+n+'deg)',
				'-moz-transform':'rotate('+n+'deg)',
				'-o-transform':'rotate('+n+'deg)'
			});
			n-=360;
	    }*/
        
    });
    $('#fixTable td > p').mouseleave(function () {
        $('#fixTable td, #fixTable th, #fixTable p').removeClass('hovered');
    });

});

function viewport() {
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

