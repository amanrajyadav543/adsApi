const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
require("dotenv").config();
const app = express();
const PORT = 5000;



connectDb()

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: 'Invalid JSON' });
  }
  next();
});


app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/adsRoutes"));
app.use("/api/v1", require("./routes/impressionRoutes"));



// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
