const config = require('./config/config');
const App = require('./app');

const port = config.PORT || 3000;

// Connect to the database
require('./config/db');

// Start the server
App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});