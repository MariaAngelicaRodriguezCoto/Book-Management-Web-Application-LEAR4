function confirmDelete(event) {
    if (!confirm('Are you sure you want to delete this item?')) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const alerts = document.getElementsByClassName('alert');
        for(let alert of alerts) {
            if (alert.classList.contains('alert-success')) {
                alert.style.display = 'none';
            }
        }
    }, 3000);
});

function validateForm() {
    const forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});