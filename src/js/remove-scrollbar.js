function hideScrollbars() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.overflow = 'hidden';
    });
}

// Call the function to hide scrollbars on all elements
hideScrollbars();
