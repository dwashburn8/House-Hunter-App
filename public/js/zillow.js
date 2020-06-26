$(document).ready(() => {


    // let city = $("#searchValue").val()
    let favoriteArr = [];
    $(".alert").hide();



    $("#searchBtn").on("click", function (event) {
        $("#houses").empty();
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
            "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?beds_min=" + minBeds + "&sort=relevance&baths_min=" + minBaths +"&price_max=" + maxPrice + "&city=" + city + "&limit=100&offset=0&state_code=" + stateCode,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "ade8544827msh9659d2e7e6c8896p12e1ddjsnd9a76903cb81"
            }
        }
        // console.log(city);
        event.preventDefault()

        $.ajax(settings).done((response) => {
            console.log(response);
            console.log(stateCode);
            

            for (let i = 0; i < response.properties.length; i++) {
                var newDiv = $("<div>")
                var newTitle = $("<h3>");
                var newImg = $("<img>");
                var newP = $("<p>");
                var newP2 = $("<p>");
                var newP3 = $("<p>");
                var newP4 = $("<p>");
                var newButton = $("<button>")
                newButton.attr("class", "btn btn-danger saveButton")
                newButton.attr("value", response.properties[i].property_id)

                newDiv.attr("class", "col-lg-4 pt-3 wrapper col-sm-12")
                newImg.attr("height", "200px")
                newImg.attr("width", "300px")
                newButton.text("Save to favorites")
                newTitle.text(response.properties[i].address.line);
                newImg.attr("src", response.properties[i].thumbnail);
                newP.text("Price: $" + response.properties[i].price);
                newP2.text("Bedrooms: " + response.properties[i].beds);
                newP3.text("Bathrooms: " + response.properties[i].baths);

                if (response.properties[i].building_size) 
                {
                    newP4.text(response.properties[i].building_size.size + " sqft")
                }

                newDiv.append(newTitle)
                newDiv.append(newImg)
                newDiv.append(newP)
                newDiv.append(newP2)
                newDiv.append(newP3)
                newDiv.append(newP4)
                newDiv.append(newButton)
                $("#houses").prepend(newDiv)

            }
            
            $(".wrapper").on("click", ".saveButton", (event) => {
                event.preventDefault();
                $(".alert").show();

                $('.alert').alert()
                let houseIndex= response.properties.map(house=>{
                  return  house.property_id
                }).indexOf(event.target.value)
              
                let houseToSave = response.properties[houseIndex]
                
            // console.log($("#userID").attr("data-id"));
            
                const handleFavSubmit = () => {
                    

                    addFavorite({
                        city: houseToSave.address.city,
                        address: houseToSave.address.line,
                        img: houseToSave.thumbnail,
                        price: houseToSave.price,
                        square_feet: houseToSave.building_size.size,
                        bedrooms: houseToSave.beds,
                        bathrooms: houseToSave.baths,
                        state_code: houseToSave.address.state_code,
                        user_id: $("#userID").attr("data-id")
                        
                    })
                };

                handleFavSubmit()
        
            })



        });

    })







    function addFavorite(favData) {
        console.log(favData);
        
        $.post("/api/favorites", favData)
      }

      function deletePost(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/favorites/" + id
        })
          .then(function() {
          });
      }

      $(".deleteWrapper").on("click", ".deleteFav", (event) => {
        event.preventDefault();
        let houseId = event.target.value;
        deletePost(houseId);
        console.log(houseId);
        location.reload();
    })
})