# UsabilityPulse

A JavaScript-based web usability tracking and analytics system that monitors user interactions and presents the collected data through a dashboard.

## Project Overview

UsabilityPulse tracks how users interact with a webpage and converts the collected interaction data into useful usability metrics.

The project uses JavaScript and browser Local Storage to collect and analyze user behavior without requiring a backend database.

## Features

* Session ID generation
* Click tracking with X/Y coordinates
* Hover tracking
* Scroll milestone tracking (25%, 50%, 75%, 100%)
* Page time tracking
* Input interaction tracking
* Form error tracking
* Click heatmap
* Event activity chart
* Recent events table
* Event summary
* Most clicked element
* Most hovered element
* Most interacted element
* Error rate
* Most error-prone element
* Clear all stored data

## Technologies Used

* **HTML5** — Webpage structure
* **CSS3** — Styling and dashboard UI
* **JavaScript** — Event tracking and analytics
* **Local Storage** — Client-side event storage

## Project Structure

```text
UsabilityPulse/
│
├── index.html
├── tracker.js
├── style.css
├── dashboard.html
├── dashboard.js
└── README.md
```

### File Description

* `index.html` — Usability testing webpage
* `tracker.js` — Tracks and stores user interactions
* `style.css` — Website and dashboard styling
* `dashboard.html` — Analytics dashboard
* `dashboard.js` — Processes events and displays analytics
* `README.md` — Project documentation

## How It Works

```text
User Interaction
       ↓
JavaScript Event Tracking
       ↓
Local Storage
       ↓
Dashboard Analysis
       ↓
Usability Insights
```

## Dashboard Metrics

The dashboard displays:

* Total Clicks
* Total Hovers
* Total Scrolls
* Total Inputs
* Total Errors
* Page Time
* Most Clicked Element
* Most Hovered Element
* Most Interacted Element
* Error Rate
* Most Error-Prone Element
* Click Heatmap
* Event Activity Chart
* Recent Events

## Future Improvements

* Backend database integration
* Real-time analytics
* Multi-user/session analysis
* CSV/PDF report export
* Advanced heatmap visualization
* Date-based analytics

## Project Purpose

This project was developed to demonstrate practical implementation of **web usability tracking, JavaScript event handling, client-side data storage, and usability analytics**.

