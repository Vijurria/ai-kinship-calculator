export class InputArea {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="input-area">
        <input type="text" id="relation-input" placeholder="请输入亲戚关系，例如：妈妈的妹妹的女儿">
        <button id="calculate-btn">计算关系</button>
        <div class="examples">
          <p>示例：</p>
          <button class="example-btn">妈妈的妹妹的女儿</button>
          <button class="example-btn">爸爸的弟弟的儿子</button>
          <button class="example-btn">妈妈的姐姐的女儿</button>
        </div>
        <div id="error-message" class="error-message"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const input = this.container.querySelector('#relation-input');
    const calculateBtn = this.container.querySelector('#calculate-btn');
    const exampleBtns = this.container.querySelectorAll('.example-btn');

    calculateBtn.addEventListener('click', () => {
      const value = input.value.trim();
      if (!value) {
        this.showError('请输入亲戚关系');
        return;
      }
      this.onCalculate(value);
    });

    exampleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.textContent;
      });
    });
  }

  showError(message) {
    const errorDiv = this.container.querySelector('#error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  clearError() {
    const errorDiv = this.container.querySelector('#error-message');
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }

  onCalculate(value) {
    // 这个方法将由外部传入
    if (this.calculateCallback) {
      this.calculateCallback(value);
    }
  }

  setCalculateCallback(callback) {
    this.calculateCallback = callback;
  }
} 