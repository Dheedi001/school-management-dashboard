// We are creating some mock student data to populate the table
const studentsData = [
  { id: 1, name: "Chisom Okafor", matric: "202300101", course: "Software Engineering", status: "Active" },
  { id: 2, name: "Aisha Bello", matric: "202300102", course: "Computer Science", status: "Active" },
  { id: 3, name: "Tunde Bakare", matric: "202300103", course: "Information Technology", status: "Inactive" },
  { id: 4, name: "Emediong Udo", matric: "202300104", course: "Software Engineering", status: "Active" },
  { id: 5, name: "Zainab Usman", matric: "202300105", course: "Cybersecurity", status: "Active" },
];

export default function StudentTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-8 overflow-hidden">
      
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Recent Enrollments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add Student
        </button>
      </div>

      {/* The Actual Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Matric Number</th>
              <th className="p-4 font-medium">Course</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            
            {/* Here we use .map() to loop through our mock data and create a row for each student */}
            {studentsData.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{student.name}</td>
                <td className="p-4 text-slate-500">{student.matric}</td>
                <td className="p-4 text-slate-500">{student.course}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}