import React, { useState, useEffect } from "react";

const RubiksCube = () => {
  const [rotateX, setRotateX] = useState(-25);
  const [rotateY, setRotateY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const TRANSLATION_DISTANCE = "95px";

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e) => {
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const [cubeState, setCubeState] = useState([
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

  const faces_template = [
    [
      [18, 19, 20],
      [21, 22, 23],
      [24, 25, 26],
    ],
    [
      [27, 28, 29],
      [30, 31, 32],
      [33, 34, 35],
    ],
    [
      [36, 37, 38],
      [39, 40, 41],
      [42, 43, 44],
    ],
    [
      [9, 10, 11],
      [12, 13, 14],
      [15, 16, 17],
    ],
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    [
      [45, 46, 47],
      [48, 49, 50],
      [51, 52, 53],
    ],
  ];

  const getFaces = (cube) => {
    const faces = Array(6)
      .fill()
      .map(() =>
        Array(3)
          .fill()
          .map(() => Array(3).fill(""))
      );

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          faces[i][j][k] = cube[faces_template[i][j][k]];
        }
      }
    }
    return faces;
  };

  const faces = getFaces(cubeState);

  const turnRed = [
    [18, 20],
    [19, 23],
    [20, 26],
    [21, 19],
    [22, 22],
    [23, 25],
    [24, 18],
    [25, 21],
    [26, 24],
    [6, 27],
    [7, 30],
    [8, 33],
    [27, 47],
    [30, 46],
    [33, 45],
    [47, 17],
    [46, 14],
    [45, 11],
    [17, 6],
    [14, 7],
    [11, 8],
  ];

  const turnWhite = [
    [0, 2],
    [1, 5],
    [2, 8],
    [5, 7],
    [8, 6],
    [7, 3],
    [6, 0],
    [3, 1],
    [4, 4],
    [20, 11],
    [19, 10],
    [18, 9],
    [11, 38],
    [10, 37],
    [9, 36],
    [38, 29],
    [37, 28],
    [36, 27],
    [29, 20],
    [28, 19],
    [27, 18],
  ];

  const turnYellow = [
    [45, 47],
    [46, 50],
    [47, 53],
    [50, 52],
    [53, 51],
    [52, 48],
    [51, 45],
    [48, 46],
    [49, 49],
    [24, 33],
    [25, 34],
    [26, 35],
    [33, 42],
    [34, 43],
    [35, 44],
    [42, 15],
    [43, 16],
    [44, 17],
    [15, 24],
    [16, 25],
    [17, 26],
  ];

  const turnBlue = [
    [27, 29],
    [28, 32],
    [29, 35],
    [32, 34],
    [35, 33],
    [34, 30],
    [33, 27],
    [30, 28],
    [31, 31],
    [8, 36],
    [5, 39],
    [2, 42],
    [36, 53],
    [39, 50],
    [42, 47],
    [53, 26],
    [50, 23],
    [47, 20],
    [26, 8],
    [23, 5],
    [20, 2],
  ];

  const turnOrange = [
    [36, 38],
    [37, 41],
    [38, 44],
    [41, 43],
    [44, 42],
    [43, 39],
    [42, 36],
    [39, 37],
    [40, 40],
    [2, 9],
    [1, 12],
    [0, 15],
    [9, 51],
    [12, 52],
    [15, 53],
    [51, 35],
    [52, 32],
    [53, 29],
    [35, 2],
    [32, 1],
    [29, 0],
  ];

  const turnGreen = [
    [9, 11],
    [10, 14],
    [11, 17],
    [14, 16],
    [17, 15],
    [16, 12],
    [15, 9],
    [12, 10],
    [13, 13],
    [0, 18],
    [3, 21],
    [6, 24],
    [18, 45],
    [21, 48],
    [24, 51],
    [45, 44],
    [48, 41],
    [51, 38],
    [44, 0],
    [41, 3],
    [38, 6],
  ];

  function doTurn(turnList) {
    const newCube = [...cubeState];
    turnList.forEach((turn) => {
      newCube[turn[1]] = cubeState[turn[0]];
    });
    setCubeState(newCube);
  }

  const colorMap = {
    R: "#DC2626",
    B: "#2563EB",
    O: "#EA580C",
    G: "#16A34A",
    W: "#FFFFFF",
    Y: "#FCD34D",
  };

  const scrambleCube = async () => {
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
  };

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 pt-24">
      <div
        className="relative w-48 h-48 mb-24 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
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

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY((prev) => prev - 90)}
        >
          Rotate Left
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY((prev) => prev + 90)}
        >
          Rotate Right
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX((prev) => prev - 90)}
        >
          Rotate Up
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX((prev) => prev + 90)}
        >
          Rotate Down
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turnRed)}
        >
          Rotate Red Clockwise
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turnRed.map(([a, b]) => [b, a]))}
        >
          Rotate Red Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turnBlue)}
        >
          Rotate Blue Clockwise
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turnBlue.map(([a, b]) => [b, a]))}
        >
          Rotate Blue Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-orange-200 text-orange-800 rounded hover:bg-orange-300"
          onClick={() => doTurn(turnOrange)}
        >
          Rotate Orange Clockwise
        </button>
        <button
          className="px-4 py-2 bg-orange-200 text-orange-800 rounded hover:bg-orange-300"
          onClick={() => doTurn(turnOrange.map(([a, b]) => [b, a]))}
        >
          Rotate Orange Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turnGreen)}
        >
          Rotate Green Clockwise
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turnGreen.map(([a, b]) => [b, a]))}
        >
          Rotate Green Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turnWhite)}
        >
          Rotate White Clockwise
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turnWhite.map(([a, b]) => [b, a]))}
        >
          Rotate White Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turnYellow)}
        >
          Rotate Yellow Clockwise
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turnYellow.map(([a, b]) => [b, a]))}
        >
          Rotate Yellow Anticlockwise
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={scrambleCube}
        >
          Scramble
        </button>
      </div>
    </div>
  );
};

export default RubiksCube;
