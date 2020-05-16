const express = require('express');
const app = express();
// const PORT =  process.env.PORT;
const PORT = 8000;
const htmlRoutes = require('./routes/html-routes/html-routes');
const apiRoutes = require('./routes/api-routes/api-routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, () => {
  console.log("Server started")
});




