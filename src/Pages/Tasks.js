import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';

import './Tasks.css';

function Tasks() {
    const currentDate = new Date();
    const generatedDate = format(currentDate, 'yyyy-MM-dd');
    const generatedTime = format(currentDate, 'HH:mm:ss');
    const history = useHistory();

    const [task, setTask] = useState({
        date: generatedDate,
        classes:'',
        section: '',
        subject:'',
        studentName:'',
        attachFile: '',
        workType: '',
        startDate:'',
        endDate:'',
        description:'',
        status:'',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: name === 'attachFile' ? files[0] : value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            // Add form fields to the FormData object
            formData.append('date', task.date);
            formData.append('classes', task.classes);
            formData.append('section', task.section);
            formData.append('subject', task.subject);
            formData.append('studentName', task.studentName);
            formData.append('attachFile', task.attachFile);
            formData.append('workType', task.workType);
            formData.append('startDate', task.startDate);
            formData.append('endDate', task.endDate);
            formData.append('description', task.description);
            formData.append('status', task.status);

            const response = await axios.post('http://localhost:8105/api/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the Content-Type header
                }
            });
            console.log(response.data); // Log the response data for debugging
            alert("Task submitted successfully");
            // Reset the task state after successful submission
            setTask({
                date: generatedDate,
                classes:'',
                section: '',
                subject:'',
                studentName:'',
                attachFile: '',
                workType: '',
                startDate:'',
                endDate:'',
                description:'',
                status:'',
            });
        } catch (error) {
            alert("Error saving task");
            console.error('Error saving task:', error); // Log the full error details
        }
    }

    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

    const ShowName = () => {
        setShow(!show);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8105/tasks/get");
                const formattedTasks = response.data.map(task => ({
                    ...task,
                    date: format(new Date(task.date), 'yyyy-MM-dd'),
                    startDate: format(new Date(task.startDate), 'yyyy-MM-dd'),
                    endDate: format(new Date(task.endDate), 'yyyy-MM-dd'),
                }));
                setTasks(formattedTasks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="view-cont1" id="task-view-student">
                <div className="content1">
                    <h1 className="view">VIEW TASK</h1>
                    <table border="none" className="tab1">
                        <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Section</th>
                                <th>Subject</th>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Description</th>
                                <th>Submit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.className}</td>
                                    <td>{task.section}</td>
                                    <td>{task.subject}</td>
                                    <td>{task.type}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.endDate}</td>
                                    <td>{task.description}</td>
                                    <button onClick={ShowName} className="nn">Submit</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {show && (
                <div className="card">
            <div className="login-form-container">
            <h1>Task Submission</h1>
            
                <div className="form-group">
                    <label>Date:{generatedDate}</label>
                   
                </div>
                <div className="form-group">
                    <label>Time: {generatedTime}</label>
                   
                </div>
                <div className="form-group">
    <label>Class:</label>
    <select name="classes" value={task.classes} onChange={handleChange}>
        <option value="">Select Class</option>
        <option value="LKG">LKG</option>
        <option value="UKG">UKG</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
</div>
<div className="form-group">
    <label>Section:</label>
    <select name="section" value={task.section} onChange={handleChange}>
        <option value="">Select Section</option>
        <option value="A">A</option>
        <option value="B">B</option>
    </select>
</div>

                <div className="form-group">
                    <label>Subject:</label>
                    <input type="text" name="subject" value={task.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Attach File:</label>
                    <input type="file" name="attachFile" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input type="text" name="studentName" value={task.studentName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Work Type:</label>
                    <input type="text" name="workType" value={task.workType} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input type="date" name="startDate" value={task.startDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <input type="date" name="endDate" value={task.endDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={task.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={task.status} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit} type="submit">Submit</button>
            
        </div>
        </div>
              )}
            
        </>
    );
}

export default Tasks;
