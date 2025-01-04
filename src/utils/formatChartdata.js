export function formatChartData(data, metricName) {
  return [
    {
      name: "https://quantmutual.com/",
      mobile: data.mobile[0].metrics[metricName],
      desktop: data.desktop[0].metrics[metricName],
    },
    {
      name: "https://quantmutual.com/about-us/quantgroup",
      mobile: data.mobile[1].metrics[metricName],
      desktop: data.desktop[1].metrics[metricName],
    },
  ];
}
