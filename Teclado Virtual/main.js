const keys = [
  [
    ["1", "!"],
    ["2", '"'],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¿", "¡"],
  ], //primera fila
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["[", "{"],
    ["]", "}"],
  ],
  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    [";", ":"],
    ["'", "'"],
  ],
  [
    ["SHIFT", "SHIFT"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", "<"],
    [".", ">"],
    ["/", "?"],
    ["SHIFT", "SHIFT"],
  ],
  [["SPACE", "SPACE"]], //ultima fila
];

let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

function renderKeyboard() {
  const keyboardContainer = document.querySelector("#keyboardContainer");
  let empty = `<div class="keyEmpty"></div>`;

  const layers = keys.map((layer) => {
    return layer.map((key) => {
      if (key[0] === "SHIFT") {
        return `
          <button class='key keyShift ${shift ? 'activated' : ''}'>${key[0]}</button>
        `;
      }
      if (key[0] == "MAYUS") {
        return `<button class='key keyMayus ${mayus ? 'activated' : ''}'>${key[0]}</button>`;
      }
      if (key[0] == "SPACE") {
        return `<button class='key keySpace'></button>`;
      }

      return `
        <button class='key keyNormal'>
          ${
            shift
              ? key[1]
              : mayus &&
                key[0].toLowerCase().charCodeAt(0) >= 97 &&
                key[0].toLowerCase().charCodeAt(0) <= 122
              ? key[1]
              : key[0]
          }
        </button>
      `;
    });
  });
  layers[0].push(empty);
  layers[1].unshift(empty);

  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboardContainer.innerHTML = "";

  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class='layer'>${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      if (current) {
        if (key.textContent === "SHIFT") {
          shift = !shift;
          renderKeyboard();
        } else if (key.textContent === "MAYUS") {
          mayus = !mayus;
          renderKeyboard();
        } else if (key.textContent === "") {
          current.value += " ";
        } else {
          current.value += key.textContent.trim();
          if (shift) {
            shift = false;
          }
        }
        renderKeyboard();
        current.focus();
      }
    });
  });
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focusin", (e) => {
    current = e.target;
  });
});
