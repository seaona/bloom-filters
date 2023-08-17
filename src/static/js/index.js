const ethers = window.ethers;

/* Event listeners */
window.addEventListener('load', toHex);
document.getElementById("add-event").addEventListener('change', toHex);

/* Functions */
function toHex() {
    const eventName = document.getElementById("add-event").value;
    const hash = ethers.id(eventName);
    document.getElementById("hexValue").innerHTML = hash;
}

function addToBloomFilter(element) {

}

function isInBloomFilter(element) {
    const a = ;
    const b = ;
    const c = ;

    let result = document.getElementById("result");
    
    if (
        a == 'in-set' &&
        b == 'in-set' &&
        c == 'in-set'
    ) {
        result.innerHTML = 'Might be in the set.'
    } else {
        result.innerHTML = 'Definetly not in the set.'
    }
}