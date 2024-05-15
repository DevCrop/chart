async function updateChartWithIds() {
  const loadingContainer = document.querySelector(".loading-container");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
      //툴팁 커스텀 콜백
      tooltip: {
        callbacks: {},
      },
    },
  };

  loadingContainer.style.visibility = "visible";

  //helper function
  async function delayFetch(url, ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
    const response = await fetch(url);
    return response;
  }

  try {
    const res = await delayFetch("https://dummyjson.com/products", 2000);

    const json = await res.json();

    const dataPrice = json.products.map((item) => item.price);
    const dataTitle = json.products.map((item) => item.title);

    const config = {
      type: "line",
      data: {
        labels: dataTitle,
        datasets: [
          {
            label: "# of Votes",
            data: dataPrice,
            borderWidth: 1,
          },
        ],
      },
      options: options,
    };

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, config);

    loadingContainer.style.visibility = "hidden";
    loadingContainer.style.opacity = "0";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

updateChartWithIds();
