# Machbarkeitsapp - Frontend
Machbarkeitsapp is a web application designed to assess the feasibility of clinical research questions. Users can construct feasibility queries by defining inclusion criteria based on clinical data (Merkmale) and applying filters to restrict the query scope. The system then estimates the number of patients matching the defined criteria.

## ✨ Core Features
Machbarkeitsapp provides an interactive query builder with the following capabilities:

#### Query Builder & Logic
* Build feasibility queries using clinical criteria (Merkmale).
* Combine criteria using logical operators (**AND / OR**).
* Reorder criteria via drag-and-drop interactions.

#### Filtering & Refinement
* Apply global or local time ranges and other restrictions to filter query results.
* Display warnings for invalid or incomplete filter criteria.

#### Visual Representation
* Each criterion element is visually highlighted using the color of its corresponding module, allowing users to easily distinguish criteria belonging to different clinical modules.

#### Query Management & Execution
* **Save/Upload:** Persistence of complex queries.<br>
* **Reset:** Quickly clear the current workspace.<br>
* **Start Query:** Execute queries to receive aggregated patient counts from the backend.

## 🛠 Tech Stack
* **Framework:** React (TypeScript)
* **Build Tool:** Vite
* **State Management:** Zustand
* **Styling:** Tailwind CSS
* **Containerization:** Docker

## 🚀 Getting Started
### 1. Prerequisites
* Node.js
* npm or yarn
* Docker Desktop (Optional)

### 2. Installation & Setup
1.  **Clone the repository**
2.  **Environment Setup:** Copy the example environment file:
    ```bash
    cp dev/example.env dev/.env
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### 3. Running the App
* **Local Development:** `npm run dev`
* **Docker Mode:** `docker compose -f dev/compose.yaml up`
