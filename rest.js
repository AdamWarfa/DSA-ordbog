const endpoint = "http://localhost:8080/ordbogen/";

async function getSizes() {
  const json = await fetch(endpoint).then((response) => response.json());
  return json;
}

async function getEntryAt(index) {
  const entry = await fetch(`${endpoint}${index}`).then((resp) => resp.json());
  return entry;
}

export { getSizes, getEntryAt };
