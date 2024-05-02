# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Truefoundry 

This is a React application for displaying metrics and logs. It consists of the following main components:

## Navbar

The `Navbar` component is the main component that renders the header, which includes:

- The Truefoundry logo
- Toggle buttons for switching between the Metrics and Logs views
- A dropdown menu for selecting the time range for the data

## Metrics

The `Metrics` component is responsible for rendering the metrics data. It fetches the data from the `MimicMetrics` API and displays it using line and area charts. The charts are created using the `react-chartjs-2` library.

The component renders four charts:

1. CPU Usage
2. Memory Usage
3. Network Usage
4. Disk IOPS

Each chart displays three lines: Limits, Requested, and Used. If we click on any part, it will be removed that part. 

## Logs

The `Logs` component displays the log data fetched from the `MimicLogs` API. It supports pagination and infinite scrolling. Users can also select a custom time range for the logs using the `DateRangePicker` component.

The logs are displayed with their timestamps and messages. The component also includes functionality to handle URL parameters for the time range.

## API Mimic

The `api-mimic.js` file contains two classes, `MimicLogs` and `MimicMetrics`, which simulate API responses for logs and metrics data, respectively. These classes are used by the `Metrics` and `Logs` components to fetch data.

## Utility Components

The project also includes the following utility components:

- `LineGraph`: Renders a line chart for the given data
- `AreaGraph`: Renders an area chart for the given data

## Installation and Usage

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

The application will be available at `http://localhost:3000`.

## Dependencies

The main dependencies used in this project are:

- React
- react-chartjs-2
- chart.js

For a complete list of dependencies, refer to the `package.json` file.
