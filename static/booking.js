var book = {
    xhr: new XMLHttpRequest(),
    getID: function(oEvent){
        var btn = (oEvent.target || oEvent.srcElement).id;
        localStorage.setItem("btnValue",btn);
        //console.log(btn);
        //console.log((oEvent.target || oEvent.srcElement).id);
    },

    begin: function(){
        
        //var h3_1 = localStorage.getItem("h3_1");
        btn  = localStorage.getItem("btnValue");
        //data  = localStorage.getItem("data");
        var data = JSON.parse(localStorage.getItem('data'));
        // console.log(text);
        // console.log(btn);
        // console.log(data);

        if(btn == "btn1")
        {
            name = data['1'].name;
            var persons = data['1'].persons;
            console.log(name);
            var h4 = document.getElementById('name');
            var avail = document.getElementById('avail')
            h4.innerHTML = name;
            avail.innerHTML = "No of rooms available: "+persons
        }
        else if(btn == "btn2")
        {
            name = data['2'].name;
            var persons = data['2'].persons;
            console.log(name);
            var h4 = document.getElementById('name');
            var avail = document.getElementById('avail')
            h4.innerHTML = name;
            avail.innerHTML = "No of rooms available: "+persons
        }
        else if(btn =='btn3')
        {
            name = data['3'].name;
            var persons = data['3'].persons;
            console.log(name);
            var h4 = document.getElementById('name');
            var avail = document.getElementById('avail')
            h4.innerHTML = name;
            avail.innerHTML = "No of rooms available: "+persons
        }
        
    },
    booking: function()
    {
        var rooms = document.getElementById("per").value;
        var place = localStorage.getItem("place");
        console.log(rooms);
        var text = { 
            name : name, 
            persons : rooms,
            country : place
        };
        console.log(text);
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(text),
            url: '/book_success',
            success: function() {
            
                window.location.href = "/success";

            }
                
                
        }
    );
    }
}
