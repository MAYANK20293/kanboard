const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;  


app.use(cors());
app.use(bodyParser.json());


const users = [
    { email: 'user@example.com', password: 'password123' }
];


app.post('/signup', (req, res) => {
    const { name, email, password, phoneNumber, dob } = req.body;

    if (!name || !email || !password || !phoneNumber || !dob) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ name, email, password, phoneNumber, dob });
    return res.status(201).json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = Math.random().toString(36).substring(7);
    return res.json({ token });
});

app.post('/add-task', (req, res) => {
    const { title, description, dueDate, priority, listId } = req.body;

    if (!title || !description || !dueDate || !priority || !listId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const task = { title, description, dueDate, priority, listId, id: Date.now() };

    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading task data' });
        }

        const tasks = JSON.parse(data || '[]');
        tasks.push(task);

        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving task data' });
            }
            res.status(201).json({ message: 'Task added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
