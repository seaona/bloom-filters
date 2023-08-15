const ethers = window.ethers;
const body = document.querySelector('body');

/* Event listeners */
body.onload = toHex;
document.getElementById("add-event").addEventListener('change', toHex);

/* Functions */
async function toHex() {
    const eventName = document.getElementById("add-event").value;
    const hash = ethers.id(eventName);
    document.getElementById("hexValue").innerHTML = hash;
}