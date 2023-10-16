document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const showDialog = urlParams.get('showDialog');

    if (showDialog === 'true') {
        openDialog();
    }
});

function openDialog() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeDialog() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
