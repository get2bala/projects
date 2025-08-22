document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Load project data and populate the grid
    loadProjects();

    // --- Potential Future Implementation (Requires Screenshot Service) ---
    // This function would need to be called after projects are loaded
    // if you want to dynamically generate screenshots based on projectUrl
    // loadScreenshots();
});

/**
 * Fetches project data from projects.json and populates the grid.
 */
async function loadProjects() {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) {
        console.error("Project grid container not found!");
        return;
    }

    try {
        const response = await fetch('projects.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();

        // Clear the loading indicator
        projectGrid.innerHTML = '';

        // Create and append project cards
        projects.forEach(project => {
            const card = createProjectCard(project);
            projectGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        projectGrid.innerHTML = '<p class="text-red-500 col-span-full text-center">Failed to load projects.</p>'; // Error message
    }
}

/**
 * Creates an HTML element for a single project card.
 * @param {object} project - The project data object.
 * @returns {HTMLElement} - The project card element.
 */
function createProjectCard(project) {
    // Create the main card container
    const card = document.createElement('div');
    // Apply Tailwind classes and custom class for transitions/hover
    card.className = 'project-card bg-white rounded-2xl shadow-md overflow-hidden flex flex-col';

    // Create and append an SVG icon instead of an image
    const iconDiv = document.createElement('div');
    iconDiv.className = 'project-icon flex items-center justify-center h-44 w-full bg-gradient-to-br from-blue-50 to-gray-100';
    iconDiv.innerHTML = getProjectSVG(project.id);
    card.appendChild(iconDiv);
/**
 * Returns an SVG string based on the project id.
 * @param {string} id - The project id.
 * @returns {string} - SVG markup.
 */
function getProjectSVG(id) {
    switch (id) {
        case 'studysmarter':
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#6366F1"/><path d="M20 44V20h24v24H20zm2-2h20V22H22v20zm4-8h12v2H26v-2zm0-6h12v2H26v-2z" fill="#fff"/></svg>`;
        case 'aitextviews':
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#10B981"/><rect x="20" y="20" width="24" height="6" rx="2" fill="#fff"/><rect x="20" y="30" width="24" height="6" rx="2" fill="#fff"/><rect x="20" y="40" width="16" height="6" rx="2" fill="#fff"/></svg>`;
        case 'techlearning':
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#EC4899"/><circle cx="32" cy="32" r="12" fill="#fff"/><path d="M32 20v24M20 32h24" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/></svg>`;
        case 'cricket':
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#F59E42"/><circle cx="32" cy="32" r="12" fill="#fff"/><path d="M40 24L24 40" stroke="#F59E42" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="32" r="4" fill="#F59E42"/></svg>`;
        case 'ailearning':
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#6366F1"/><path d="M32 20a12 12 0 100 24 12 12 0 000-24zm0 2a10 10 0 110 20 10 10 0 010-20zm-2 6h4v8h-4v-8zm0 10h4v2h-4v-2z" fill="#fff"/></svg>`;
        default:
            return `<svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#CBD5E1"/><text x="32" y="38" text-anchor="middle" fill="#64748B" font-size="18">?</text></svg>`;
    }
}

    // Create the content container div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-6 flex flex-col flex-grow'; // Use flex to manage spacing

    // Create and append the title
    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold text-gray-900 mb-2';
    title.textContent = project.title;
    contentDiv.appendChild(title);

    // Create and append the description (inside a container for flex-grow)
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'project-description-container mb-4'; // flex-grow applied via parent
    const description = document.createElement('p');
    description.className = 'text-gray-700 text-sm line-clamp-3'; // line-clamp limits text lines
    description.textContent = project.description;
    descriptionContainer.appendChild(description);
    contentDiv.appendChild(descriptionContainer);


    // Create and append the link/button
    const link = document.createElement('a');
    link.href = project.projectUrl;
    link.target = '_blank'; // Open in new tab
    link.rel = 'noopener noreferrer'; // Security best practice
    // Combine base button classes with project-specific color classes
    link.className = `project-link mt-auto inline-block text-center text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 hover:bg-gray-900`;
    link.textContent = project.buttonText;
    contentDiv.appendChild(link);

    // Append the content container to the card
    card.appendChild(contentDiv);

    return card;
}


// --- Potential Future Implementation (Requires Screenshot Service) ---
// function loadScreenshots() {
//     const projectCards = document.querySelectorAll('.project-card');
//     projectCards.forEach(card => {
//         const linkElement = card.querySelector('a[target="_blank"]');
//         const imageElement = card.querySelector('.project-image');
//         // We might need to store the original project URL on the card element
//         // if we fetch data dynamically, e.g., card.dataset.projectUrl = project.projectUrl;
//         const targetUrl = linkElement.href; // Or card.dataset.projectUrl

//         if (linkElement && imageElement && targetUrl && targetUrl !== '#') {
//             // Construct the URL for your chosen screenshot service API
//             const screenshotApiUrl = `https://your-screenshot-service.com/api?url=${encodeURIComponent(targetUrl)}&key=YOUR_API_KEY&width=600&height=360`; // Example

//             // Set the image source
//             // Add error handling as needed
//             imageElement.src = screenshotApiUrl;
//             // Alt text might already be set from JSON, or update it here
//             // imageElement.alt = `${project.title} Screenshot`;
//         }
//     });
// }
