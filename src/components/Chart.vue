<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data () {
    return {
      chartData: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'This Month',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#F24F8A',
            data: [50, 150, 50, 210, 220, 310, 240, 140, 100, 205, 200, 210, 300]
          },
          {
            label: 'Last Month',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#57CAD5',
            data: [50, 100, 50, 200, 120, 300, 140, 110, 100, 135, 200, 260, 300]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
