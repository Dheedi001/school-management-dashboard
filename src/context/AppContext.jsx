import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- 1. Students State ---
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('edu_students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Chisom Okafor", matric: "202300101", course: "Software Engineering", fees: 250000 },
      { id: 2, name: "Aisha Bello", matric: "202300102", course: "Computer Science", fees: 150000 },
    ];
  });

  // --- 2. Teachers State ---
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('edu_teachers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Dr. Olumide James", dept: "Software Engineering", status: "In Class" },
      { id: 2, name: "Engr. Sarah Udoh", dept: "Computer Engineering", status: "Available" },
    ];
  });

  // --- 3. System Logs State ---
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('edu_logs');
    return saved ? JSON.parse(saved) : [
      { id: 1, message: "System initialized", time: new Date().toLocaleTimeString(), type: "system" }
    ];
  });

  // Helper function to add a log entry
  const addLog = (message, type = "info") => {
    const newLog = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString(),
      type
    };
    setLogs(prev => [newLog, ...prev].slice(0, 10)); 
  };

  // Synchronization with LocalStorage
  useEffect(() => {
    localStorage.setItem('edu_students', JSON.stringify(students));
    localStorage.setItem('edu_teachers', JSON.stringify(teachers));
    localStorage.setItem('edu_logs', JSON.stringify(logs));
  }, [students, teachers, logs]);

  // --- ACTIONS ---
  const addStudent = (s) => {
    setStudents(prev => [...prev, { ...s, id: Date.now() }]);
    addLog(`Added new student: ${s.name}`, "success");
  };

  const deleteStudent = (id) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    addLog(`Deleted student: ${student?.name}`, "warning");
  };
  
  const toggleTeacherStatus = (id) => {
    const teacher = teachers.find(t => t.id === id);
    const newStatus = teacher.status === "Available" ? "In Class" : "Available";
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    addLog(`${teacher.name} is now ${newStatus}`, "info");
  };

  // --- NEW: Factory Reset Function ---
  const clearDatabase = () => {
    if (window.confirm("Are you sure? This will delete all custom entries and reset the system.")) {
      // Clear physical storage
      localStorage.clear();

      // Reset states to original defaults
      setStudents([
        { id: 1, name: "Chisom Okafor", matric: "202300101", course: "Software Engineering", fees: 250000 },
        { id: 2, name: "Aisha Bello", matric: "202300102", course: "Computer Science", fees: 150000 },
      ]);
      setTeachers([
        { id: 1, name: "Dr. Olumide James", dept: "Software Engineering", status: "In Class" },
        { id: 2, name: "Engr. Sarah Udoh", dept: "Computer Engineering", status: "Available" },
      ]);
      setLogs([{ 
        id: Date.now(), 
        message: "Database Factory Reset Performed", 
        time: new Date().toLocaleTimeString(), 
        type: "warning" 
      }]);

      // Redirect to home to ensure a clean visual state
      window.location.href = "/";
    }
  };

  return (
    <AppContext.Provider value={{ 
      students, 
      addStudent, 
      deleteStudent, 
      teachers, 
      toggleTeacherStatus, 
      logs, 
      clearDatabase // Make sure this is exported!
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);