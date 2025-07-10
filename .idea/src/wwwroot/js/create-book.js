document.addEventListener("DOMContentLoaded", () => {
    initializeCreateBook()
  })
  
  function initializeCreateBook() {
    const createBookForm = document.getElementById("createBookForm")
    const nextBtn = document.getElementById("nextBtn")
    const backBtn = document.getElementById("backBtn")
    const saveBtn = document.getElementById("saveBtn")
    const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
    const descriptionTextarea = document.querySelector('textarea[name="Description"]')
    const charCount = document.getElementById("charCount")
  
    initializeFormValidation()
    initializeStepNavigation()
    initializeCharacterCount()
    initializeAutoResize()
    addFormAnimations()
  
    const firstInput = document.querySelector('input[name="Title"]')
    if (firstInput) {
      firstInput.focus()
    }
  
    if (createBookForm && saveBtn) {
      createBookForm.addEventListener("submit", (e) => {
        if (!validateCurrentSection()) {
          e.preventDefault()
          return
        }
        handleFormSubmission()
      })
    }
  
    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(this)
      })
  
      input.addEventListener("input", function () {
        clearValidationError(this)
        updateReviewSection()
      })
  
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })
  
      input.addEventListener("blur", function () {
        if (!this.value.trim() && this.tagName !== "SELECT") {
          this.parentElement.classList.remove("focused")
        }
      })
  
      if (input.value.trim() || (input.tagName === "SELECT" && input.value)) {
        input.parentElement.classList.add("focused")
      }
    })
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (validateCurrentSection()) {
          goToStep(2)
        }
      })
    }
  
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        goToStep(1)
      })
    }
  
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "BUTTON") {
        e.preventDefault()
        const currentSection = getCurrentSection()
        if (currentSection === 1) {
          if (validateCurrentSection()) {
            goToStep(2)
          }
        }
      }
    })
  }
  
  function initializeFormValidation() {
    const requiredInputs = document.querySelectorAll("[required]")
    requiredInputs.forEach((input) => {
      const label = input.parentElement.querySelector(".form-label")
      if (label && !label.querySelector(".required-indicator")) {
        const indicator = document.createElement("span")
        indicator.className = "required-indicator"
        indicator.textContent = " *"
        indicator.style.color = "#e74c3c"
        label.appendChild(indicator)
      }
    })
  }
  
  function initializeStepNavigation() {
    updateProgressIndicator(1)
    updateReviewSection()
  }
  
  function initializeCharacterCount() {
    const descriptionTextarea = document.querySelector('textarea[name="Description"]')
    const charCount = document.getElementById("charCount")
  
    if (descriptionTextarea && charCount) {
      const updateCount = () => {
        const count = descriptionTextarea.value.length
        charCount.textContent = count
  
        if (count > 500) {
          charCount.style.color = "#e74c3c"
        } else if (count > 300) {
          charCount.style.color = "#f39c12"
        } else {
          charCount.style.color = "#999"
        }
      }
  
      descriptionTextarea.addEventListener("input", updateCount)
      updateCount()
    }
  }
  
  function initializeAutoResize() {
    const textarea = document.querySelector('textarea[name="Description"]')
    if (textarea) {
      const autoResize = () => {
        textarea.style.height = "auto"
        textarea.style.height = Math.max(textarea.scrollHeight, 120) + "px"
      }
  
      textarea.addEventListener("input", autoResize)
      autoResize()
    }
  }
  
  function getCurrentSection() {
    const activeSection = document.querySelector(".form-section.active")
    return activeSection ? Number.parseInt(activeSection.id.split("-")[1]) : 1
  }
  
  function goToStep(step) {
    document.querySelectorAll(".form-section").forEach((section) => {
      section.classList.remove("active")
    })
  
    const targetSection = document.getElementById(`section-${step}`)
    if (targetSection) {
      targetSection.classList.add("active")
    }
  
    updateProgressIndicator(step)
  
    if (step === 2) {
      updateReviewSection()
    }
  
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  function updateProgressIndicator(activeStep) {
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      if (index + 1 <= activeStep) {
        step.classList.add("active")
      } else {
        step.classList.remove("active")
      }
    })
  }
  
  function updateReviewSection() {
    const titleInput = document.querySelector('input[name="Title"]')
    const authorInput = document.querySelector('input[name="Author"]')
    const genreInput = document.querySelector('input[name="Genre"]')
    const dateInput = document.querySelector('input[name="PublicationDate"]')
    const descriptionTextarea = document.querySelector('textarea[name="Description"]')
  
    document.getElementById("reviewTitle").textContent = titleInput?.value || "-"
    document.getElementById("reviewAuthor").textContent = authorInput?.value || "-"
    document.getElementById("reviewGenre").textContent = genreInput?.value || "-"
  
    if (dateInput?.value) {
      const date = new Date(dateInput.value)
      document.getElementById("reviewDate").textContent = date.toLocaleDateString()
    } else {
      document.getElementById("reviewDate").textContent = "-"
    }
  
    document.getElementById("reviewDescription").textContent = descriptionTextarea?.value || "No description provided"
  }
  
  function validateCurrentSection() {
    const currentSection = getCurrentSection()
    let isValid = true
  
    if (currentSection === 1) {
      const requiredInputs = document.querySelectorAll("#section-1 [required]")
      requiredInputs.forEach((input) => {
        if (!validateInput(input)) {
          isValid = false
        }
      })
    }
  
    return isValid
  }
  
  function validateInput(input) {
    const value = input.value.trim()
  
    input.classList.remove("is-valid", "is-invalid")
  
    if (input.hasAttribute("required") && !value) {
      input.classList.add("is-invalid")
      addValidationError(input, "This field is required")
      return false
    }
  
    if (input.type === "date" && value) {
      const selectedDate = new Date(value)
      const today = new Date()
      if (selectedDate > today) {
        input.classList.add("is-invalid")
        addValidationError(input, "Publication date cannot be in the future")
        return false
      }
    }
  
    if (value) {
      input.classList.add("is-valid")
      removeValidationError(input)
      return true
    }
  
    return true
  }
  
  function handleFormSubmission() {
    const saveBtn = document.getElementById("saveBtn")
  
    if (!saveBtn) return
  
    saveBtn.classList.add("loading")
    saveBtn.disabled = true
  
    setTimeout(() => {
      resetSubmitButton()
    }, 5000)
  }
  
  function resetSubmitButton() {
    const saveBtn = document.getElementById("saveBtn")
  
    if (!saveBtn) return
  
    saveBtn.classList.remove("loading")
    saveBtn.disabled = false
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
  
  function addFormAnimations() {
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`
      group.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    const buttons = document.querySelectorAll(".next-btn, .back-section-btn, .save-btn, .cancel-btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        if (!this.disabled) {
          this.style.transform = "translateY(-2px)"
        }
      })
  
      button.addEventListener("mouseleave", function () {
        if (!this.disabled) {
          this.style.transform = "translateY(0)"
        }
      })
    })
  }
  
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetSubmitButton()
    }
  })
  
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetSubmitButton()
    }
  })
  
  function initializeAutoSave() {
    const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
    let autoSaveTimeout
  
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        clearTimeout(autoSaveTimeout)
        autoSaveTimeout = setTimeout(() => {
          saveFormData()
        }, 2000)
      })
    })
  }
  
  function saveFormData() {
    const formData = {
      title: document.querySelector('input[name="Title"]')?.value || "",
      author: document.querySelector('input[name="Author"]')?.value || "",
      genre: document.querySelector('input[name="Genre"]')?.value || "",
      publicationDate: document.querySelector('input[name="PublicationDate"]')?.value || "",
      description: document.querySelector('textarea[name="Description"]')?.value || "",
    }
  
    localStorage.setItem("bookFormData", JSON.stringify(formData))
  }
  
  function loadFormData() {
    const savedData = localStorage.getItem("bookFormData")
    if (savedData) {
      const formData = JSON.parse(savedData)
  
      const titleInput = document.querySelector('input[name="Title"]')
      const authorInput = document.querySelector('input[name="Author"]')
      const genreSelect = document.querySelector('select[name="Genre"]')
      const dateInput = document.querySelector('input[name="PublicationDate"]')
      const descriptionTextarea = document.querySelector('textarea[name="Description"]')
  
      if (titleInput) titleInput.value = formData.title
      if (authorInput) authorInput.value = formData.author
      if (genreSelect) genreSelect.value = formData.genre
      if (dateInput) dateInput.value = formData.publicationDate
      if (descriptionTextarea) descriptionTextarea.value = formData.description
  
      document.querySelectorAll(".form-input, .form-select, .form-textarea").forEach((input) => {
        if (input.value.trim() || (input.tagName === "SELECT" && input.value)) {
          input.parentElement.classList.add("focused")
        }
      })
    }
  }

  