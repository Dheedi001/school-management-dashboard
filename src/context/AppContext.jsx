import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- 1. Core States ---
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem('edu_students')) || [
    { id: 1, name: "Chisom Okafor", matric: "202300101", course: "Software Engineering", fees: 250000, paid: true },
    { id: 2, name: "Aisha Bello", matric: "202300102", course: "Computer Science", fees: 150000, paid: false },
  ]);

  const [teachers, setTeachers] = useState(() => JSON.parse(localStorage.getItem('edu_teachers')) || [
    { id: 1, name: "Dr. Olumide James", dept: "Software Engineering", status: "In Class" },
    { id: 2, name: "Engr. Sarah Udoh", dept: "Computer Engineering", status: "Available" },
  ]);

  const [courses, setCourses] = useState(() => JSON.parse(localStorage.getItem('edu_courses')) || [
    { id: 1, title: "Web Technologies", code: "SEN 101", department: "Software Engineering", teacherId: 1 },
    { id: 2, title: "Data Structures", code: "CSC 201", department: "Computer Science", teacherId: 2 },
  ]);

  // --- NEW: Attendance State ---
  const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem('edu_attendance')) || []);

  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('edu_logs')) || [
    { id: 1, message: "System initialized", time: new Date().toLocaleTimeString(), type: "system" }
  ]);

  const addLog = (message, type = "info") => {
    setLogs(prev => [{ id: Date.now(), message, time: new Date().toLocaleTimeString(), type }, ...prev].slice(0, 15)); 
  };

  // Sync to Storage
  useEffect(() => {
    localStorage.setItem('edu_students', JSON.stringify(students));
    localStorage.setItem('edu_teachers', JSON.stringify(teachers));
    localStorage.setItem('edu_courses', JSON.stringify(courses));
    localStorage.setItem('edu_attendance', JSON.stringify(attendance));
    localStorage.setItem('edu_logs', JSON.stringify(logs));
  }, [students, teachers, courses, attendance, logs]);

  // --- CRUD ACTIONS ---
  const addStudent = (s) => { setStudents(prev => [...prev, { ...s, id: Date.now() }]); addLog(`Added student: ${s.name}`, "success"); };
  const updateStudent = (id, data) => { setStudents(prev => prev.map(s => s.id === id ? { ...data, id } : s)); addLog(`Updated: ${data.name}`, "info"); };
  const deleteStudent = (id) => { setStudents(prev => prev.filter(s => s.id !== id)); addLog(`Deleted student record`, "warning"); };
  
  const toggleTeacherStatus = (id) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "Available" ? "In Class" : "Available" } : t));
  };

  const addCourse = (data) => { setCourses(prev => [...prev, { ...data, id: Date.now() }]); addLog(`Added course: ${data.code}`, "success"); };
  const deleteCourse = (id) => { setCourses(prev => prev.filter(c => c.id !== id)); addLog(`Deleted course`, "warning"); };

  // --- NEW: Hardware Scanner Logic ---
  const markAttendance = (matricNumber) => {
    const student = students.find(s => s.matric === matricNumber);
    
    if (!student) {
      addLog(`Scan Failed: Unknown ID (${matricNumber})`, "error");
      return { success: false, message: "Student not found in database." };
    }

    const today = new Date().toLocaleDateString();
    const alreadyScanned = attendance.some(a => a.studentId === student.id && a.date === today);

    if (alreadyScanned) {
      addLog(`Duplicate Scan: ${student.name}`, "warning");
      return { success: false, message: `${student.name} is already marked present today.` };
    }

    const newRecord = {
      id: Date.now(),
      studentId: student.id,
      date: today,
      time: new Date().toLocaleTimeString()
    };

    setAttendance(prev => [newRecord, ...prev]);
    addLog(`Verified Present: ${student.name}`, "success");
    return { success: true, message: `Successfully verified ${student.name}.`, student };
  };

  const exportToCSV = () => {/* existing export logic */};

  const clearDatabase = () => {
    if (window.confirm("Factory Reset: Delete all data?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <AppContext.Provider value={{ 
      students, addStudent, updateStudent, deleteStudent, 
      teachers, toggleTeacherStatus, 
      courses, addCourse, deleteCourse,
      attendance, markAttendance, // Export new attendance tools
      logs, clearDatabase, exportToCSV
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);