// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(107, 70, 193, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(107, 70, 193, 0.95)';
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.feature, .feature-card, .timeline-item');

const reveal = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', reveal);
reveal(); // Initial check on page load

// NFT Showcase functionality
let currentNFTIndex = 0;

const nftImage = document.getElementById('currentNFT');
const nftName = document.getElementById('nftName');
const nftDescription = document.getElementById('nftDescription');
const currentIndexSpan = document.getElementById('currentIndex');
const totalNFTsSpan = document.getElementById('totalNFTs');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Update NFT display
function updateNFTDisplay() {
    if (!window.nftData || window.nftData.length === 0) return;
    
    const currentNFT = window.nftData[currentNFTIndex];
    
    // Add fade out effect
    nftImage.style.opacity = '0';
    nftName.style.opacity = '0';
    nftDescription.style.opacity = '0';
    
    setTimeout(() => {
        nftImage.src = currentNFT.image;
        nftName.textContent = currentNFT.name;
        nftDescription.textContent = currentNFT.description;
        currentIndexSpan.textContent = currentNFTIndex + 1;
        totalNFTsSpan.textContent = window.nftData.length;
        
        // Update exploration link
        const exploreLink = document.getElementById('exploreLink');
        if (exploreLink) {
            exploreLink.href = `https://opbnbscan.com/token/${currentNFT.id}`;
        }
        
        // Add fade in effect
        nftImage.style.opacity = '1';
        nftName.style.opacity = '1';
        nftDescription.style.opacity = '1';
    }, 300);

    // Update button states
    prevBtn.disabled = currentNFTIndex === 0;
    nextBtn.disabled = currentNFTIndex === window.nftData.length - 1;
}

// Event listeners for navigation
prevBtn.addEventListener('click', () => {
    if (currentNFTIndex > 0) {
        currentNFTIndex--;
        updateNFTDisplay();
    }
});

nextBtn.addEventListener('click', () => {
    if (window.nftData && currentNFTIndex < window.nftData.length - 1) {
        currentNFTIndex++;
        updateNFTDisplay();
    }
});

// Handle minting functionality
const mintButton = document.getElementById('mintButton');
if (mintButton) {
    mintButton.addEventListener('click', async () => {
        if (!window.nftData || !window.nftData[currentNFTIndex]) return;
        
        mintButton.disabled = true;
        mintButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Minting...';
        
        try {
            // Add your minting logic here
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
            alert('NFT minting feature coming soon!');
        } catch (error) {
            console.error('Minting error:', error);
            alert('Error minting NFT. Please try again.');
        } finally {
            mintButton.disabled = false;
            mintButton.innerHTML = '<i class="fas fa-coins"></i> Mint NFT';
        }
    });
}

// Initialize NFT display
updateNFTDisplay();
