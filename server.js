const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const multer  = require('multer')
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname );
  }
});
let upload = multer({ storage: storage });

const app = express();

app.engine('.hbs', hbs()); // defines that certain files should be rendered by given engine. '.hbs' (dot is optional, Express will add it by itself) files should be handled by the 'hbs engine' (loaded Handlebars).
app.set('view engine', '.hbs'); // in the app we use files with '.hbs' extention, so Express will know that it should look for a file with the appropriate suffix.

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));
/* option 'extended' allows Express to read data as nested (e.g. person[name]=John&person[age]=25) or not, for this exmaple 'extended: false' will return req.body as:
{
  person[name]: 'John',
  person[age]: '25'
} */

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const file = req.file;

  if(author && sender && title && message && file ) {
    res.render('contact', { isSent: true, file: file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
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
  res.status(404).json({ message: '404 not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});