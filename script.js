var rootURL = "http://comp426.cs.unc.edu:3001";


$(document).ready(function(){
    var tripType, depart, arrival, departDate, arrivalDate, ticketNum;


    var searchFlights = function (depart, arrival, departDate, arrivalDate) {
        console.log(depart);
        $.ajax(rootURL+'/airports?filter[code]=JFK',{
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (response)=>{
                let test = response;
                console.log(test);
            },
            error: () => {
                alert('Please enter a valid aiport');
            }
        })
    }

    $("form").submit(function(){
        tripType = $("#tripinfo input[type = 'radio']:checked").val();
        depart = $('#departure').val();
        arrival = $('#arrival').val();
        departDate = $('#departuredate').val();
        arrivalDate = $('#arrivaldate').val();
        ticketNum = $('#ticketnumber').val();

        searchFlights(depart, arrival, departDate, arrivalDate);
        var departID, arrivalID;
    });
});
