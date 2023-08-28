const ethers = window.ethers;

/* Event listeners */
window.onload=function(){
    getSignature();
    createEmptyBloom();
    updateCurrentSet();
}

document.getElementById("input-event").addEventListener('input', getSignature);
document.getElementById("add-event").addEventListener('submit', addToBloomFilter);

/* Functions */
function getSignature() {
    const eventName = document.getElementById("input-event").value;
    const hash = ethers.id(eventName);
    document.getElementById("hexValue").innerHTML = hash;
    hexToBytes(hash)
}

function hexToBytes(hex) {
    let bytes = [];
    for (let c = 2; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16).toString(2));
    console.log(bytes)
    return bytes;
}


function getBits(elem) {
    const hash = '1101110111110010'
}

function addToBloom() {
    const str = ethers.toUtf8Bytes('SafeReceived(address,uint256)')
    const hash = ethers.id(str);
    console.log(hash)
    document.getElementById("keccak").innerHTML = hash;
}

function addToBloomFilter(filter, element) {
    const hash = ethers.keccak256(element);

    for (let idx = 0; idx < 5; idx += 2) {
      // Obtain the least significant 11 bits from the pair of bytes
      // (16 bits), and set this bit in bloom array.
      // The obtained bit is 0-indexed in the bloom filter from the least
      // significant bit to the most significant bit.
      const bit_to_set = (hash[idx] << 8) | hash[idx + 1];
      const bit_index = 0x07FF - (bit_to_set & 0x07FF);
  
      const byte_index = Math.floor(bit_index / 8);
      const bit_value = 1 << (7 - (bit_index % 8));
      filter[byte_index] |= bit_value;
    }
}


function stringToBytes(str) {
  var ch, st, re = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);  // get char
    st = [];                 // set up "stack"
    do {
      st.push( ch & 0xFF );  // push byte to stack
      ch = ch >> 8;          // shift value down by 1 byte
    }
    while ( ch );
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat( st.reverse() );
  }
 // return an array of bytes
  return re;
}

const bloomSize = 3;
const bloom = new Uint8Array(bloomSize);
let currentSet = [];

function createEmptyBloom() {
    const bloomTable = document.getElementById("bloomTable");
    const row = bloomTable.querySelector("tr");
    for (let i = 0; i < bloomSize * 8; i++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
    }
}


    // Create the table cells for the bloom filter bits


    function updateBloomTable() {
        const bloomTable = document.getElementById("bloomTable");
        const cells = bloomTable.querySelectorAll("td");
        for (let i = 0; i < bloomSize * 8; i++) {
            const byteIndex = Math.floor(i / 8);
            const bitIndex = i % 8;
            const bitMask = 1 << (7 - bitIndex);
            if (bloom[byteIndex] & bitMask) {
                cells[i].classList.add("set");
            } else {
            cells[i].classList.remove("set");
        }
      }
    }

    function add_to_bloom(bloom_entry) {
        const hash = ethers.keccak256(bloom_entry);
        for (let idx = 0; idx < 3; idx++) {
            const bit_to_set = hash[idx];
            const bit_index = 0x07 - (bit_to_set & 0x07);
            const byte_index = Math.floor(bit_index / 8);
            const bit_value = 1 << (7 - (bit_index % 8));
            bloom[byte_index] |= bit_value;

            const bit_string = byte_index * 8 + (7 - (bit_index % 8));
            currentSet.push(bit_string);
        }
      updateBloomTable();
      updateCurrentSet();

    }

    function updateCurrentSet() {
        const currentSetElement = document.getElementById("currentSet");
        currentSetElement.textContent = currentSet.join(", ");
      }

    function is_in_bloom(bloom_entry) {
      const hash = ethers.keccak256(bloom_entry);

      for (let idx = 0; idx < 3; idx++) {
        const bit_to_check = hash[idx];
        const bit_index = 0x07 - (bit_to_check & 0x07);

        const byte_index = Math.floor(bit_index / 8);
        const bit_value = 1 << (7 - (bit_index % 8));
        if ((bloom[byte_index] & bit_value) === 0) {
          return false;
        }
      }

      return true;
    }

    const addToBloomButton = document.getElementById("addToBloom");
    addToBloomButton.addEventListener("click", () => {
      const entryInput = document.getElementById("entry");
      const entry = entryInput.value;
      if (entry) {
        const entryBytes = new TextEncoder().encode(entry);
        add_to_bloom(entryBytes);
      }
    });

    const searchButton = document.getElementById("searchButton");
    const searchResult = document.getElementById("searchResult");
    searchButton.addEventListener("click", () => {
      const searchInput = document.getElementById("search");
      const searchEntry = searchInput.value;
      if (searchEntry) {
        const searchBytes = new TextEncoder().encode(searchEntry);
        const exists = is_in_bloom(searchBytes);
        if (exists) {
          searchResult.textContent = "Possibly in bloom filter";
        } else {
          searchResult.textContent = "Definitely not in bloom filter";
        }
      }
    });

