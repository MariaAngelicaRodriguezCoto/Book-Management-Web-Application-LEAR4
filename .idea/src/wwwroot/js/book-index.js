// Book Index Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeViewToggle();
    initializeSorting();
});

let allBooks = []
let filteredBooks = []
let currentView = "grid"

function initializeBookIndex() {
    // Initialize data
    initializeBookData()

    // Initialize search functionality
    initializeSearch()

    // Initialize view toggle
    initializeViewToggle()

    // Initialize sorting
    initializeSorting()

    // Initialize animations
    addAnimations()

    // Update counts
    updateResultsCount()
}

function initializeBookData() {
    // Collect all book data from DOM
    const bookCards = document.querySelectorAll(".book-card")
    allBooks = Array.from(bookCards).map((card) => ({
      element: card,
      title: card.dataset.title,
      author: card.dataset.author,
      genre: card.dataset.genre,
      date: card.dataset.date,
    }))
    filteredBooks = [...allBooks]
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const booksContainer = document.getElementById('booksContainer');
    const bookCards = document.querySelectorAll('.book-card');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            bookCards.forEach(card => {
                const title = card.dataset.title;
                const author = card.dataset.author;
                const isVisible = title.includes(searchTerm) || author.includes(searchTerm);
                card.style.display = isVisible ? '' : 'none';
            });
        });
    }
}

function initializeViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const booksContainer = document.getElementById('booksContainer');

    if (gridViewBtn && listViewBtn && booksContainer) {
        gridViewBtn.addEventListener('click', function() {
            booksContainer.className = 'books-grid';
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', function() {
            booksContainer.className = 'books-list';
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }
}

function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    const booksContainer = document.getElementById('booksContainer');

    if (sortSelect && booksContainer) {
        sortSelect.addEventListener('change', function() {
            const bookCards = Array.from(document.querySelectorAll('.book-card'));
            const sortBy = this.value;

            bookCards.sort((a, b) => {
                if (sortBy === 'title') {
                    return a.dataset.title.localeCompare(b.dataset.title);
                } else if (sortBy === 'author') {
                    return a.dataset.author.localeCompare(b.dataset.author);
                }
                return 0;
            });

            bookCards.forEach(card => booksContainer.appendChild(card));
        });
    }
}

function addAnimations() {
    // Add staggered animation to book cards
    const bookCards = document.querySelectorAll(".book-card")
    bookCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`
      card.style.animation = "fadeInUp 0.6s ease-out forwards"
    })
  }
  
  function updateResultsCount() {
    const visibleCount = document.getElementById("visibleCount")
    const totalCount = document.getElementById("totalCount")
  
    if (visibleCount)
      visibleCount.textContent = document.querySelectorAll(".book-card:not([style*='display: none'])").length
    if (totalCount) totalCount.textContent = allBooks.length
  }
  
  // Handle loading states for navigation
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a, button[type='submit']")
    if (target && !target.classList.contains("secondary-action") && !target.classList.contains("modal-btn")) {
      // Show loading for navigation actions
      setTimeout(() => {
        showLoadingOverlay()
      }, 100)
    }
  })
  
  // Funciones para el modal de eliminación
function confirmDelete(bookId, bookTitle) {
    const modal = document.getElementById('deleteModal');
    const titleSpan = document.getElementById('bookTitle');
    const deleteForm = document.getElementById('deleteForm');

    if (modal && titleSpan && deleteForm) {
        // Configurar el título del libro en el modal
        titleSpan.textContent = bookTitle;

        // Configurar el formulario de eliminación
        deleteForm.action = `/Books/Delete/${bookId}`;

        // Mostrar el modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target === modal) {
        closeDeleteModal();
    }
});
  
  // Handle page visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      hideLoadingOverlay()
    }
  })
  
  // Declare the missing functions
  function showLoadingOverlay() {
    // Implementation for showing loading overlay
    const overlay = document.createElement("div")
    overlay.className = "loading-overlay"
    document.body.appendChild(overlay)
  }
  
  function hideLoadingOverlay() {
    // Implementation for hiding loading overlay
    const overlay = document.querySelector(".loading-overlay")
    if (overlay) {
      document.body.removeChild(overlay)
    }
  }
  