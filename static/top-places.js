var obj = {

    xhr: new XMLHttpRequest(),

    getPlaces : function() {
        $.ajax({
            type: "GET",
            url: '/recommend',
            success: function(data) {
                console.log(data)
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}

// obj.getPlaces();