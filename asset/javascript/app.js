
const employeeform = document.getElementById("employeeform");
const emailformcontrol = document.getElementById("email");
const passwordformcontrol = document.getElementById("password");

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             console.log("Latitude:", position.coords.latitude);
//             console.log("Longitude:", position.coords.longitude);
//         },
//         (error) => {
//             console.error("Error occurred: ", error.message);
//         },
//         { enableHighAccuracy: true } // optional parameter
//     );
// } else {
//     console.log("Geolocation is not supported by this browser.");
// }


// Function to get human-readable location
// function getReadableLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;
                
//                 // Use OpenStreetMap's Nominatim API for reverse geocoding
//                 fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log(data);
                        
//                         // Access the address information from the response
//                         const address = data.address;
//                         console.log(address);
//                         alert(address.city)
                        
//                         console.log("City:", address.city || address.town || address.village);
//                         console.log("State:", address.state);
//                         console.log("Country:", address.country);
                        
//                         // Example: Display the formatted address
//                         console.log("Full Address:", data.display_name);
//                     })
//                     .catch(error => console.error("Error with reverse geocoding:", error));
//             },
//             (error) => {
//                 console.error("Error getting location:", error.message);
//             }
//         );
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// Function to get a stable, human-readable location using OpenStreetMap's Nominatim API
function getStableLocation() {
    if (navigator.geolocation) {
        // Geolocation options for higher accuracy
        const options = {
            enableHighAccuracy: true,  // Use GPS if available
            timeout: 10000,            // Maximum wait time in milliseconds
            maximumAge: 0              // Force request for the latest location
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                console.log(latitude);
                
                const longitude = position.coords.longitude;
                console.log(longitude);
                

                // Use OpenStreetMap's Nominatim API for reverse geocoding
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.address) {
                            const location = data.address;
                            console.log(location);
                            alert(`City : ${location.town} State : ${location.state}`)
                            console.log("City:", location.city || location.town || location.village);
                            console.log("State:", location.state);
                            console.log("Country:", location.country);

                            // Display the full address
                            console.log("Full Address:", data.display_name);
                        } else {
                            console.log("No address found for the given coordinates.");
                        }
                    })
                    .catch(error => console.error("Error with reverse geocoding:", error));
            },
            (error) => {
                console.error("Error getting location:", error.message);
            },
            options
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}



// event called of employee-form

const onEmployeeForm = (eve) => {
    eve.preventDefault();
    let employeeObj = {
        email : emailformcontrol.value,
        password : passwordformcontrol.value
    }
    // getReadableLocation();
    getStableLocation();
    employeeform.reset();
}

employeeform.addEventListener("submit", onEmployeeForm)