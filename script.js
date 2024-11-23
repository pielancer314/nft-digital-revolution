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

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    try {
        // Here you would typically send this to your backend
        console.log('Newsletter signup:', email);
        emailInput.value = '';
        alert('Thanks for subscribing! We\'ll keep you updated.');
    } catch (error) {
        console.error('Newsletter signup error:', error);
        alert('There was an error. Please try again later.');
    }
});

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsSection = entry.target;
            const nftsMinted = statsSection.querySelector('#nftsMinted');
            const holders = statsSection.querySelector('#holders');
            
            if (nftsMinted) animateValue(nftsMinted, 0, 247, 2000);
            if (holders) animateValue(holders, 0, 180, 2000);
            
            observer.unobserve(statsSection);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

// Preview Grid Interaction
document.querySelectorAll('.preview-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// View More Button
document.querySelector('.view-more-btn')?.addEventListener('click', () => {
    // Implement your view more functionality here
    console.log('View more clicked');
    // For example, you could load more NFTs or redirect to a gallery page
});

// NFT Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.nft-slideshow img');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Countdown Timer
function initCountdown() {
    const timeLeftElement = document.getElementById('timeLeft');
    let timeLeft = 24 * 60 * 60; // 24 hours in seconds

    function updateTimer() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        timeLeftElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

// Mint Interface
function initMintInterface() {
    const mintAmount = document.getElementById('mintAmount');
    const mintTotal = document.getElementById('mintTotal');
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const mintBtn = document.getElementById('mintBtn');
    const mintModal = document.getElementById('mint-modal');
    const successModal = document.getElementById('success-modal');
    const modalMintAmount = document.getElementById('modalMintAmount');
    const modalMintTotal = document.getElementById('modalMintTotal');
    const confirmMint = document.getElementById('confirmMint');
    const closeButtons = document.querySelectorAll('.close-modal');
    const copyTxHash = document.getElementById('copyTxHash');
    const PRICE_PER_NFT = 0.08; // BNB

    function updateTotal() {
        const amount = parseInt(mintAmount.value);
        const total = (amount * PRICE_PER_NFT).toFixed(2);
        mintTotal.textContent = `${total} BNB`;
        if (modalMintTotal) {
            modalMintAmount.textContent = amount;
            modalMintTotal.textContent = `${total} BNB`;
        }
    }

    decrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(mintAmount.value);
        if (currentValue > 1) {
            mintAmount.value = currentValue - 1;
            updateTotal();
        }
    });

    incrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(mintAmount.value);
        if (currentValue < 10) {
            mintAmount.value = currentValue + 1;
            updateTotal();
        }
    });

    mintAmount.addEventListener('change', () => {
        let value = parseInt(mintAmount.value);
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        mintAmount.value = value;
        updateTotal();
    });

    mintBtn.addEventListener('click', () => {
        mintModal.style.display = 'block';
        updateTotal();
    });

    confirmMint.addEventListener('click', async () => {
        mintModal.style.display = 'none';
        try {
            // Here you would typically call your smart contract
            const txHash = '0x1234...'; // This would be the actual transaction hash
            document.getElementById('txHash').textContent = txHash;
            document.getElementById('viewOnExplorer').href = `https://opbnbscan.com/tx/${txHash}`;
            successModal.style.display = 'block';
        } catch (error) {
            console.error('Minting error:', error);
            alert('There was an error minting your NFT. Please try again.');
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            mintModal.style.display = 'none';
            successModal.style.display = 'none';
        });
    });

    copyTxHash.addEventListener('click', () => {
        const txHash = document.getElementById('txHash').textContent;
        navigator.clipboard.writeText(txHash).then(() => {
            copyTxHash.innerHTML = '<i class="fas fa-check"></i> Copied';
            setTimeout(() => {
                copyTxHash.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === mintModal) mintModal.style.display = 'none';
        if (e.target === successModal) successModal.style.display = 'none';
    });
}

// FAQ Functionality
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.toggle-icon');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.toggle-icon').textContent = '+';
                }
            });

            // Toggle current FAQ item
            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            } else {
                answer.style.maxHeight = null;
                icon.textContent = '+';
            }
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            try {
                // Here you would typically send this to your backend
                console.log('Newsletter signup:', email);
                emailInput.value = '';
                alert('Thanks for subscribing! We\'ll keep you updated.');
            } catch (error) {
                console.error('Newsletter signup error:', error);
                alert('There was an error. Please try again later.');
            }
        });
    }
}

// Stats Animation
function initStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsSection = entry.target;
                const numbers = statsSection.querySelectorAll('.stat-number');
                
                numbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-target'));
                    if (target) {
                        animateValue(number, 0, target, 2000);
                    }
                });
                
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initCountdown();
    initMintInterface();
    initFAQ();
    initNewsletterForm();
    initStatsAnimation();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});
