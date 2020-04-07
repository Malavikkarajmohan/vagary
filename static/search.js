console.log("Sane")

var search = {

    xhr: new XMLHttpRequest(),

    showData: function() {
        console.log(this.response);
    },

    query: function() {
        var checkin = document.getElementById("datepicker_5").value;
        //console.log(typeof checkin)
        var checkout = document.getElementById("datepicker_6").value;
        var place = document.getElementById("place").value;
        var place_txt = '"' + place  + '"';
        //console.log(place);
        var person = document.getElementById("persons").value; 
        var text = '{ "persons":' + person + ' , "place":' + place_txt + ' }';
        console.log(text)

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: text,
            url: '/bring_searches',
            success: function(data) {
                var my_div = document.getElementById("heading");
                console.log(my_div);
                var x = document.createElement("H1");
                var t = document.createTextNode(place);
                x.appendChild(t);
                my_div.appendChild(x);
                var img_div = document.getElementById("image1");
                console.log(img_div);
                var img = document.createElement('img');
                //img.src ="img/search/dubai2.jpg" 
                img.setAttribute("src", "/home/malavikka/Desktop/doubt.png");
                img.setAttribute("alt", "The Pulpit Rock");
                img_div.appendChild(img); 

            },
            error: function(error) {
                console.log("error")
                console.log(error);
            }
        });
        
    }
}

