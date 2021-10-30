/////////////////////////////////////////////////////////////////
// [1] VARIABLES
/////////////////////////////////////////////////////////////////

const line = document.querySelector('#canvas').getContext('2d');
const bar = document.querySelector('#canvas2').getContext('2d');
const update_btn = document.getElementById('dash-update-btn');
const dashDropdown = document.getElementById('dash-date-dropdown');

////////////////////////////////////////////////////////////////
//  CHARTS
////////////////////////////////////////////////////////////////

// LINE CHART = Time Spent Working Out (Last 7 Workouts)
let lineChart = new Chart(line, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Workout Duration In Minutes',
        data: [],
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
      },
    ],
  },
});

// BAR CHART = Pounds Lifted (Last 7 Workouts)
let barChart = new Chart(bar, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Pounds (lbs)',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
});

////////////////////////////////////////////////////////////////
// [1] CREATE DATE SET BASED ON DROP DOWN DATE
////////////////////////////////////////////////////////////////
const getDataSet = async () => {
  const APIdata = await API.getChartData();
  const chartData = await APIdata.data.workouts;

  const newLabels = await chartData.map((data) =>
    new Date(data.day).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );

  const indexOfDate = newLabels.indexOf(dashDropdown.value);

  // // NEW CHART: DATA ARRAY
  const newChartData = chartData
    .slice(indexOfDate, 7 + indexOfDate)
    .reverse()
    .map((data) => data);

  return newChartData;
};

////////////////////////////////////////////////////////////////
// [2] CREATE CHART LABELS
////////////////////////////////////////////////////////////////
const getDataLabels = async (data) => {
  const chartData = await getDataSet(data);

  const labels = chartData.map((el) => {
    const date = new Date(el.day);

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  return labels;
};

////////////////////////////////////////////////////////////////
// [3] CREATE DATA SET FOR TOTAL WEIGHT & DURATION
////////////////////////////////////////////////////////////////

const totalDuration = async () => {
  const chartData = await getDataSet();

  let durations = [];

  chartData.forEach((workout) => {
    const total = workout.exercises
      .map((item) => item.duration)
      .reduce((prev, curr) => prev + curr, 0);

    durations.push(total);
  });

  return durations;
};

const totalWeight = async () => {
  const chartData = await getDataSet();

  let weights = [];

  chartData.forEach((workout) => {
    const total = workout.exercises
      .map((item) => item.weight)
      .filter((item) => item != undefined)
      .reduce((prev, curr) => prev + curr, 0);

    weights.push(total);
  });

  return weights;
};

////////////////////////////////////////////////////////////////
// [4] EVENT LISTENERS
////////////////////////////////////////////////////////////////

// [4.A] ON PAGE LOAD - POPULATE CHART FOR LATEST 7 DAY WORKOUT DATA
const populateChart = async (data) => {
  const lineChartData = await totalDuration();
  const lineChartMin = Math.round(Math.min(...lineChartData) / 10) * 10 - 10;
  const lineChartMax = Math.round(Math.max(...lineChartData) / 10) * 10 + 10;

  const lineChartOptions = new Object({
    responsive: true,
    scales: {
      y: {
        min: lineChartMin,
        max: lineChartMax,
      },
    },
  });

  const barChartData = await totalWeight();
  const barChartMax = Math.round(Math.max(...barChartData) / 10) * 10 + 100;

  const barChartOptions = new Object({
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: barChartMax,
        ticks: {
          // FORCES SCALING STEPS TO BE IN 50 UNITS
          stepSize: 100,
        },
      },
    },
  });

  const labels = await getDataLabels();

  // UPDATE BAR CHART
  barChart.data.labels = labels;
  barChart.data.datasets[0].data = barChartData;
  barChart.options = barChartOptions;

  // UPDATE LINE CHART
  lineChart.data.labels = labels;
  lineChart.data.datasets[0].data = lineChartData;
  lineChart.options = lineChartOptions;

  barChart.update();
  lineChart.update();
};

// [4.B] UPDATE BTN - LISTENS TO THE SELECT DATE OPTION AND UPDATES CHARTS FOR LAST 7 DAYS
update_btn.addEventListener('click', async () => {
  await populateChart();
});

// ON PAGE LOAD
populateChart();
