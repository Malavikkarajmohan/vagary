console.log("Sane")

var search = {

    xhr: new XMLHttpRequest(),

    query: function() {
        var checkin = document.getElementById("datepicker_1").value;
        var checkout = document.getElementById("datepicker_2").value;
        var place = document.getElementById("place").value;
        var person = document.getElementById("persons").value;
        // this.xhr.open("POST", "/bring_searches", true);
        // this.xhr.onreadystatechange = this.showData();
        var text = '{ "in":' + checkin + ', "out":' + checkout + ', "persons":' + person + ', "place":' + place + ' }';
        console.log(JSON.parse(text));
    }   

}