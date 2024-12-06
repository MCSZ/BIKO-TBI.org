document.addEventListener('DOMContentLoaded', () => {
    const paperList = document.getElementById('paper-list');
    const resultList = document.getElementById('result-list');
    const queryForm = document.getElementById('query-form');

    // Load papers from JSON
    fetch('papers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(paper => {
                const li = document.createElement('li');
                li.textContent = paper.metadata['http://www.w3.org/2000/01/rdf-schema#label'] || paper.uri;
                li.onclick = () => displayMetadata(paper);
                paperList.appendChild(li);
            });
        });

    // Display metadata paper
    const displayMetadata = (paper) => {
        resultList.innerHTML = `
            <h3>Metadata for Selected Paper</h3>
            <ul>
                <li><strong>URI:</strong> ${paper.uri}</li>
                ${Object.entries(paper.metadata)
                    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
                    .join('')}
            </ul>
        `;
    };

    // Handle query form submission
    queryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const property = document.getElementById('property').value.toLowerCase();

        // Fetch and filter papers based on the queried property
        fetch('papers.json')
            .then(response => response.json())
            .then(data => {
                const filtered = data.filter(paper => {
                    return Object.keys(paper.metadata).some(key =>
                        key.toLowerCase().includes(property)
                    );
                });

                // Display results
                resultList.innerHTML = `
                    <h3>Search Results</h3>
                    <ul>
                        ${filtered
                            .map(
                                paper =>
                                    `<li>${paper.metadata['http://www.w3.org/2000/01/rdf-schema#label'] || paper.uri}</li>`
                            )
                            .join('')}
                    </ul>
                `;
            });
    });
});
