document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const comentarios = document.getElementById('comentarios');
    const charCount = document.getElementById('charCount');
    
    // Contador de caracteres para el textarea
    if (comentarios && charCount) {
        comentarios.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength}/500`;
            
            if (currentLength > 500) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#7f8c8d';
            }
        });
    }
    
    // Validación personalizada del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validación personalizada adicional
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const telefono = document.getElementById('telefono');
        const pais = document.getElementById('pais');
        const conocimiento = document.querySelector('input[name="conocimiento"]:checked');
        const terminos = document.getElementById('terminos');
        
        // Limpiar mensajes de error
        clearErrorMessages();
        
        // Validar nombre
        if (nombre.value.trim().length < 3) {
            showError('nombreError', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        // Validar email
        if (!isValidEmail(email.value)) {
            showError('emailError', 'Por favor, introduce un email válido');
            isValid = false;
        }
        
        // Validar contraseña
        if (!isValidPassword(password.value)) {
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
            isValid = false;
        }
        
        // Validar fecha de nacimiento
        if (fechaNacimiento.value) {
            const birthDate = new Date(fechaNacimiento.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 2020) {
                showError('fechaError', 'Debes tener al menos 13 años para registrarte');
                isValid = false;
            }
        }
        
        // Validar teléfono (si se ha proporcionado)
        if (telefono.value && !isValidPhone(telefono.value)) {
            showError('telefonoError', 'El teléfono debe tener 9 dígitos');
            isValid = false;
        }
        
        // Validar país
        if (!pais.value) {
            showError('paisError', 'Por favor, selecciona un país');
            isValid = false;
        }
        
        // Validar términos y condiciones
        if (!terminos.checked) {
            showError('terminosError', 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            alert('¡Formulario enviado correctamente!');
            form.reset();
            charCount.textContent = '0/500';
        }
    });
    
    // Función para mostrar mensajes de error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // Función para limpiar mensajes de error
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.textContent = '';
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar contraseña
    function isValidPassword(password) {
        // Al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }
    
    // Función para validar teléfono
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{9}$/;
        return phoneRegex.test(phone);
    }
});