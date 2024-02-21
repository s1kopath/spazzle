// Function to capture entire screen and save screenshot
function captureAndSaveScreenshot() {
    // Check if the browser supports getDisplayMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        console.error('getDisplayMedia is not supported in this browser');
        return;
    }

    // Prompt user for permission to capture screen
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
            // Success: Handle the captured screen stream
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();

            // Wait for video to be loaded and ready
            videoElement.addEventListener('loadedmetadata', () => {
                // Create a canvas element with the same dimensions as the video
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                // Draw the video frame onto the canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Convert canvas content to a data URL representing a PNG image
                const dataURL = canvas.toDataURL('image/png');

                // Trigger download of the image
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'screenshot.png'; // Set the file name
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Stop the stream
                stream.getTracks().forEach(track => track.stop());
            });
        })
        .catch(error => {
            // Error: Handle permission denied or other errors
            console.error('Error accessing screen capture:', error);
        });
}

// Call captureAndSaveScreenshot() when a button is clicked
document.getElementById('captureButton').addEventListener('click', captureAndSaveScreenshot);