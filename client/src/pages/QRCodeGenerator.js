import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';


const QRCodeGenerator = () => {
    const [qrCodeUrl, setQRCodeUrl] = useState('');
    const [qrCodeImage, setQRCodeImage] = useState('');
    const navigate = useNavigate();
    const svgRef = useRef(null);

    const handleSubmit = async (event) => {
        if (qrCodeUrl) {
            event.preventDefault();

            const svg = svgRef.current.querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
    
            img.onload = async function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL('image/png');
                console.log('pngFile onload',pngFile)
                setQRCodeImage(pngFile);
                
            };
    
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        }
    };


    useEffect(()=> {
        if(qrCodeImage) {

            const byteString = atob(qrCodeImage.split(',')[1]);
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            
            for (let i = 0; i < byteString.length; i++) {
                uint8Array[i] = byteString.charCodeAt(i);
            }
            
            const blob = new Blob([uint8Array], { type: 'image/png' });
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });

            const formData = new FormData();
            formData.append('qrCodeUrl', qrCodeUrl);
            formData.append('qrCodeImage', file);

            fetch('/api/share', {
                method: 'POST',
                body: formData,
            }).then(() => {
                console.log("Success");
                // Redirect to /share
                const uniqueId = encodeURIComponent(qrCodeUrl);  // you could generate a better unique ID
                navigate('/share', { state: { uniqueId: uniqueId } });
                window.location.reload();
            }).catch((error) => {
                console.error("Error:", error);
            });
        }
    },[qrCodeImage])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>QR Code Generator</h1>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={qrCodeUrl}
                    className="inputBox"
                    onChange={(e) => setQRCodeUrl(e.target.value)}
                />
                <br />
                <br />

                <div ref={svgRef}>
                    {qrCodeUrl && <QRCode value={qrCodeUrl} />}
                </div>

                <br />
                <button  type="submit"  className="btn">Navigate & Share</button>
                <br /><br />
            </form>
        </div>
    );
};

export default QRCodeGenerator;
