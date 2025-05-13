document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Smart Home Dashboard',
            description: 'A modern IoT dashboard with real-time updates and intuitive controls for managing smart home devices.',
            image: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?auto=format&fit=crop&q=95&w=1600&h=900&ixlib=rb-4.0.3',
            category: 'web',
            tag: 'Featured'
        },
        {
            title: 'AI Content Generator',
            description: 'An advanced content generation platform powered by GPT-3, featuring custom training capabilities.',
            image: 'https://techbriefly.com/wp-content/uploads/2023/06/Best-AI-3D-model-generators_02.jpg',
            category: 'ai',
            tag: 'AI/ML'
        },
        {
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce solution with real-time inventory management and analytics.',
            image: 'https://images.unsplash.com/photo-1511317559916-56d5ddb62563?auto=format&fit=crop&q=95&w=1600&h=900&ixlib=rb-4.0.3',
            category: 'web',
            tag: 'E-commerce'
        },
        // Add more projects as needed
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function createProjectCard(project) {
        return `
            <article class="project-card" data-category="${project.category}">
                <div class="project-media">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async">
                </div>
                <div class="project-content">
                    <span class="project-tag">${project.tag}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="project-details.html" class="project-link">
                        Explore Project
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </article>
        `;
    }

    function filterProjects(category) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Initialize projects
    projectsGrid.innerHTML = projects.map(createProjectCard).join('');

    // Filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.dataset.filter);
        });
    });
});
