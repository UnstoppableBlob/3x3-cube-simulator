import React, { useState, useEffect } from "react";
import { turnRed, turnWhite, turnYellow, turnBlue, turnOrange, turnGreen, getFaces } from "./helpers"

const RubiksCube = () => {
  const [rotateX, setRotateX] = useState(-25);
  const [rotateY, setRotateY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const TRANSLATION_DISTANCE = "95px";
  const [darkMode, setDarkMode] = useState(false);
  const [scale, setScale] = useState(1);

  const onDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const onMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotateY((prev) => prev + deltaX * 0.5);
    setRotateX((prev) => prev - deltaY * 0.5);

    setDragStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const onUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, dragStart]);


    
  

  const [cubeState, setCubeState] = useState([ // okay prettier messed this formatting up
    "W",
    "W",
    "W",
    "W",
    "W",
    "W",
    "W",
    "W",
    "W",
    "G",
    "G",
    "G",
    "G",
    "G",
    "G",
    "G",
    "G",
    "G",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "Y",
    "Y",
    "Y",
    "Y",
    "Y",
    "Y",
    "Y",
    "Y",
    "Y",
  ]);

  

  const faces = getFaces(cubeState);

  function doTurn(turnList, anim = true) {
    if (anim) setScale(0.85);
    const newCube = [...cubeState];
    turnList.forEach((turn) => {
      newCube[turn[1]] = cubeState[turn[0]];
    });
    setCubeState(newCube);
    if (anim) setTimeout(() => setScale(1), 100);
  }

  const colorMap = {
    R: "#DC2626",
    B: "#2563EB",
    O: "#EA580C",
    G: "#16A34A",
    W: "#FFFFFF",
    Y: "#FCD34D",
  };

useEffect(() => {
  const k = (e) => {
    console.log(e.key)
    switch (e.key) {
      case "a":
        setRotateY((prev) => prev - 90);
        break;
      case "d":
        setRotateY((prev) => prev + 90);
        break;
      case "w":
        setRotateX((prev) => prev + 90);
        break;
      case "s":
        setRotateX((prev) => prev - 90);
        break;
      // rgbywo clockwise
      case "r":
        doTurn(turnRed);
        break;
      case "g":
        doTurn(turnGreen);
        break;
      case "b":
        doTurn(turnBlue);
        break;
      case "o":
        doTurn(turnOrange);
        break;
      case "y":
        doTurn(turnYellow);
        break;
      case "v":
        doTurn(turnWhite);
        break;
      // RGBYWO anticlockwise
      case "R":
        doTurn(turnRed.map(([a, b]) => [b, a]));
        break;
      case "G":
        doTurn(turnGreen.map(([a, b]) => [b, a]));
        break;
      case "B":
        doTurn(turnBlue.map(([a, b]) => [b, a]));
        break;
      case "O":
        doTurn(turnOrange.map(([a, b]) => [b, a]));
        break;
      case "Y":
        doTurn(turnYellow.map(([a, b]) => [b, a]));
        break;
      case "V":
        doTurn(turnWhite.map(([a, b]) => [b, a]));
        break;
      default:
        break;
    }
  }

  document.addEventListener("keypress", k);
  return () => {
    document.removeEventListener("keypress", (k))
  }
}, [cubeState])

  const scramble = async (anim = true) => {
    if (anim) setScale(0.75);
    const turns = [
      turnRed,
      turnBlue,
      turnOrange,
      turnGreen,
      turnWhite,
      turnYellow,
    ];
    const numMoves = 30;
    let currentCubeState = [...cubeState];

    for (let i = 0; i < numMoves; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const randomTurn = turns[Math.floor(Math.random() * turns.length)];
      const turnToApply =
        Math.random() < 0.5 ? randomTurn : randomTurn.map(([a, b]) => [b, a]);

      const newCubeState = [...currentCubeState];
      turnToApply.forEach((turn) => {
        newCubeState[turn[1]] = currentCubeState[turn[0]];
      });

      currentCubeState = newCubeState;
      setCubeState(newCubeState);
    }

    if (anim) setScale(1);
  };

  async function lookCool() {
    const randomRotates = setInterval(() => {
      const rotates = [
        () => setRotateX((prev) => prev + 90),
        () => setRotateX((prev) => prev - 90),
        () => setRotateY((prev) => prev + 90),
        () => setRotateY((prev) => prev - 90),
      ];
      rotates[Math.floor(Math.random() * rotates.length)]();
    }, 150);

    setScale(0.75);
    await scramble(false);
    setScale(1.25);
    await scramble(false);
    setScale(0.75);
    await scramble(false);
    setScale(1)

    clearInterval(randomRotates);
  }

  const Face = ({ face, transform, zIndex }) => (
    <div
      className="absolute w-48 h-48 grid grid-cols-3 gap-2 p-1 bg-gray-800"
      style={{ transform, zIndex }}
    >
      {face.map((row, i) =>
        row.map((color, j) => (
          <div
            key={`${i}-${j}`}
            className="w-full h-full rounded-sm"
            style={{ backgroundColor: colorMap[color] }}
          />
        ))
      )}
    </div>
  );

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-8 pt-24 ${darkMode ? "bg-gray-800 text-white" : ""}`}>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-4 right-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 z-10 ${darkMode ? "invert text-gray-800" : ""}`}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
      <div
        className={`relative w-48 h-48 mb-24 cursor-grab active:cursor-grabbing`}
        onMouseDown={onDown}
        style={{
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
      >
        <Face
          face={faces[0]}
          transform={`translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > -90 && rotateY < 90 ? 3 : 0}
        />
        <Face
          face={faces[1]}
          transform={`rotateY(90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > 0 ? 3 : 0}
        />
        <Face
          face={faces[2]}
          transform={`rotateY(180deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > 90 || rotateY < -90 ? 3 : 0}
        />
        <Face
          face={faces[3]}
          transform={`rotateY(-90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY < 0 ? 3 : 0}
        />
        <Face
          face={faces[4]}
          transform={`rotateX(90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateX < 0 ? 3 : 0}
        />
        <Face
          face={faces[5]}
          transform={`rotateX(-90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateX > 0 ? 3 : 0}
        />
      </div>

      <div className={`flex gap-4 ${darkMode ? "invert text-gray-800" : ""}`}>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY((prev) => prev - 90)}
        >
          Rotate Left (A)
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY((prev) => prev + 90)}
        >
          Rotate Right (D)
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX((prev) => prev + 90)}
        >
          Rotate Up (W)
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX((prev) => prev - 90)}
        >
          Rotate Down (S)
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turnRed)}
        >
          Rotate Red Clockwise (R)
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turnRed.map(([a, b]) => [b, a]))}
        >
          Rotate Red Anticlockwise (Shift+R)
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turnBlue)}
        >
          Rotate Blue Clockwise (B)
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turnBlue.map(([a, b]) => [b, a]))}
        >
          Rotate Blue Anticlockwise (Shift+B)
        </button>
        <button
          className="px-4 py-2 bg-orange-200 text-orange-800 rounded hover:bg-orange-300"
          onClick={() => doTurn(turnOrange)}
        >
          Rotate Orange Clockwise (O)
        </button>
        <button
          className="px-4 py-2 bg-orange-200 text-orange-800 rounded hover:bg-orange-300"
          onClick={() => doTurn(turnOrange.map(([a, b]) => [b, a]))}
        >
          Rotate Orange Anticlockwise (Shift+O)
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turnGreen)}
        >
          Rotate Green Clockwise (G)
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turnGreen.map(([a, b]) => [b, a]))}
        >
          Rotate Green Anticlockwise (Shift+G)
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turnWhite)}
        >
          Rotate White Clockwise (V)
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turnWhite.map(([a, b]) => [b, a]))}
        >
          Rotate White Anticlockwise (Shift+V)
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turnYellow)}
        >
          Rotate Yellow Clockwise (Y)
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turnYellow.map(([a, b]) => [b, a]))}
        >
          Rotate Yellow Anticlockwise (Shift+Y)
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={scramble}
        >
          Scramble
        </button>
        <button
          className="px-4 py-2 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600"
          onClick={lookCool}
        >
          Cool Effect!
        </button>
      </div>
    </div>
  );
};

export default RubiksCube;