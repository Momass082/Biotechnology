// Example function using SHA512 and previous results
async function generateNextResult(previousResult, serverSeed, nonce) {
    const input = previousResult + serverSeed + nonce;

    // Use SubtleCrypto to hash the input
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-512', data);

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Generate a number between 0.01 and 50.00
    const number = (parseInt(hashHex.slice(0, 8), 16) % 5000) / 100;
    return number.toFixed(2);
}

// Example usage
(async () => {
    const previousResult = "1.75"; // Last game's number
    const serverSeed = "secureServerSeed123";
    const nonce = "randomNonce456";

    const nextNumber = await generateNextResult(previousResult, serverSeed, nonce);
    console.log("Predicted Next Number:", nextNumber);
})();
