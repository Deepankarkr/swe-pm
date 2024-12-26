document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('markdown-content');
    const navigation = document.getElementById('navigation');

    // Fetch the markdown file
    const response = await fetch('summary.md');
    const markdownContent = await response.text();

    // Convert Markdown to HTML
    contentDiv.innerHTML = marked.parse(markdownContent);

    // Create navigation links
    const headers = contentDiv.querySelectorAll('h2, h3');
    headers.forEach(header => {
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        navigation.appendChild(listItem);

        // Add IDs to headers
        header.id = header.textContent.replace(/\s+/g, '-').toLowerCase();
    });
});
