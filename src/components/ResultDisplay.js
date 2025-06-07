export class ResultDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="result-display">
        <div class="final-result">
          <h2>称呼结果</h2>
          <div id="final-relation" class="final-relation"></div>
        </div>
        <div class="process-analysis">
          <h2>计算过程</h2>
          <div id="steps-list" class="steps-list"></div>
        </div>
      </div>
    `;
  }

  showResult(result) {
    const finalRelation = this.container.querySelector('#final-relation');
    finalRelation.textContent = result.final;
  }

  showSteps(steps) {
    const stepsList = this.container.querySelector('#steps-list');
    stepsList.innerHTML = steps.map((step, index) => `
      <div class="step-item">
        <div class="step-number">${index + 1}</div>
        <div class="step-content">
          <div class="step-relation">${step.step} → ${step.result}</div>
          ${step.explanation ? `<div class="step-explanation">${step.explanation}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  showError(error) {
    const finalRelation = this.container.querySelector('#final-relation');
    finalRelation.textContent = '无法计算';
    finalRelation.classList.add('error');
  }

  clear() {
    const finalRelation = this.container.querySelector('#final-relation');
    const stepsList = this.container.querySelector('#steps-list');
    
    finalRelation.textContent = '';
    finalRelation.classList.remove('error');
    stepsList.innerHTML = '';
  }
} 