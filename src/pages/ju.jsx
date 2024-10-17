'use client';
import { useState } from 'react';
import WeaveDB from "weavedb-sdk"
import Tesseract from 'tesseract.js';

const WEAVEDB_CONTRACT_TX_ID = "DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames";
const db = new WeaveDB({ contractTxId: WEAVEDB_CONTRACT_TX_ID });

const FileUpload = () => {
  const [result, setResult] = useState('');

  const uploadFile = async (event) => {
    event.preventDefault();
    const file = event.target.fileInput.files[0];
    if (!file) {
      setResult('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const fileUrl = result.cloud.url;

      // Fetch the file content
      const fileResponse = await fetch(fileUrl);
      const fileBlob = await fileResponse.blob();

      // Use Tesseract.js to extract text from the image
      const { data: { text } } = await Tesseract.recognize(fileBlob, 'eng', {
        logger: m => console.log(m) // Add logger here for debugging
      });

      // Initialize WeaveDB
      await db.init();

      // Save the extracted text to WeaveDB
      await db.add({ text }, 'anavheoba');

      setResult('Upload and save successful!');
    } catch (error) {
      setResult('Error: ' + error.message);
      console.error('Error details:', error);
    }
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <form onSubmit={uploadFile}>
        <input type="file" id="fileInput" name="fileInput" />
        <button type="submit">Upload</button>
      </form>
      <div>{result}</div>
    </div>
  );
};

export default FileUpload;
