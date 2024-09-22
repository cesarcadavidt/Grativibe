// Quotes Functionality with images
const quotes = [
    {
        text: "Happiness is not something ready-made. It comes from your own actions.",
        image: "images/quote1.jpg"
    },
    {
        text: "The only way to do great work is to love what you do.",
        image: "images/quote2.jpg"
    },
    {
        text: "Positive anything is better than negative nothing.",
        image: "images/quote3.jpg"
    },
    {
        text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        image: "images/quote4.jpg"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        image: "images/quote5.jpg"
    },
    {
        text: "Your time is limited, so don’t waste it living someone else’s life.",
        image: "images/quote6.jpg"
    },
    {
        text: "You miss 100% of the shots you don’t take.",
        image: "images/quote7.jpg"
    },
    {
        text: "Believe you can and you’re halfway there.",
        image: "images/quote8.jpg"
    },
    {
        text: "Act as if what you do makes a difference. It does.",
        image: "images/quote9.jpg"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        image: "images/quote10.jpg"
    },
    {
        text: "In the end, we only regret the chances we didn’t take.",
        image: "images/quote11.jpg"
    },
    {
        text: "Start where you are. Use what you have. Do what you can.",
        image: "images/quote12.jpg"
    },
    {
        text: "The best way to predict the future is to create it.",
        image: "images/quote13.jpg"
    },
    {
        text: "Don’t watch the clock; do what it does. Keep going.",
        image: "images/quote14.jpg"
    },
    {
        text: "Success is not the key to happiness. Happiness is the key to success.",
        image: "images/quote15.jpg"
    },
    {
        text: "What we think, we become.",
        image: "images/quote16.jpg"
    },
    {
        text: "The harder you work for something, the greater you’ll feel when you achieve it.",
        image: "images/quote17.jpg"
    },
    {
        text: "Dream big and dare to fail.",
        image: "images/quote18.jpg"
    },
    {
        text: "Don’t stop when you’re tired. Stop when you’re done.",
        image: "images/quote19.jpg"
    },
    {
        text: "Difficult roads often lead to beautiful destinations.",
        image: "images/quote20.jpg"
    }
];

////////////////
//// QUOTES ////
////////////////

let quotesDisplayed = []; // Track displayed quotes

// Function to display a random quote and ensure no repetition until all quotes are shown
function displayRandomQuote() {
    // Check if all quotes have been displayed, then reset the array
    if (quotesDisplayed.length === quotes.length) {
        quotesDisplayed = []; // Reset after all quotes are shown
    }

    let randomQuote;
    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (quotesDisplayed.includes(randomQuote));
    // Add the selected quote to the displayed quotes array
    quotesDisplayed.push(randomQuote);
    // Update the quote text and image in the DOM
    document.getElementById('quote-text').innerText = `"${randomQuote.text}"`;
    document.getElementById('quote-image').src = randomQuote.image;
    // Apply fade-in effect
    applyFadeInEffect();
}

// Function to handle fade-in effect for text and image
function applyFadeInEffect() {
    const quoteText = document.getElementById('quote-text');
    const quoteImage = document.getElementById('quote-image');
    // Remove the fade-in effect class to reset it
    quoteText.classList.remove('fade-in');
    quoteImage.classList.remove('fade-in');
    // Reapply the fade-in effect after a short delay
    setTimeout(() => {
        quoteText.classList.add('fade-in');
        quoteImage.classList.add('fade-in');
    }, 10); // Slight delay to trigger the animation
}

// Event listener for "Get a New Quote" button
document.getElementById('new-quote-btn').addEventListener('click', displayRandomQuote);

// Display a random quote when the page loads
window.onload = displayRandomQuote;

// Tab functionality
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        tabLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
        tabContents.forEach(section => section.classList.add('hidden'));
        const sectionToShow = document.getElementById(this.dataset.section);
        sectionToShow.classList.remove('hidden');
        sectionToShow.style.opacity = 0;  // Hide initially
        setTimeout(() => {
            sectionToShow.style.opacity = 1;  // Smooth fade-in
        }, 50);
    });
});

////////////////
//// HABITS ////
////////////////

// Habit Tracker with completion and delete functionality
let habits = JSON.parse(localStorage.getItem('habits')) || [];

const habitList = document.getElementById('habit-list');
const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');

// Function to render the list of habits
function renderHabits() {
    habitList.innerHTML = ''; // Clear current list before rendering

    habits.forEach((habitObj, index) => {
        const li = document.createElement('li');
        li.classList.add('habit-item');

        // Create a checkbox to mark the habit as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('habit-checkbox');
        checkbox.checked = habitObj.completed; // Set the checkbox state
        checkbox.addEventListener('change', () => {
            habitObj.completed = checkbox.checked; // Update habit completion state
            updateHabits();
        });

        // Create a span to hold the habit text
        const habitText = document.createElement('span');
        habitText.innerText = habitObj.text;

        // Add the 'completed' class only if the habit is marked as completed
        if (habitObj.completed) {
            habitText.classList.add('completed');
        }

        // Create a delete button (trash icon)
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️'; // Trash emoji or use an actual icon in your project
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to remove "${habitObj.text}"?`)) {
                habits.splice(index, 1); // Remove habit from array
                updateHabits(); // Update storage and re-render
            }
        });

        // Append checkbox, habit text, and delete button to the list item
        li.appendChild(checkbox);
        li.appendChild(habitText);
        li.appendChild(deleteBtn);
        habitList.appendChild(li);
    });
}

// Function to update local storage and re-render the list
function updateHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

// Event listener for adding a new habit
habitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const habitText = habitInput.value.trim(); // Get the input value

    if (habitText) {
        // Add new habit object with 'completed' status
        habits.push({ text: habitText, completed: false });
        updateHabits(); // Update local storage and re-render list
        habitInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a habit before adding.');
    }
});

// Initial render of the habits
renderHabits();

////////////////
// MEDITATION //
////////////////
// Variables for meditation functionality
let meditationTime; // This will be based on the length of the audio track
let timerInterval;
let isMeditating = false;
let isPaused = false;
let currentTrack = 0;
let previousTrackIndex = -1; // Initialize with -1 so the first track is always different
const tracks = [
    "audio/meditation1.mp3", 
    "audio/meditation2.mp3", 
    "audio/meditation3.mp3", 
    "audio/meditation4.mp3", 
    "audio/meditation5.mp3"
];
let meditationAudio = document.getElementById('meditation-audio');
let meditationBtn = document.getElementById('meditate-btn');
let restartBtn = document.getElementById('restart-btn'); // New restart button
let meditationSteps = [
    "Take a deep breath and relax as much as you can.",
    "Focus on the sensation of your breath entering and leaving your body.",
    "Notice how your chest and abdomen rise and fall with each breath.",
    "Relax your shoulders, neck, and arms, letting them drop naturally.",
    "Feel any tension in your body and slowly release it with each exhale.",
    "Allow your mind to clear, letting go of any thoughts or worries.",
    "Listen to the sounds around you without judgment, just observe.",
    "Bring your attention to your heartbeat and feel its gentle rhythm.",
    "Picture a calming place in your mind, somewhere that brings you peace.",
    "Take this moment to be fully present, connected with your inner self.",
    "Let your breath guide you back into the present, gently and slowly.",
    "Start to notice the feeling of your body in the room.",
    "Wiggle your fingers and toes to bring awareness back to your body.",
    "When you're ready, slowly open your eyes and take one last deep breath.",
    "End your meditation with a smile, feeling refreshed and calm."
];

// Function to switch tracks each time the user starts a new session
function switchTrack() {
    let randomTrackIndex;

    // Ensure the next track is not the same as the last one
    do {
        randomTrackIndex = Math.floor(Math.random() * tracks.length); // Random index between 0 and 4
    } while (randomTrackIndex === previousTrackIndex);

    previousTrackIndex = randomTrackIndex; // Store the current track index for next comparison
    meditationAudio.src = tracks[randomTrackIndex]; // Set the audio source to the new random track
}

// Function to display meditation steps with animations and synchronized timing
function displayMeditationSteps() {
    const stepsContainer = document.getElementById('meditation-steps');
    stepsContainer.innerHTML = ''; // Clear previous steps

    const totalSteps = meditationSteps.length;
    const timePerStep = meditationAudio.duration / totalSteps; // Calculate dynamic time for each step

    meditationSteps.forEach((step, index) => {
        const stepElement = document.createElement('p');
        stepElement.innerText = step;
        stepElement.classList.add('meditation-step');  // Apply base class
        stepsContainer.appendChild(stepElement);

        // Set a timeout to highlight the current step and remove highlight from previous steps
        setTimeout(() => {
            document.querySelectorAll('.meditation-step').forEach(s => s.classList.remove('current-step')); // Remove highlight from all steps
            stepElement.classList.add('current-step');  // Highlight the current step
        }, index * timePerStep * 1000); // Delay each step based on the time per step
    });
}

// Function to toggle meditation session (start/pause/reset)
meditationBtn.addEventListener('click', function() {
    if (!isMeditating) {
        startMeditationSession(); // Start meditation
    } else if (isPaused) {
        resumeMeditation(); // Resume if paused
    } else {
        pauseMeditation(); // Otherwise, pause
    }
});

let startTime;
let meditationTimeRemaining; // Time remaining for meditation

// Function to start meditation session
function startMeditationSession() {
    isMeditating = true;
    isPaused = false;

    switchTrack(); // Load the next track

    // Wait for the audio to be loaded before starting the steps
    meditationAudio.addEventListener('loadedmetadata', () => {
        meditationTime = Math.floor(meditationAudio.duration); // Get audio duration in seconds
        meditationTimeRemaining = meditationTime; // Set the initial remaining time

        displayMeditationSteps(); // Show meditation instructions

        startTime = Date.now(); // Record the start time
        document.getElementById('meditation-timer').innerText = formatTime(meditationTimeRemaining); // Set the timer text

        // Start the meditation timer
        timerInterval = setInterval(updateMeditationTimer, 1000);
        meditationBtn.innerText = 'Pause Meditation'; // Change button text
    });

    // Play the audio after loading metadata
    meditationAudio.play().catch(error => console.log(error)); // Play audio and catch any errors
}

// Function to update the meditation timer based on real elapsed time
function updateMeditationTimer() {
    if (!isPaused) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
        meditationTimeRemaining = meditationTime - elapsedTime;

        if (meditationTimeRemaining <= 0) {
            stopMeditation(); // When time is up, stop the session
        } else {
            document.getElementById('meditation-timer').innerText = formatTime(meditationTimeRemaining); // Update timer text
        }
    }
}

// Function to pause meditation
function pauseMeditation() {
    isPaused = true;
    meditationAudio.pause(); // Pause the audio
    clearInterval(timerInterval); // Pause the timer
    meditationBtn.innerText = 'Resume Meditation'; // Change button text
}

// Function to resume meditation
function resumeMeditation() {
    isPaused = false;
    startTime = Date.now() - (meditationTime - meditationTimeRemaining) * 1000; // Adjust start time
    meditationAudio.play().catch(error => console.log(error)); // Resume audio and catch any errors
    timerInterval = setInterval(updateMeditationTimer, 1000); // Resume timer
    meditationBtn.innerText = 'Pause Meditation'; // Change button text
}

// Function to stop meditation session completely
function stopMeditation() {
    isMeditating = false;
    isPaused = false;
    meditationAudio.pause(); // Stop audio
    meditationAudio.currentTime = 0; // Reset audio time
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('meditation-timer').innerText = formatTime(meditationAudio.duration); // Reset timer text
    document.getElementById('meditation-steps').innerHTML = ''; // Clear meditation steps
    meditationBtn.innerText = 'Start 5-Minute Meditation'; // Reset button text
}

// Function to format the timer display (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Function to handle the countdown timer
function startMeditationTimer() {
    if (!isPaused) {
        meditationTime--;
        document.getElementById('meditation-timer').innerText = formatTime(meditationTime);

        // When time is up, stop the session
        if (meditationTime <= 0) {
            stopMeditation();
        }
    }
}

// Restart meditation with a new song
restartBtn.addEventListener('click', function() {
    stopMeditation(); // Stop the current session
    startMeditationSession(); // Start a new session with a new song
});

// Event listener for pausing the timer when clicking on the timer
document.getElementById('meditation-timer').addEventListener('click', function() {
    if (isMeditating) {
        if (isPaused) {
            resumeMeditation();
        } else {
            pauseMeditation();
        }
    }
});
