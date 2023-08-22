const ethers = window.ethers;

/* Event listeners */
window.addEventListener('load', toHex);
//document.getElementById("add-event").addEventListener('change', toHex);

/* Functions */
function makeRequest() {
    document.getElementById("response").innerHTML = "0x28f531fec2a6ea4250baf66ef6353f3b313fcc45fe13715436dbf22cd064805640c04967c8924a984579d50e6a5d8581623d99b8baabbf42f4b79c15f07b7144a24a261d650619e8f8d6432a482a28ba8c157d2796403828dd5abedc92a0e9e842cf110c1a82432f0c4d54e99db29825c29bacc12201d62008952d9cd37d3b00274a235e04b1dc6899e9050cc3b65f502486462da95924f9523d43d742ba9e88daaf5f5ffbb37e111c83c8f59d933c9c2676028e6f2f977a2d8c9b5e81685c10754c1cb28c640b0276d158746c82d3eec6581e4963bb3054500d706fc523a528bfb0b8fbc501e4ed12cdc097218d112a8073f1123b2d86c400e5fbb3fcf77c4f";
}


function getKeccak() {
    const hash = ethers.id('SafeReceived(address,uint256)');
    console.log(hash)
    document.getElementById("keccak").innerHTML = hash;
}
