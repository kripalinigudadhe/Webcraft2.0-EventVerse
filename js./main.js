/* ============================================
   MAIN.JS - Global Utilities & Animations
   ============================================ */

// Initialize particle animation on load
document.addEventListener("DOMContentLoaded", () => {
  initParticles()
  setupMobileMenu()
})

// ============================================
// PARTICLE ANIMATION SYSTEM
// ============================================

function initParticles() {
  const canvas = document.getElementById("canvas-particles")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight - 80

  const particles = []
  const particleCount = 50

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.opacity = Math.random() * 0.5 + 0.2
      this.color = Math.random() > 0.5 ? "rgba(58, 128, 246, " : "rgba(0, 196, 255, "
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0

      this.opacity += (Math.random() - 0.5) * 0.02
      this.opacity = Math.max(0.1, Math.min(0.6, this.opacity))
    }

    draw() {
      ctx.fillStyle = this.color + this.opacity + ")"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()

      // Glow effect
      ctx.strokeStyle = this.color + this.opacity * 0.5 + ")"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 196, 255, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 80
  })
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("nav-links")

  if (!hamburger || !navLinks) return

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation()
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
    navLinks.style.position = "absolute"
    navLinks.style.top = "80px"
    navLinks.style.left = "0"
    navLinks.style.right = "0"
    navLinks.style.flexDirection = "column"
    navLinks.style.backgroundColor = "rgba(6, 11, 23, 0.95)"
    navLinks.style.backdropFilter = "blur(10px)"
    navLinks.style.borderBottom = "1px solid rgba(28, 41, 66, 0.5)"
    navLinks.style.padding = "var(--spacing-lg)"
    navLinks.style.gap = "var(--spacing-md)"
    navLinks.style.zIndex = "999"
  })

  // Close menu on link click
  const links = navLinks.querySelectorAll("a")
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.style.display = "none"
    })
  })

  // Close menu on outside click
  document.addEventListener("click", () => {
    navLinks.style.display = "none"
  })
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach((card) => {
    observer.observe(card)
  })
})

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// ============================================
// HELPER FUNCTIONS
// ============================================

function closeEventModal() {
  const modal = document.getElementById("event-modal")
  if (modal) {
    modal.classList.remove("active")
  }
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("event-modal")
  if (modal && e.target === modal) {
    modal.classList.remove("active")
  }
})
