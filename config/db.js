const mongoose = require("mongoose");



mongoose

  .connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB conectado"))

  .catch((err) => console.error("Error en la conexión a MongoDB:", err));



module.exports = mongoose;

