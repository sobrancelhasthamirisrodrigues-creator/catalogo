// Text Animation Effects 2026 Style
class TextAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.animateBrandName();
        this.animateSubtitle();
        this.animateServices();
        this.addMouseEffect();
        this.addScrollEffect();
    }

    // Animação do nome principal - Efeito de digitação com brilho
    animateBrandName() {
        const brandName = document.querySelector('.brand-name');
        if (!brandName) return;

        const text = brandName.textContent;
        brandName.textContent = '';
        brandName.style.opacity = '1';

        // Efeito de digitação letra por letra
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            span.style.transitionDelay = `${index * 0.1}s`;
            brandName.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });

        // Efeito de brilho pulsante após animação
        setTimeout(() => {
            brandName.classList.add('glow-effect');
        }, text.length * 100 + 500);
    }

    // Animação do subtítulo - Efeito fade-in com deslizamento
    animateSubtitle() {
        const subtitle = document.querySelector('.catalog-subtitle');
        if (!subtitle) return;

        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateX(-50px)';
        subtitle.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateX(0)';
        }, 800);
    }

    // Animação dos serviços - Efeito de revelação
    animateServices() {
        const services = document.querySelector('.services-subtitle');
        if (!services) return;

        services.style.opacity = '0';
        services.style.transform = 'scale(0.8)';
        services.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => {
            services.style.opacity = '0.9';
            services.style.transform = 'scale(1)';
        }, 1200);
    }

    // Efeito de mouse hover interativo - Otimizado para funcionar com spans
    addMouseEffect() {
        const brandName = document.querySelector('.brand-name');
        if (!brandName) return;

        let isHovering = false;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let animationId = null;

        brandName.addEventListener('mouseenter', () => {
            isHovering = true;
            // Aplicar transformação ao container, não aos spans individuais
            brandName.style.transition = 'none';
        });

        brandName.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = brandName.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduzir ainda mais a intensidade
            targetX = ((x - centerX) / centerX) * 1.2; // Reduzido para 1.2
            targetY = (-(y - centerY) / centerY) * 1.2; // Reduzido para 1.2
        });

        brandName.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;
            brandName.style.transition = 'transform 0.4s ease-out';
        });

        // Animation frame otimizado
        function animate() {
            if (isHovering) {
                currentX += (targetX - currentX) * 0.06; // Mais suave
                currentY += (targetY - currentY) * 0.06; // Mais suave
                
                // Usar transform3d para melhor performance
                brandName.style.transform = `
                    perspective(1000px)
                    rotateY(${currentX}deg) 
                    rotateX(${currentY}deg)
                    scale(1.005) // Quase imperceptível
                `;
            } else {
                currentX += (0 - currentX) * 0.15; // Mais rápido para resetar
                currentY += (0 - currentY) * 0.15;
                
                // Reset completo quando próximo de zero
                if (Math.abs(currentX) < 0.005 && Math.abs(currentY) < 0.005) {
                    brandName.style.transform = '';
                    currentX = 0;
                    currentY = 0;
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                        return;
                    }
                } else {
                    brandName.style.transform = `
                        perspective(1000px)
                        rotateY(${currentX}deg) 
                        rotateX(${currentY}deg)
                        scale(1)
                    `;
                }
            }
            
            if (isHovering || Math.abs(currentX) > 0.005 || Math.abs(currentY) > 0.005) {
                animationId = requestAnimationFrame(animate);
            }
        }
        
        // Iniciar animação apenas quando necessário
        brandName.addEventListener('mouseenter', () => {
            if (!animationId) {
                animate();
            }
        });
    }

    // Efeito de parallax no scroll - Corrigido para não conflitar com hover
    addScrollEffect() {
        const header = document.querySelector('.catalog-header');
        const brandName = document.querySelector('.brand-name');
        if (!header) return;

        let isHovering = false;
        
        // Detectar quando o mouse está sobre o nome
        if (brandName) {
            brandName.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            brandName.addEventListener('mouseleave', () => {
                isHovering = false;
            });
        }

        window.addEventListener('scroll', () => {
            if (isHovering) return; // Pular parallax durante hover
            
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            header.style.transform = `translateY(${parallax}px)`;
            header.style.opacity = 1 - scrolled / 500;
        });
    }

    // Efeito de partículas de texto (opcional)
    addParticleEffect() {
        const brandName = document.querySelector('.brand-name');
        if (!brandName) return;

        brandName.addEventListener('mouseenter', () => {
            this.createParticles(brandName);
        });
    }

    createParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'text-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                z-index: 9999;
            `;
            
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 100;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }).onfinish = () => particle.remove();
        }
    }
}

// Efeito de glitch moderno - Desativado durante hover 3D
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.isGlitching = false;
        this.isHovering3D = false;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => {
            if (!this.isGlitching && !this.isHovering3D) {
                this.isGlitching = true;
                setTimeout(() => this.glitch(), 200); // Pequeno delay para não conflitar
            }
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.isGlitching = false;
        });
        
        // Detectar hover 3D (movimento do mouse)
        this.element.addEventListener('mousemove', () => {
            this.isHovering3D = true;
            this.isGlitching = false; // Desativar glitch durante movimento
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.isHovering3D = false;
        });
    }

    glitch() {
        if (!this.isGlitching || this.isHovering3D) return;
        
        const originalText = this.element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
        
        let iterations = 0;
        const maxIterations = 8; // Reduzido ainda mais
        
        const glitchInterval = setInterval(() => {
            if (!this.isGlitching || this.isHovering3D || iterations >= maxIterations) {
                clearInterval(glitchInterval);
                this.element.textContent = originalText;
                return;
            }
            
            let glitchedText = '';
            
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.03) { // Reduzido para 0.03
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            
            this.element.textContent = glitchedText;
            iterations++;
        }, 150); // Aumentado para 150
    }
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const textAnimator = new TextAnimator();
    
    // Adicionar efeito de glitch ao nome
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        new GlitchEffect(brandName);
    }
    
    // Adicionar efeito de glitch aos subtítulos
    const subtitles = document.querySelectorAll('.catalog-subtitle, .services-subtitle');
    subtitles.forEach(subtitle => {
        new GlitchEffect(subtitle);
    });
});

// Função de download do catálogo
function downloadCatalog() {
    // Efeito de loading no botão
    const btn = document.querySelector('.download-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Preparando download...</span><span class="btn-arrow"></span>';
    btn.disabled = true;
    
    // Simular preparação do download
    setTimeout(() => {
        btn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">Download iniciado!</span><span class="btn-arrow"></span>';
        
        // Criar PDF real usando jsPDF
        createAndDownloadPDF();
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }, 2000);
    }, 1500);
}

// Criar PDF real do catálogo apenas com imagens - ORDEM CORRETA
function createAndDownloadPDF() {
    // Verificar se jsPDF está disponível
    if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Lista de imagens na ORDEM EXATA do site
        const images = [
            'Thamiris01.jpg', 'Thamiris02.jpg', 'Thamiris03.jpg',
            'Thamiris04.jpg', 'Thamiris05.jpg', 'Thamiris06.jpg',
            'Thamiris07.jpg', 'Thamiris08.jpg', 'Thamiris09.jpg'
        ];
        
        let currentY = 0; // Sem padding - começa do topo
        let imagesProcessed = 0;
        
        // Função para adicionar imagem ao PDF em sequência
        function addImageSequentially(index) {
            if (index >= images.length) {
                // Todas as imagens foram processadas - salvar PDF
                doc.save('Thamiris_Rodrigues_Catalogo.pdf');
                showDownloadSuccess();
                return;
            }
            
            const imageUrl = images[index];
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = function() {
                // Dimensões máximas para A4 (210x297mm) com margem zero
                const pageWidth = 210;
                const pageHeight = 297;
                const maxWidth = pageWidth;
                const maxHeight = pageHeight;
                
                let width = img.width;
                let height = img.height;
                
                // Calcular proporção para ocupar o máximo possível
                const aspectRatio = width / height;
                
                if (aspectRatio > (maxWidth / maxHeight)) {
                    // Imagem mais larga - usar largura máxima
                    width = maxWidth;
                    height = maxWidth / aspectRatio;
                } else {
                    // Imagem mais alta - usar altura máxima
                    height = maxHeight;
                    width = maxHeight * aspectRatio;
                }
                
                // Verificar se precisa adicionar nova página
                if (currentY + height > pageHeight) {
                    doc.addPage();
                    currentY = 0; // Sem padding na nova página
                }
                
                // Centralizar imagem horizontalmente
                const x = (pageWidth - width) / 2;
                
                // Adicionar imagem ao PDF na ordem correta
                try {
                    doc.addImage(img, 'JPEG', x, currentY, width, height);
                    currentY += height; // Sem espaço extra entre imagens
                    
                    console.log(`Imagem ${index + 1} (${imageUrl}) adicionada com sucesso`);
                    
                    // Processar próxima imagem em sequência
                    setTimeout(() => {
                        addImageSequentially(index + 1);
                    }, 100); // Pequeno delay para garantir ordem
                    
                } catch (error) {
                    console.error('Erro ao adicionar imagem:', imageUrl, error);
                    // Continuar com a próxima imagem mesmo com erro
                    setTimeout(() => {
                        addImageSequentially(index + 1);
                    }, 100);
                }
            };
            
            img.onerror = function() {
                console.error('Erro ao carregar imagem:', imageUrl);
                // Continuar com a próxima imagem mesmo com erro
                setTimeout(() => {
                    addImageSequentially(index + 1);
                }, 100);
            };
            
            // Iniciar carregamento da imagem
            img.src = imageUrl;
        }
        
        // Iniciar processo sequencial começando pela primeira imagem
        console.log('Iniciando geração do PDF na ordem correta...');
        addImageSequentially(0);
        
    } else {
        // Fallback para texto se jsPDF não estiver disponível
        createSimplePDF();
    }
}

// Função alternativa se jsPDF não estiver disponível
function createSimplePDF() {
    // Criar um arquivo de texto simples como alternativa
    const content = `THAMIRIS RODRIGUES - CATÁLOGO
================================

Face/Eyebrows - Nossos Serviços

Catálogo completo com nossos trabalhos de micropigmentação.

Serviços disponíveis:
• Micropigmentação de Sobrancelhas
• Contorno Labial  
• Eyeliner

Contato:
Email: contato@thamirisrodrigues.com.br
WhatsApp: (11) 99999-9999

Gerado em: ${new Date().toLocaleDateString('pt-BR')}
================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Thamiris_Rodrigues_Catalogo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showDownloadSuccess();
}

// Mostrar notificação de sucesso
function showDownloadSuccess() {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>📱 Download Concluído!</h3>
            <p>O catálogo foi baixado com sucesso.</p>
            <p>Verifique sua pasta de downloads.</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(166, 97, 57, 0.9) 0%, rgba(195, 140, 83, 0.9) 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Adicionar CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .download-notification h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    
    .download-notification p {
        font-size: 1rem;
        margin-bottom: 5px;
        opacity: 0.9;
    }
`;
document.head.appendChild(notificationStyles);

// Scroll suave melhorado - Corrigido para funcionar corretamente
function initSmoothScroll() {
    // Desativar o scroll personalizado e usar o scroll nativo
    // O scroll nativo já é suficientemente suave na maioria dos browsers modernos
    
    // Apenas adicionar pequenas otimizações sem interferir no comportamento padrão
    document.body.style.scrollBehavior = 'smooth';
    
    // Opcional: Adicionar scroll suave apenas para links âncora
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

// Efeito de loading moderno
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Inicializar scroll suave após carregamento
    initSmoothScroll();
});
