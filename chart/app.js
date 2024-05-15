// import { htmlLegendPlugin } from "./plugin.js";

// async function updateChartWithIds() {
//   const loadingContainer = document.querySelector(".loading-container");

//   const options = {
//     responsive: true,
//     plugins: {
//       htmlLegend: {
//         containerID: "legend-container",
//       },
//       legend: {
//         display: false,
//       },
//       title: {
//         display: false,
//       },
//       //툴팁 커스텀 콜백
//       tooltip: {
//         callbacks: {},
//       },
//     },
//   };

//   loadingContainer.style.visibility = "visible";

//   //helper function
//   async function delayFetch(url, ms) {
//     await new Promise((resolve) => setTimeout(resolve, ms));
//     const response = await fetch(url);
//     return response;
//   }

//   try {
//     const res = await delayFetch("https://dummyjson.com/products");

//     const json = await res.json();
//     //console.log(json);

//     const dataPrice = json.products.map((item) => item.price);
//     const dataTitle = json.products.map((item) => item.title);
//     const dataRating = json.products.map((item) => item.rating);
//     const dataStock = json.products.map((item) => item.stock);

//     const config = {
//       type: "bar",
//       data: {
//         labels: dataTitle,
//         datasets: [
//           //가격
//           {
//             label: ["price"],
//             data: dataPrice,
//             borderWidth: 1,
//           },
//           //평점
//           {
//             label: ["rating"],
//             data: dataRating,
//             borderWidth: 1,
//           },
//           //스톡
//           {
//             label: ["stock"],
//             data: dataStock,
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: options,
//       plugins: [htmlLegendPlugin],
//     };

//     const ctx = document.getElementById("myChart").getContext("2d");
//     new Chart(ctx, config);

//     loadingContainer.style.visibility = "hidden";
//     loadingContainer.style.opacity = "0";
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// updateChartWithIds();

import { htmlLegendPlugin } from "./plugin.js";

//함수 초기화 => 모든 데이터를 인가받아서 마지막의 new Chart를 return
function initChart(title, price, rating, stock) {
  //옵션값
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      htmlLegend: {
        containerID: "legend-container",
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      //툴팁 커스텀 콜백
      tooltip: {
        callbacks: {},
      },
    },
  };

  //내부 구성
  const config = {
    type: "line",
    data: {
      labels: title,
      datasets: [
        //price
        {
          label: "price",
          data: price,
          borderWidth: 1,
        },
        //rating
        {
          label: "rating",
          data: rating,
          borderWidth: 1,
          hidden: true,
        },
        //stock
        {
          label: "stock",
          data: stock,
          borderWidth: 1,
          hidden: true,
        },
      ],
    },
    options: options,
    plugins: [htmlLegendPlugin],
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  return new Chart(ctx, config);
}

//loadingAction 함수
function loadingAction() {
  const loadingContainer = document.querySelector(".loading-container");

  return {
    show: () => (loadingContainer.style.visibility = "visible"),
    hide: () => {
      loadingContainer.style.visibility = "hidden";
      loadingContainer.style.opacity = "0";
    },
  };
}

async function delay(callback, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback);
    }, delay);
  });
}

class App {
  static async init() {
    //로딩이 걸립니다.
    loadingAction().show();

    const API_URL = "https://dummyjson.com/products";

    const resp = await delay(fetch(API_URL), 0);

    const { products } = await resp.json();
    console.log(products);

    const Title = products.map((item) => item.title);
    const Price = products.map((item) => item.price);
    const Rating = products.map((item) => item.rating);
    const Stock = products.map((item) => item.stock);

    const myChart = initChart(Title, Price, Rating, Stock);

    //init-> return new Chart()..

    loadingAction().hide();
  }
}

App.init();
