/* ============================================
   REGISTER.JS - Registration Form Handling
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form")
  if (form) {
    form.addEventListener("submit", handleRegistration)
  }

  // Real-time validation
  const inputs = document.querySelectorAll("#registration-form input, #registration-form textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
  })
})

// Validate Individual Field
function validateField(e) {
  const field = e.target
  const error = document.getElementById(field.id + "-error")

  let isValid = true
  let errorMsg = ""

  if (field.id === "fullname") {
    if (field.value.trim().length < 3) {
      isValid = false
      errorMsg = "Name must be at least 3 characters"
    }
  } else if (field.id === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(field.value)) {
      isValid = false
      errorMsg = "Please enter a valid email address"
    }
  } else if (field.id === "phone") {
    const phoneRegex = /^[+]?[0-9]{10,13}$/
    if (!phoneRegex.test(field.value.replace(/[-\s]/g, ""))) {
      isValid = false
      errorMsg = "Please enter a valid phone number"
    }
  } else if (field.id === "college") {
    if (field.value.trim().length < 3) {
      isValid = false
      errorMsg = "Please enter your institution name"
    }
  }

  if (error) {
    if (!isValid) {
      error.textContent = errorMsg
      error.style.display = "block"
      field.style.borderColor = "var(--accent-primary)"
    } else {
      error.style.display = "none"
      field.style.borderColor = "var(--accent-secondary)"
    }
  }

  return isValid
}

// Handle Registration Submission
function handleRegistration(e) {
  e.preventDefault()

  // Validate all fields
  const fields = ["fullname", "email", "phone", "college"]
  let allValid = true

  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    const event = new Event("blur")
    field.dispatchEvent(event)

    const error = document.getElementById(fieldId + "-error")
    if (error && error.style.display === "block") {
      allValid = false
    }
  })

  if (!allValid) {
    alert("Please fix the errors in the form")
    return
  }

  // Get form data
  const formData = new FormData(e.target)
  const data = {
    name: formData.get("fullname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    college: formData.get("college"),
    event: formData.get("event"),
    message: formData.get("message"),
    timestamp: new Date().toLocaleString(),
  }

  console.log("Registration submitted:", data)

  // Show success message
  const form = e.target
  const successMsg = document.getElementById("success-message")
  if (successMsg) {
    form.style.display = "none"
    successMsg.style.display = "block"

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset()
      form.style.display = "block"
      successMsg.style.display = "none"
    }, 3000)
  }
}
