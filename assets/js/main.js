const buttonElement = document.querySelector('button');
function findIP() {
    const valueIP = document.getElementById("input_ip").value;
    const ip_address = valueIP;
    console.log(ip_address);
    const ipSection = document.querySelector(".ip_address");
    const ispSection = document.querySelector(".isp");
    const locationSection = document.querySelector(".location");
    const timezoneSection = document.querySelector(".timezone");
    const url = `https://geo.ipify.org/api/v2/country?apiKey=at_BtL2Nc1rofZEkwCEr6gcTixrjXyVt&ipAddress=${ip_address}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const latitude = data.location.lat;
            const longitude = data.location.lng;
            const ip = data.ip;
            const isp = data.isp;
            const locationRegion = data.location.region;
            const locationTimezone = data.location.timezone;
            var map = L.map('map', {
                center: [51.505, -0.09],
                zoom: 15
            });
            if(latitude && longitude) {
                map.setView([latitude, longitude], 15);
                var marker = L.marker([latitude, longitude]).addTo(map);
            }else{
                var marker = L.marker([51.505, -0.09]).addTo(map);
            }

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            function onLocationFound(e) {
                var radius = e.accuracy;

                L.marker(e.latlng).addTo(map)
                    .bindPopup("You are within " + radius + " meters from this point").openPopup();

                L.circle(e.latlng, radius).addTo(map);
            }

            map.on('locationfound', onLocationFound);

            map.locate({setView: true, maxZoom: 16});

            ipSection.append(ip);
            locationSection.append(locationRegion);
            timezoneSection.append(locationTimezone);
            ispSection.append(isp);
            buttonElement.addEventListener("click", findIP);
        })
        .catch(error => console.log(error));
}
function nowIP() {
    const urlWhois = `https://api.ipify.org/?format=json`;
    fetch(urlWhois)
        .then(response => response.json())
        .then(data => {
            document.getElementById("input_ip").value = data.ip;
        })
        .catch(error => console.log(error));
}
nowIP();
buttonElement.addEventListener("click", findIP);