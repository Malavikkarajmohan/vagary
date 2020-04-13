// var obj = {

//     xhr: new XMLHttpRequest(),

//     getPlaces : function() {
//         $.ajax({
//             type: "GET",
//             url: '/recommend',
//             success: function(data) {
//                 console.log(data)
//             },
//             error: function(error) {
//                 console.log(error);
//             }
//         });
//     }
// }

var showdets = {

    xhr: new XMLHttpRequest(),
    showDetails : function(){
        // need to get the recommended string
        $.ajax({
            type: "GET",
            url: '/recommend',
            success: function(data) {

                

                
                setTimeout(function() {

                    places = data['recommend'].split(";");
                    // console.log(places);
                    // first place
                    var place1= document.getElementById("place1");
                    var img1 =document.createElement("img");
                    // get the url from the db
                    img1.src = places[0].split(",")[1];
                    img1.style.height = '400px';
                    place1.appendChild(img1)
                    // // get country's name 
                    var ht1 = document.createElement("h3");
                    // assign country's name to ht1
                    ht1.innerHTML = places[0].split(",")[0];
                    console.log(places[0].split(",")[0]);
                    var d1 = document.getElementById("d1");
                    d1.appendChild(ht1);

                    setTimeout(function() {
                        var place2= document.getElementById("place2");
                        var img2 =document.createElement("img");
                        // get the url from the db
                        // img2.src = places[1].split(",")[1];
                        img2.src = places[1].split(",")[1];
                        img2.style.height = '400px';
                        place2.appendChild(img2)
                        // // get country's name 
                        var ht2 = document.createElement("h3");
                        // assign country's name to ht1
                        ht2.innerHTML = places[1].split(",")[0];
                        var d2 = document.getElementById("d2");
                        d2.appendChild(ht2);

                        setTimeout(function() {
                            var place3= document.getElementById("place3");
                            var img3 =document.createElement("img");
                            // get the url from the db
                            img3.src = places[2].split(",")[1];
                            // img3.src = places[0].split(",")[1];
                            img3.style.height = '400px';
                            place3.appendChild(img3)
                            // // get country's name 
                            var ht3 = document.createElement("h3");
                            // assign country's name to ht3
                            ht3.innerHTML = places[2].split(",")[0];
                            var d3 = document.getElementById("d3");
                            d3.appendChild(ht3);

                            setTimeout(function() {
                                var place4= document.getElementById("place4");
                                var img4 =document.createElement("img");
                                // // get the url from the db
                                img4.src = places[3].split(",")[1];
                                // img2.src = places[0].split(",")[1];

                                place4.appendChild(img4)
                                // // // get country's name 
                                var ht4 = document.createElement("h3");
                                // // assign country's name to ht4
                                ht4.innerHTML = places[3].split(",")[0];
                                var d4 = document.getElementById("d4");
                                d4.appendChild(ht4);
                            }, 2000)
                        
                        }, 2000);

                    }, 2000);

                }, 2000);
                
                

                
                
                

            }
        });
        
    }

}

// obj.getPlaces();