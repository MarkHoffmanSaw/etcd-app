import { components, stands } from "./constants";

const mainDiv = document.getElementById("main_div");

async function fetchDataAndRenderDoc() {
  const data = await fetch("http://127.0.0.1:5000/api/data", {
    method: "GET",
  });

  const result = await data.json();

  // Render table
  for (let i = 0; i < components.length; i++) {
    // Create inline parent div
    const componentsDiv = document.createElement("div");
    if (i === 0) {
      componentsDiv.setAttribute("id", "stands");
    } else {
      componentsDiv.setAttribute("id", components[i]);
    }
    componentsDiv.setAttribute("class", "inline");

    // Populate inline parent div
    const oneCompDiv = document.createElement("div");
    const textComponent = document.createTextNode(components[i]);
    oneCompDiv.setAttribute("id", `${components[i]}-title`);
    oneCompDiv.appendChild(textComponent);
    oneCompDiv.setAttribute("class", "component");

    componentsDiv.append(oneCompDiv);

    // Populate columns div
    for (let j = 0; j < stands.length; j++) {
      const cellDiv = document.createElement("div");

      cellDiv.setAttribute("class", "cell");

      const keyName = `environments.${stands[j]}.${components[i]}.image`;
      const valueToParse = await result.data[keyName];

      if (i === 0) {
        const text = document.createTextNode(stands[j]);
        cellDiv.appendChild(text);
        cellDiv.setAttribute("id", stands[j]);
        cellDiv.classList.add("stands");
        componentsDiv.append(cellDiv);
      } else {
        const text = document.createTextNode(
          // Pass into cell here whether 'valueToParse' exists!
          valueToParse && JSON.parse(valueToParse).tag
        );
        cellDiv.appendChild(text);
        cellDiv.dataset.coords = `${components[i]}-${stands[j]}`;
        componentsDiv.append(cellDiv);
      }
    }

    mainDiv.append(componentsDiv);
  }
}

fetchDataAndRenderDoc();

// Color the current element
async function colorElements() {
  const mainDiv = document.querySelector("#main_div");

  const factoryListener = (event) => {
    // Get cell coords by event listener
    if (event.target.dataset.coords) {
      const compId = event.target.dataset.coords.split("-")[0];
      const standId = event.target.dataset.coords.split("-")[1];

      const component = document.getElementById(`${compId}-title`);
      const stand = document.getElementById(standId);

      component.classList.toggle("crosshair");
      stand.classList.toggle("crosshair");
    }
  };

  mainDiv.addEventListener("mouseover", (event) => {
    factoryListener(event);
  });

  mainDiv.addEventListener("mouseout", (event) => {
    factoryListener(event);
  });
}

colorElements();
