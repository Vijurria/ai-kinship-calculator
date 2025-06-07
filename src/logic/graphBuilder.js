export function buildGraph(steps) {
  const nodes = [{ id: '我', label: '我', type: 'self' }];
  const links = [];
  let prev = '我';

  steps.forEach((s, i) => {
    nodes.push({ 
      id: s.result, 
      label: s.result,
      type: 'relation',
      explanation: s.explanation
    });
    
    links.push({ 
      source: prev, 
      target: s.result,
      label: s.step
    });
    
    prev = s.result;
  });

  return { nodes, links };
} 