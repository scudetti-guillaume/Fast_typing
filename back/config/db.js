const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.envDev" });
mongoose
  .connect(
    `mongodb+srv://${process.env.IDMDB}@cluster0.ix5aqxs.mongodb.net/`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée ! : " + err));
