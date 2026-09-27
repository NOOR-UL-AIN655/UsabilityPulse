// Create a unique session ID

const sessionId =
    "session_" + Math.random().toString(36).substring(2, 10);

// Show session ID in console
console.log("Session ID:", sessionId);
console.log("UsabilityPulse Tracker Loaded!");

// Click tracking
document.addEventListener("click", function (event) {

    // Create data for the click
    const clickData = {
        sessionId: sessionId,
        eventType: "click",
        element: event.target.tagName,
        elementId: event.target.id,
        text: event.target.innerText,
        x: event.pageX,
        y: event.pageY,
        timestamp: new Date().toISOString()
    };

    // Get previously saved events
    let events = JSON.parse(localStorage.getItem("usabilityEvents")) || [];

    // Add the new click event
    events.push(clickData);

    // Save updated events
    localStorage.setItem("usabilityEvents", JSON.stringify(events));

    // Show the saved data in console
    console.log("Click Data:", clickData);
    console.log("All Events:", events);
});

// Scroll tracking

// Store the last recorded scroll milestone
let lastScrollMilestone = 0;


window.addEventListener("scroll", function () {

    // Calculate how far the user has scrolled
    const scrollTop = window.scrollY;

    // Calculate the total scrollable height
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    // Calculate scroll percentage
    const scrollPercentage =
        Math.round((scrollTop / documentHeight) * 100);


    // Determine the current milestone
    let currentMilestone = 0;

    if (scrollPercentage >= 100) {
        currentMilestone = 100;
    } else if (scrollPercentage >= 75) {
        currentMilestone = 75;
    } else if (scrollPercentage >= 50) {
        currentMilestone = 50;
    } else if (scrollPercentage >= 25) {
        currentMilestone = 25;
    }


    // Save only when a new milestone is reached
    if (
        currentMilestone > 0 &&
        currentMilestone !== lastScrollMilestone
    ) {

        // Create scroll event data
        const scrollData = {
            sessionId: sessionId,
            eventType: "scroll",
            scrollPercentage: currentMilestone,
            timestamp: new Date().toISOString()
        };


        // Get previously saved events
        let events =
            JSON.parse(localStorage.getItem("usabilityEvents")) || [];


        // Add scroll event
        events.push(scrollData);


        // Save updated events
        localStorage.setItem(
            "usabilityEvents",
            JSON.stringify(events)
        );


        // Remember the last milestone
        lastScrollMilestone = currentMilestone;


        // Show scroll data
        console.log("Scroll Data:", scrollData);
    }
});

// Hover tracking
document.addEventListener("mouseover", function (event) {

    // Get the element where the mouse is
    const target = event.target;

    // Only track important interactive elements
    if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT"
    ) {

        // Ignore mouse movements inside the same element
        if (target.contains(event.relatedTarget)) {
            return;
        }

        // Create hover event data
        const hoverData = {
            sessionId: sessionId,
            eventType: "hover",
            element: target.tagName,
            elementId: target.id,
            text: target.innerText || target.placeholder || "",
            timestamp: new Date().toISOString()
        };

        // Get previously saved events
        let events =
            JSON.parse(localStorage.getItem("usabilityEvents")) || [];

        // Add hover event
        events.push(hoverData);

        // Save updated events
        localStorage.setItem(
            "usabilityEvents",
            JSON.stringify(events)
        );

        // Show hover data
        console.log("Hover Data:", hoverData);
    }
});

// Page time tracking

console.log("Page timer started:", new Date().toISOString());

// Store the time when the page was opened
let pageStartTime = Date.now();


// Track when the page becomes hidden
document.addEventListener("visibilitychange", function () {

    if (document.visibilityState === "hidden") {

        // Calculate time spent since the page became visible
        const timeSpent = Date.now() - pageStartTime;

        // Convert milliseconds into seconds
        const timeSpentSeconds = Math.round(timeSpent / 1000);

        // Create time event data
        const timeData = {
            sessionId: sessionId,
            eventType: "page_time",
            timeSpentSeconds: timeSpentSeconds,
            timestamp: new Date().toISOString()
        };

        // Get previously saved events
        let events = JSON.parse(localStorage.getItem("usabilityEvents")) || [];

        // Add time event
        events.push(timeData);

        // Save updated events
        localStorage.setItem("usabilityEvents", JSON.stringify(events));

        console.log("Page Time Data:", timeData);
    }


    // When page becomes visible again, restart the timer
    if (document.visibilityState === "visible") {

        pageStartTime = Date.now();

        console.log("Page timer restarted:", new Date().toISOString());
    }
});

// Input interaction tracking

document.addEventListener("blur", function (event) {

    // Check if the user interacted with an input field
    if (event.target.tagName === "INPUT") {

        // Create input event data
        const inputData = {
            sessionId: sessionId,
            eventType: "input",
            element: event.target.tagName,
            elementId: event.target.id,
            valueLength: event.target.value.length,
            timestamp: new Date().toISOString()
        };


        // Get previously saved events
        let events =
            JSON.parse(localStorage.getItem("usabilityEvents")) || [];


        // Add input event
        events.push(inputData);


        // Save updated events
        localStorage.setItem(
            "usabilityEvents",
            JSON.stringify(events)
        );


        // Show input data
        console.log("Input Data:", inputData);
    }
}, true);

// Error tracking

document.addEventListener("invalid", function (event) {

    // Create error event data
    const errorData = {
        sessionId: sessionId,
        eventType: "error",
        element: event.target.tagName,
        elementId: event.target.id,
        errorMessage: event.target.validationMessage,
        timestamp: new Date().toISOString()
    };

    // Get previously saved events
    let events = JSON.parse(localStorage.getItem("usabilityEvents")) || [];

    // Add error event
    events.push(errorData);

    // Save updated events
    localStorage.setItem("usabilityEvents", JSON.stringify(events));

    // Show error data
    console.log("Error Data:", errorData);
}, true);
