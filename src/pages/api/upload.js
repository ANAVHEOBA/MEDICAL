/*export const config = {
    api: {
      bodyParser: false, // Disables the default body parser, as we're using FormData
    },
  };
  
  const formidable = require('formidable');
  
  export default async function handler(req, res) {
      if (req.method !== 'POST') {
          res.status(405).json({ message: 'Method Not Allowed' });
          return;
      }
  
      const form = new formidable.IncomingForm();
  
      form.parse(req, async (err, fields, files) => {
          if (err) {
              res.status(500).json({ message: 'Error parsing the form' });
              return;
          }
  
          const file = files.file;
          const text = fields.text;
  
          try {
              const fileData = await fs.promises.readFile(file.filepath);
  
              const response = await fetch('https://api.akord.com/files', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Api-Key': process.env.AKORD_API_KEY, // Store API key in .env file
                      'Content-Type': file.mimetype,
                  },
                  body: fileData
              });
  
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
  
              const result = await response.json();
              res.status(200).json(result);
          } catch (error) {
              res.status(500).json({ message: 'Error uploading file: ' + error.message });
          }
      });
  }*/

      import formidable from 'formidable';
      import fs from 'fs/promises';
      
      export const config = {
        api: {
          bodyParser: false,
        },
      };
      
      export default async function handler(req, res) {
        if (req.method === 'POST') {
          try {
            const form = formidable();
      
            const [fields, files] = await new Promise((resolve, reject) => {
              form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve([fields, files]);
              });
            });
      
            const file = files.file[0]; // formidable v3+ returns an array
      
            if (!file) {
              return res.status(400).json({ error: 'No file uploaded' });
            }
      
            const fileBuffer = await fs.readFile(file.filepath);
      
            const response = await fetch('https://api.akord.com/files', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Api-Key': process.env.NEXT_PUBLIC_AKORD_API || '',
                'Content-Type': file.mimetype,
              },
              body: fileBuffer,
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const result = await response.json();
            res.status(200).json(result);
          } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Error uploading file' });
          }
        } else {
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);

        }
      }