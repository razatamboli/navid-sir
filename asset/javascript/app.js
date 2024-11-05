
const employeeform = document.getElementById("employeeform");
const emailformcontrol = document.getElementById("email");
const passwordformcontrol = document.getElementById("password");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("Latitude:", position.coords.latitude);
            console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
            console.error("Error occurred: ", error.message);
        },
        { enableHighAccuracy: true } // optional parameter
    );
} else {
    console.log("Geolocation is not supported by this browser.");
}


// Function to get human-readable location
function getReadableLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Use OpenStreetMap's Nominatim API for reverse geocoding
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        
                        // Access the address information from the response
                        const address = data.address;
                        console.log(address);
                        alert(address.county)
                        
                        console.log("City:", address.city || address.town || address.village);
                        console.log("State:", address.state);
                        console.log("Country:", address.country);
                        
                        // Example: Display the formatted address
                        console.log("Full Address:", data.display_name);
                    })
                    .catch(error => console.error("Error with reverse geocoding:", error));
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Call the function


// event called of employee-form

const onEmployeeForm = (eve) => {
    eve.preventDefault();
    let employeeObj = {
        email : emailformcontrol.value,
        password : passwordformcontrol.value
    }
    getReadableLocation();
    employeeform.reset();
}

employeeform.addEventListener("submit", onEmployeeForm)