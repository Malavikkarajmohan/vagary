var obj = {

    xhr: new XMLHttpRequest(),

    getPlaces : function() {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({"name" : "ishaan"}),
            url: '/home',
            success: function(data) {
                console.log(data)
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}

obj.getPlaces();