function calculateOpacity(startDate, durationDays) {
    var currentDate = new Date();
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    var elapsedTime = currentDate - startDate;
    var remainingTime = durationDays * millisecondsPerDay - elapsedTime;
    var opacity = Math.max(0, Math.min(1, remainingTime / (durationDays * millisecondsPerDay)));
    return opacity;
}

function updateOpacity() {
    var startDateInput = document.getElementById('start-date').value;
    var durationInput = document.getElementById('duration').valueAsNumber;
    var startDate = new Date(startDateInput);
    
    if (isNaN(startDate.getTime())) {
        alert('Please enter a valid start date.');
        return;
    }
    
    if (durationInput <= 0) {
        alert('Please enter a valid duration (greater than 0).');
        return;
    }

    var opacity = calculateOpacity(startDate, durationInput);
    document.body.style.opacity = opacity;
}