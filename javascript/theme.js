document.addEventListener('DOMContentLoaded', function () {
    // --- DATA ---
    const themesData = {
        portfolio: {
            basic: {
                price: '$50',
                themes: [
                    { name: 'Dark-Mode-Brutalist', url: 'https://klsmolay.github.io/Dark-Mode-Brutalist-design-portfolio/' },
                    { name: 'Cyber-Grid-Neon', url: 'https://klsmolay.github.io/Cyber-Grid-Neon-design-portfolio/' },
                    { name: 'Blueprint-Sketchbook', url: 'https://klsmolay.github.io/he-Blueprint-Sketchbook-design-portfolio/' },
                    { name: 'Minimalist-Asymmetric', url: 'https://klsmolay.github.io/Minimalist-Asymmetric-design-portfolio/' },
                    { name: 'Kyoto-Zen-Garden', url: 'https://klsmolay.github.io/Kyoto-Zen-Garden-design-portfolio/' },
                    { name: 'Luxury-Editorial', url: 'https://klsmolay.github.io/L-Avenir-Luxury-Editorial-design-portfolio/' }
                ]
            },
            premium: {
                price: '$150',
                themes: [
                    { name: 'Hipper Mona', url: 'https://klsmolay.github.io/HipperMona/' },
                    { name: 'WorkLoad', url: 'https://klsmolay.github.io/WorkLoad/' },
                    { name: 'Next-Gen', url: 'https://klsmolay.github.io/Next-Gen/' },
                    { name: 'Magnetic-pull', url: 'https://klsmolay.github.io/Magnetic-pull/' }
                ]
            }
        },
        cafe: [
            { name: 'Soul', url: 'https://klsmolay.github.io/menu-design/' },
        ],
        ecommerce: [
        ]
    };
    // --- THEME SELECTION LOGIC ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const themesDisplayContainer = document.getElementById('themes-display');
    const portfolioViewer = document.getElementById('portfolio-viewer');
    function renderThemes(category, activeButton) {
        const categoryData = themesData[category];
        themesDisplayContainer.classList.remove('visible');
        setTimeout(() => {
            themesDisplayContainer.innerHTML = ''; // Clear previous content
            // Check if the category is portfolio to render tiers
            if (category === 'portfolio') {
                Object.entries(categoryData).forEach(([tierName, tierData]) => {
                    const tierSection = document.createElement('div');
                    tierSection.className = 'tier-section';
                    const tierTitle = document.createElement('h3');
                    tierTitle.className = 'tier-title';
                    tierTitle.innerHTML = `${tierName.charAt(0).toUpperCase() + tierName.slice(1)} Designs <span class="tier-price">${tierData.price}</span>`;
                    tierSection.appendChild(tierTitle);
                    
                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.className = 'tier-buttons-container';
                    tierData.themes.forEach(theme => {
                        const button = document.createElement('button');
                        button.className = 'theme-btn';
                        button.textContent = theme.name;
                        button.dataset.src = theme.url;
                        buttonsContainer.appendChild(button);
                    });
                    tierSection.appendChild(buttonsContainer);
                    themesDisplayContainer.appendChild(tierSection);
                });
            } else { // Render other categories directly
                if (!categoryData || categoryData.length === 0) {
                    themesDisplayContainer.innerHTML = `<p class="text-gray-400">No themes available for this category yet.</p>`;
                    portfolioViewer.src = 'about:blank';
                } else {
                    categoryData.forEach(theme => {
                        const button = document.createElement('button');
                        button.className = 'theme-btn';
                        button.textContent = theme.name;
                        button.dataset.src = theme.url;
                        themesDisplayContainer.appendChild(button);
                    });
                }
            }
            addThemeButtonListeners();
            const firstThemeButton = themesDisplayContainer.querySelector('.theme-btn');
            if (firstThemeButton) {
                firstThemeButton.classList.add('active');
                portfolioViewer.src = firstThemeButton.dataset.src;
            }
            
            const containerRect = themesDisplayContainer.parentElement.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            const indicatorLeft = buttonRect.left - containerRect.left + (buttonRect.width / 2);
            themesDisplayContainer.style.setProperty('--indicator-pos', `${indicatorLeft}px`);
            themesDisplayContainer.classList.add('visible');
        }, 300);
    }
    function addThemeButtonListeners() {
        const themeButtons = themesDisplayContainer.querySelectorAll('.theme-btn');
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                themeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const newSrc = button.dataset.src;
                if (newSrc) {
                    portfolioViewer.src = newSrc;
                }
                portfolioViewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            renderThemes(category, this);
        });
    });
    const initialActiveButton = document.querySelector('.category-btn.active');
    if(initialActiveButton) {
        setTimeout(() => {
            renderThemes('portfolio', initialActiveButton);
        }, 100);
    }
    // --- MODAL LOGIC (MERGED FROM YOUR SCRIPT) ---
    // const shareableLink = "https://brotech-studio299.github.io/BroTech_Studio/";
    const shareableLink = "https://brotechstudio.qzz.io/";
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const shareModal = document.getElementById('shareModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const copyButtonText = document.getElementById('copyButtonText');
    const shareToAppButton = document.getElementById('shareToAppButton');
    const shareToAppSection = document.getElementById('shareToAppSection');
    const divider = document.getElementById('divider');
    const linkInput = document.getElementById('linkInput');
    if (!openModalButton || !closeModalButton || !shareModal || !linkInput) {
        console.error("Modal elements could not be found. Check your HTML IDs.");
        return;
    }
    linkInput.value = shareableLink;
    const openModal = () => {
        shareModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            modalOverlay.classList.add('modal-overlay-enter-active');
            shareModal.querySelector('.modal-card-enter').classList.add('modal-card-enter-active');
        });
    };
    
    const closeModal = () => {
        document.body.style.overflow = '';
        modalOverlay.classList.remove('modal-overlay-enter-active');
        shareModal.querySelector('.modal-card-enter').classList.remove('modal-card-enter-active');
        setTimeout(() => shareModal.classList.add('hidden'), 200);
    };
    openModalButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    copyLinkButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            copyButtonText.textContent = 'Copied!';
            setTimeout(() => { copyButtonText.textContent = 'Copy'; }, 2000);
        } catch (err) {
            console.error('Failed to copy link: ', err);
            copyButtonText.textContent = 'Error!';
        }
    });
    if (navigator.share) {
        shareToAppSection.classList.remove('hidden');
        divider.classList.remove('hidden');
        shareToAppButton.addEventListener('click', async () => {
            const shareData = {
                title: 'Check out BroTech!',
                text: `I thought you might like this service. Check it out here: ${shareableLink}`,
                url: shareableLink
            };
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Share failed:', err);
            }
        });
    }
});

