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

    headers.forEach(header => {
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;

        const listItem = document.createElement('li');
        listItem.appendChild(link);

        if (header.tagName === 'H2') {
            // Add a line break after H2 headers
            const lineBreak = document.createElement('br');
            header.insertAdjacentElement('afterend', lineBreak);

            currentList = navigation; // Reset to top-level list for H2
            currentList.appendChild(listItem);
        } else if (header.tagName === 'H3') {
            // Find or create a sublist for H3
            let sublist = currentList.querySelector('ul:last-child');
            if (!sublist) {
                sublist = document.createElement('ul');
                currentList.lastChild?.appendChild(sublist);
            }
            sublist.appendChild(listItem);
        }

        // Add IDs to headers for navigation
        header.id = header.textContent.replace(/\s+/g, '-').toLowerCase();
    });
});
