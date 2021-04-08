//DOM 선택
const playground = document.querySelector(".playground > ul");

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [
    // 방향키를 돌렸을 때 나오는 tree 블럭의 4가지 모습들
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // tree 블럭을 구성하는 4개 matrix의 x, y 좌표값
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
  ],
};

const movingItem = {
  type: "tree",
  direction: 0,
  top: 0, // 위,아래 정보
  left: 3, // 좌,우 정보
};

init();

function init() {
  tempMovingItem = { ...movingItem }; //movingItem의 값만 가져옴

  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }

  renderBlocks();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    console.log(playground.childNodes);
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(type, "moving");
  });
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks();
}

// event handling
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
    case 40:
      moveBlock("top", 1);
  }
});
