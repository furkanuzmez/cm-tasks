# CM Tasks Project

This repository contains the **Frontend** and **Backend** components of the CM Tasks project, organized into separate folders:
- `frontendCM`: Frontend built with React and Vite.
- `backendCM`: Backend built with Python 3 and FastAPI.

Follow the instructions below to set up and run each component.

---

## **Frontend**: React with Vite

The frontend is located in the `frontendCM` folder and is built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).

### **Clone the Repository and Navigate to the Frontend**
```bash
# Clone the repository
git clone https://github.com/furkanuzmez/cm-tasks.git

# Navigate to the frontend folder
cd cm-tasks/frontendCM
```

### **Setup and Run**

1. **Install Dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed.
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. Open your browser and go to:
   ```
   http://localhost:5173
   ```

### **Build for Production**
```bash
npm run build
```

### **Test the Build Locally**
```bash
npm run preview
```

---

## **Backend**: Python with FastAPI

The backend is located in the `backendCM` folder and is built using [FastAPI](https://fastapi.tiangolo.com/) and runs on **Python 3**.

### **Clone the Repository and Navigate to the Backend**
```bash
# Clone the repository
git clone https://github.com/furkanuzmez/cm-tasks.git

# Navigate to the backend folder
cd cm-tasks/backendCM
```

### **Setup and Run**

1. **Create a Virtual Environment**
   Make sure you have Python 3 installed.
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI Server**
   ```bash
   uvicorn main:app --reload
   ```

4. Open your browser and go to:
   ```
   http://127.0.0.1:8000
   ```

### **API Documentation**
FastAPI automatically generates interactive API documentation:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)


---

## **Repository Structure**
```
cm-tasks/
├── frontendCM/    # Frontend React + Vite application
├── backendCM/     # Backend FastAPI application
```

---

## **Contributions**
Feel free to fork the repository and submit pull requests. Contributions are welcome!

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## **Contact**
If you have any questions, feel free to reach out via [GitHub](https://github.com/furkanuzmez).
