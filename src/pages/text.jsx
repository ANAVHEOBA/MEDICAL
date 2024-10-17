import { useState } from 'react';

export default function useText() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('https://api.akord.com/files', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Api-Key': process.env.NEXT_PUBLIC_AKORD_API
            },
            body: formData
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
}
