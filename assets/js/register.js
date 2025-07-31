// Registration Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Initialize form functionality
function initializeForm() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Password confirmation validation
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (passwordInput && confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        }
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-register-submit');
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (isValid) {
        // Show loading state
        setLoadingState(submitBtn, true);
        
        // Simulate form submission
        setTimeout(() => {
            setLoadingState(submitBtn, false);
            showSuccessMessage();
        }, 2000);
    }
}

// Validate entire form
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Special validation for password match
    if (!validatePasswordMatch()) {
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    removeFieldError(field);
    
    // Check if field is empty
    if (!value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required`;
    } else {
        // Field-specific validation
        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'password':
                if (field.id === 'password' && !isValidPassword(value)) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
                }
                break;
        }
    }
    
    // Apply validation styling
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Validate password match
function validatePasswordMatch() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (!passwordInput || !confirmPasswordInput) return true;
    
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Remove existing validation classes
    confirmPasswordInput.classList.remove('is-valid', 'is-invalid');
    removeFieldError(confirmPasswordInput);
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.classList.add('is-invalid');
        showFieldError(confirmPasswordInput, 'Passwords do not match');
        return false;
    } else if (confirmPassword && password === confirmPassword) {
        confirmPasswordInput.classList.add('is-valid');
    }
    
    return true;
}

// Clear field error on input
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    removeFieldError(field);
}

// Show field error
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Remove field error
function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// Get field label
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggleBtn = field.parentNode.querySelector('.password-toggle');
    const icon = toggleBtn.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Set loading state
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Show success message
function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <div class="notification-text">
                <h4>Registration Successful!</h4>
                <p>Welcome to EverGreen Freelancing. Please check your email to verify your account.</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
} 