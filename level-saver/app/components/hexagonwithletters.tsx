// HexagonWithLetters.tsx
import React, { useRef, useEffect } from 'react';

interface HexagonWithLettersProps {
  letters: string[];
  centerLetter: string;
}

const HexagonWithLetters: React.FC<HexagonWithLettersProps> = ({ letters, centerLetter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHeight = 215;
  const canvasWidth = 200;

  useEffect(() => {
    if (!canvasRef.current) return; // Prevent errors if ref is not yet attached

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Prevent errors if context is not available

    
    const outerRadius = 100;
    const innerRadius = 30;
    const centerX = outerRadius;
    const centerY = canvasHeight / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const getHexagonPoints = (radius: number, cx: number, cy: number) => {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push({ x, y });
      }
      return points;
    };

    const outerPoints = getHexagonPoints(outerRadius, centerX, centerY);
    const innerPoints = getHexagonPoints(innerRadius, centerX, centerY);

    // Draw outer hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw inner hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(innerPoints[i].x, innerPoints[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'lightyellow';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw connecting lines
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(outerPoints[i].x, outerPoints[i].y);
      ctx.lineTo(innerPoints[i].x, innerPoints[i].y);
      ctx.stroke();
    }

    // Draw letters
    ctx.fillStyle = 'black';
    ctx.font = '20px bold sans-serif';
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const offset = angle + 10;
      const x = centerX + (outerRadius + innerRadius) / 2 * Math.cos(offset);
      const y = centerY + (outerRadius + innerRadius) / 2 * Math.sin(offset) + 8;
      ctx.textAlign = 'center';
      ctx.fillText(letters[i], x, y);
    }

    // Draw center letter
    ctx.fillStyle = 'red';
    ctx.font = '20px bold sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(centerLetter, centerX, centerY + 8);
  }, [letters, centerLetter]);

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};

export default HexagonWithLetters;