import { getEntryAt, getSizes } from "./rest.js";

window.addEventListener("load", start);

let count = 0;
let startTime;
let endTime;

async function start() {
  document.querySelector("form").addEventListener("submit", getInput);
}

async function binarySearch(searchTerm) {
  const minmax = await getSizes();

  let min = minmax.min;
  let max = minmax.max;

  console.log(minmax);
  console.log(min);
  console.log(max);

  while (min <= max) {
    count++;

    let middle = Math.floor((max + min) / 2);
    const entry = await getEntryAt(middle);

    const comp = searchTerm.localeCompare(entry.inflected);

    if (comp === 0) {
      console.log("count: " + count);
      return entry;
    } else if (comp > 0) {
      min = middle + 1;
      console.log("min: " + min, "max: " + max, entry.inflected);
    } else if (comp < 0) {
      max = middle - 1;
      console.log("min: " + min, "max: " + max, entry.inflected);
    }
  }
  console.log("count: " + count);
  return -1;
}

function compare(x, y) {
  return x - y;
}

function stringCompare(a, b) {
  return a.localeCompare(b);
}

function nameCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function getInput(e) {
  e.preventDefault();
  const form = e.target;

  const input = form.input.value;

  console.log(input);

  displayEntry(input);

  startTime = performance.now();
}

async function displayEntry(input) {
  const entry = await binarySearch(input);
  console.log(entry);

  document.querySelector("#output").innerHTML = "";

  endTime = performance.now();

  if (entry === -1) {
    document.querySelector("#output").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
    
    <p>Ordet findes ikke i den danske ordbog</p>
    <p>Server requests: ${count}</p>
    <p>Tid: ${(endTime - startTime).toFixed(2)} ms</p>
    
    `
    );
  } else {
    document.querySelector("#output").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
    
    <p>Bøjningsform: ${entry.inflected}</p>
    <p>Opslagsord: ${entry.headword}</p>
    <p>Ordklasse: ${entry.partofspeech}</p>
    <p>Id: ${entry.id}</p>
    <p>Server requests: ${count}</p>
    <p>Tid: ${(endTime - startTime).toFixed(2)} ms</p>
    
    `
    );
  }

  count = 0;
}

export { binarySearch, compare, stringCompare, nameCompare };
