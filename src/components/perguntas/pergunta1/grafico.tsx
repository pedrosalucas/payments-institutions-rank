import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { tb_reclamacao_cliente_por_if } from '@prisma/client';

interface BarChartProps {
  data: tb_reclamacao_cliente_por_if[];
}

const Pergunta1Chart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const formatVlIndice = (value: string | null) => {
    if (value === null) {
      return 0;
    }
    const cleanedValue = value.replace(",", ".");
    return parseFloat(cleanedValue);
  };

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 10, right: 30, bottom: 300, left: 40 };
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
        .paddingOuter(0.5) // Adiciona espaçamento externo entre as barras
        .domain(data.map((d) => d.nm_instituicao_financeira.replace(/\(.*\)/, '').replace(/- CR[EÉÊÈ]DITO[,]* FINANCIAMENTO E INVESTIMENTO/, '').replace(/- BANCO M[UÚÙ]LTIPLO/, '').trim()));

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
        .attr('x', (d) => x(d.nm_instituicao_financeira.replace(/\(.*\)/, '').replace(/- CR[EÉÊÈ]DITO[,]* FINANCIAMENTO E INVESTIMENTO/, '').replace(/- BANCO M[UÚÙ]LTIPLO/, '').trim()) || 0)
        .attr('width', x.bandwidth())
        .attr('height', function(d) { return height - y(0); })
        .attr("y", function(d) { return y(0); })
        .attr('fill', 'white');

      g.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('fill', 'white');

      g.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "14px");

      svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(formatVlIndice(d.vl_indice)); })
        .attr("height", function(d) { return height - y(formatVlIndice(d.vl_indice)); })
        .delay(function(d,i){console.log(i); return (i * 100); });

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <svg ref={svgRef} width="1500" height="600">
      {/* You can add axis labels and other elements here */}
    </svg>
  );
};

export default Pergunta1Chart;
