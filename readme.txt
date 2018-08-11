/******************************************************
 Nuno Prata @ 9/8/2018
 
 This file contains a brief description of the
 project so it can be handed over, justifying
 some of the option taken.
 
 Total project time: 5:10h + (~30 mins documenting)
 
 ******************************************************/
 
 
 - BASIC ARCHITECTURE:
 Project is composed by an index page and it's resources. Core lib code resides in the js/lib folder.
 There is a "main" file which resides in the root /js folder. This file starts up the website
 and initializes the necessary libs to manipulate the resources. This main file is responsible for the listeners,
 while the libs perform background isolated background operations.
 I decided to make both a wine and beer cellar since I like both :D. I also decided to make the user
 to be able to reduce/increase bottle quantities, although I don't allow them to fully remove a drink brand. 
 I consider this as a "history" as I can keep track of all the wines/beers that came accross my cellar.
 Delete operation would also be simple to implement, having a confirmation modal and removing the row from
 the table and from persistence.
 Only one modal was used to reduce HTML code size. This modal is changed according to user behaviour (view details
 or add new item). A basic validation was made to check for empty fields when adding a new item.
 
 
 - CODE CONSIDERATIONS
 As you may come to note, I am not a huge fan of anonymous functions. It happened too many times in my
 programming life having an error in the javascript code and not being able to locate it, except following the whole execution stack :\.
 I normally like to use the module pattern, so I can scope variables and avoid conflicts. I use the revealling module
 pattern, so I can keep some of the methods private and code readable. 
 Used strict directive to ensure all variable were declared, raising an error if not. 
 The main 'wine-bee-cellar.js' didn't need to be programmed in this way , but I find it elegant and easy to read. 
 Typically I also use the following format for the main files, that are not meant to be reused:
	
	var myCellar = new function(){
		var _self = this;
		this.myBoozeData;
	
		/* blah blach blach */
		this.updateCounts = function(data){
			_self.someMethod();
		......

 All code is commented out, except some sneaky bastard that passed by without me noticing it.		
	
 
 Commenting on a drink was not implemented, because I already have passed the deadline. It isn't a difficult task,
 since all there was to be done was implementing some kind of bootstrap accordion in the detail modal and another for field
 for entering new comments.
 These comments could be attached in an array named "comments" to each object (+1 property).
 
 - LAYOUT CONSIDERATIONS
 Since templating is a very time consuming task, I opted by using a existing bootstrap template
 to reduce time. I tuned it to be basic, but still maintaining it's responsiveness and some of it's
 eye-candy and accessibility features.
 
 
 - REUSED LIBS (Datatables, Bootstrap, jquery)
 I opted by using jquery datatables because I am familiar with them and they offer some nice features out
 of the box, such as sorting and searching. Made the rows even/odd colored to make reading easier.
 Bootstrap and jQuery are basically the building blocks for the internet programmer today: why reinventing
 the wheel if someone has already done it, and probably better than me? It saves hours and hours of work,
 offering nice styles and responsiveness as well as shorthand methods to manipulate the page and it's resources.
 Code that already belonged to the template is identified.
 
 - DATA/RESOURCES
 I could not use the provided APIs. Either they were not responding, or I couldn't get a token and a registry key.
 I used dummy data to populate the page in the first start; after that, the resources are saved into the localstorage.
 All changes/additions to resource list are made persistent in the localstorage. This can be undone using the top left button
 with the "warning" sign, clearing the localstorage and defaulting to the initial dummy data - usefull to play around.
 Altough I could not use the API, I left a basic module that allows to contact a REST API, doing the basic 4 operations.
 This module is not thoroughly tested (but I'm almost sure it works , probably with a few flaws), since it  was 
 developed for demonstration purposes and I had no time to test it with a proper API.
 All methods have callbacks so they can be used independentely.
 
 
 - CONFIG
 All relevant constants are in this file for easier manipulation and change. It also allows to select which source
 to use for the resource list: localstorage or API. API settings are also there, as well as a couple of ajax
 global settings.
 I like to centralize configurations and not having them spread ll accross the code.
 
 
 - FINAL CONSIDERATIONS
 This could become a great project, but it is not work for such little time. Some nice features could be added, such as 
 the comments,  pictures, suggestions, reviews with grades, etc. The HTML coud be improved with working "spinners"
 to give feedback to users while executing async requests on the table, etc. Oh well, may some hobby for the future :).
 I hope you guys like it :). Let me know if I forgot something through nunoprata@gmail.com.
 
 
 
 -- Kind regards,
	Nuno Prata
 