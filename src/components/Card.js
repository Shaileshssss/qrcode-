

import React, { useState } from 'react';

const Card = () => {
  const [input, setInput] = useState("");
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getQRCode = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(input)}`);
      console.log(res);
      const blob = await res.blob();
      const qrUrl = URL.createObjectURL(blob);
      setQr(qrUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={getQRCode}>
      <h1 className="title">QR Code Generator</h1>
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        placeholder="Enter URL Or Text Here"
      />

      {isLoading && (
        <div className="loading">
          <span></span>Loading...
        </div>
      )}

      {!isLoading && (
        qr ? (
          <img className="qr_code" src={qr} alt="qr_code" viewBox="0 0 200 200" />
        ) : (
          <div className="loading">
            Generate Amazing QR Code for you & your friends!
          </div>
        )
      )}

      <input type="submit" className="submit" value="Generate QR Code" />
    </form>
  );
};

export default Card;