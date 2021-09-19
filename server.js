const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs()); // defines that certain files should be rendered by given engine. '.hbs' (dot is optional, Express will add it by itself) files should be handled by the 'hbs engine' (loaded Handlebars).
app.set('view engine', '.hbs'); // in the app we use files with '.hbs' extention, so Express will know that it should look for a file with the appropriate suffix.

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name }); // the engine will look for 'hello' view in folder 'views' by default. Handlebars uses 'layouts', to render one simple view it we will turn it off.
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});