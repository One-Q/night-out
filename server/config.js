const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://heroku_q73bd7nd:ifkof4c5qtc4ls2rblt1ac8mu8@ds117965.mlab.com:17965/heroku_q73bd7nd',//'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
};

export default config;
