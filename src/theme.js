// Function to set the theme
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

// Function to load the theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Update the checked state of the radio inputs
        document
            .querySelectorAll('.theme-controller')
            .forEach((input) => (input.checked = input.value === savedTheme));
    }
}

// Event listener for theme picker
document.addEventListener('DOMContentLoaded', () => {
    loadTheme(); // Apply the theme on page load

    document.querySelectorAll('.theme-controller').forEach((input) => {
        input.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            setTheme(selectedTheme);
        });
    });
});
