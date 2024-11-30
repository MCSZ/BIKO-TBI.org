document.addEventListener("DOMContentLoaded", async () => {
  // Load biko graph
  const response = await fetch("biko-data_112824.json");
  const graphData = await response.json();

  // Initialize Cytoscape
  const cy = cytoscape({
    container: document.getElementById("cy"),
    elements: graphData,
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#0074D9",
          label: "data(label)"
        }
      },
      {
        selector: "edge",
        style: {
          "line-color": "#FF4136",
          "target-arrow-color": "#FF4136",
          "target-arrow-shape": "triangle",
          label: "data(label)"
        }
      }
    ],
    layout: {
      name: "cose"
    }
  });

  // Populate metadata
  const tableBody = document.getElementById("metadata-table").querySelector("tbody");

  graphData.nodes.forEach(node => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${node.data.id}</td>
      <td>${node.data.label}</td>
      <td>Author Placeholder</td>
      <td>Year Placeholder</td>
    `;
    tableBody.appendChild(row);
  });
});
