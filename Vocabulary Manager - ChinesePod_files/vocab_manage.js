var param = window.location.search;
var tag = param.substr(5);
var currentPage;
var maxItems;
var username = $("#username").html();
gen_vocab(tag, "", 0);
sel_page();
add_word();
sel_cbx();
change_tag();
sort_vocab();
remove_vocab();
location_flashcards();
location_concentration();
location_writing();

function gen_vocab(a, c, d) {
	$("#vocab_list_container").empty();
	$("#vocab-ajax-loader").fadeIn();
	var e = get_offset();
	var b = "/tools/vocab/api";
	$.get(b, {
		tag : a,
		sort : c,
		page : d,
		offset : e
	}, function(f) {
		nodata = $(f).find("nodata").text();
		currentPage = $(f).find("currentPage").text();
		maxItems = $(f).find("maxItems").text();
		if (!nodata) {
			$(f).find("word")
					.each(
							function() {
								var l = $(this).find("vcid").text();
								var i = $(this).find("uvid").text();
								var h = $(this).find("field1").text();
								var n = $(this).find("field2").text();
								var m = $(this).find("field3").text();
								var g = $(this).find("tag").text();
								var j = $("#vocab_hide").clone();
								var k = $(".vocab_related").clone();
								k.find(".related").removeAttr("class").attr(
										"id", "related_" + l).attr('style', 'font-size: 1.2em; margin: 15px 0 15px 35px;display:none');
								j.find("input:checkbox")
										.attr("value", i);
								j.find("td:eq(1)").html(h);
								j.find("td:eq(2)").html(
										'<div class="field2" id="' + l + '">'
												+ n + "</div>");
								j.find("td:eq(3)").html(
										'<div class="field3" id="' + l + '">'
												+ m + "</div>");
								j.find("td:eq(4)").html(
										'<a class="tag">' + g + "</a>");
								j.find(".plus span").attr("id", l);
								$("#vocab_list_container").append(j.html())
										.append(k.html())
							})
		} else {
			$("#vocab_list_container").html(nodata)
		}
		$("#vocab-ajax-loader").fadeOut();
		jeditable();
		jeditable_mouseover();
		related_lessons();
		convert_to_links();
		pagination(d, e, maxItems);
		click_cb();
		click_tag()
	})
}
function add_word() {
	$("#addword").click( function() {
		var d = $("#row_1").val();
		var c = $("#row_2").val();
		var a = $("#row_3").val();
		if (!d || !c || !a) {
			alert("vocabulary should not be null!");
			return false
		}
		$("#addword").val("Adding...").attr("disabled", true);
		$("#cancel").attr("disabled", true);
		var b = "/tools/vocab/addword";
		$.ajax( {
			type : "POST",
			url : b,
			data : "row_1=" + d + "&row_2=" + c + "&row_3=" + a,
			success : function(e) {
				tb_remove();
				if (e == "exists") {
					alert("This vocabulary already exists.")
				}
				window.location.reload()
			}
		})
	})
}
function click_tag() {
	$(".tag").each( function() {
		$(this).click( function() {
			var a = $(this).text();
			gen_vocab(a, "", 0)
		})
	})
}
function convert_to_links() {
	$("a[class='tag']")
			.each(
					function() {
						var a = $(this).html();
						var c = a.split(",");
						var e = c.length;
						var d = "";
						for ( var b = 0; b < e; b++) {
							if (c[b] != "") {
								if (b < e - 1) {
									d += '<a href="javascript:void(0)" class="tag">'
											+ c[b] + "</a>, "
								} else {
									d += '<a href="javascript:void(0)" class="tag">'
											+ c[b] + "</a>"
								}
							}
						}
            
            if (d !== '') {
              $(this)
                  .parent()
                  .html(
                      '<span class="fa fa-tags"></span> ' + d)
            }
					})
}
function change_tag() {
	$("#select_1").change( function() {
		gen_vocab($(this).val(), "", 0)
	});
	$("#select_2").change( function() {
		var c = get_id();
		if (!c.length) {
			alert("Please select at least one word!");			
			return
		}
		var a = ($(this).find("option:selected").attr("class"));
		if (a == "remove") {
			url = "/tools/vocab/deletevocablabel"
		} else {
			url = "/tools/vocab/editvocablabel"
		}
		var b = $(this).val();
		var c = new Array();
		if (b == "newlabel") {
			new_tag();
			return false
		}
		var c = get_id();
		$("body").css("cursor", "wait");
		$.ajax( {
			type : "POST",
			url : url,
			data : "idArray=" + c + "&label=" + b,
			success : function(d) {
				if ($.trim(d)=="succeed") {
					$("body").css("cursor", "default");
					gen_vocab("", "")
				} else {
					alert("there is a error occur!")
				}
			}
		});
		$("#select_2 option[text='More Actions']").attr("selected", true);
	})
}
function new_tag() {
	var d = add_tag();
	var b = "/tools/vocab/editvocablabel";
	var c = get_id();
	if (!c.length) {
		alert("Please select at least one word!");
		$("#select_2 option[text='More Actions']").attr("selected", true);
		return
	}
	var a = prompt("Please enter a new deck name:", "");
	if (a) {
		if (a == "allvocab") {
			alert("This deck is not be allowed.");
			$("#select_2 option[text='More Actions']").attr("selected", true);
			return
		}
		for (key in d) {
			if (a == key) {
				alert("This deck already exists.");
				$("#select_2 option[text='More Actions']").attr("selected", true);
				return
			}
		}
		$.ajax( {
			type : "POST",
			url : b,
			data : "idArray=" + c + "&label=" + a,
			success : function(e) {
				if ($.trim(e)=="succeed") {
					initShowLabel(a);
					initMoreAction(a);
					$("#select_2 option[text='More Actions']").attr("selected", true);
					gen_vocab("", "")
				} else {
					$("#select_2 option[text='More Actions']").attr("selected", true);
				}
			}
		})
	} else {
		$("#select_2 option[text='More Actions']").attr("selected", true);
	}
}
function add_tag() {
	var a = new Array();
	var c = new Array();
	var b = $("#select_2");
	$("#vocab_list_container input[type='checkbox']").each( function() {
		if (this.checked) {
			tr = $(this).parents("tr");
			tr.find(".tag").each( function() {
				c.push($(this).text())
			})
		}
	});
	for (key in c) {
		a[c[key]] = key
	}
	b.children("#rl").remove();
	b.children(".remove").remove();
	if (c.length > 0) {
		b.append('<option disabled="true" id="rl">Remove deck</option>');
		for (ul in a) {
			b.append('<option class="remove" value="' + ul + '">&nbsp;&nbsp;'
					+ ul + "</option>")
		}
	}
	return a
}
function get_tag() {
	var a = $("#select_1").val();
	manager = a;
	return a
}
function get_id() {
	var a = new Array();
	$("#vocab_list_container input[type='checkbox']").each( function() {
		if (this.checked) {
			var b = $(this).val();
			a.push(b)
		}
	});
	return a
}
function sort_vocab() {
	$("#spanish").click( function() {
		var b = $(this).attr("name");
		var a = get_tag();
		if (b) {
			$(this).attr("name", "");
			$("#sort").val("1");
			gen_vocab(a, 1)
		} else {
			$(this).attr("name", "true");
			$("#sort").val("2");
			gen_vocab(a, 2)
		}
	});
	$("#english").click( function() {
		var b = $(this).attr("name");
		var a = get_tag();
		if (b) {
			$(this).attr("name", "");
			$("#sort").val("3");
			gen_vocab(a, 3)
		} else {
			$(this).attr("name", "true");
			$("#sort").val("4");
			gen_vocab(a, 4)
		}
	});
	$("#part").click( function() {
		var b = $(this).attr("name");
		var a = get_tag();
		if (b) {
			$(this).attr("name", "");
			$("#sort").val("5");
			gen_vocab(a, 5)
		} else {
			$(this).attr("name", "true");
			$("#sort").val("6");
			gen_vocab(a, 6)
		}
	});
	$("#date").click( function() {
		var b = $(this).attr("name");
		var a = get_tag();
		if (b) {
			$(this).attr("name", "");
			$("#sort").val("7");
			gen_vocab(a, 7)
		} else {
			$(this).attr("name", "true");
			$("#sort").val("8");
			gen_vocab(a, 8)
		}
	})
}
function remove_vocab() {
	$("#remove").click( function() {
		var c = new Array();
		var b = false;
		var d = 0;
		var a = "/tools/vocab/deletevocab";
		$("#vocab_list_container input[type='checkbox']").each( function() {
			if (this.checked) {
				b = true;
				uid = this.value;
				c.push(uid);
				d++
			}
		});
		if (!b) {
			alert("Please select at least one vocabulary word!");
			return false
		}
		if (d != 1) {
			tip = "Delete " + d + " words?";
			data_c = "uvid=" + c;
			url_c = a
		} else {
			tip = "Delete 1 word?";
			data_c = "uvid=" + c;
			url_c = a
		}
		if (window.confirm(tip)) {
			$("#remove").val("Removing...").attr("disabled", true);
			$.ajax( {
				type : "POST",
				url : url_c,
				data : data_c,
				success : function(e) {
					if (e == "succeed") {
						$("#remove").val("Remove").attr("disabled", false);
						gen_vocab("", "", 0)
					} else {
						alert("there is a error occur!")
					}
				}
			})
		}
	})
}
function jeditable() {
	editable_url = "/tools/vocab/";
	$(".field2").editable(editable_url + "edit-field2", {
		id : "vc_id",
		name : "field2",
		type : "textarea",
		indicator : "<img src='/images/ajax-loader.gif'>",
		submit : "OK",
		cancel : "Cancel",
		tooltip : "Click to edit...",
		placeholder : '<span class="gray">Click to edit...</span>',
		cssclass : "inplace"
	});
	$(".field3").editable(editable_url + "edit-field3", {
		id : "vc_id",
		name : "field3",
		type : "textarea",
		indicator : "<img src='/images/ajax-loader.gif'>",
		submit : "OK",
		cancel : "Cancel",
		tooltip : "Click to edit...",
		placeholder : '<span class="gray">Click to edit...</span>',
		cssclass : "inplace"
	})
}
function jeditable_mouseover() {
	$(".field2").mouseover( function() {
		$(this).css("background", "#FFFFBB")
	});
	$(".field3").mouseover( function() {
		$(this).css("background", "#FFFFBB")
	});
	$(".field2").mouseout( function() {
		$(this).removeAttr("style")
	});
	$(".field3").mouseout( function() {
		$(this).removeAttr("style")
	})
}
function related_lessons() {
	$('.plus span').each(function() {
    $(this).click(function() {
      vcid = $(this).attr('id');
      $vcid = $(this);
      $list_id = $('#related_' + vcid);
      minus_image_src = "/images/icons/bullet_toggle_minus.gif";
      plus_image_src = "/images/icons/bullet_toggle_plus.gif";
      $list_id.html('<img src="/images/ajax-loader.gif" align="absmiddle"/> <span style="font-size:11px;color:#666;">Updating...</span>');
      if ($vcid.hasClass('fa-expand')) {
        $list_id.show();
        $vcid.toggleClass('fa-expand fa-compress');
      } else {
        $list_id.hide();
        $vcid.toggleClass('fa-expand fa-compress');
        return;
      }
      var a = $list_id.html();
      if (a.indexOf('<div class="lessons_list">') >= 0) {
        $list_id.show();
        $vcid.attr("src", minus_image_src);
        return;
      }
      url1 = "/tools/vocab/find-related-lessons";
      var b;
      document.write = function(c) {
        b = "<div>" + c + "</div>";
      };
      $.ajax( {
        type : "GET",
        url : url1,
        data : "id=" + vcid,
        success : function(c) {
          $list_id.html(c);
          var d = $list_id
              .html();
          if (b) {
            var e = b + d;
          } else {
            var e = d;
          }
          $list_id.html(e);
          $vcid.attr("src", minus_image_src);
        }
      });
    });
  });
}

function sel_cbx() {
	$("#s_all").click( function() {
		$("#vocab_list_container input[type='checkbox']").each( function() {
			this.checked = true;
			$(this).parents("tr").addClass("tr-selected")
		});
		add_tag()
	});
	$("#s_none").click( function() {
		$("#vocab_list_container input[type='checkbox']").each( function() {
			this.checked = false;
			$(this).parents("tr").removeClass("tr-selected")
		});
		add_tag()
	})
}
function sel_page() {
	$("#select_page").change( function() {
		var b = $(this).val();
		var a = "/tools/vocab/offset";
		$.get(a, {
			offset : b
		}, function(c) {
			if (c == "succeed") {
				gen_vocab(tag, "", 0)
			}
		})
	})
}
function click_cb() {
	$("#vocab_list_container input[type='checkbox']").each( function() {
		$(this).click( function() {
			if (this.checked) {
				$(this).parents("tr").addClass("tr-selected")
			} else {
				$(this).parents("tr").removeClass("tr-selected")
			}
			add_tag()
		})
	})
}
function pagination(c, b, a) {
	// previous and next page
	var p = $("#previous_text").html();
	var n = $("#next_text").html();
	
	$("#bspage").pagination(a, {
		num_edge_entries : 2,
		items_per_page : b,
		num_display_entries : 6,
		current_page : c,
		callback : pageselectCallback,
		prev_text : "&laquo; " + p,
		next_text : n + " &raquo;"
	})
}
function pageselectCallback(a, d) {
	currentPage = a;
	var c = get_tag();
	var b = $("#sort").val();
	gen_vocab(c, b, currentPage)
}
function location_flashcards() {
	$("#flashcards").click( function() {
		var a = $("#select_1").val();
		location.href = "/tools/vocab/flashcards/tag/" + a
	})
}
function location_concentration() {
	$("#concentration").click( function() {
		var a = $("#select_1").val();
		location.href = "/tools/vocab/matching/tag/" + a
	})
}

function location_writing() {
	// check has word
	$("#writing").click(function() {
		var nodata = $("#nodata").html();
		if (nodata) {
			alert('No words available for writing practice.')
			return false;
		} else {
			var allvocab = selvocab = '';
			var b = '';
			$("#vocab_list_container input[type='checkbox']").each( function() {
				uid = this.value;
				allvocab += uid + ',';
				if (this.checked) {
					b = true;
					selvocab += uid + ',';
				}
			})
			
			if (b) {
				$("#words_id").val(selvocab);
			} else {
				$("#words_id").val(allvocab);
			}
			$("#words_id_form").submit();
		}
	})
}

function get_sort() {
	var a = $("#sort").val();
	return a
}
function get_offset() {
	var a = $("#select_page").val();
	return a
}
function initShowLabel(a) {
	var b = $("#select_2");
	$("#newlabel").before(
			'<option value="' + a + '">&nbsp;&nbsp;' + a + "</option>")
}
function initMoreAction(a) {
	var b = $("#select_1");
	b.append('<option value="' + a + '">&nbsp;&nbsp;' + a + "</option>")
};
