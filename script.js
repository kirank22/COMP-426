var rootURL = "http://comp426.cs.unc.edu:3001";


$(document).ready(function(){
    var tripType, depart, arrival, departDate, arrivalDate, ticketNum

    $("form").submit(function(){
        tripType = $("#tripinfo input[type = 'radio']:checked").val();
        depart = $('#departure').val();
        arrival = $('#arrival').val();
        departDate = $('#departuredate').val();
        arrivalDate = $('#arrivaldate').val();
        ticketNum = $('#ticketnumber').val();

        console.log(tripType);
        console.log(depart);
        console.log(arrival);
        console.log(departDate);
        console.log(arrivalDate);
        console.log(ticketNum);

    });
});