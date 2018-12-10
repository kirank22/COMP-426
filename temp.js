var rootURL = "http://comp426.cs.unc.edu:3001";


$(document).ready(function() {
    var depart_airport_id, arrive_airport_id, depart, arrive;
    $.ajax(rootURL+'/airports?filter[code_ilike]=' + depart,{
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (response)=>{
            let test = response;
            console.log(test);
            depart_airport_id = response[0].id;
            console.log(depart_airport_id);
            $.ajax(rootURL+'/airports?filter[code_ilike]=' + arrive,{
                type: 'GET',
                xhrFields: {withCredentials: true},
                success: (response)=>{
                    let test = response;
                    console.log(test);
                    arrive_airport_id = response[0].id;
                    console.log(arrive_airport_id);
                    $.ajax(rootURL + "/flights?filter[departure_id]=" + depart_airport_id + "&filter[arrival_id]=" + arrive_airport_id,{
                        type: 'GET',
                        xhrFields: {withCredentials: true},
                        success: (response)=>{
                            for (i = 0; i < response.length; i++) {
                                if (response[i].departure_id == source_id && response[i].arrival_id == destination_id) {
                                   
                                    flight_id = response[i].id;
                                    flight_number=response[i].number;
                                    airline_id=response[i].airline_id;
                                   
                                    departure_time=response[i].departs_at.substring(11,19);
                                    arrival_time=response[i].arrives_at.substring(11,19);
                                  
                                    $.ajax(mainUrl + "instances", {
                                        data: "GET",
                                        xhrFields: {
                                            withCredentials: true
                                        },
                                        datatype: JSON,
                                        async:false,
                                        success: function (response) {
                                            for (j = 0; j < response.length; j++) {
                                                if (response[j].date == date && response[j].flight_id == flight_id) {
                                                    row=$("<tr></tr>");
                                                    $("#result").append(row);
                                                    row.append("<td>"+departure_time+"</td>");
                                                    row.append("<td>"+arrival_time+"</td>");
                                                    airline_name="";
                                                    $.ajax(mainUrl + "airlines", {
                                                        data: "GET",
                                                        xhrFields: {
                                                        withCredentials: true
                                                        },
                                                        async:false,
                                                        datatype: JSON,
                                                        success: function (response) {
                                                            for(z=0;z<response.length;z++){
                                                                if(response[z].id==airline_id){
                                                                    airline_name=response[z].name;
                                                                }
                                                            }
                                                        }
                                                    });
                                                    row.append("<td>"+airline_name+"</td>");
                                                    row.append("<td>"+flight_number+"</td>");
                                                    row.append("<td>" + source + "</td>");
                                                    row.append('<span style="font-size: 30px; color: #404040;"><i class="fas fa-arrow-right"></i></span>');
                                                    row.append("<td>" + destination + "</td>");
                                                    //row.append("<td>"+source+" arrow "+destination+"</td>");
                                                    row.append('<button id = "select_btn" data-airline-name = "' + airline_name + '" data-flight-number = "' + flight_number + '" data-source = "' + source + '" data-destination = "' + destination + '" data-departure-time = "' + departure_time + '" data-arrival-time = "' + arrival_time + '" data-instance-id ="' +response[j].id+ '" data-flight-id ="' +flight_id+ '" data-date="' + date +'">Select</button>');
                                                }
                                            }
                                        }

                                    });
                                }
                            }
                            
                        },
                        error: () => {
                            alert('Please enter a valid aiport');
                        }
                    })
                    
                },
                error: () => {
                    alert('Please enter a valid aiport');
                }
            })
        },
        error: () => {
            alert('Please enter a valid aiport');
        }
    });

    

    build_flight_page = function() {
        let body = $("#body");
        body.empty();
        body.append('<h1>Flights Available</h1>');
        body.append("<button id='reset'>Search Again</button>");
        body.append('<div id="result_div"></div>');
        body.append('<table id="result"></table>');

    }

});