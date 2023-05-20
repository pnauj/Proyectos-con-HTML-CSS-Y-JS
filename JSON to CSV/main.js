const jsonform = document.querySelector("#jsonform");
const csvForm = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

bConvert.addEventListener("click", (e) => {
  convertJSONtoCSV();
});

function convertJSONtoCSV() {
  let json;
  let keys = [];
  let values = [];
  try {
    json = JSON.parse(jsonform.value);
  } catch (error) {
    console.log("Formato incorrecto JSON", error);
    alert("Formato incorrecto JSON");
  }

  if (Array.isArray(json)) {
    json.forEach((item) => {
      const nKeys = Object.keys(item);

      if (keys.length === 0) {
        keys = [...nKeys];
      } else {
        if (nKeys.length != keys.length) {
          throw new Error("Number of keys are different");
        } else {
          console.log("OK", nKeys);
        }
      }

      const row = keys.map((k) => {
        return item[k];
      });

      values.push([...row]);
    });
    console.log(keys, values);
    values.unshift(keys);
    const text = values.map((v) => v.join(",")).join("\n");
    csvForm.value = text;

  } else {
    alert("no es un arreglo de objetos");
  }
}
