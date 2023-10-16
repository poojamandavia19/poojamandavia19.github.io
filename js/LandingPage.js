
    const arcText = document.querySelector('.arc-text');
    const characters = arcText.querySelectorAll('span');
    const totalChars = characters.length;
    const angleIncrement = 5 / totalChars;

    characters.forEach((char, index) => {
    char.style.setProperty('--angle', `${angleIncrement * index}deg`);
    });
/* textbounce Script End */
    
    /* mouse banner movement Start * /
// Get a reference to the image element
const image = document.getElementById('responsive-image');

// Add an event listener to track mouse movement
document.addEventListener('mousemove', (e) => {
    // Calculate the horizontal and vertical mouse positions relative to the image
    const imageRect = image.getBoundingClientRect();
    const mouseX = e.clientX - imageRect.left;
    const mouseY = e.clientY - imageRect.top;

    // Calculate the transform values based on mouse position
    const rotateX = (mouseY / imageRect.height - 0.5) * 10; // Adjust the rotation range as needed
    const rotateY = (mouseX / imageRect.width - 0.5) * 10; // Adjust the rotation range as needed

    // Apply the transform to the image
    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
    /* mouse banner movement End */

    
