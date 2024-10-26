import React from 'react';

const WebView = ({ url }) => {
  return (
    <div>
      <iframe
        src={url}
        width="100%"
        height="720"
        title="WebView"
        style={{ border: 'none' }}
    />
    </div>
  );
};

export default WebView;
