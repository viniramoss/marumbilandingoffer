// Animações e interatividade da landing page

document.addEventListener('DOMContentLoaded', function() {
    
    // Função para animar elementos quando entram na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.address-card, .section-title');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }
    
    // Efeito de parallax suave nos elementos flutuantes
    function parallaxEffect() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
    
    // Funcionalidade dos botões "Como chegar"
    function setupDirectionsButtons() {
        const directionsButtons = document.querySelectorAll('.directions-btn');
        
        directionsButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const addresses = [
                    'Rua João Crysóstomo da Rosa, 258, Cajuru',
                    'Rua Eunice Bettini Bartoszeck, 1122, Uberaba'
                ];
                
                const address = addresses[index];
                const encodedAddress = encodeURIComponent(address);
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                
                // Animação do botão
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1.05)';
                    window.open(googleMapsUrl, '_blank');
                }, 150);
                
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
    
    // Funcionalidade dos botões WhatsApp
    function setupWhatsAppButtons() {
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
        
        whatsappButtons.forEach((button) => {
            button.addEventListener('click', function() {
                const phoneNumber = this.getAttribute('data-phone');
                const message = encodeURIComponent('Olá! Vi a promoção no Instagram e gostaria de saber mais detalhes.');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Animação do botão
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1.05)';
                    window.open(whatsappUrl, '_blank');
                }, 150);
                
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
    
    // Efeito de typing no título principal
    function typingEffect() {
        const mainTitle = document.querySelector('.main-title');
        const spans = mainTitle.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            const text = span.textContent;
            span.textContent = '';
            span.style.borderRight = index === spans.length - 1 ? 'none' : '2px solid #FFD700';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    span.textContent += text[i];
                    i++;
                    
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                        if (index < spans.length - 1) {
                            span.style.borderRight = 'none';
                        }
                    }
                }, 50);
            }, index * 1000);
        });
    }
    
    // Efeito de partículas no fundo
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
        
        function createParticle(container) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(184, 134, 11, 0.8);
                border-radius: 50%;
                animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
                left: ${Math.random() * 100}%;
                top: 100%;
                box-shadow: 0 0 8px rgba(184, 134, 11, 0.9);
            `;
            
            container.appendChild(particle);
            
            // Remove a partícula após a animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    createParticle(container); // Cria uma nova para manter o número constante
                }
            }, 15000);
        }
        
        // Adiciona CSS para animação de partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Contador animado (pode ser usado para ofertas com tempo limitado)
    function animatedCounter() {
        const ctaTitle = document.querySelector('.cta-title');
        
        // Adiciona um efeito sutil quando hover
        ctaTitle.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        ctaTitle.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }
    
    // Scroll suave para seções (se houver navegação)
    function smoothScroll() {
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
    }
    
    // Lazy loading para melhor performance
    function lazyLoadElements() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('loaded');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => lazyObserver.observe(element));
    }
    
    // Inicializar todas as funcionalidades
    animateOnScroll();
    parallaxEffect();
    setupDirectionsButtons();
    setupWhatsAppButtons();
    animatedCounter();
    smoothScroll();
    lazyLoadElements();
    
    // Partículas desabilitadas para visual mais clean
    // if (window.innerWidth > 768) {
    //     createParticles();
    // }
    
    // Adicionar evento para redimensionamento da tela (partículas desabilitadas)
    // window.addEventListener('resize', function() {
    //     if (window.innerWidth > 768 && !document.querySelector('.particles-container')) {
    //         createParticles();
    //     }
    //     else if (window.innerWidth <= 768) {
    //         const particlesContainer = document.querySelector('.particles-container');
    //         if (particlesContainer) {
    //             particlesContainer.remove();
    //         }
    //     }
    // });
    
    // Easter egg: clique triplo no título para efeito especial
    let clickCount = 0;
    const ctaTitle = document.querySelector('.cta-title');
    ctaTitle.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 3) {
            // Efeito especial de confete
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'hue-rotate(360deg)';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.filter = 'none';
            }, 1000);
            
            clickCount = 0;
        }
        
        // Reset counter após 2 segundos
        setTimeout(() => {
            if (clickCount > 0) clickCount = 0;
        }, 2000);
    });
});

// Preloader simples
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 