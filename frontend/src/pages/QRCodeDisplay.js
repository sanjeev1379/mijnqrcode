import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import { LinkedinIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { Helmet } from 'react-helmet';

const QRCodeDisplay = () => {
    const { uniqueId } = useParams();
    const decodedUrl = decodeURIComponent(uniqueId);
    const svgRef = useRef(null);

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Share - get business up with mijnQRCode',
              text: 'Generate a custom QR code instantly to share any link and download your unique QR code to share online.',
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
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mijnqrcode.onrender.com/share/${decodedUrl}&title=Share - get business up with mijnQRCode&summary=Generate a custom QR code instantly to share any link and download your unique QR code to share online.?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin_social_vac_share`} target="_blank" style={{ marginRight: '8px' }}>
                        <LinkedinIcon size={32} round={true} />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://mijnqrcode.onrender.com/share/${decodedUrl}?utm_source=facebook&utm_medium=social&utm_campaign=facebook_social_vac_share`} target="_blank" style={{ marginRight: '8px' }}>
                        <FacebookIcon size={32} round={true} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=https://mijnqrcode.onrender.com/share/${decodedUrl}?utm_source=twitter&utm_medium=social&utm_campaign=twitter_social_vac_share&utm_term=business&text=Share - get business up with mijnQRCode`} target="_blank" style={{ marginRight: '8px' }}>
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
