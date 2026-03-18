/* ============================================
   EVENTS.JS - Event Listing & Filtering
   ============================================ */

// Mock Events Data
const eventsData = [
  {
    id: 1,
    title: "Code Sprint",
    category: "technical",
    date: "March 15, 2025",
    time: "10:00 AM - 1:00 PM",
    description: "Fast-paced coding competition to test your algorithmic skills.",
    fullDescription:
      "Compete in a high-intensity 3-hour coding sprint. Solve challenging algorithmic problems and showcase your programming prowess.",
    prizePool: "₹2,00,000",
    rules: "Individual participation only. Languages: C++, Java, Python. No external resources allowed.",
    contact: "Raj Kumar - 9876543210",
  },
  {
    id: 2,
    title: "Hack Marathon",
    category: "technical",
    date: "March 16, 2025",
    time: "9:00 AM - 6:00 PM",
    description: "Build innovative solutions in 8 hours. Teams of 2-4 members.",
    fullDescription:
      "Create innovative tech solutions to real-world problems. Teams must present their working prototype and business pitch.",
    prizePool: "₹5,00,000",
    rules: "Teams of 2-4. Must develop working prototype. Submission deadline: 5:00 PM.",
    contact: "Priya Sharma - 9876543211",
  },
  {
    id: 3,
    title: "Design Clash",
    category: "technical",
    date: "March 15, 2025",
    time: "2:00 PM - 5:00 PM",
    description: "UI/UX design competition with live judging and feedback.",
    fullDescription:
      "Showcase your design skills. Create compelling UI/UX designs addressing specific challenges. Live judging and designer feedback included.",
    prizePool: "₹1,50,000",
    rules: "Individual or pair participation. Use any design tool. Must submit design files.",
    contact: "Alex Chen - 9876543212",
  },
  {
    id: 4,
    title: "AI Workshop",
    category: "workshop",
    date: "March 16, 2025",
    time: "11:00 AM - 1:00 PM",
    description: "Learn AI fundamentals from industry experts.",
    fullDescription:
      "Hands-on workshop covering AI basics, machine learning, and neural networks. Expert trainers will guide you through practical exercises.",
    prizePool: "Certificate of participation",
    rules: "Free to attend. Bring laptop with Python installed. Registration required.",
    contact: "Dr. Aisha Patel - 9876543213",
  },
  {
    id: 5,
    title: "Gaming Arena",
    category: "gaming",
    date: "March 17, 2025",
    time: "3:00 PM - 7:00 PM",
    description: "Competitive gaming tournament with multiple game titles.",
    fullDescription:
      "Compete in popular esports titles. Single and team categories available. Live streaming and commentary included.",
    prizePool: "₹3,00,000",
    rules: "18+ participants only. Bring your own gaming device or use provided systems. Registration: ₹500/person.",
    contact: "Gaming Committee - 9876543214",
  },
  {
    id: 6,
    title: "Cultural Night",
    category: "cultural",
    date: "March 17, 2025",
    time: "6:00 PM - 9:00 PM",
    description: "Showcase your talent in music, dance, drama, and more.",
    fullDescription:
      "An evening of cultural performances featuring music, dance, drama, and multimedia presentations from diverse cultures.",
    prizePool: "₹1,00,000",
    rules: "Individual or group performances. 10-minute slot per participant. Technical support available.",
    contact: "Cultural Committee - 9876543215",
  },
  {
    id: 7,
    title: "Startup Pitch",
    category: "technical",
    date: "March 16, 2025",
    time: "1:00 PM - 4:00 PM",
    description: "Pitch your startup ideas to investors and get feedback.",
    fullDescription:
      "Get your startup idea in front of angel investors and experienced entrepreneurs. Receive valuable feedback and potential funding opportunities.",
    prizePool: "₹10,00,000",
    rules: "Teams can participate. 5-minute pitch + 5-minute Q&A. Business plan submission required.",
    contact: "Entrepreneurship Club - 9876543216",
  },
  {
    id: 8,
    title: "Web Development Bootcamp",
    category: "workshop",
    date: "March 15, 2025",
    time: "3:00 PM - 5:00 PM",
    description: "Learn modern web development with hands-on coding.",
    fullDescription:
      "Intensive bootcamp covering HTML, CSS, JavaScript, React, and Node.js. Build a complete web project during the workshop.",
    prizePool: "Certificate + goodies",
    rules: "Basic programming knowledge required. Bring laptop with code editor.",
    contact: "Dev Community Lead - 9876543217",
  },
  {
    id: 9,
    title: "Photography Contest",
    category: "cultural",
    date: "March 15-17, 2025",
    time: "Ongoing submission",
    description: "Submit your best photos. Winner announced on Day 3.",
    fullDescription:
      "Submit your original photography across multiple categories: Nature, Portrait, Urban, and Abstract. Judging based on creativity and technical excellence.",
    prizePool: "₹75,000",
    rules: "Original photos only. Submit by March 17, 5 PM. Max 5 submissions per participant.",
    contact: "Photography Club - 9876543218",
  },
]

// Initialize Events
document.addEventListener("DOMContentLoaded", () => {
  renderEvents(eventsData)
  setupFilters()
})

// Render Events Grid
function renderEvents(events) {
  const grid = document.getElementById("events-grid")
  if (!grid) return

  grid.innerHTML = ""

  events.forEach((event) => {
    const eventCard = document.createElement("div")
    eventCard.className = "card"
    eventCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <h3 style="color: var(--accent-secondary); margin: 0;">${event.title}</h3>
        <span style="background: rgba(58, 128, 246, 0.2); color: var(--accent-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">${event.category}</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">${event.description}</p>
      <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
        <span style="font-size: 0.9rem; color: var(--accent-glow);">📅 ${event.date}</span>
        <span style="font-size: 0.9rem; color: var(--accent-glow);">🕐 ${event.time}</span>
      </div>
      <button class="btn btn-primary" style="width: 100%; cursor: pointer;" onclick="openEventDetails(${event.id})">View Details</button>
    `
    grid.appendChild(eventCard)
  })
}

// Setup Filter Buttons
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const category = btn.dataset.filter
      const filtered = category === "all" ? eventsData : eventsData.filter((e) => e.category === category)

      renderEvents(filtered)
    })
  })
}

// Open Event Details Modal
function openEventDetails(eventId) {
  const event = eventsData.find((e) => e.id === eventId)
  if (!event) return

  const modalBody = document.getElementById("modal-body")
  if (!modalBody) return

  modalBody.innerHTML = `
    <h2 style="color: var(--accent-secondary); margin-bottom: 12px;">${event.title}</h2>
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <span style="background: rgba(58, 128, 246, 0.2); color: var(--accent-primary); padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">${event.category}</span>
      <span style="color: var(--accent-glow);">📅 ${event.date}</span>
      <span style="color: var(--accent-glow);">🕐 ${event.time}</span>
    </div>
    <h3 style="color: var(--text-primary); margin-top: 20px; margin-bottom: 8px;">Description</h3>
    <p style="color: var(--text-muted); margin-bottom: 16px;">${event.fullDescription}</p>
    <h3 style="color: var(--text-primary); margin-top: 16px; margin-bottom: 8px;">Prize Pool</h3>
    <p style="color: var(--success-color); font-weight: 600; font-size: 1.1rem;">${event.prizePool}</p>
    <h3 style="color: var(--text-primary); margin-top: 16px; margin-bottom: 8px;">Rules</h3>
    <p style="color: var(--text-muted);">${event.rules}</p>
    <h3 style="color: var(--text-primary); margin-top: 16px; margin-bottom: 8px;">Contact</h3>
    <p style="color: var(--text-muted);">${event.contact}</p>
    <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="window.location.href='register.html'">Register for Event</button>
  `

  const modal = document.getElementById("event-modal")
  if (modal) {
    modal.classList.add("active")
  }
}
