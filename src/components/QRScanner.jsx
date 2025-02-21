import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faImage, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./QRScanner.css";

const QRScanner = ({ onClose }) => {
    const [scannedResult, setScannedResult] = useState(null);
    const [flashOn, setFlashOn] = useState(false);
    const [facingMode, setFacingMode] = useState("environment");
    const [mediaStreamTrack, setMediaStreamTrack] = useState(null);
    const qrReaderRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleScan = (data) => {
        if (data) {
            setScannedResult(data.text);
        }
    };

    const handleError = (err) => {
        console.error(err);

        // Fallback to front camera if back camera is not available
        if (err.name === "OverconstrainedError" || err.name === "NotFoundError") {
            setFacingMode("user");
        }
    };

    const handleBackClick = () => {
        if (qrReaderRef.current) {
            qrReaderRef.current.stop();
        }
        navigate("/home");
        if (onClose) onClose();
    };

    const handleFlashClick = async () => {
        if (!mediaStreamTrack) {
            console.warn("No media stream available for torch control.");
            return;
        }

        try {
            const imageCapture = new ImageCapture(mediaStreamTrack);
            const capabilities = await imageCapture.getPhotoCapabilities();

            if (capabilities.torch) {
                await mediaStreamTrack.applyConstraints({
                    advanced: [{ torch: !flashOn }]
                });
                setFlashOn((prev) => !prev);
            } else {
                alert("Torch is not supported on this device.");
            }
        } catch (error) {
            console.error("Error toggling torch:", error);
        }
    };

    const handleGalleryClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Implement file handling and QR code scanning from the selected file
        }
    };

    const handleContactClick = () => {
        // Implement functionality to open contacts
    };

    useEffect(() => {
        // Access camera stream to control the torch
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: facingMode } }
        })
            .then((stream) => {
                const track = stream.getVideoTracks()[0];
                setMediaStreamTrack(track);
            })
            .catch((err) => {
                console.error("Error accessing camera:", err);
            });

        return () => {
            if (mediaStreamTrack) {
                mediaStreamTrack.stop();
            }
        };
    }, [facingMode]);

    return (
        <div className="qr-scanner-container">
            <div className="scanner-header">
                <button className="back-button" data-clickable="true" onClick={handleBackClick}> ← </button>
                <h2 className="scanner-title m-0">Scan Any QR Code</h2>
            </div>
            <div className="qr-reader">
                <QrReader
                    ref={qrReaderRef}
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                    constraints={{
                        video: { facingMode: { exact: facingMode } }
                    }}
                />
            </div>
            {scannedResult && <p className="scan-result">Scanned: {scannedResult}</p>}
            <button className="show-payment">Show Payment Code</button>
            <div className="scanner-icons">
                <button
                    className={`icon-button flash-button ${flashOn ? "active" : ""}`}
                    data-clickable="true"
                    onClick={handleFlashClick}
                >
                    <FontAwesomeIcon icon={faBolt} />
                </button>
                <button className="icon-button gallery-button" data-clickable="true" onClick={handleGalleryClick}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="input-container" data-clickable="true">
                <input type="text" placeholder="Enter Mobile Number or Name" className="input-field" />
                <button className="contact-icon" onClick={handleContactClick}>
                    <FontAwesomeIcon icon={faAddressBook} data-clickable="true" />
                </button>
            </div>
        </div>
    );
};

export default QRScanner;
