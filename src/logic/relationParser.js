import { relationRules, relationExplanations } from './relationMap.js';

export function parseRelation(input) {
  const steps = [];
  let chain = input.replace(/^我/, '').split('的').filter(Boolean);
  let current = '我';
  let i = 0;

  while (i < chain.length) {
    let found = false;
    // 特殊处理"父的子"
    if (
      i + 1 < chain.length &&
      current === '我' &&
      (
        (chain[i] === '父' && chain[i + 1] === '子') ||
        (chain[i] === '母' && chain[i + 1] === '子')
      )
    ) {
      steps.push({
        step: chain[i] + '的子',
        result: '我/兄弟',
        explanation: '父母的儿子包括自己和兄弟'
      });
      current = '兄弟';
      i += 2;
      found = true;
    } else if (
      i + 1 < chain.length &&
      current === '我' &&
      (
        (chain[i] === '父' && chain[i + 1] === '女') ||
        (chain[i] === '母' && chain[i + 1] === '女')
      )
    ) {
      steps.push({
        step: chain[i] + '的女',
        result: '我/姐妹',
        explanation: '父母的女儿包括自己和姐妹'
      });
      current = '姐妹';
      i += 2;
      found = true;
    }
    if (!found) {
      // 尝试最长组合（最多3层）
      for (let len = Math.min(3, chain.length - i); len >= 1; len--) {
        const keyArr = chain.slice(i, i + len);
        const key = (current === '我' ? '' : current + '的') + keyArr.join('的');
        if (relationRules[key]) {
          const result = relationRules[key];
          steps.push({
            step: key,
            result,
            explanation: relationExplanations[result] || ''
          });
          current = result;
          i += len;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      // 尝试单独查第一个
      const key = chain[i];
      if (relationRules[key]) {
        const result = relationRules[key];
        steps.push({
          step: key,
          result,
          explanation: relationExplanations[result] || ''
        });
        current = result;
        i++;
      } else {
        return {
          error: `无法识别的关系："${chain.slice(0, i + 1).join('的')}"`,
          steps
        };
      }
    }
  }

  return {
    final: current,
    steps
  };
} 