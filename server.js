const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postRoutes);
server.use('/api/posts', commentRoutes);

server.listen(5000, () => console.log('Server running on http://localhost:5000'))