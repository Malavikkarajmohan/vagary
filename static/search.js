console.log("Sane")

var search = {

    xhr: new XMLHttpRequest(),

    showData: function() {
        console.log(this.response);
    },

    query: function() {
        var checkin = document.getElementById("datepicker_1").value;
        var checkout = document.getElementById("datepicker_2").value;
        var place = document.getElementById("place").value;
        var person = document.getElementById("persons").value;
        var text = '{ "in":' + checkin + ', "out":' + checkout + ', "persons":' + person + ', "place":' + place + ' }';

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: text,
            url: '/bring_searches',
            success: function(data) {
                console.log(data)
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    }
}