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

function renderKeyboard() {
  const keyboardContainer = document.querySelector("#keyboardContainer");
  let empty = `
        <div class="keyEmpty"></div>
    `;

  const layers = keys.map((layers) => {
    return layers.map((key) => {
      if (key[0] === "SHIFT") {
        return `
          <button class='key keyShift'>${key[0]}</button>
        `;
      }
      if (key[0] == "MAYUS") {
        return `<button class=' key keyMayus'>${key[0]}</button>`;
      }
      if (key[0] == "SPACE") {
        return `<button class=' key keySpace'></button>`;
      }

      return `
        <button class='key keyNormal'>
          ${
            shift
              ? key[1]
              : mayus &&
                key[0].toLowerCase.charCodeAt() >= 97 &&
                key[0].toLowerCase.charCodeAt() <= 122
              ? key[1]
              : key[0]
          }
        </button>
      `;
    });
  });
  layers[0].push(empty);
  layers[1].unshift(empty);

  const htmlLayers = layers.map((layers) => {
    return layers.join("");
  });

  keyboardContainer.innerHTML = '';

  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class='layer'>${layer}</div>`
  })
}
