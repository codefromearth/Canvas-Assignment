import React, { useState, useRef, useEffect } from "react";
import "./ConvaxPage.css"
const CanvasPage = () => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [digit, setDigit] = useState(10);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomedDigit, setZoomedDigit] = useState(null);
  const [palette, setPalette] = useState(["#000000", "#ffffff", "#ff0000","#00ff00"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear canvas
   // context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw rectangle
    context.fillStyle = currentColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw digit
    context.font = "bold 80px Arial";
    context.fillStyle = "#ffffff";
    context.fillText(digit.toString(), canvasWidth/2, canvasHeight/2);
  }, [canvasWidth, canvasHeight, currentColor, digit]);

  const handleCanvasResize = (e) => {
    setCanvasWidth(e.target.value);
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleDigitChange = (e) => {
    setDigit(parseInt(e.target.value));
  };

  const handlePaletteChange = (e) => {
    const selectedColor = e.target.value;
    setPalette((prevPalette) =>
      prevPalette.includes(selectedColor)
        ? prevPalette
        : [...prevPalette, selectedColor]
    );
    setCurrentColor(selectedColor);
  };

  const handleDigitHover = (e) => {
    setIsHovering(true);
    const rect = e.target.getBoundingClientRect();
    const x = rect.x + rect.width ;
    const y = rect.y;
    setZoomedDigit({ digit, x, y });
  };

  const handleDigitLeave = () => {
    setIsHovering(false);
    setZoomedDigit(null);
  };

  return (
    
    <div className="flexed">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseEnter={handleDigitHover}
        onMouseLeave={handleDigitLeave}
      />
      {isHovering && zoomedDigit && (
        <div
          style={{
            
            position: "absolute",
            // left: zoomedDigit.x-110,
            // top: zoomedDigit.y-110,
             left: canvasWidth/2,
            top: canvasHeight/7,
            backgroundColor: "#ffffff",
            padding: "10px",
            border: "1px solid #000000",
            cursor:"zoom-in"
          }}
        >
          <div
            style={{
              fontSize: "100px",
              fontWeight: "bold",
              textAlign: "center",
              color: currentColor,
            }}
          >
            {zoomedDigit.digit}
          </div>
        </div>
      )}
      <div className="flex_right">
      <div>
        <label htmlFor="canvasWidthInput">Canvas Width:</label>
        <input
          type="number"
          id="canvasWidthInput"
          value={canvasWidth}
          onChange={handleCanvasResize}
        />
        </div>
        <div>
        <label htmlFor="canvasHeightInput">Canvas Height:</label>
        <input
          type="number"
          id="canvasHeightInput"
          value={canvasHeight}
          onChange={(e) => setCanvasHeight(e.target.value)}
        />
        </div>
      
      <div>
        <label htmlFor="colorPicker">Canvas Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>
      <div >
        <label htmlFor="digitInput">Digit:</label>
        <input
          type="number"
          id="digitInput"
          value={digit}
          onChange={handleDigitChange}
        />
      </div>
      <div>
        <label htmlFor="paletteSelect">Palette:</label>
        <select id="paletteSelect" onChange={handlePaletteChange}>
          {palette.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      </div>
      </div>
    
  );
};

export default CanvasPage;
