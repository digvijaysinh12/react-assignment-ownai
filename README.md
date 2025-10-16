# Purchase Order Management App

A **React.js** application to manage Purchase Orders (POs) with talent allocation. Users can create POs, add talent/REQs, track details, and view submitted data in a clean and structured way. Built entirely with **React functional components** and **Context API** for state management.

---

## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [How It Works](#how-it-works)  
- [Folder & Component Description](#folder--component-description)  
- [Future Improvements](#future-improvements)  
- [Author](#author)

---

## Features

- Create Purchase Orders with client details, PO type, dates, and budget.  
- Add multiple REQs (requirements) for a PO.  
- Assign talents to each REQ with fields:  
  - Contract Duration  
  - Bill Rate  
  - Standard Time  
  - Overtime  
- Currency selection for all numeric fields.  
- Validation for all inputs (required fields, email, date ranges, budget limit, talent selection).  
- Read-only view after submission to display submitted PO and talent data.  
- Reset and add/remove REQs dynamically.  


## Tech Stack

- **Frontend:** React.js, Bootstrap 5  
- **State Management:** React Context API  
- **Language:** JavaScript (ES6+)

---

## Project Structure

<img width="605" height="511" alt="image" src="https://github.com/user-attachments/assets/184f8ea0-a8c0-4cf5-b4a4-5405605b3551" />



---

## Setup & Installation

1. **Clone the repository**


git clone https://github.com/digvijaysinh12/react-assignment-ownai.git

cd react-assignment-ownai

cd purchase_order

2. **Install dependencies**
npm install

3. **Run the app**
npm start

4.Open http://localhost:3000 in your browser.

## How It Works

### PO Details
1. Select **Client**, **PO Type**, **PO Number**, **Received On** date, **Received From** info, and **Budget**.
2. Each field has validation to ensure correct input.

### REQ Details
1. Add a **REQ** for each job title.
2. Select **talents** for the REQ.
3. Fill in talent-specific fields:
   - **Contract Duration** (in months)
   - **Bill Rate** (with currency)
   - **Standard Time** (with currency)
   - **Overtime** (with currency)
4. For **Group PO**, you can add multiple REQs.  
5. Each field has validation with error messages if input is missing or incorrect.

### Submission
1. Click **Submit** after filling the form.
2. The form switches to **read-only mode**, displaying all submitted PO and talent details.

### Reset & Edit
1. **Reset** button clears the form and all data.
2. Dynamically **add/remove REQs** for Group POs before submission.

---

## Folder & Component Description

### `constants/constants.js`
- Contains mock data for:
  - Clients
  - PO Types
  - Currencies
  - REQs with talents

### `context/POContext.jsx`
- Centralized state management using **React Context API**
- Handles:
  - Form data
  - REQ & talent selection
  - Validation for all fields
  - Submission and reset logic

### `components/MainPOFields.jsx`
- Input fields for main PO details:
  - Client, PO Type, PO Number
  - Received From (Name & Email)
  - Dates (Received On, PO Start & End)
  - Budget with currency selection

### `components/ReqSection.jsx`
- Handles **one REQ section** per job title
- Displays talents for selection
- Supports adding/removing REQs dynamically
- Shows talent inputs if selected

### `components/TalentInput.jsx`
- Input fields for each selected talent:
  - Contract Duration
  - Bill Rate (with currency)
  - Standard Time (with currency)
  - Overtime (with currency)
- Supports **read-only mode** to display submitted talent details

### `components/PurchaseOrderForm.jsx`
- Main form component
- Combines PO fields and multiple REQ sections
- Handles form submission, validation, reset, and **read-only display**
