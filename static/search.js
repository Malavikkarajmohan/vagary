var search = {

    xhr: new XMLHttpRequest(),

    showData: function(data) {
        console.log(data);
    },
	query: function() {
		//my_div.remove(x);
		
		
        //var checkin = document.getElementById("datepicker_1").value;
        //console.log(typeof checkin)
        //var checkout = document.getElementById("datepicker_2").value;
        var place = document.getElementById("place").value;
        var place_txt = '"' + place  + '"';
        //console.log(place);
        //var person = document.getElementById("persons").value; 
        var text = '{ "place":' + place_txt + ' }';
        localStorage.setItem("place", place);
        //console.log(text)
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: text,
            url: '/bring_searches',
            success: function(data) {
				//console.log(data['1'].image);
				
                localStorage.setItem("data",JSON.stringify(data));
				my_div = document.getElementById("heading");
				my_div.innerHTML ="";
                //console.log(my_div);
                x = document.createElement("H1");
                t = document.createTextNode("Hotels in "+place);
                x.appendChild(t);
				my_div.appendChild(x);
				
                
				img1_div = document.getElementById("image1");
                console.log(img1_div);
                img1 = document.createElement('img');
                //img.src ="img/search/dubai2.jpg" 
                img1.src = data['1'].image;
				img1_div.appendChild(img1);
				// img1_div.innerHTML = img1.innerHTML;
                book1 = document.getElementById("d1");
               // console.log(book);
                h3_1 = document.createElement("H3");
                txt1 = document.createTextNode(data['1'].name);
                h3_1.appendChild(txt1);
                book1.append(h3_1);
    

				var img2_div = document.getElementById("image2");
                //console.log(img_div);
                var img2 = document.createElement('img');
                //img.src ="img/search/dubai2.jpg" 
                img2.src = data['2'].image;
				img2_div.appendChild(img2);
				// img2_div.firstElementChild = img2;
                var book2 = document.getElementById("d2");
               // console.log(book);
                var h3_2 = document.createElement("H3");
                var txt2 = document.createTextNode(data['2'].name);
                h3_2.appendChild(txt2);
                book2.append(h3_2);

				var img3_div = document.getElementById("image3");
                //console.log(img_div);
                var img3 = document.createElement('img');
                //img.src ="img/search/dubai2.jpg" 
                img3.src = data['3'].image;
				img3_div.appendChild(img3);
				// img3_div.innerHTML = img3.innerHTML;
                var book3 = document.getElementById("d3");
               // console.log(book);
                var h3_3 = document.createElement("H3");
                var txt3 = document.createTextNode(data['3'].name);
                h3_3.appendChild(txt3);
				book3.append(h3_3);
				
				var div1 = document.getElementById("new");
				div1.style.color = "blue";
                //search.book(data);
            },
            error: function(error) {
                console.log("error")
                console.log(error);
            }
        });
        
    }
}



function Suggest()
{
	othis = this; //save this for future
	this.xhr = new XMLHttpRequest();
	this.placepart = null;
	
	this.div = null; //the container div
	
	//Create a timer (to decide when to go to server)
	this.timer = null;
	
	this.getPlace = function()
	{
		if(this.timer)
		{
			clearTimeout(this.timer);
		}
		//Get ready to go to server in 1 second.
		// If the user types something before 1 second, this function
		// will be called and the timer is canceled before registering 
		// a new one. If the user keeps quiet for more than 1 second
		// then the fetchMovies function is called anyway
		
		this.timer = setTimeout(this.fetchPlaces, 1000);

	}
	
	//Function to check if we need to go to server or use cache data
	this.fetchPlaces = function()
	{
		//Check if the movie textbox is blank. This can happen
		// if the user repeatedly used the backspace to clear the box
		othis.placepart = document.getElementById("place");
		othis.div = document.getElementById("container");
		if(othis.placepart.value == "")
		{
			othis.div = document.getElementById("container");
			othis.div.innerHTML = "";
			othis.div.style.display = "none";
			var drop = document.getElementById("drop");
			drop.style.display = "block";
		}
		else
		{

			$.ajax({
				type: "POST",
				contentType: 'application/json',
				data: JSON.stringify({ "search": othis.placepart.value }),
				url: '/autocomplete',
				success: function(data) {

					var places = data['places'];
					
					othis.div = document.getElementById("container");
					othis.div.innerHTML = "";

					if(places.length == 0)
					{
						//Server could not find any suggestions.
						othis.div.style.display = "none";
					}
					//Else we have some suggestions
					else
					{
						//loop thru and populate the container div
						for(i=0;i<places.length;i++)
						{
							newdiv = document.createElement("div");
							newdiv.innerHTML = places[i];
							newdiv.className = "btn_1 d-none d-lg-block";
							newdiv.style.border = "20px";
						

							br = document.createElement("br");
							othis.div.appendChild(br);
							othis.div.appendChild(newdiv);
							
							//Now register for the click
							newdiv.onclick = othis.setPlace;
							newdiv.style.display = "block";
						}
						//Show the container div
						othis.div.style.display = "block";
						othis.div.style.border = "20px";
						
						//Save to localStorage for later use
						// localStorage[this.responseURL] = this.responseText;
					}

				}
			});
		}
	}
	
	//When user selects a movie from the list, set it into
	// the textbox and clear the container div
	this.setPlace = function()
	{
		othis.placepart.value = this.innerHTML;
		othis.div.innerHTML = "";
		othis.div.style.display = "none";	

		var drop = document.getElementById("drop");
		drop.style.display = "none";
	}
}
var obj = new Suggest();