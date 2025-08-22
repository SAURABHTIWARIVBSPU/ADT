# Source Overview

This directory contains the client-side code for the application.

- **components/common** – shared utilities such as `ErrorBoundary` and `Chatbot`.
- **components/layout** – layout building blocks like `Header`, `Hero`, and `Footer`.
- **pages** – route-level pages rendered by `AppRoutes`.
- **routes** – route definitions for page components.

`App.jsx` wires everything together, wrapping routes in `ErrorBoundary` to catch rendering errors.
