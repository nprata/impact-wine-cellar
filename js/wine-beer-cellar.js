/**
 Nuno Prata @ 9/8/2018
 
 This file is is the main file in the application 
 
 **/

 

var myCellar = (function() {
	"use strict"; // Start of use strict, raise error on undeclared variables
	
	var myBoozeData, table, selectedRowIndex;
	var isAdding = false;
	
	//updates the counter in the top of the page
	var updateCounts = function updateCounts(data){
		var beerCount = data.filter(function(item) { return item.type === "beer" }).length;
		var wineCount = data.filter(function(item) { return item.type == "wine" }).length;
		var totalCount = 0;
		$.each(data, function(){
			totalCount = totalCount + parseInt(this.quantity);
		});
		$("#nr-beers").text(beerCount);
		$("#nr-wines").text(wineCount);
		$("#nr-drinks").text(totalCount);
	};
	
	//fills the table with resource rows, could be made via datatable methods
	//but this allows to easy add certain attrs to rows
	var fillTableData = function fillTable(items, append){
		$("#booze-table-body").empty();
		var $tr	;
		$.each(items, function(idx, item){
			$tr = $("<tr/>", {
				'class': 'clickable',
				'id': "item-row-" + idx,
				'data-index': idx
			});
			$('<td/>', {
				'class': 'item-name',
				'text': item.name
			}).appendTo($tr);
			$('<td/>', {
				'class': 'item-desc',
				'text': item.description
			}).appendTo($tr);
			$('<td/>', {
				'class': 'item-type',
				'text': item.type
			}).appendTo($tr);
			$('<td/>', {
				'class': 'item-quantity',
				'text': item.quantity
			}).appendTo($tr);
		if(append){
			$($tr).appendTo($("#booze-table-body"));
		}
		else {
			$($tr).prependTo($("#booze-table-body"));
		}
		});
	};
	
	
	//simple vaidation to check for empty fields
	var validateForm = function validate(inputs){
		var isValid = true;
		$.each(inputs, function(){
			if(this === undefined || this === ""){
				isValid = false;
				return false;
			}
		});
		return isValid;
	};
	
	
		
	//clear the stored data if desired
	$("#clear-stored-data").click(function(e){
		utils.localstorage.deleteStoredData("initial-data");
		window.location.reload(true);
	});
	
	/************************************ EXISTING TEMPLATE CODE *******************************************/
	// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
	$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
	if ($window.width() > 768) {
	  var e0 = e.originalEvent,
		delta = e0.wheelDelta || -e0.detail;
	  this.scrollTop += (delta < 0 ? 1 : -1) * 30;
	  e.preventDefault();
	}
	});

	// Scroll to top button appear
	$(document).scroll(function() {
	var scrollDistance = $(this).scrollTop();
	if (scrollDistance > 100) {
	  $('.scroll-to-top').fadeIn();
	} else {
	  $('.scroll-to-top').fadeOut();
	}
	});

	// Smooth scrolling using jQuery easing
	$(document).on('click', 'a.scroll-to-top', function(event) {
	var $anchor = $(this);
	$('html, body').stop().animate({
	  scrollTop: ($($anchor.attr('href')).offset().top)
	}, 1000, 'easeInOutExpo');
	event.preventDefault();
	});
	/****************************************** END EXISTING TEMPLATE CODE *********************************/
	
	
	//setup listeners and the table when all is done
	$(document).ready(function() {
		
		//set row click listener for quantity changing and add ing new item
		$(document).on('click', 'tr.clickable', function(event){
			isAdding = false;
			$("#error-msg").hide();
			var itemIndex = $(event.currentTarget).attr('data-index');
			selectedRowIndex = itemIndex;
			if(itemIndex > -1){
				var quantity = myBoozeData[selectedRowIndex].quantity;
				var name = myBoozeData[selectedRowIndex].name;
				var description = myBoozeData[selectedRowIndex].description;
				var type = myBoozeData[selectedRowIndex].type;
				
				$("#item-quantity-input").val(quantity);
				$("#item-name-input").val(name).prop("disabled", true);
				$("#item-description-input").val(description).prop("disabled", true);
				$("input[name=bottle-type][value='" + type + "']").prop("checked",true);
				$("input[type=radio]").prop("disabled", true);
				$("#itemDetailModalLabel").text("View Bottle Details");				
				
				$("#itemDetailModal").modal('show');
			}
			else {
				console.log("Could not find the desired object, please try again");
			}			
		});
		
		//confirm save quantity or create new item
		$("#save-quantity").click(function(event){
			if(!isAdding){
				var nameKey = $("#item-name-input").val();      //used name as the key;
				var quantity = $("#item-quantity-input").val();			
				myBoozeData[selectedRowIndex].quantity = quantity;
				utils.localstorage.setStoredData('initial-data', JSON.stringify(myBoozeData));
				updateCounts(myBoozeData);
				$("#item-row-" + selectedRowIndex).find("td.item-quantity").text(quantity);
				$("#itemDetailModal").modal('hide');
			}
			else {
				var inputs = [];
				var name = $("#item-name-input").val();
				var quantity = $("#item-quantity-input").val();
				var type = $("input[name='bottle-type']:checked"). val();
				var description = $("#item-description-input").val();
				inputs.push.apply(inputs, [name, quantity, type, description]);
				
				var validForm = validateForm(inputs);
				if(!validForm){
					$("#error-msg").show();
				}
				else {
					$("#error-msg").hide();
					var newItem = {};
					newItem.name = name;
					newItem.quantity = quantity;
					newItem.type = type;
					newItem.description = description;
					myBoozeData.push(newItem);
					utils.localstorage.setStoredData('initial-data', JSON.stringify(myBoozeData));
					updateCounts(myBoozeData);
					table.row.add([newItem.name, newItem.description, newItem.type, newItem.quantity]).draw();
					$("#itemDetailModal").modal('hide');
				}
				
			}			
		});
		
		
		//click on create new bottle and show modal
		$("#create-new-item").click(function(event){
			isAdding = true;
			$("#error-msg").hide();
			$("#item-name-input").val("").prop("disabled", false);
			$("#item-description-input").val("").prop("disabled", false);
			$("input[type=radio]").prop("disabled",false);
			$("#itemDetailModalLabel").text("Add new bottle");
			$("#itemDetailModal").modal('show');				
		});
		
		//intit the main procedures
		//If localstorage if filled return it, else load from global dummy var
		//depends on the option selected in the config file for getting the info
		if(CONFIG.storage_method === "localstorage"){
			myBoozeData = utils.localstorage.initLocalStorage();
		}
		else {
			utils.api.init(CONFIG);
			myBoozeData = utils.api.getRemoteDataset(); 
		}
		myBoozeData = utils.localstorage.initLocalStorage();
		updateCounts(myBoozeData);
		fillTableData(myBoozeData, true);
		table = $('#booze-dataTable').DataTable({
			 "order": [[ 0, "asc" ]]
		});
	});


})(); // End of use strict
