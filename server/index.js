const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env variables from root .env or server .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Connect to MongoDB Atlas via Mongoose
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Express API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/team', require('./routes/team'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/audit', require('./routes/audit'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Pacto Enterprise Full-Stack OS',
    database: 'MongoDB Atlas (Mongoose)',
    timestamp: new Date(),
  });
});

// Serve React production static build in production or fallback
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  // If request is an API request, let it pass to 404
  if (req.path.startsWith('/api')) return next();
  
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <h1>Pacto API Server Running</h1>
        <p>Frontend dist bundle build not found at ${clientDistPath}. Run <code>npm run build</code> to generate the client build.</p>
      `);
    }
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Pacto Full-Stack Server] Running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[Port Error] Port ${PORT} is already in use. Please kill the process using port ${PORT} or specify PORT=5001 in your .env file.\n`);
  } else {
    console.error('[Server Error]', err);
  }
});
