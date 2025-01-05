document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    
    if (!name || !email || !phone || !dob || !password || !confirmPassword) {
        alert('Please fill out all fields.');
        return;
    }

    
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 2000); 
});
