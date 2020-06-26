$(document).ready(() => {
    let location = [];
    var mymap = null;
    $("#mapid").hide();
    $("#searchBtn").on("click", function (event) {
        $("#houses").empty();
        $("#mapid").show();

        let maxPrice = $("#maxPrice").val();
        let minBeds = $("#minBeds").val();
        let minBaths = $("#minBaths").val();
        let cityVal = $("#searchValue").val()
        let stateCodeArr = cityVal.split(",");
        let stateCode = stateCodeArr[1];
        let city = stateCodeArr[0];


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?beds_min=" + minBeds + "&sort=relevance&baths_min=" + minBaths + "&price_max=" + maxPrice + "&city=" + city + "&limit=100&offset=0&state_code=" + stateCode,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "ade8544827msh9659d2e7e6c8896p12e1ddjsnd9a76903cb81"
            }
        }
        // console.log(city);
        event.preventDefault()

        $.ajax(settings).done((response) => {
            location = [];
            if (mymap !== undefined && mymap !== null) {
                mymap.remove();
                console.log(mymap);
            }
            mymap = L.map('mapid').setView([39.772654, -105.052323], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHdhc2hidXJuOCIsImEiOiJja2JqMTF2bWowa2oyMnpvZGJkZ2JmaXdoIn0.tHlyLlqURpLCWAYL8-wJEQ', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);
            console.log(response);

            for (let i = 0; i < response.properties.length; i++) {
                var lat = response.properties[i].address.lat;
                var lng = response.properties[i].address.lon;

                L.marker([lat, lng]).addTo(mymap)
                    .bindPopup(response.properties[i].address.line)
                    .openPopup();
            }
            // console.log(location);

        }
        )
    });



});
