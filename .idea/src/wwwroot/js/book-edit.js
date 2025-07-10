// Book Edit Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
    initializeBookEdit()
  })
  
  function initializeBookEdit() {
    // Initialize form validation
    initializeFormValidation()
  
    // Initialize character count
    initializeCharacterCount()
  
    // Initialize auto-resize
    initializeAutoResize()
  
    // Initialize form change tracking
    initializeChangeTracking()
  
    // Initialize animations
    addPageAnimations()
  
    // Initialize auto-save (optional)
    // initializeAutoSave()
  
    // Focus first input
    const firstInput = document.querySelector('input[name="Title"]')
    if (firstInput) {
      firstInput.focus()
    }
  
    // Initialize form submission
    initializeFormSubmission()
  
    // Initialize input styling
    initializeInputStyling()
  }
  
  function initializeFormValidation() {
    const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
  
    formInputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("blur", function () {
        validateInput(this)
      })
  
      input.addEventListener("input", function () {
        clearValidationError(this)
      })
    })
  }
  
  function initializeCharacterCount() {
    const descriptionTextarea = document.querySelector('textarea[name="Description"]')
    const charCount = document.getElementById("charCount")
  
    if (descriptionTextarea && charCount) {
      const updateCount = () => {
        const count = descriptionTextarea.value.length
        charCount.textContent = count
  
        // Color coding based on length
        if (count > 500) {
          charCount.style.color = "#e74c3c"
        } else if (count > 300) {
          charCount.style.color = "#f39c12"
        } else {
          charCount.style.color = "#999"
        }
      }
  
      descriptionTextarea.addEventListener("input", updateCount)
      updateCount() // Initial count
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
      autoResize() // Initial resize
    }
  }
  
  function initializeChangeTracking() {
    let formChanged = false;
    const form = document.getElementById("editBookForm");
    const saveIndicator = document.getElementById("saveIndicator");

    if (form) {
        // Marcar el formulario como modificado cuando se hace un cambio
        form.addEventListener("input", () => {
            formChanged = true;
            if (saveIndicator) {
                saveIndicator.classList.remove("visible");
            }
        });

        // Resetear el estado de cambios cuando se envía el formulario
        form.addEventListener("submit", () => {
            formChanged = false;
        });

        // Advertir solo si se intenta salir sin enviar el formulario
        window.addEventListener("beforeunload", (e) => {
            if (formChanged) {
                e.preventDefault();
                e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
            }
        });
    }
}

function initializeFormSubmission() {
    const form = document.getElementById("editBookForm");
    const saveBtn = document.getElementById("saveBtn");

    if (form && saveBtn) {
        form.addEventListener("submit", (e) => {
            if (!validateForm()) {
                e.preventDefault();
                return;
            }
            // No es necesario prevenir el comportamiento por defecto aquí
            handleFormSubmission();
        });
    }
}
  
  function initializeInputStyling() {
    const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
  
    formInputs.forEach((input) => {
      // Handle label animation
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })
  
      input.addEventListener("blur", function () {
        if (!this.value.trim() && this.tagName !== "SELECT") {
          this.parentElement.classList.remove("focused")
        }
      })
  
      // Check if input has value on load
      if (input.value.trim() || (input.tagName === "SELECT" && input.value)) {
        input.parentElement.classList.add("focused")
      }
    })
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
  
  function validateForm() {
    const requiredInputs = document.querySelectorAll(".form-input[required], .form-select[required]")
    let isValid = true
  
    requiredInputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false
      }
    })
  
    return isValid
  }
  
  function handleFormSubmission() {
    const saveBtn = document.getElementById("saveBtn")
  
    if (!saveBtn) return
  
    // Add loading state
    saveBtn.classList.add("loading")
    saveBtn.disabled = true
  
    // Reset button state after 5 seconds (fallback)
    setTimeout(() => {
      resetSubmitButton()
    }, 5000)
  }
  
  function resetSubmitButton() {
    const saveBtn = document.getElementById("saveBtn")
  
    if (!saveBtn) return
  
    saveBtn.classList.remove("loading")
    saveBtn.disabled = false
  
    // Show save indicator
    const saveIndicator = document.getElementById("saveIndicator")
    if (saveIndicator) {
      saveIndicator.classList.add("visible")
      setTimeout(() => {
        saveIndicator.classList.remove("visible")
      }, 3000)
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
  
  function confirmDelete(bookId, bookTitle) {
    const modal = document.getElementById("deleteModal")
    const bookTitleSpan = document.getElementById("bookTitle")
    const deleteForm = document.getElementById("deleteForm")
  
    if (bookTitleSpan) bookTitleSpan.textContent = bookTitle
    if (deleteForm) deleteForm.action = `/Books/Delete/${bookId}`
  
    showModal(modal)
  }
  
  function closeDeleteModal() {
    const modal = document.getElementById("deleteModal")
    hideModal(modal)
  }
  
  function showModal(modal) {
    if (modal) {
      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    }
  }
  
  function hideModal(modal) {
    if (modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  }
  
  function duplicateBook() {
    // Get current form data
    const titleInput = document.querySelector('input[name="Title"]')
    const authorInput = document.querySelector('input[name="Author"]')
    const genreSelect = document.querySelector('select[name="Genre"]')
    const dateInput = document.querySelector('input[name="PublicationDate"]')
    const descriptionTextarea = document.querySelector('textarea[name="Description"]')
  
    // Create URL with query parameters for the Create action
    const params = new URLSearchParams()
    if (titleInput?.value) params.append("title", titleInput.value + " (Copy)")
    if (authorInput?.value) params.append("author", authorInput.value)
    if (genreSelect?.value) params.append("genre", genreSelect.value)
    if (dateInput?.value) params.append("publicationDate", dateInput.value)
    if (descriptionTextarea?.value) params.append("description", descriptionTextarea.value)
  
    // Navigate to Create page with pre-filled data
    window.location.href = `/Books/Create?${params.toString()}`
  }
  
  function addPageAnimations() {
    // Add stagger animation to form elements
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`
      group.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".primary-btn, .secondary-btn, .action-btn")
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
  
  function initializeAutoSave() {
    const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
    let autoSaveTimeout
  
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        clearTimeout(autoSaveTimeout)
        autoSaveTimeout = setTimeout(() => {
          saveFormData()
        }, 2000) // Save after 2 seconds of inactivity
      })
    })
  }
  
  function saveFormData() {
    const formData = {
      title: document.querySelector('input[name="Title"]')?.value || "",
      author: document.querySelector('input[name="Author"]')?.value || "",
      genre: document.querySelector('select[name="Genre"]')?.value || "",
      publicationDate: document.querySelector('input[name="PublicationDate"]')?.value || "",
      description: document.querySelector('textarea[name="Description"]')?.value || "",
    }
  
    localStorage.setItem("editBookFormData", JSON.stringify(formData))
  
    // Show save indicator briefly
    const saveIndicator = document.getElementById("saveIndicator")
    if (saveIndicator) {
      saveIndicator.classList.add("visible")
      setTimeout(() => {
        saveIndicator.classList.remove("visible")
      }, 2000)
    }
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
  
  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const deleteModal = document.getElementById("deleteModal")
    if (e.target === deleteModal) {
      closeDeleteModal()
    }
  })
  
  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape key to close modals
    if (e.key === "Escape") {
      closeDeleteModal()
    }
  
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault()
      const form = document.getElementById("editBookForm")
      if (form) {
        form.submit()
      }
    }
  })
  