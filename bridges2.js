bridgeData = [
    {
        name: "Verrazano-Narrows Bridge",
        city: "New York, NY",
        span: 1298.4,
        span_text: "1,298.4m",
        location: [40.6066, -74.0447],
    },
    {
        name: "Golden Gate Bridge",
        city: "San Francisco and Marin, CA",
        span: 1280.2,
        span_text: "1,280.2m",
        location: [37.8199, -122.4783],
    },
    {
        name: "Mackinac Bridge",
        city: "Mackinaw and St Ignace, MI",
        span: 1158.0,
        span_text: "1,158.0m",
        location: [45.8174, -84.7278],
    },
    {
        name: "George Washington Bridge",
        city: "New York, NY and New Jersey, NJ",
        span: 1067.0,
        span_text: "1,067.0m",
        location: [40.8517, -73.9527],
    },
    {
        name: "Tacoma Narrows Bridge",
        city: "Tacoma and Kitsap, WA",
        span: 853.44,
        span_text: "853.44m",
        location: [47.269, -122.5517],
    },
];

//Set center location as the means of the individual locations with slight adjustments as needed
let bridgesAreaCoordinates = [];
let sumLat = 0.0;
let sumLong = 0.0;

bridgeData.forEach((e) => {
    sumLat += e.location[0];
    sumLong += e.location[1];
});

bridgesAreaCoordinates.push(sumLat / bridgeData.length);
bridgesAreaCoordinates.push(sumLong / bridgeData.length - 3);

//Set zoom level
let zoomLevel = 4;

let map = L.map("longest-bridge").setView(bridgesAreaCoordinates, zoomLevel);

//Import map tiles from open street map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Creating custom icons
let customIcon = L.icon({
    iconUrl: "bridge.png",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

let longestIcon = L.icon({
    iconUrl: "golden-gate.png",
    iconSize: [20, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

//Finding the longest bridge
let longestSpan = 0;

bridgeData.forEach(function (ele) {
    if (ele.span > longestSpan) {
        longestSpan = ele.span;
    }
});

bridgeData.forEach(function (longestBridges) {
    //draw a marker for the bridges
    let markerText = `<b>${longestBridges.name}</b><br>${longestBridges.span_text}`;

    //Using different icon for longest bridge
    if (longestBridges.span === longestSpan) {
        L.marker(longestBridges.location, { icon: longestIcon })
            .bindPopup(markerText)
            .addTo(map);
    } else {
        L.marker(longestBridges.location, { icon: customIcon })
            .bindPopup(markerText)
            .addTo(map);
    }
});

let label = [];
let chartData = [];

bridgeData.forEach(function (ele) {
    label.push(ele.name);
    chartData.push(ele.span);
});

const data = {
    labels: label,
    datasets: [
        {
            barPercentage: 0.5,
            label: "Longest US Bridges Chart",
            data: chartData,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
            ],
        },
    ],
};

const config = {
    type: "bar",
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

const myChart = new Chart(document.querySelector("#myChart"), config);
