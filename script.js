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
    card.className = 'project-card bg-white rounded-xl shadow-md overflow-hidden flex flex-col';

    // Create and append the image
    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.altText;
    img.className = 'project-image'; // Apply CSS class for styling
    // Fallback image using onerror
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails
        this.src = 'https://placehold.co/600x360/cccccc/ffffff?text=Image+Not+Found';
        this.alt = 'Image Not Found';
    };
    card.appendChild(img);

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
    link.className = `project-link mt-auto inline-block text-center text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${project.buttonClasses}`;
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
