import { parseRelation } from './logic/relationParser.js';

const inputDisplay = document.getElementById('input-display');
const resultDisplay = document.getElementById('result-display');
const relationGraphSvg = document.getElementById('relation-graph-svg');
const buttons = document.querySelectorAll('.calc-btn');

let inputArr = ['我'];

function updateInputDisplay() {
  inputDisplay.textContent = inputArr.join('的');
}

function clearAll() {
  inputArr = ['我'];
  updateInputDisplay();
  resultDisplay.textContent = '';
  relationGraphSvg.innerHTML = '';
}

function deleteLast() {
  if (inputArr.length > 1) {
    inputArr.pop();
    updateInputDisplay();
    resultDisplay.textContent = '';
    relationGraphSvg.innerHTML = '';
  }
}

function renderRelationGraphSvg(chain, steps) {
  console.log('renderRelationGraphSvg called with chain:', chain);
  if (!chain || chain.length < 2) {
    relationGraphSvg.innerHTML = '';
    console.log('Chain too short, clearing SVG.');
    return;
  }
  const nodeRadius = 38;
  const gap = 90;
  const fontSize = 22;
  const svgHeight = 280; // 匹配CSS中的高度
  const totalWidth = (chain.length - 1) * (gap + nodeRadius * 2) + nodeRadius * 2;
  console.log('Calculated totalWidth for SVG:', totalWidth);
  let svg = `<svg width="${totalWidth}" height="${svgHeight}">`;
  for (let i = 0; i < chain.length; i++) {
    const cx = nodeRadius + i * (gap + nodeRadius * 2);
    const cy = svgHeight / 2;
    // 连线
    if (i > 0) {
      svg += `<line x1="${cx - gap/2 - nodeRadius}" y1="${cy}" x2="${cx - nodeRadius}" y2="${cy}" stroke="#bbb" stroke-width="2"/>`;
      // 关系名
      if (steps && steps[i-1]) {
        //确保step是字符串，并且关系名是最后一个词
        const relationName = String(steps[i-1].step).split('的').pop();
        svg += `<text x="${cx - gap/2 - nodeRadius/2}" y="${cy - 18}" text-anchor="middle" font-size="18" fill="#888">${relationName}</text>`;
      }
    }
    // 节点
    if (i === 0) {
      // "我"节点：实心橙色
      svg += `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="#ff7f2a" stroke="#ff7f2a" stroke-width="3"/>`;
      svg += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="${fontSize + 4}" fill="#fff" font-weight="bold">${chain[i]}</text>`;
    } else if (i === chain.length - 1) {
      // 终点：橙色描边
      svg += `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="#fff" stroke="#ff7f2a" stroke-width="3"/>`;
      svg += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="${fontSize + 4}" fill="#ff7f2a" font-weight="bold">${chain[i]}</text>`;
    } else {
      // 中间节点：灰色描边
      svg += `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="#fff" stroke="#bbb" stroke-width="2"/>`;
      svg += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="${fontSize}" fill="#888">${chain[i]}</text>`;
    }
  }
  svg += '</svg>';
  relationGraphSvg.innerHTML = svg;
  console.log('SVG content generated.');
}

function calculate() {
  const inputStr = inputArr.join('的');
  const result = parseRelation(inputStr);
  if (result.error) {
    resultDisplay.textContent = '无法识别';
    resultDisplay.style.color = '#e06b1a';
    relationGraphSvg.innerHTML = '';
  } else {
    resultDisplay.textContent = result.final;
    resultDisplay.style.color = '#222';
    // 关系图谱
    if (result.steps && result.steps.length > 0) {
      const chain = ['我', ...result.steps.map(s => s.result)];
      renderRelationGraphSvg(chain, result.steps);
    } else {
      relationGraphSvg.innerHTML = '';
    }
  }
}

buttons.forEach(btn => {
  const value = btn.getAttribute('data-value');
  if (value) {
    btn.addEventListener('click', () => {
      inputArr.push(value);
      updateInputDisplay();
      resultDisplay.textContent = '';
      relationGraphSvg.innerHTML = '';
    });
  }
});

document.getElementById('ac-btn').addEventListener('click', clearAll);
document.getElementById('del-btn').addEventListener('click', deleteLast);
document.getElementById('equal-btn').addEventListener('click', calculate);

// 初始化
clearAll(); 