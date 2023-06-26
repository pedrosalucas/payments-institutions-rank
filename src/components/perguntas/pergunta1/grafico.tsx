import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { tb_reclamacao_cliente_por_if } from '@prisma/client';

/*interface BarChartData {
  ds_ano: number;
  ds_trimestre: string;
  nm_instituicao_financeira: string;
  vl_indice: string;
}
*/
interface BarChartProps {
  data: tb_reclamacao_cliente_por_if[];
}

const Pergunta1Chart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const formatVlIndice = (value: string | null) => {
    if (value === null){
      return 0;
    }
    const cleanedValue = value.replace(",", ".");
    return parseFloat(cleanedValue);
  };

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
        .paddingOuter(0.2) // Adiciona espaçamento externo entre as barras
        .domain(data.map((d) => `${d.ds_ano}-${d.ds_trimestre}`));
  
      const y = d3
        .scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(data, (d) => formatVlIndice(d.vl_indice)) || 0]);
  
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(`${d.ds_ano}-${d.ds_trimestre}`) || 0)
        .attr('y', (d) => y(formatVlIndice(d.vl_indice)))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(formatVlIndice(d.vl_indice)) || 0)
        .attr('fill', 'white');
  
      g.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', (d) => x(`${d.ds_ano}-${d.ds_trimestre}`) || 3)
        .attr('y', (d) => y(formatVlIndice(d.vl_indice)) - 10)
        .text((d) => d.nm_instituicao_financeira)
        .attr('fill', 'white')
        
  
        g.selectAll('.bar-value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-value')
        .attr('x', (d) => x(`${d.ds_ano}-${d.ds_trimestre}`) || 0)
        .attr('y', (d) => y(formatVlIndice(d.vl_indice)) + 20) // Deslocamento adicional para cima
        .text((d) => d.vl_indice) // Exibe o valor exato da barra
        .attr('fill', 'black')
        .style('font-size', '12px');
  
      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
      g.append('g').attr('class', 'axis').call(d3.axisLeft(y));
    }
  }, [data]);
  
  return (
    <svg ref={svgRef} width="1500" height="500">
      {/* You can add axis labels and other elements here */}
    </svg>
  );
};

export default Pergunta1Chart;
