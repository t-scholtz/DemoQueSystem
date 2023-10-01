// Queue array to store names, timestamps, and wait times
const queue = [];
const waitTimes = []; // Array to store wait times

// DOM elements
const queueList = document.getElementById('queue-list');
const nameInput = document.getElementById('name-input');
const addButton = document.getElementById('add-button');
const removeButton = document.getElementById('remove-button');
const averageWaitTimeDisplay = document.getElementById('average-wait-time');

// Function to display the queue
function displayQueue() {
    queueList.innerHTML = '';
    for (let i = 0; i < queue.length; i++) {
        const listItem = document.createElement('li');
        const nameAndTime = queue[i];
        listItem.textContent = `${nameAndTime.name} - ${nameAndTime.timestamp}`;
        queueList.appendChild(listItem);
    }
}

// Function to calculate the average wait time
function calculateAverageWaitTime() {
    const numNamesToConsider = Math.min(waitTimes.length, 5);
    const lastFiveWaitTimes = waitTimes.slice(-numNamesToConsider);
    const sumWaitTimesMillis = lastFiveWaitTimes.reduce((acc, waitTime) => acc + waitTime, 0);
    const averageWaitTimeMillis = numNamesToConsider > 0 ? sumWaitTimesMillis / numNamesToConsider : 0;
    
    // Convert milliseconds to minutes (1 minute = 60000 milliseconds)
    const averageWaitTimeMinutes = (averageWaitTimeMillis / 60000).toFixed(2);
    return averageWaitTimeMinutes;
}

// Function to update the average wait time display
function updateAverageWaitTimeDisplay() {
    const averageWaitTime = calculateAverageWaitTime();
    averageWaitTimeDisplay.textContent = `Average Wait Time (Last 5 names): ${averageWaitTime} minutes`;
}

// Add a name to the queue with a timestamp and calculate wait time
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== '') {
        const entryTime = new Date().getTime();
        const timestamp = new Date().toLocaleTimeString();
        queue.push({ name, timestamp, entryTime });
        
        // Calculate wait time for the last entered name
        if (queue.length > 1) {
            const lastEntryTime = queue[queue.length - 2].entryTime;
            const waitTime = entryTime - lastEntryTime;
        }
        nameInput.value = '';
        displayQueue();
    }
});

// Remove a name from the queue and calculate wait time
removeButton.addEventListener('click', () => {
    if (queue.length > 0) {
        const exitTime = new Date().getTime();
        const entryTime = queue[0].entryTime;
        const waitTime = exitTime - entryTime;
        waitTimes.push(waitTime);
        if (waitTimes.length > 5) {
            waitTimes.shift(); // Remove the oldest wait time
        }
        queue.shift();
        updateAverageWaitTimeDisplay();
        displayQueue();
    }
});
