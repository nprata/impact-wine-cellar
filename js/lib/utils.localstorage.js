/**
 Nuno Prata @ 9/8/2018
 
 This file is used for localstorage manipulation,
 containing all relevant methods definition
 
 
 **/
 
var utils = utils || {}; //preserve namespace and prevent undefined obj

//localstorage module
utils.localstorage = (function utilsLocalstorage() {
	
	//private function
	var _getInitialData = function getInitialData(){
		return JSON.parse(localStorage.getItem(['initial-data']));
	};
	
	//delete key from storage
	var _deleteStoredData = function deleteInitialData(key){
		localStorage.removeItem(key);
	};
	
	//get key from storage
	var _getStoredData = function getStoredData(){
		return localStorage.getItem(key);
	};
	
	//set a key in the storage
	var _setStoredData = function setStoredData(key, item){
		
		localStorage.setItem(key, item)
	};
	
   
   //init the local storage. 	
    var _initLocalStorage = function initStorage() {
		var items = null;		
		//check if there is data on the localStorage
		items = _getInitialData();
		if(items == null){
			items = DUMMY_WINE_BEER_DATA.items;
		}
		
		//NOT possible to use in a local dev environment (file://) due to cross origin request protection
		//or I wouldn't load it always
		/*$.getScript( "../dummy-data.js" )
			.done(function( script, textStatus ) {
				console.log( DUMMY_WINE_BEER_DATA );
			})
			.fail(function( jqxhr, settings, exception ) {
				alert("Could not initilize page since there is no data available!");
			});*/
		//solution is to load script in a <script> tag in the html page
		return items;				
    };
	
	//given an array of items and a key, return its index
	var _getItemIndex = function itemIndex(data, key){
		var index = -1;
		$.each(data, function(idx, item){
			if(item.name === key){
				index = idx;
				return false;
			}
		});
		return index;
	};

    //public interface
    return {
        initLocalStorage: 	_initLocalStorage,
		deleteStoredData:	_deleteStoredData,
		setStoredData:		_setStoredData,
		getItemIndex:		_getItemIndex
    };
})();