import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('uploads'));

const sampleData = [
    { id: 1, sample: 'Sample 1', quality: 'A', date: '2023-01-01' },
    { id: 2, sample: 'Sample 2', quality: 'B', date: '2023-01-02' },
    // Add more sample data
];

const sampleLocations = [
    { id: 1, lat: 51.505, lng: -0.09, sample: 'Sample 1' },
    { id: 2, lat: 51.51, lng: -0.1, sample: 'Sample 2' },
    // Add more sample locations
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

app.get('/api/data', (req, res) => {
    res.json(sampleData);
});

app.get('/api/locations', (req, res) => {
    res.json(sampleLocations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});