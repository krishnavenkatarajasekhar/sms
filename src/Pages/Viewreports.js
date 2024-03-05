import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './Viewreports.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Viewreports = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/gettingbyid/1');
            setStudent(response.data[0]); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDownload = () => {
        if (!student) return;

        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text(`Report Card - ${student.studentname}`, 10, 10);
        let yPos = 20;

        if (student.class2entity) {
            const tableData = student.class2entity.map(subject => [
                subject.subject,
                `${subject.subject_obtained_marks}/${subject.subject_total_marks}`,                `${subject.percentage}%`, 
                subject.remarks
            ]);

            doc.autoTable({
                startY: yPos,
                head: [['Subjects', 'Marks (Obtained/Total)', 'Percentage', 'Remarks']],
                body: tableData,
                theme: 'grid',
                margin: { top: 20 },
            });
        }

        doc.save(`${student.studentname}_report_card.pdf`);
    };

    return (
        <div className='boxii' id='report-view-form'>
            <h2>Report Card</h2>
            {student && (
                <div>
                    <p>Name: {student.studentname}</p>
                    <p>Roll No: {student.roll_no}</p>
                    <p>Address: {student.address}</p>
                    <p>Grade: {student.grade}</p>
                    <p>Section: {student.section}</p>
                    <h3>Subjects</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Subjects</th>
                                <th>Marks (Obtained/Total)</th>
                                <th>Percentage</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.class2entity && student.class2entity.map((subject, index) => (
                                <tr key={index}>
                                    <td>{subject.subject}</td>
                                    <td>{subject.subject_obtained_marks}/{subject.subject_total_marks}</td>
                                    <td>{subject.percentage}%</td>
                                    <td>{subject.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="buttonn" onClick={handleDownload}>Download Report Card</button>
                </div>
            )}
        </div>
    );
};

export default Viewreports;
