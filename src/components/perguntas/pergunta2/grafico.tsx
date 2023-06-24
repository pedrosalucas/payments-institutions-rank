import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartData {
  ds_ano: number;
  ds_trimestre: string;
  nm_instituicao_financeira: string;
  vl_indice: string;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 30, right: 20, bottom: 30, left: 60 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      data.sort((a, b) => {
        const trimestreA = parseInt(a.ds_trimestre.replace('º', ''));
        const trimestreB = parseInt(b.ds_trimestre.replace('º', ''));
        return trimestreA - trimestreB;
      });

      const x = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(data.map((d) => `${d.ds_ano}-${d.ds_trimestre}`));

      const y = d3
        .scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(data, (d) => parseFloat(d.vl_indice)) || 0]);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(`${d.ds_ano}-${d.ds_trimestre}`) || 0)
        .attr('y', (d) => y(parseFloat(d.vl_indice)))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(parseFloat(d.vl_indice)) || 0)
        .attr('fill', 'white')
        .on('mouseover', (event, d) => {
          // Exibir o valor exato em um tooltip ou console.log
          console.log(d.vl_indice);
        });

      g.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', (d) => x(`${d.ds_ano}-${d.ds_trimestre}`) || 0)
        .attr('y', (d) => y(parseFloat(d.vl_indice)) - 10)
        .text((d) => d.nm_instituicao_financeira)
        .attr('fill', 'white');

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <svg ref={svgRef} width="500" height="300">
      {/* You can add axis labels and other elements here */}
    </svg>
  );
};

export default BarChart;
