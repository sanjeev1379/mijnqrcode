
// Function to encode URL
export const encodeUrl = (url) => {
    const base64Url = btoa(url); // Convert URL to Base64
    const prefix = "ENC"; // Add a custom prefix for uniqueness
    return `${prefix}-${base64Url}`;
};

// Function to decode URL
export const decodeUrl = (encodedUrl) => {
    if (!encodedUrl.startsWith("ENC-")) {
        console.error("Invalid encoded URL format.");
        return null;
    }

    const base64Url = encodedUrl.split("ENC-")[1];
    try {
        return atob(base64Url); // Decode Base64 back to URL
    } catch (error) {
        console.error("Decoding error:", error);
        return null;
    }
};