// server.mjs
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const users = [
    { username: 'admin', password: bcrypt.hashSync('admin', 8), role: 'admin' },
    { username: 'user', password: bcrypt.hashSync('user', 8), role: 'user' }
];

const sampleData = [
    { id: 1, sample: 'Sample 1', quality: 'A', date: '2023-01-01' },
    { id: 2, sample: 'Sample 2', quality: 'B', date: '2023-01-02' }
];

const sampleLocations = [
    { id: 1, lat: 51.505, lng: -0.09, sample: 'Sample 1' },
    { id: 2, lat: 51.51, lng: -0.1, sample: 'Sample 2' }
];

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.put('/api/user/update', (req, res) => {
    const { username, firstName, lastName, role, photo } = req.body;
    const user = users.find(u => u.username === username);

    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.role = role;
        user.photo = photo;
        res.json({ message: 'Profile updated successfully', user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filePath: `/${req.file.filename}` });
});

app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword, role });
    res.json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}, ${password}`);
    const user = users.find(u => u.username === username);
    if (user) {
        const passwordMatches = bcrypt.compareSync(password, user.password);
        console.log(`Password matches: ${passwordMatches}`);
        if (passwordMatches) {
            res.json({ username: user.username, role: user.role });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/api/users', (req, res) => {

    const usersWithoutPassword = users.map(({ username, role }, index) => ({
        id: index + 1,
        username,
        role,
    }));
    res.json(usersWithoutPassword);
});

app.get('/api/data', (req, res) => {
    res.json(sampleData);
});

app.get('/api/locations', (req, res) => {
    res.json(sampleLocations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (user) {
        user.username = username;
        user.role = role;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});