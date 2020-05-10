var chat = {

    xhr: new XMLHttpRequest(),

    checkmsg: function() {

        $.ajax({
            type: "GET",
            url: '/respond',
            success: function(data) {
            


                if(data['message'] == 'None')
                {
                    console.log("None");
                }
                else
                {
                    var divbox = document.getElementById("box");
                    var newmessage = document.createElement("div");

                    newmessage.innerHTML = "<b>Support: </b>" + data['message'];

                    divbox.appendChild(newmessage);
                }

            }
        });
        

    },

    sent: function() {


        var mes = document.getElementById("nomessage");
        mes.hidden = true;

        var message = document.getElementById("message");
        var divbox = document.getElementById("box");
        var newmessage = document.createElement("div");

        newmessage.innerHTML = "<b>User: </b>" + message.value;

        divbox.appendChild(newmessage);

        this.checkmsg();

    }
}