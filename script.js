document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('markdown-content');
    const navigation = document.getElementById('navigation');

    // Fetch the markdown file
    const response = await fetch('content.md');
    const markdownContent = await response.text();

    // Convert Markdown to HTML
    contentDiv.innerHTML = marked.parse(markdownContent);

    // Create navigation links
    const headers = contentDiv.querySelectorAll('h2, h3');
    let currentList = navigation;
    let parentItem = null; // Track the current parent (main header)

    headers.forEach(header => {
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;

        const listItem = document.createElement('li');
        listItem.appendChild(link);

        if (header.tagName === 'H2') {
            // Add new chapter header
            navigation.appendChild(listItem);
            const lineBreak = document.createElement('hr');
            header.insertAdjacentElement('beforebegin', lineBreak);
            parentItem = listItem; // Update parent to the current header
        } else if (header.tagName === 'H3' && parentItem) {
            // Add subheading under the current chapter
            let sublist = parentItem.querySelector('ul');
            if (!sublist) {
                sublist = document.createElement('ul');
                parentItem.appendChild(sublist);
            }
            sublist.appendChild(listItem);
        }

        // Add IDs to headers for navigation
        header.id = header.textContent.replace(/\s+/g, '-').toLowerCase();
    });
});
