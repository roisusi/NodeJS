//----------//
// Requires //
//----------//

const express = require('express');
const fs = require('fs');

//-----------//
// Variables //
//-----------//

const port = 3000;
const app = express();

//------------//
// Middleware //
//------------//

app.use(express.json());

//-----------------//
// Read JSON files //
//-----------------//

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//--------//
// Routes //
//--------//

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({ status: 'success', data: { tours: newTour } });
  });
});

//-----------//
// Listeners //
//-----------//

app.listen(3000, () => {
  console.log(`Running on port : ${port}`);
});