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

app.get('/api/data', (req, res) => {
    res.json(sampleData);
});

app.get('/api/locations', (req, res) => {
    res.json(sampleLocations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});