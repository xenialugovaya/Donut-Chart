# Donut chart


Demo page <a href="https://xenialugovaya.github.io/Donut-Chart/dist/">see demo</a>

<h2>Build project</h2>
<pre>
<code>$ npm run build</code>
</pre>

<h2>Run tests</h2>
<pre>
<code>$ npm run test</code>
</pre>

<h2>Initialize chart with options</h2>
<pre>
<code>&lt;div class='chart'&gt;&lt;/div&gt;</code>
</pre>

<pre>
<code>$('.chart').donutChart({
  chartOptions: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
  amountAbs: [520, 260, 260],
  gradients: [
    ['#FFE39C', '#FFBA9C'],
    ['#6FCF97', '#66D2EA'],
    ['#BC9CFF', '#8BA4F9'],
    ['#919191', '#3D4975'],
    ['#BC9CFF', '#8BA4F9'],
  ],
});</code>
</pre>
<p>To set percents instead of amount</p>
<pre>
<code>amountPrc: ['20%', '30%', '50%']</code>
</pre>