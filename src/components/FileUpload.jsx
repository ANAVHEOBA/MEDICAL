'use client';

import { useState } from 'react';

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
            console.log(result);
            console.log(result.cloud.url);
            setResult('Upload successful!');
        } catch (error) {
            setResult('Error uploading file: ' + error.message);
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