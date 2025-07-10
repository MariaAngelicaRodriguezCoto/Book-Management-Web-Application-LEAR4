// Login Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
    initializeLogin()
  })
  
  function initializeLogin() {
    // Elements
    const loginForm = document.getElementById("loginForm")
    const loginBtn = document.getElementById("loginBtn")
    const passwordToggle = document.getElementById("passwordToggle")
    const passwordInput = document.querySelector('input[name="Password"]')
    const passwordToggleIcon = document.getElementById("passwordToggleIcon")
    const emailInput = document.querySelector('input[name="Email"]')
    const formInputs = document.querySelectorAll(".form-input")
  
    // Focus first input
    if (emailInput) {
      emailInput.focus()
    }
  
    // Password toggle functionality
    if (passwordToggle && passwordInput && passwordToggleIcon) {
      passwordToggle.addEventListener("click", (e) => {
        e.preventDefault()
        togglePassword()
      })
    }
  
    // Form submission handling
    if (loginForm && loginBtn) {
      loginForm.addEventListener("submit", (e) => {
        handleFormSubmission()
      })
    }
  
    // Input validation and styling
    formInputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("blur", function () {
        validateInput(this)
      })
  
      input.addEventListener("input", function () {
        clearValidationError(this)
      })
  
      // Handle label animation
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })
  
      input.addEventListener("blur", function () {
        if (!this.value.trim()) {
          this.parentElement.classList.remove("focused")
        }
      })
  
      // Check if input has value on load
      if (input.value.trim()) {
        input.parentElement.classList.add("focused")
      }
    })
  
    // Enter key handling
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
        e.preventDefault()
        if (loginForm) {
          loginForm.submit()
        }
      }
    })
  
    // Add smooth animations
    addPageAnimations()
  }
  
  function togglePassword() {
    const passwordInput = document.querySelector('input[name="Password"]')
    const toggleIcon = document.getElementById("passwordToggleIcon")
  
    if (!passwordInput || !toggleIcon) return
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text"
      toggleIcon.classList.remove("fa-eye")
      toggleIcon.classList.add("fa-eye-slash")
    } else {
      passwordInput.type = "password"
      toggleIcon.classList.remove("fa-eye-slash")
      toggleIcon.classList.add("fa-eye")
    }
  
    // Add a subtle animation
    toggleIcon.style.transform = "scale(0.8)"
    setTimeout(() => {
      toggleIcon.style.transform = "scale(1)"
    }, 150)
  }
  
  function handleFormSubmission() {
    const loginBtn = document.getElementById("loginBtn")
  
    if (!loginBtn) return
  
    // Add loading state
    loginBtn.classList.add("loading")
    loginBtn.disabled = true
  
    // Reset button state after 5 seconds (fallback)
    setTimeout(() => {
      resetSubmitButton()
    }, 5000)
  }
  
  function resetSubmitButton() {
    const loginBtn = document.getElementById("loginBtn")
  
    if (!loginBtn) return
  
    loginBtn.classList.remove("loading")
    loginBtn.disabled = false
  }
  
  function validateInput(input) {
    const value = input.value.trim()
    const inputContainer = input.closest(".input-container")
  
    if (!inputContainer) return
  
    // Remove existing validation classes
    input.classList.remove("is-valid", "is-invalid")
  
    if (input.hasAttribute("required") && !value) {
      input.classList.add("is-invalid")
      addValidationError(input, "This field is required")
    } else if (input.type === "email" && value && !isValidEmail(value)) {
      input.classList.add("is-invalid")
      addValidationError(input, "Please enter a valid email address")
    } else if (value) {
      input.classList.add("is-valid")
      removeValidationError(input)
    }
  }
  
  function clearValidationError(input) {
    input.classList.remove("is-invalid")
    removeValidationError(input)
  }
  
  function addValidationError(input, message) {
    removeValidationError(input)
  
    const errorElement = document.createElement("span")
    errorElement.className = "field-validation-error"
    errorElement.textContent = message
  
    const formGroup = input.closest(".form-group")
    if (formGroup) {
      formGroup.appendChild(errorElement)
    }
  }
  
  function removeValidationError(input) {
    const formGroup = input.closest(".form-group")
    if (formGroup) {
      const existingError = formGroup.querySelector(".field-validation-error:not([data-valmsg-for])")
      if (existingError) {
        existingError.remove()
      }
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  function addPageAnimations() {
    // Add stagger animation to form elements
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`
      group.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(".login-btn, .forgot-password, .register-link a")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-1px)"
      })
  
      element.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
      })
    })
  }
  
  // Handle form reset on page visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetSubmitButton()
    }
  })
  
  // Handle browser back button
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetSubmitButton()
    }
  })
  