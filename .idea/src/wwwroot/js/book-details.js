// Book Details Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
    initializeBookDetails()
  })
  
  function initializeBookDetails() {
    // Initialize animations
    addPageAnimations()
  
    // Initialize description toggle
    initializeDescriptionToggle()
  
    // Initialize tooltips
    initializeTooltips()
  
  }
  
  function addPageAnimations() {
    // Add stagger animation to info items
    const infoItems = document.querySelectorAll(".info-item")
    infoItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    // Add stagger animation to stat items
    const statItems = document.querySelectorAll(".stat-item")
    statItems.forEach((item, index) => {
      item.style.animationDelay = `${(index + infoItems.length) * 0.1}s`
      item.style.animation = "slideUp 0.6s ease-out forwards"
    })
  
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".primary-btn, .secondary-btn, .action-btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)"
      })
  
      button.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
      })
    })
  }
  
  function initializeDescriptionToggle() {
    const descriptionText = document.querySelector(".description-text")
    const expandBtn = document.getElementById("expandBtn")
  
    if (!descriptionText || !expandBtn) return
  
    // Check if description needs expand button
    if (descriptionText.scrollHeight <= 120) {
      expandBtn.style.display = "none"
      return
    }
  
    expandBtn.addEventListener("click", () => {
      toggleDescription()
    })
  }
  
  function toggleDescription() {
    const descriptionText = document.querySelector(".description-text")
    const expandBtn = document.getElementById("expandBtn")
    const expandText = document.getElementById("expandText")
    const expandIcon = document.getElementById("expandIcon")
  
    if (!descriptionText || !expandBtn || !expandText || !expandIcon) return
  
    const isExpanded = descriptionText.classList.contains("expanded")
  
    if (isExpanded) {
      // Collapse
      descriptionText.classList.remove("expanded")
      expandBtn.classList.remove("expanded")
      expandText.textContent = "Read More"
      expandIcon.classList.remove("fa-chevron-up")
      expandIcon.classList.add("fa-chevron-down")
    } else {
      // Expand
      descriptionText.classList.add("expanded")
      expandBtn.classList.add("expanded")
      expandText.textContent = "Read Less"
      expandIcon.classList.remove("fa-chevron-down")
      expandIcon.classList.add("fa-chevron-up")
    }
  }


  
  function getCurrentBookId() {
    // Extract book ID from URL or data attribute
    const url = window.location.pathname
    const matches = url.match(/\/Details\/(\d+)/)
    return matches ? matches[1] : null
  }
  
  function initializeTooltips() {
    // Add tooltips to action buttons
    const tooltips = {
      ".edit-btn": "Edit this book (Ctrl+E)",
      ".back-btn": "Go back to book list",
    }
  
    Object.entries(tooltips).forEach(([selector, text]) => {
      const element = document.querySelector(selector)
      if (element) {
        element.title = text
      }
    })
  }
  
  
  function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
  
    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "9999",
      animation: "slideInRight 0.3s ease",
    })
  
    // Set background color based on type
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      info: "#3b82f6",
      warning: "#f59e0b",
    }
    notification.style.background = colors[type] || colors.info
  
    // Add to page
    document.body.appendChild(notification)
  
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }
  
  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const imageModal = document.getElementById("imageModal")
    const shareModal = document.getElementById("shareModal")
  
    if (e.target === imageModal) {
      closeImageModal()
    }
  
    if (e.target === shareModal) {
      closeShareModal()
    }
  })

  