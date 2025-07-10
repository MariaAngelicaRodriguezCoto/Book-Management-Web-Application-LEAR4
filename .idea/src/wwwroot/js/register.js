// Register Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
    initializeRegister()
  })
  
  function initializeRegister() {
    // Elements
    const registerForm = document.getElementById("registerForm")
    const registerBtn = document.getElementById("registerBtn")
    const passwordToggle = document.getElementById("passwordToggle")
    const confirmPasswordToggle = document.getElementById("confirmPasswordToggle")
    const passwordInput = document.querySelector('input[name="Password"]')
    const confirmPasswordInput = document.querySelector('input[name="ConfirmPassword"]')
    const firstNameInput = document.querySelector('input[name="FirstName"]')
    const emailInput = document.querySelector('input[name="Email"]')
    const formInputs = document.querySelectorAll(".form-input")
    const termsCheckbox = document.getElementById("termsAccepted")
  
    // Focus first input
    if (firstNameInput) {
      firstNameInput.focus()
    }
  
    // Password toggle functionality
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", (e) => {
        e.preventDefault()
        togglePasswordField("Password", "passwordToggleIcon")
      })
    }
  
    if (confirmPasswordToggle && confirmPasswordInput) {
      confirmPasswordToggle.addEventListener("click", (e) => {
        e.preventDefault()
        togglePasswordField("ConfirmPassword", "confirmPasswordToggleIcon")
      })
    }
  
    // Form submission handling
    if (registerForm && registerBtn) {
      registerForm.addEventListener("submit", (e) => {
        if (!validateForm()) {
          e.preventDefault()
          return
        }
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
  
        // Special handling for different input types
        if (this.name === "Password") {
          checkPasswordStrength(this.value)
          validatePasswordMatch()
        } else if (this.name === "ConfirmPassword") {
          validatePasswordMatch()
        } else if (this.name === "Email") {
          validateEmailFormat(this)
        }
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
  
    // Terms checkbox validation
    if (termsCheckbox) {
      termsCheckbox.addEventListener("change", () => {
        updateSubmitButtonState()
      })
    }
  
    // Enter key handling
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
        e.preventDefault()
        const nextInput = getNextInput(e.target)
        if (nextInput) {
          nextInput.focus()
        } else if (validateForm()) {
          registerForm.submit()
        }
      }
    })
  
    // Add smooth animations
    addPageAnimations()
  
    // Initialize submit button state
    updateSubmitButtonState()
  }
  
  function togglePasswordField(fieldName, iconId) {
    const passwordInput = document.querySelector(`input[name="${fieldName}"]`)
    const toggleIcon = document.getElementById(iconId)
  
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
  
    // Add animation
    toggleIcon.style.transform = "scale(0.8)"
    setTimeout(() => {
      toggleIcon.style.transform = "scale(1)"
    }, 150)
  }
  
  
  function validatePasswordMatch() {
    const passwordInput = document.querySelector('input[name="Password"]')
    const confirmPasswordInput = document.querySelector('input[name="ConfirmPassword"]')
    const matchIndicator = document.getElementById("passwordMatch")
  
    if (!passwordInput || !confirmPasswordInput || !matchIndicator) return
  
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value
  
    if (!confirmPassword) {
      matchIndicator.classList.remove("match", "no-match")
      return
    }
  
    if (password === confirmPassword) {
      matchIndicator.classList.remove("no-match")
      matchIndicator.classList.add("match")
      matchIndicator.textContent = "Match"
      confirmPasswordInput.classList.remove("is-invalid")
      confirmPasswordInput.classList.add("is-valid")
    } else {
      matchIndicator.classList.remove("match")
      matchIndicator.classList.add("no-match")
      matchIndicator.textContent = "No match"
      confirmPasswordInput.classList.remove("is-valid")
      confirmPasswordInput.classList.add("is-invalid")
    }
  }
  
  function validateInput(input) {
    const value = input.value.trim()
  
    // Remove existing validation classes
    input.classList.remove("is-valid", "is-invalid")
  
    if (input.hasAttribute("required") && !value) {
      input.classList.add("is-invalid")
      addValidationError(input, "This field is required")
      return false
    }
  
    if (value) {
      input.classList.add("is-valid")
      removeValidationError(input)
      return true
    }
  
    return true
  }
  
  function validateEmailFormat(input) {
    const email = input.value.trim()
  
    if (!email) return
  
    if (!isValidEmail(email)) {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
      addValidationError(input, "Please enter a valid email address")
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      removeValidationError(input)
    }
  }
  
  function validateForm() {
    const requiredInputs = document.querySelectorAll(".form-input[required]")
    const termsCheckbox = document.getElementById("termsAccepted")
    const passwordInput = document.querySelector('input[name="Password"]')
    const confirmPasswordInput = document.querySelector('input[name="ConfirmPassword"]')
  
    let isValid = true
  
    // Validate required fields
    requiredInputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false
      }
    })
  
    // Validate email format
    const emailInput = document.querySelector('input[name="Email"]')
    if (emailInput && emailInput.value && !isValidEmail(emailInput.value)) {
      isValid = false
    }
  
    // Validate password match
    if (passwordInput && confirmPasswordInput) {
      if (passwordInput.value !== confirmPasswordInput.value) {
        isValid = false
      }
    }
  
    // Validate terms acceptance
    if (termsCheckbox && !termsCheckbox.checked) {
      isValid = false
    }
  
    return isValid
  }
  
  function handleFormSubmission() {
    const registerBtn = document.getElementById("registerBtn")
  
    if (!registerBtn) return
  
    // Add loading state
    registerBtn.classList.add("loading")
    registerBtn.disabled = true
  
    // Reset button state after 5 seconds (fallback)
    setTimeout(() => {
      resetSubmitButton()
    }, 5000)
  }
  
  function resetSubmitButton() {
    const registerBtn = document.getElementById("registerBtn")
  
    if (!registerBtn) return
  
    registerBtn.classList.remove("loading")
    registerBtn.disabled = false
  }
  
  function updateSubmitButtonState() {
    const registerBtn = document.getElementById("registerBtn")
    const termsCheckbox = document.getElementById("termsAccepted")
  
    if (!registerBtn || !termsCheckbox) return
  
    if (termsCheckbox.checked) {
      registerBtn.disabled = false
    } else {
      registerBtn.disabled = true
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
  
  function getNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll(".form-input"))
    const currentIndex = inputs.indexOf(currentInput)
    return inputs[currentIndex + 1] || null
  }
  
  function addPageAnimations() {
    // Add stagger animation to form elements
    const formGroups = document.querySelectorAll(".form-group, .name-row, .terms-section")
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`
      group.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(".register-btn, .terms-link, .login-link a")
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
  