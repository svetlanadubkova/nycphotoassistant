document.addEventListener('DOMContentLoaded', function() {
    // Testimonials animation
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    // Create and insert testimonial counter
    const counterDiv = document.createElement('div');
    counterDiv.classList.add('testimonial-counter');
    document.querySelector('.testimonials-container').appendChild(counterDiv);
    updateCounter();

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('testimonial-dots');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    document.querySelector('.testimonials-container').appendChild(dotsContainer);

    function updateCounter() {
        counterDiv.textContent = `${currentTestimonial + 1}/${testimonials.length}`;
    }

    function updateDots() {
        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    function setupTestimonials() {
        // Initial setup
        testimonials[0].classList.add('visible');
        testimonials[1].classList.add('next');
        testimonials[testimonials.length - 1].classList.add('previous');
        updateDots();
    }

    function showTestimonial(index) {
        // Remove all classes
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('visible', 'previous', 'next');
            testimonial.classList.add('transitioning');
        });

        // Calculate previous and next indices
        const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (index + 1) % testimonials.length;

        // Add appropriate classes
        testimonials[prevIndex].classList.add('previous');
        testimonials[index].classList.add('visible');
        testimonials[nextIndex].classList.add('next');

        // Update current index and counter
        currentTestimonial = index;
        updateCounter();
        updateDots();

        // Remove transitioning class after animation completes
        setTimeout(() => {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('transitioning');
            });
        }, 1200);
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }

    // Create and add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.classList.add('testimonial-nav', 'prev');
    prevButton.innerHTML = '←';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.classList.add('testimonial-nav', 'next');
    nextButton.innerHTML = '→';
    nextButton.setAttribute('aria-label', 'Next testimonial');

    document.querySelector('.testimonials-container').appendChild(prevButton);
    document.querySelector('.testimonials-container').appendChild(nextButton);

    // Add click handlers for navigation
    prevButton.addEventListener('click', prevTestimonial);
    nextButton.addEventListener('click', nextTestimonial);

    // Add arrow key navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextTestimonial();
        } else if (e.key === 'ArrowLeft') {
            prevTestimonial();
        }
    });

    // Initialize testimonials
    setupTestimonials();

    // Auto-rotate testimonials every 7 seconds
    let autoRotate = setInterval(nextTestimonial, 7000);

    // Pause rotation when hovering over testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextTestimonial, 7000);
    });

    // Video background fallback
    const video = document.getElementById('bg-video');
    if (video) {
        video.addEventListener('error', function() {
            video.style.display = 'none';
            document.querySelector('.background-container').style.backgroundColor = 'var(--secondary-color)';
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});