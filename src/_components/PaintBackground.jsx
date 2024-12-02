import React, { useRef, useEffect, useState } from "react";

const PaintBackground = () => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [canvasContext, setCanvasContext] = useState(null);

  // Resize canvas to fit the window
  const resizeCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    const canvas = canvasRef.current;
    if (canvas) {
      setCanvasContext(canvas.getContext("2d"));
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Start painting
  const startPainting = (event) => {
    setIsPainting(true);
    const { x, y } = getMousePosition(event);
    if (canvasContext) {
      canvasContext.beginPath();
      canvasContext.moveTo(x, y);
    }
  };

  // Stop painting
  const stopPainting = () => {
    setIsPainting(false);
    if (canvasContext) {
      canvasContext.beginPath(); // Reset the path
    }
  };

  // Paint on the canvas
  const paint = (event) => {
    if (!isPainting || !canvasContext) return;

    const { x, y } = getMousePosition(event);
    canvasContext.lineWidth = 20; // Brush size
    canvasContext.lineCap = "round"; // Smooth strokes
    canvasContext.strokeStyle = "rgba(0, 0, 0, 0.5)"; // Brush color

    canvasContext.lineTo(x, y); // Draw a line to the current position
    canvasContext.stroke(); // Render the stroke
    canvasContext.beginPath(); // Begin a new path
    canvasContext.moveTo(x, y); // Move to the current position
  };

  // Get mouse or touch position relative to the canvas
  const getMousePosition = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if (event.type.startsWith("mouse")) {
      const mouseEvent = event;
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
      };
    } else {
      const touchEvent = event;
      const touch = touchEvent.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  };

  // Render the canvas
  return (
    <canvas
      ref={canvasRef}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "crosshair",
      }}
      onMouseDown={startPainting}
      onMouseUp={stopPainting}
      onMouseMove={paint}
      onMouseLeave={stopPainting}
      onTouchStart={startPainting}
      onTouchEnd={stopPainting}
      onTouchMove={paint}
    />
  );
};

export default PaintBackground;
