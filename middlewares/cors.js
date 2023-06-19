const allowedCors = [
  'http://projectmesto.savinova.nomoredomains.work',
  'https://projectmesto.savinova.nomoredomains.work',
  'http://api.projectmesto.savinova.nomoredomains.work',
  'https://api.projectmesto.savinova.nomoredomains.work',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

module.exports = corsOptions;
