function getDates() {
    const today = new Date();

    const yearElmt = document.querySelector("#currentyear");
    yearElmt.innerHTML = today.getFullYear();

    const lastModElmt = document.querySelector(".lastModified");
    lastModElmt.innerHTML = `Last Modification: ${document.lastModified}`;
}

function getWindChill() {
    const temperature = 10;
    const windSpeed = 5;
    const windChillElmt = document.getElementById("wind-chill");
    let windChill = "N/A";

    if (temperature <= 10 && windSpeed > 4.8) {
        windChill = calculateWindChill(temperature, windSpeed) + "°C";
    }

    windChillElmt.textContent = windChill;
}

function calculateWindChill(temperature, windSpeed) {
    const windChill = 13.12
        + 0.6215 * temperature
        - 11.37 * Math.pow(windSpeed, 0.16)
        + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
    return windChill.toFixed(2);
}

getWindChill();
getDates();
