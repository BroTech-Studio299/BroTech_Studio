document.addEventListener('DOMContentLoaded', () => {

    // --- All review data is now stored in this array ---
    const reviewsData = [
        {
            name: "Priya Varma", country: "India", flagCode: "in", avatarText: "PV", theme: "Minimalist-Asymmetric (Basic)",
            reviewText: "The student discount is genuine and very helpful. I got the Minimalist theme for 60% off and 10% extra discount wow."
        },
        {
            name: "Ananya ", country: "India", flagCode: "in", avatarText: "A", theme: "Custom Design",
            reviewText: "The custom design service was the right choice. The team understood my idea perfectly during our Instagram chats, then i got a appointment from them then we discuess and how i want my portfolio to be."
        },
        {
            name: "Rohan Kumar", country: "India", flagCode: "in", avatarText: "RK", theme: "Next-Gen (Premium)",
            reviewText: "After getting a job, I knew I had to upgrade my old college portfolio. The Next Gen theme is perfect for showcasing my professional projects in detail. It looks very polished and was worth the investment for my career growth. also i was able to add and remove some part which i like and don't worth the money."
        },
        {
            name: "Arjit ", country: "India", flagCode: "in", avatarText: "A", theme: "Custom Design",
            reviewText: "The chat bot feel like i am talking to real persone it self it help me to understand the custome theme details."
        },
    ];

    const reviewsGrid = document.querySelector('.reviews-grid');

    // --- Function to create and render all reviews from the data array ---
    function renderAllReviews() {
        if (!reviewsGrid) return;
        reviewsData.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="https://placehold.co/60x60/1F2937/9CA3AF?text=${review.avatarText}" alt="User Avatar" class="avatar">
                    <div class="user-info">
                        <h3 class="user-name">${review.name} <img src="https://flagcdn.com/w20/${review.flagCode}.png" alt="${review.country} flag" class="country-flag"></h3>
                        <span class="theme-tag">${review.theme}</span>
                    </div>
                </div>
                <p class="review-text">${review.reviewText}</p>
            `;
            reviewsGrid.appendChild(card);
        });
    }

    // --- Render all reviews first ---
    renderAllReviews();

    // --- Then, set up pagination on the dynamically created reviews ---
    const reviewsPerPage = 6;
    const allReviews = document.querySelectorAll('.review-card');
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    let currentPage = 1;

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageIndicator = document.getElementById('page-indicator');

    function showPage(page) {
        const startIndex = (page - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;

        allReviews.forEach((review, index) => {
            review.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        if (pageIndicator) {
            pageIndicator.textContent = `Page ${page} of ${totalPages}`;
        }
        
        if (prevButton) {
            prevButton.disabled = page === 1;
        }
        if (nextButton) {
            nextButton.disabled = page === totalPages;
        }
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
    }

    // --- Initial Load ---
    showPage(currentPage);
});
