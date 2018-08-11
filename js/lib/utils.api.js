/**
 Nuno Prata @ 9/8/2018
 
 This file contains a basic API interface
 to manipulate remote resources
 
 
 **/


var utils = utils || {}; //preserve namespace

utils.api = (function utilsAPI() {
	var actions = {
		"get": "GET",
		"create": "POST",
		"update": "PUT",
		"delete": "DELETE"
	};	
	
	var apiBaseURL, apiToken;
	var getListURL, resouceActionURL;
	
	

    //function to init the apis
	var _init = function init(config){
		apiBaseURL = CONFIG.API_base_URL;
		apiToken = CONFIG.API_token;
	};
	
	//get the resource list
	var _getRemoteDataset = function getDataset(succCallback){
		if (!succCallback){
			var succCallback = function(data, status, xhr){
			//do something with the resources list
			};
		}
		
		_httpRequest(actions.get, "/catalog/items", null, succCallback, null);
	};
	
	//get single resource
	var _getResource = function getResource(id, succCallback, errCallback){
		if (!succCallback){
			var succCallback = function(data, status, xhr){
			//do something with the resources list
			};
		}
		
		_httpRequest(actions.get, "/catalog/items/" + id, null, succCallback, errCallback);
	};
	
	var _createResource = function createResource(data, succCallback, errCallback){
		if (!succCallback){
			var succCallback = function(data, status, xhr){
			//do something with the resources list
			};
		}
		
		_httpRequest(actions.create, "/catalog/items/", data, succCallback, {});
	};
	
	var _updateResource = function updateResource(data, id, succCallback, errCallback){
		if (!succCallback){
			var succCallback = function(data, status, xhr){
			//do something with the resources list
			};
		}
		
		_httpRequest(actions.update, "/catalog/items/" + id, data, succCallback, {});
	};
	
	var _deleteResource = function deleteResource(id, succCallback, errCallback){
		if (!succCallback){
			var succCallback = function(data, status, xhr){
			//do something with the resources list
			};
		}
		
		_httpRequest(actions.delete, "/catalog/items/ + id", null, succCallback, {});
	};

    
        
	//private method
    var _httpRequest = function httpRequest(requestType, requestUrl, data, successCallback, errorCallback) {
        try {
            $.ajax({
                url: apiBaseURL + requestUrl,
                type: requestType,
                dataType: CONFIG.dataType,
                data: data,
                timeout: CONFIG.ajaxTimeout,
				headers: {
					"Authorization": "Basic " + apiToken
				},
                success: function succCB(data, textStatus, jqXHR){
                    if(successCallback)
						successCallback(data, textStatus, jqXHR);
                },
                error: function errCB(xhr, textStatus, errorThrown) {
                    _defaultErrorCallback(xhr, textStatus, errorThrown, url);
					if(errorCallback)
						errorCallback();
                }
            });
        }
        catch (ex) {
            console.log("#### Ajax request failed ####");
        }
    };
	
	
	//private method
	var _defaultErrorCallback = function ajaxFailureCallback(jqXHR, textStatus, errorThrown, ajaxUrl){
		if (jqXHR.status === 0) {
			console.log('error', jqXHR.status + ': Could not connect, please check your network');
		} else if (jqXHR.status == 404) {
			console.log('error', jqXHR.status + ': Error contacting server at address ' + '"' + ajaxUrl + '" : Unreachable or not found');
		} else if (jqXHR.status == 500) {
			console.log('error', jqXHR.status + ': Internal server error at address ' + '"' + ajaxUrl + '"');
		} else if (exception === 'parsererror') {
			console.log('error', exception +  ': Error parsing response accessing ' + '"' + ajaxUrl + '"');
		} else if (exception === 'timeout') {
			console.log('error', exception +  ': Request timed out accessing ' + '"' + ajaxUrl + '"');
		} else if (exception === 'abort') {
			console.log('error', exception +  ': Request aborted accessing ' + '"' + ajaxUrl + '"');
		} else {
			console.log('error', 'Unknown error accessing ' + '"' + ajaxUrl + '"\n Details: ' + jqXHR.responseText);
		}
	};
    
    
	//public interface
    return {
        init: 				_init,
		getRemoteDataset:	_getRemoteDataset,
		getResource:		_getResource,
		createResource:		_createResource,
		updateResource:		_updateResource,
		deleteResource:		_deleteResource        
    };
})();