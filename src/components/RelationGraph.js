export class RelationGraph {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="graph-container">
        <svg id="relation-graph"></svg>
      </div>
    `;

    this.svg = d3.select('#relation-graph');
    this.width = this.container.clientWidth;
    this.height = 400;

    this.svg
      .attr('width', this.width)
      .attr('height', this.height);

    // 创建缩放行为
    this.zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);

    // 创建主图形组
    this.g = this.svg.append('g');
  }

  render(data) {
    if (!data || !data.nodes || !data.links) return;

    // 清除现有图形
    this.g.selectAll('*').remove();

    // 创建力导向图布局
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    // 绘制连线
    const link = this.g.append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    // 绘制节点
    const node = this.g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', this.dragstarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragended.bind(this)));

    // 添加节点圆圈
    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => d.type === 'self' ? '#ff6b6b' : '#4ecdc4');

    // 添加节点文本
    node.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#fff')
      .style('font-size', '12px');

    // 添加连线标签
    const linkLabel = this.g.append('g')
      .selectAll('text')
      .data(data.links)
      .enter()
      .append('text')
      .attr('dy', -5)
      .style('font-size', '10px')
      .text(d => d.label);

    // 更新力导向图
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source && d.source.x !== undefined ? d.source.x : 0)
        .attr('y1', d => d.source && d.source.y !== undefined ? d.source.y : 0)
        .attr('x2', d => d.target && d.target.x !== undefined ? d.target.x : 0)
        .attr('y2', d => d.target && d.target.y !== undefined ? d.target.y : 0);

      node.attr('transform', d => `translate(${d.x},${d.y})`);

      // 更新连线标签位置
      linkLabel
        .attr('x', d => (d.source && d.target && d.source.x !== undefined && d.target.x !== undefined) ? (d.source.x + d.target.x) / 2 : 0)
        .attr('y', d => (d.source && d.target && d.source.y !== undefined && d.target.y !== undefined) ? (d.source.y + d.target.y) / 2 : 0);
    });
  }

  dragstarted(event, d) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragended(event, d) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
} 