/**
 * Canvas Background Visualizer Engines for 10 Unique Themes
 * Dynamically renders 60fps lightweight animations on HTML5 Canvas.
 */

class CanvasBackgroundManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.currentTheme = 'theme-neural';
        this.animationId = null;
        this.particles = [];
        this.width = 0;
        this.height = 0;

        this.initResize();
    }

    initResize() {
        const resize = () => {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
            this.initThemeEntities();
        };
        window.addEventListener('resize', resize);
        resize();
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        document.body.className = themeName;
        this.initThemeEntities();
        this.startLoop();
    }

    initThemeEntities() {
        this.particles = [];
        const count = Math.min(Math.floor((this.width * this.height) / 12000), 100);

        if (this.currentTheme === 'theme-neural') {
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 2 + 1.5,
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        } else if (this.currentTheme === 'theme-matrix') {
            const fontSize = 14;
            const columns = Math.floor(this.width / fontSize);
            this.drops = [];
            for (let i = 0; i < columns; i++) {
                this.drops[i] = Math.floor(Math.random() * -50);
            }
        } else if (this.currentTheme === 'theme-space') {
            for (let i = 0; i < count * 1.5; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 1.8 + 0.4,
                    alpha: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.02 + 0.005,
                    pulse: Math.random() * Math.PI
                });
            }
        } else if (this.currentTheme === 'theme-ocean') {
            for (let i = 0; i < 40; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: this.height + Math.random() * 100,
                    radius: Math.random() * 4 + 1,
                    vy: Math.random() * 1 + 0.4,
                    alpha: Math.random() * 0.4 + 0.1
                });
            }
        } else if (this.currentTheme === 'theme-sunset') {
            for (let i = 0; i < 45; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 3 + 1,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: -Math.random() * 0.6 - 0.2,
                    alpha: Math.random() * 0.6 + 0.2
                });
            }
        } else if (this.currentTheme === 'theme-cyber') {
            this.gridOffset = 0;
        }
    }

    startLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        const loop = (timestamp) => {
            this.render(timestamp);
            this.animationId = requestAnimationFrame(loop);
        };
        this.animationId = requestAnimationFrame(loop);
    }

    render(timestamp) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        switch (this.currentTheme) {
            case 'theme-neural':
                this.renderNeural();
                break;
            case 'theme-matrix':
                this.renderMatrix();
                break;
            case 'theme-space':
                this.renderSpace(timestamp);
                break;
            case 'theme-cyber':
                this.renderCyber();
                break;
            case 'theme-aurora':
                this.renderAurora(timestamp);
                break;
            case 'theme-ocean':
                this.renderOcean(timestamp);
                break;
            case 'theme-sunset':
                this.renderSunset();
                break;
            case 'theme-glass':
                this.renderGlass(timestamp);
                break;
            case 'theme-developer':
                this.renderDeveloper(timestamp);
                break;
            case 'theme-minimal':
                this.renderMinimal();
                break;
            default:
                this.renderNeural();
        }
    }

    // 1. AI Neural Theme
    renderNeural() {
        const p = this.particles;
        const ctx = this.ctx;

        // Draw connections
        for (let i = 0; i < p.length; i++) {
            for (let j = i + 1; j < p.length; j++) {
                const dx = p[i].x - p[j].x;
                const dy = p[i].y - p[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p[i].x, p[i].y);
                    ctx.lineTo(p[j].x, p[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 130) * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Update and draw nodes
        for (let i = 0; i < p.length; i++) {
            p[i].x += p[i].vx;
            p[i].y += p[i].vy;

            if (p[i].x < 0 || p[i].x > this.width) p[i].vx *= -1;
            if (p[i].y < 0 || p[i].y > this.height) p[i].vy *= -1;

            ctx.beginPath();
            ctx.arc(p[i].x, p[i].y, p[i].radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${p[i].alpha})`;
            ctx.shadowColor = '#6366f1';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // 2. Matrix Code Theme
    renderMatrix() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(5, 10, 8, 0.12)';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = '#00ff66';
        ctx.font = '14px monospace';

        const chars = '010101ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789<>/+*{}[]~#';
        const fontSize = 14;

        if (!this.drops) return;

        for (let i = 0; i < this.drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = this.drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > this.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    // 3. Space Theme
    renderSpace(ts) {
        const ctx = this.ctx;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.pulse += p.speed;
            const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(224, 231, 255, ${currentAlpha})`;
            ctx.shadowColor = '#818cf8';
            ctx.shadowBlur = p.radius * 3;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // 4. Cyber Theme
    renderCyber() {
        const ctx = this.ctx;
        const horizon = this.height * 0.65;
        this.gridOffset = (this.gridOffset + 0.8) % 30;

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;

        // Perspective vertical lines
        const numLines = 20;
        for (let i = -numLines; i <= numLines; i++) {
            const x = this.width / 2 + (i * 70);
            ctx.beginPath();
            ctx.moveTo(this.width / 2, horizon);
            ctx.lineTo(x * 2 - this.width / 2, this.height);
            ctx.stroke();
        }

        // Horizontal moving lines
        for (let y = horizon; y < this.height; y += 18) {
            const progress = (y - horizon) / (this.height - horizon);
            const lineY = horizon + Math.pow(progress, 1.8) * (this.height - horizon) + (this.gridOffset * progress);
            if (lineY <= this.height) {
                ctx.strokeStyle = `rgba(236, 72, 153, ${0.1 + progress * 0.35})`;
                ctx.beginPath();
                ctx.moveTo(0, lineY);
                ctx.lineTo(this.width, lineY);
                ctx.stroke();
            }
        }
    }

    // 5. Aurora Theme
    renderAurora(ts) {
        const ctx = this.ctx;
        const t = (ts || 0) * 0.0008;

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(0, this.height * 0.3);

            for (let x = 0; x <= this.width; x += 30) {
                const y = Math.sin(x * 0.003 + t + i) * 60 + Math.cos(x * 0.002 - t) * 40 + (this.height * (0.25 + i * 0.15));
                ctx.lineTo(x, y);
            }

            ctx.lineTo(this.width, this.height);
            ctx.lineTo(0, this.height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            if (i === 0) {
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0.03)');
            } else if (i === 1) {
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
                gradient.addColorStop(1, 'rgba(59, 130, 246, 0.03)');
            } else {
                gradient.addColorStop(0, 'rgba(236, 72, 153, 0.06)');
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
            }

            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // 6. Ocean Waves Theme
    renderOcean(ts) {
        const ctx = this.ctx;
        const t = (ts || 0) * 0.001;

        // Draw flowing waves
        for (let w = 0; w < 3; w++) {
            ctx.beginPath();
            ctx.moveTo(0, this.height);

            for (let x = 0; x <= this.width; x += 20) {
                const y = this.height * 0.75 + Math.sin(x * 0.005 + t * (w + 1)) * (20 - w * 5) + Math.cos(x * 0.002 - t) * 15;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(this.width, this.height);
            ctx.closePath();

            ctx.fillStyle = `rgba(14, 116, 144, ${0.12 - w * 0.03})`;
            ctx.fill();
        }

        // Bubbles
        for (let i = 0; i < this.particles.length; i++) {
            const b = this.particles[i];
            b.y -= b.vy;
            if (b.y < -10) b.y = this.height + 10;

            ctx.beginPath();
            ctx.arc(b.x + Math.sin(t + i) * 10, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${b.alpha})`;
            ctx.fill();
        }
    }

    // 7. Sunset Theme
    renderSunset() {
        const ctx = this.ctx;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < 0) {
                p.y = this.height + 10;
                p.x = Math.random() * this.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251, 146, 60, ${p.alpha})`;
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // 8. Glass Theme
    renderGlass(ts) {
        const ctx = this.ctx;
        const t = (ts || 0) * 0.0006;
        const orbs = [
            { x: this.width * 0.2 + Math.sin(t) * 80, y: this.height * 0.3 + Math.cos(t) * 60, r: 180, color: 'rgba(99, 102, 241, 0.18)' },
            { x: this.width * 0.8 + Math.cos(t * 1.2) * 90, y: this.height * 0.7 + Math.sin(t * 1.2) * 70, r: 220, color: 'rgba(236, 72, 153, 0.15)' },
            { x: this.width * 0.5 + Math.sin(t * 0.8) * 100, y: this.height * 0.85, r: 160, color: 'rgba(59, 130, 246, 0.15)' }
        ];

        for (const orb of orbs) {
            const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
            grad.addColorStop(0, orb.color);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 9. Developer Theme
    renderDeveloper(ts) {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.08)';
        ctx.lineWidth = 1;

        // Subtle IDE grid lines
        for (let x = 0; x < this.width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }
    }

    // 10. Minimal Theme
    renderMinimal() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(203, 213, 225, 0.3)';
        // Dot grid
        for (let x = 20; x < this.width; x += 40) {
            for (let y = 20; y < this.height; y += 40) {
                ctx.beginPath();
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}
