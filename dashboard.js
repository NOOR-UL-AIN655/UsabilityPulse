// Get all saved usability events
const events = JSON.parse(localStorage.getItem("usabilityEvents")) || [];

// Count different types of events
const clickCount = events.filter(event => event.eventType === "click").length;

const hoverCount = events.filter(event => event.eventType === "hover").length;

const scrollCount = events.filter(event => event.eventType === "scroll").length;

const inputCount = events.filter(event => event.eventType === "input").length;

const errorCount = events.filter(event => event.eventType === "error").length;

// Find the most clicked element

const clickEvents = events.filter(
    event => event.eventType === "click"
);

const clickCounts = {};

clickEvents.forEach(function (event) {

    const elementName =
        event.elementId || event.element;

    clickCounts[elementName] =
        (clickCounts[elementName] || 0) + 1;
});


// Find the element with the highest number of clicks

let mostClickedElement = "No data";
let highestClickCount = 0;

for (const element in clickCounts) {

    if (clickCounts[element] > highestClickCount) {

        highestClickCount = clickCounts[element];
        mostClickedElement = element;
    }
}


// Calculate total page time
const pageTimeEvents = events.filter(
    event => event.eventType === "page_time"
);

const totalPageTime = pageTimeEvents.reduce(
    (total, event) => total + event.timeSpentSeconds,
    0
);


// Display the data on dashboard
document.getElementById("clickCount").textContent = clickCount;

document.getElementById("hoverCount").textContent = hoverCount;

document.getElementById("scrollCount").textContent = scrollCount;

document.getElementById("inputCount").textContent = inputCount;

document.getElementById("errorCount").textContent = errorCount;

// Convert page time into minutes and seconds

const minutes = Math.floor(totalPageTime / 60);

const seconds = totalPageTime % 60;


// Display readable page time

if (minutes > 0) {

    document.getElementById("pageTime").textContent =
        minutes + " min " + seconds + " sec";

} else {

    document.getElementById("pageTime").textContent =
        seconds + " sec";
}
    
// Display event summary

document.getElementById("summaryClicks").textContent =
    clickCount;

document.getElementById("summaryHovers").textContent =
    hoverCount;

document.getElementById("summaryScrolls").textContent =
    scrollCount;

document.getElementById("summaryInputs").textContent =
    inputCount;

document.getElementById("summaryErrors").textContent =
    errorCount;

// Display most clicked element

document.getElementById("mostClicked").textContent =
    "Most Clicked: " +
    mostClickedElement +
    " (" +
    highestClickCount +
    " clicks)";
    

// Find the most hovered element

const hoverEvents = events.filter(
    event => event.eventType === "hover"
);

const hoverCounts = {};

hoverEvents.forEach(function (event) {

    const elementName =
        event.elementId || event.element;

    hoverCounts[elementName] =
        (hoverCounts[elementName] || 0) + 1;
});


// Find the element with the highest number of hovers

let mostHoveredElement = "No data";
let highestHoverCount = 0;

for (const element in hoverCounts) {

    if (hoverCounts[element] > highestHoverCount) {

        highestHoverCount = hoverCounts[element];
        mostHoveredElement = element;
    }
}

// Display most hovered element

document.getElementById("mostHovered").textContent =
    "Most Hovered: " +
    mostHoveredElement +
    " (" +
    highestHoverCount +
    " hovers)";

    // Find the most interacted element

const interactionCounts = {};


// Count clicks

clickEvents.forEach(function (event) {

    const elementName =
        event.elementId || event.element;

    interactionCounts[elementName] =
        (interactionCounts[elementName] || 0) + 1;
});


// Count hovers

hoverEvents.forEach(function (event) {

    const elementName =
        event.elementId || event.element;

    interactionCounts[elementName] =
        (interactionCounts[elementName] || 0) + 1;
});


// Find the element with the highest interaction count

let mostInteractedElement = "No data";
let highestInteractionCount = 0;

for (const element in interactionCounts) {

    if (
        interactionCounts[element] >
        highestInteractionCount
    ) {

        highestInteractionCount =
            interactionCounts[element];

        mostInteractedElement = element;
    }
}
// Display most interacted element

document.getElementById("mostInteracted").textContent =
    "Most Interacted: " +
    mostInteractedElement +
    " (" +
    highestInteractionCount +
    " interactions)";
// Calculate error rate

const totalInteractions =
    clickCount +
    hoverCount +
    inputCount;

let errorRate = 0;

if (totalInteractions > 0) {

    errorRate =
        (errorCount / totalInteractions) * 100;
}

// Find the most error-prone element

const errorEvents =
    events.filter(event => event.eventType === "error");

const errorCounts = {};

errorEvents.forEach(function (event) {

    const elementName =
        event.elementId || event.element;

    errorCounts[elementName] =
        (errorCounts[elementName] || 0) + 1;
});

let mostErrorProneElement = "No data";
let highestErrorCount = 0;

for (const element in errorCounts) {

    if (errorCounts[element] > highestErrorCount) {

        highestErrorCount =
            errorCounts[element];

        mostErrorProneElement =
            element;
    }
}

// Display error rate

document.getElementById("errorRate").textContent =
    "Error Rate: " +
    errorRate.toFixed(2) +
    "%";    

// Display most error-prone element

document.getElementById("mostErrorProne").textContent =
    "Most Error-Prone: " +
    mostErrorProneElement +
    " (" +
    highestErrorCount +
    " errors)";
    
    
// Get the latest session ID
const latestEvent = events[events.length - 1];

if (latestEvent && latestEvent.sessionId) {
    document.getElementById("sessionId").textContent =
        "Session ID: " + latestEvent.sessionId;
}

// Get the events table body
const eventsBody = document.getElementById("eventsBody");

// Show the latest 10 events
const recentEvents = events.slice(-10).reverse();

recentEvents.forEach(function (event) {

    // Create a new table row
    const row = document.createElement("tr");

    // Add event data to the row
    row.innerHTML = `
        <td>${event.eventType}</td>
        <td>${event.element || "-"}</td>
        <td>${event.elementId || "-"}</td>
        <td>${new Date(event.timestamp).toLocaleTimeString()}</td>
    `;

    // Add row to the table
    eventsBody.appendChild(row);
});
// Clear all saved usability data

document.getElementById("clearDataButton").addEventListener("click", function () {

    // Remove all saved events from LocalStorage
    localStorage.removeItem("usabilityEvents");

    // Show confirmation message
    alert("All usability data has been cleared.");

    // Refresh the dashboard
    location.reload();
});

// Create Event Activity Chart

const maxEventCount = Math.max(
    clickCount,
    hoverCount,
    scrollCount,
    inputCount,
    errorCount,
    1
);

// Set bar widths according to event counts

document.getElementById("clickBar").style.width =
    (clickCount / maxEventCount) * 100 + "%";

document.getElementById("hoverBar").style.width =
    (hoverCount / maxEventCount) * 100 + "%";

document.getElementById("scrollBar").style.width =
    (scrollCount / maxEventCount) * 100 + "%";

document.getElementById("inputBar").style.width =
    (inputCount / maxEventCount) * 100 + "%";

document.getElementById("errorBar").style.width =
    (errorCount / maxEventCount) * 100 + "%";

// Display event counts on the chart

document.getElementById("clickBar").textContent =
    clickCount;

document.getElementById("hoverBar").textContent =
    hoverCount;

document.getElementById("scrollBar").textContent =
    scrollCount;

document.getElementById("inputBar").textContent =
    inputCount;

document.getElementById("errorBar").textContent =
    errorCount;

// Create click heatmap

const heatmapArea =
    document.getElementById("heatmapArea");

// Get all click events with positions
const clickPositionEvents =
    events.filter(function (event) {
        return event.eventType === "click" &&
               event.x !== undefined &&
               event.y !== undefined;
    });

// Count clicks in nearby areas
const positionCounts = {};

clickPositionEvents.forEach(function (event) {

    const x = Math.round(event.x / 50) * 50;
    const y = Math.round(event.y / 50) * 50;

    const positionKey = x + "_" + y;

    positionCounts[positionKey] =
        (positionCounts[positionKey] || 0) + 1;
});

// Find the highest number of clicks
const maxPositionCount =
    Math.max(...Object.values(positionCounts), 1);

// Create heatmap areas
for (const positionKey in positionCounts) {

    const [x, y] = positionKey.split("_");

    const count =
        positionCounts[positionKey];

    const intensity =
        count / maxPositionCount;

    const point =
        document.createElement("div");

    point.style.position = "absolute";

    point.style.left =
        (Number(x) /
        document.documentElement.scrollWidth * 100) + "%";

    point.style.top =
        (Number(y) /
        document.documentElement.scrollHeight * 100) + "%";

    const size =
        35 + (intensity * 45);

    point.style.width =
        size + "px";

    point.style.height =
        size + "px";

    point.style.borderRadius = "50%";

    point.style.background =
        "radial-gradient(circle, " +
        "rgba(255,0,0," + intensity + ") 0%, " +
        "rgba(255,165,0," + (intensity * 0.7) + ") 35%, " +
        "rgba(255,255,0,0.2) 65%, " +
        "transparent 100%)";

    point.style.transform =
        "translate(-50%, -50%)";

    point.style.pointerEvents =
        "none";

    heatmapArea.appendChild(point);
}