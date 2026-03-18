/* ============================================
   SCHEDULE.JS - Event Schedule Management
   ============================================ */

// Schedule Data
const scheduleData = {
  day1: [
    { time: "9:00 AM", event: "Registration & Welcome", location: "Main Hall" },
    { time: "10:00 AM", event: "Code Sprint Begins", location: "Tech Arena" },
    { time: "10:30 AM", event: "Web Development Bootcamp", location: "Workshop Room A" },
    { time: "1:00 PM", event: "Lunch Break", location: "Cafeteria" },
    { time: "2:00 PM", event: "Design Clash", location: "Design Hub" },
    { time: "3:00 PM", event: "Web Development Bootcamp (Cont.)", location: "Workshop Room A" },
    { time: "5:00 PM", event: "Evening Snacks & Networking", location: "Lounge" },
  ],
  day2: [
    { time: "9:00 AM", event: "Hack Marathon Kickoff", location: "Main Hall" },
    { time: "11:00 AM", event: "AI Workshop Session 1", location: "Workshop Room B" },
    { time: "1:00 PM", event: "Lunch Break", location: "Cafeteria" },
    { time: "2:00 PM", event: "AI Workshop Session 2", location: "Workshop Room B" },
    { time: "3:00 PM", event: "Startup Pitch Session", location: "Auditorium" },
    { time: "5:00 PM", event: "Hack Marathon Midpoint Check-in", location: "Main Hall" },
    { time: "6:00 PM", event: "Dinner & Team Bonding", location: "Cafeteria" },
  ],
  day3: [
    { time: "9:00 AM", event: "Hack Marathon Submissions", location: "Tech Arena" },
    { time: "11:00 AM", event: "Hack Marathon Judging & Presentations", location: "Auditorium" },
    { time: "1:00 PM", event: "Lunch Break", location: "Cafeteria" },
    { time: "3:00 PM", event: "Gaming Arena Begins", location: "Gaming Zone" },
    { time: "6:00 PM", event: "Cultural Night & Performances", location: "Open Air Theater" },
    { time: "8:00 PM", event: "Prize Distribution Ceremony", location: "Main Stage" },
    { time: "9:00 PM", event: "Closing Event & Farewell", location: "Main Hall" },
  ],
}

// Initialize Schedule
document.addEventListener("DOMContentLoaded", () => {
  renderSchedule("day1")
  setupDayFilters()
})

// Render Schedule Timeline
function renderSchedule(day) {
  const timeline = document.getElementById("schedule-timeline")
  if (!timeline) return

  timeline.innerHTML = ""
  const daySchedule = scheduleData[day]

  daySchedule.forEach((item, index) => {
    const timelineItem = document.createElement("div")
    timelineItem.className = "timeline-item"
    timelineItem.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`
    timelineItem.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <h4 style="color: var(--accent-secondary); margin-bottom: 4px;">${item.time}</h4>
        <h3 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.1rem;">${item.event}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">
          📍 ${item.location}
        </p>
      </div>
    `
    timeline.appendChild(timelineItem)
  })
}

// Setup Day Filter Buttons
function setupDayFilters() {
  const dayBtns = document.querySelectorAll("[data-day]")

  dayBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dayBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const day = btn.dataset.day
      renderSchedule(day)
    })
  })
}
