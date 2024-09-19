/**
*
* Index.ts
* @author - Faizal
* @date   - 19th September 2024
*
***/
// EXPRESS FRAMEWORK FOR HANDLING HTTP REQUESTS AND MIDDLEWARE
const express = require('express'); 
// MIDDLEWARE FOR HANDLING FILE UPLOADS
const multer = require('multer'); 
// MIDDLEWARE FOR ENABLING CROSS-ORIGIN RESOURCE SHARING (CORS)
const cors = require('cors'); 
// LIBRARY FOR PARSING CSV FILES
const csvParser = require('csv-parser'); 
// FILE SYSTEM MODULE FOR FILE OPERATIONS
const fs = require('fs'); 
// MODULE FOR HANDLING AND TRANSFORMING FILE PATHS
const path = require('path'); 

// INITIALIZE THE EXPRESS APPLICATION
const app = express();

// USE CORS MIDDLEWARE TO ALLOW REQUESTS FROM OTHER ORIGINS
app.use(cors());

// CONFIGURE MULTER TO STORE UPLOADED FILES IN THE 'UPLOADS/' DIRECTORY
const upload = multer({ dest: 'uploads/' });

// INITIALIZE AN EMPTY ARRAY TO STORE PARSED CSV DATA
let parsedData: any = [];

// FILE UPLOADS AT '/API/UPLOAD'
app.post('/api/upload', upload.single('file'), (req: any, res: any) => {
  // ARRAY TO STORE PARSED DATA FROM THE CSV FILE
  const results: any = [];

  // CREATE A READABLE STREAM FOR THE UPLOADED FILE
  fs.createReadStream(req.file?.path || '')
    .pipe(csvParser()) // PIPE THE STREAM TO THE CSV-PARSER TO PROCESS THE CSV FILE
    .on('data', (data: any) => results.push(data)) // COLLECT EACH ROW OF THE CSV FILE
    .on('end', () => { // WHEN THE PARSING IS COMPLETE
      parsedData = results; // STORE THE PARSED DATA IN THE GLOBAL VARIABLE
      fs.unlinkSync(req.file?.path || ''); // DELETE THE UPLOADED FILE FROM THE SERVER
      res.json(parsedData); // SEND THE PARSED DATA AS A JSON RESPONSE
    });
});

// START THE SERVER ON PORT 5001
app.listen(5001, () => console.log('Server started on port 5001'));

// EXPORT THE APP MODULE
module.exports = app;
