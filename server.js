const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');

const app = express();

// Configure express-session middleware
app.use(session({
    secret: 'mijnQRCode2025RAHUL1995',  // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }   // Use secure: true in production with HTTPS
}));

// Configure multer to store files in the 'qrcodes' directory with the correct file extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'qrcodes/'); // Store in qrcodes folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Save with a unique name
    }
  });
  
  const upload = multer({ storage: storage });

app.post('/api/share', upload.single('qrCodeImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Image upload failed');
    }

    const qrCodeUrl = req.body.qrCodeUrl;
    const qrCodeImage = `https://mijnqrcode.onrender.com/qrcodes/${req.file.filename}`;  // Save the path for the image
    const uniqueId = req.body.uniqueId;

    // Store the URL and image path in the session
    req.session.qrCodeUrl = qrCodeUrl;
    req.session.qrCodeImage = qrCodeImage;
    req.session.qrCodeShareUrl = `https://mijnqrcode.onrender.com/share/${uniqueId}`;

    // Redirect to /share
    res.redirect(`/share/${uniqueId}`);
});

// Serve static files (React build files)
app.use(express.static(path.resolve(__dirname, 'build')));
app.use('/qrcodes', express.static(path.resolve(__dirname, 'qrcodes')));



// Handle all routes
app.get('/', (req, res) => {
    const url = 'https://mijnqrcode.onrender.com/';
    const imageUrl = 'https://mijnqrcode.onrender.com/assets/share.png';

    // Read index.html from the build folder
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Server error');
        }

        // Replace the title and meta tags in the HTML
        const finalHtml = data
            .replace(/<meta property="og:url" content="[^"]*"\/?>/, `<meta property="og:url" content="${url}"/>`)
            .replace(/<meta property="og:image" content="[^"]*"\/?>/, `<meta property="og:image" content="${imageUrl}"/>`)
            .replace(/<meta name="twitter:image" content="[^"]*"\/?>/, `<meta name="twitter:image" content="${imageUrl}"/>`)
            .replace(/<link rel="canonical" href="[^"]*"\/?>/, `<link rel="canonical" href="${url}"/>`);

        // Send the updated HTML to the browser
        res.send(finalHtml);
    });
});


app.get('/share/:uniqueId', (req, res) => {
    const title = 'Share - get business up with mijnQRCode';
    const description = 'Generate a custom QR code instantly to share any link and download your unique QR code to share online.';
    const url = req.session.qrCodeShareUrl ? req.session.qrCodeShareUrl : 'https://mijnqrcode.onrender.com/';
    const imageUrl = req.session.qrCodeImage ? req.session.qrCodeImage : 'https://mijnqrcode.onrender.com/assets/share.png';

    // Read index.html from the build folder
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Server error');
        }

        // Replace the title and meta tags in the HTML
        const finalHtml = data
            .replace(/<title>.*<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="description" content="[^"]*"\/?>/, `<meta name="description" content="${description}"/>`)
            .replace(/<meta property="og:url" content="[^"]*"\/?>/, `<meta property="og:url" content="${url}"/>`)
            .replace(/<meta property="og:type" content="[^"]*"\/?>/, `<meta property="og:type" content="article"/>`)
            .replace(/<meta property="og:title" content="[^"]*"\/?>/, `<meta property="og:title" content="${title}"/>`)
            .replace(/<meta property="og:description" content="[^"]*"\/?>/, `<meta property="og:description" content="${description}"/>`)
            .replace(/<meta property="og:image" content="[^"]*"\/?>/, `<meta property="og:image" content="${imageUrl}"/>`)
            .replace(/<meta property="og:image:height" content="[^"]*"\/?>/, `<meta property="og:image:height" content="630"/>`)
            .replace(/<meta property="og:image:width" content="[^"]*"\/?>/, `<meta property="og:image:width" content="1200"/>`)
            .replace(/<meta name="twitter:title" content="[^"]*"\/?>/, `<meta name="twitter:title" content="${title}"/>`)
            .replace(/<meta name="twitter:description" content="[^"]*"\/?>/, `<meta name="twitter:description" content="${description}"/>`)
            .replace(/<meta name="twitter:image" content="[^"]*"\/?>/, `<meta name="twitter:image" content="${imageUrl}"/>`)
            .replace(/<link rel="canonical" href="[^"]*"\/?>/, `<link rel="canonical" href="${url}"/>`);

        // Send the updated HTML to the browser
        res.send(finalHtml);
    });
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Node Server running on http://localhost:3000');
});
