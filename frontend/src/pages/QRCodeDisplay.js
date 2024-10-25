import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { useLocation } from 'react-router-dom';
import { LinkedinIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { Helmet } from 'react-helmet';

const QRCodeDisplay = () => {
    const location = useLocation();
    const { uniqueId } = location.state;
    const decodedUrl = decodeURIComponent(uniqueId);
    const svgRef = useRef(null);

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Scan and Regenerate QR code - mijnQRCode',
              text: 'Generate Visitor Card, scan Business Card and create Digital QR Code - mijnQRCode',
              url: decodedUrl,
            });
            console.log("Image shared successfully");
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          console.error("Web Share API is not supported in your browser.");
        }
    };
    

    return (
        <div>
            <h1>Share QR Code Generator</h1>
            <>
                <div ref={svgRef} onClick={() => window.open(decodedUrl, '_blank')}>
                    <QRCode value={decodedUrl} size={256} />
                </div>
                <br />

                {/* Convert the QRCode to a downloadable image */}
                <div>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${decodedUrl}&title=scan and regenerate QR code - mijnQRCode&summary=mijnQRcode is platform where you can generate business and digital card?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin_social_vac_share`} target="_blank" style={{ marginRight: '8px' }}>
                        <LinkedinIcon size={32} round={true} />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${decodedUrl}?utm_source=facebook&utm_medium=social&utm_campaign=facebook_social_vac_share`} target="_blank" style={{ marginRight: '8px' }}>
                        <FacebookIcon size={32} round={true} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${decodedUrl}?utm_source=twitter&utm_medium=social&utm_campaign=twitter_social_vac_share&utm_term=business&text=scan and regenerate QR code - mijnQRCode`} target="_blank" style={{ marginRight: '8px' }}>
                        <TwitterIcon size={32} round={true} />
                    </a>
                </div>

                <p>
                    Share this QR code or click the link:
                    <a href={decodedUrl} target="_blank" rel="noopener noreferrer">
                        {decodedUrl}
                    </a>
                </p>
                <br /><br />
                <button className="btn green" onClick={handleShare}>Share QR Code</button>
            </>
        </div>
    );
};

export default QRCodeDisplay;
