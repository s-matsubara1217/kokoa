/*----------------------------------------------
	custom BarChart
----------------------------------------------*/

// ロード完了時にHTMファイルで登録されたdataをcssに反映させる関数の発火
fillDataColor();
// class="fill_box"を取得し、data-colorに登録されたカラーで塗りつぶす。
function fillDataColor() {
	const setTargetsNodeList = document.querySelectorAll(".fill_box");
	Array.prototype.forEach.call(setTargetsNodeList, function (setTargetEl) {
		if (setTargetEl) {
			const insertColor = setTargetEl.dataset.color;
			setTargetEl.style.backgroundColor = insertColor;
		}
	});
}

observable();
/*-------------------------------
 	OBSERVABLE
 -------------------------------*/
function observable() {
	const setAnimationTime = 1200;
	const setChartNodeList = document.querySelectorAll(".js-set_chart");
	const setChartArray = Array.prototype.slice.call(setChartNodeList, 0);
	let options;
	if (window.innerWidth >= 768) {
		options = {
			root: null,
			rootMargin: "-30% 0px",
			threshold: 0
		};
	} else {
		options = {
			root: null,
			rootMargin: "-60px 0px",
			threshold: 0
		};
	}

	const observer = new IntersectionObserver(doWhenIntersect, options);
	setChartArray.forEach(function (setChartEl) {
		observer.observe(setChartEl);
	});

	function doWhenIntersect(entries) {
		const entriesArray = Array.prototype.slice.call(entries, 0);
		entriesArray.forEach(function (entry) {
			const entryHasClass = Array.prototype.slice.call(entry.target.classList);
			const isLoaded = entryHasClass.indexOf("loaded") < 0;
			// entryがoptionで設定した範囲にある かつ　loadedクラスを持っていない とき
			if (entry.isIntersecting && isLoaded) {
				entry.target.classList.add("loaded");
				switch (entry.target.dataset.chart) {
					case 'bar':
						barChart(entry.target, setAnimationTime);
						barChart2(entry.target, setAnimationTime);
						countChart(entry.target, setAnimationTime, 400);
						break;
					case 'circle':
						circleChart(entry.target, setAnimationTime);
						countChart(entry.target, setAnimationTime, 400);
						break;
					case 'doughnut':
						doughnutChart(entry.target, setAnimationTime);
						countChart(entry.target, setAnimationTime, 400);
						break;
					case 'line':
						lineChart(entry.target, setAnimationTime);
						countChart(entry.target, setAnimationTime, 400);
						break;
					case 'tag':
						tagChart(entry.target, setAnimationTime);
						break;
					case 'count':
						countChart(entry.target, setAnimationTime, 400);
						break;
					default:
						break;
				}
			}
		});
	}
}


// class="barChart"を取得し、data-chartに登録された比率でグラフの表示
function barChart(setChartEl, setAnimationTime) {
	const barChartNodeList = setChartEl.querySelectorAll(".barChart");
	Array.prototype.forEach.call(barChartNodeList, function (chartElm) {

		const w = chartElm.dataset.maxWidth;
		const h = chartElm.dataset.maxHeight;
		chartElm.width = w;
		chartElm.height = h;

		const unit = "%";
		const defaultBarColor = '#d9d9d9';
		const datas = JSON.parse(chartElm.dataset.chart);
		const bg = chartElm.dataset.bg;
		let keyArr = [];
		let valueArr = [];
		let bgArr = [];
		if (bg) {
			bgArr = bg.slice(1).slice(0, -1).split(",");
		}
		for (let key in datas) {
			keyArr.push(key);
			valueArr.push(datas[key]);
		}

		// デフォルトの棒グラフスタイル
		Chart.defaults.global.defaultFontColor = '#4d3c37';
		Chart.defaults.global.defaultFontSize = 14;
		Chart.defaults.global.defaultFontStyle = 'bold';

		const myChart = new Chart(chartElm, {
			type: 'bar',
			data: {
				labels: keyArr,
				datasets: [{
					data: valueArr,
					backgroundColor: bgArr ? bgArr : defaultBarColor,
				}]
			},
			plugins: [ChartDataLabels],
			options: {
				plugins: {
					datalabels: {
						align: 'top',
						anchor: 'end',
						// color: function(ctx) {
						// 	return ctx.dataset.backgroundColor;
						// },
						color: '#f67f67',
						font: {
							size: 15,
							family: '"Noto Sans JP",sans-serif',
						},
						padding: {
							bottom: 15,
						},
						offset: -5,
						formatter: function(value, context) {
							return value + unit;
						}
					},
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						display: false,
					}],
					xAxes: [{
						display: true,
						barPercentage: 0.9,
						categoryPercentage: 0.9,
						stacked: false,
						gridLines: {
							display: false,
						},
						scaleLabel: {
							display: false,
						}
					}]
				},
				tooltips: {
					mode: 'false'
				},
				legend: {
					display: false,
				},
				layout: {
					padding: {
						top: 20
					}
				},
				animation: {
					duration: setAnimationTime,
				}
			}
		});
	});
}

// class="barChart2"を取得し、data-chartに登録された比率でグラフの表示
function barChart2(setChartEl, setAnimationTime) {
	const barChartNodeList = setChartEl.querySelectorAll(".barChart2");
	Array.prototype.forEach.call(barChartNodeList, function (chartElm) {

		const w = chartElm.dataset.maxWidth;
		const h = chartElm.dataset.maxHeight;
		chartElm.width = w;
		chartElm.height = h;

		const unit = "人";
		const defaultBarColor = '#d9d9d9';
		const datas = JSON.parse(chartElm.dataset.chart);
		const bg = chartElm.dataset.bg;
		let keyArr = [];
		let valueArr = [];
		let bgArr = [];
		if (bg) {
			bgArr = bg.slice(1).slice(0, -1).split(",");
		}
		for (let key in datas) {
			keyArr.push(key);
			valueArr.push(datas[key]);
		}

		// デフォルトの棒グラフスタイル
		Chart.defaults.global.defaultFontColor = '#4d3c37';
		Chart.defaults.global.defaultFontSize = 14;
		Chart.defaults.global.defaultFontStyle = 'bold';

		const myChart = new Chart(chartElm, {
			type: 'bar',
			data: {
				labels: keyArr,
				datasets: [{
					data: valueArr,
					backgroundColor: bgArr ? bgArr : defaultBarColor,
				}]
			},
			plugins: [ChartDataLabels],
			options: {
				plugins: {
					datalabels: {
						align: 'top',
						anchor: 'end',
						// color: function(ctx) {
						// 	return ctx.dataset.backgroundColor;
						// },
						color: '#f67f67',
						font: {
							size: 15,
							family: '"Noto Sans JP",sans-serif',
						},
						padding: {
							bottom: 15,
						},
						offset: -5,
						formatter: function(value, context) {
							return value + unit;
						}
					},
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						display: false,
					}],
					xAxes: [{
						display: true,
						barPercentage: 0.9,
						categoryPercentage: 0.9,
						stacked: false,
						gridLines: {
							display: false,
						},
						scaleLabel: {
							display: false,
						}
					}]
				},
				tooltips: {
					mode: 'false'
				},
				legend: {
					display: false,
				},
				layout: {
					padding: {
						top: 20
					}
				},
				animation: {
					duration: setAnimationTime,
				}
			}
		});
	});
}

// class="circleChart"を取得し、data-chartに登録された比率でグラフの表示
function circleChart(setChartEl, setAnimationTime) {
	const circleChartNodeList = setChartEl.querySelectorAll(".circleChart");
	Array.prototype.forEach.call(circleChartNodeList, function (chartElm) {

		const w = chartElm.dataset.maxWidth;
		const h = chartElm.dataset.maxHeight;
		chartElm.width = w;
		chartElm.height = h;

		const defaultBarColor = '#d9d9d9';
		const datas = JSON.parse(chartElm.dataset.chart);
		const bg = chartElm.dataset.bg;
		let keyArr = [];
		let valueArr = [];
		let bgArr = [];

		if (bg) {
			bgArr = bg.slice(1).slice(0, -1).split(",");
		}
		for (let key in datas) {
			keyArr.push(key);
			valueArr.push(datas[key]);
		}

		const myChart = new Chart(chartElm, {
			type: "pie",
			data: {
				labels: keyArr,
				datasets: [{
					data: valueArr,
					backgroundColor: bgArr ? bgArr : defaultBarColor,
					borderWidth: 0,
				}],
			},
			plugins: [ChartDataLabels],
			options: {
				plugins: {
					datalabels: {
						color: 'transparent',
						font: {
							weight: 'bold',
							size: 15,
						},
						formatter: function(value, ctx) {
							if(value < 10){
								return '';
							}
							return value + '%';
						},
					},
					tooltip: {
						enabled: false,
					},
					legend: {
						display: false,
					},
				},
        legend: {
        	display: false
				},
				tooltips: {
					enabled: false
				},
			}
		});
	});
}

// class="doughnutChart"を取得し、data-chartに登録された比率でグラフの表示
function doughnutChart(setChartEl, setAnimationTime) {
	const doughnutChartNodeList = setChartEl.querySelectorAll(".doughnutChart");
	Array.prototype.forEach.call(doughnutChartNodeList, function (chartElm) {

		const w = chartElm.dataset.maxWidth;
		const h = chartElm.dataset.maxHeight;
		chartElm.width = w;
		chartElm.height = h;

		const defaultBarColor = '#d9d9d9';
		const datas = JSON.parse(chartElm.dataset.chart);
		const bg = chartElm.dataset.bg;
		let keyArr = [];
		let valueArr = [];
		let bgArr = [];

		if (bg != undefined) {
			bgArr = bg.slice(1).slice(0, -1).split(",");
		}

		for (let key in datas) {
			keyArr.push(key);
			valueArr.push(datas[key]);
		}

		if(chartElm.classList.contains('-bg')){
			const myChartBg = new Chart(chartElm, {
				type: 'doughnut',
				data: {
					labels: [],
					datasets: [{
						data: [100],
						backgroundColor: bgArr ? bgArr : defaultBarColor,
						borderWidth: 0,
					}]
				},
				options: {
					cutoutPercentage: 65,
					responsive: true,
					animation: {animateRotate: false},
					plugins: {
						datalabels: {
							display: false,
						},
						tooltip: {
							enabled: false,
						},
						legend: {
							display: false,
						},
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					},
				}
			});
		}else{
			const myChart = new Chart(chartElm, {
				type: 'doughnut',
				data: {
					labels: keyArr,
					datasets: [{
						data: valueArr,
						backgroundColor: bgArr ? bgArr : defaultBarColor,
						borderWidth: 0,
					}]
				},
				options: {
					cutoutPercentage: 65,
					responsive: true,
					plugins: {
						datalabels: {
							display: false,
						},
						tooltip: {
							enabled: false,
						},
						legend: {
							display: false,
						},
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					},
					animation: {
						duration: setAnimationTime,
					}
				}
			});
		}

	});
}

// class="lineChart"を取得し、data-chartに登録された比率でグラフの表示
function lineChart(setChartEl, setAnimationTime) {
	const lineChartNodeList = setChartEl.querySelectorAll(".js-set_line");
	Array.prototype.forEach.call(lineChartNodeList, function (chartItem) {
		chartItem.classList.add("active");
		const data = chartItem.dataset.num;
		chartItem.style.width = data + "%";
	});
}

// class="tagChart"を取得し、ランダムにactiveクラスを追加
function tagChart(setChartEl, setAnimationTime) {
	const tagChartNodeList = setChartEl.querySelectorAll(".tagChart");
	const tagElArr = [];
	Array.prototype.forEach.call(tagChartNodeList, function (chartElm) {
		tagElArr.push(chartElm);
	});

	// 配列内をランダムにシャッフルする
	for (var i = tagElArr.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		const keepEl = tagElArr[i];
		tagElArr[i] = tagElArr[rand];
		tagElArr[rand] = keepEl;
	}
	const id = setInterval(addClassName, 50);
	let count = 0;

	function addClassName() {
		tagElArr[count].classList.add("active");
		count += 1;
		if (count >= tagElArr.length) {
			clearInterval(id);
		}
	}
}

// class="countChart"を取得し、data-numに登録された数値までカウントアップさせる。
function countChart(setChartEl, setAnimationTime, cutTime) {
	// Chart.jsのイージングを考慮し、早めにカウントタイマーを終了させる。
	setAnimationTime = setAnimationTime - cutTime;
	const countChartNodeList = setChartEl.querySelectorAll(".js-set_count");
	Array.prototype.forEach.call(countChartNodeList, function (chartItem) {
		//		const countSpanEl = chartItem.querySelector(".js-set_count");
		const endCount = chartItem.dataset.num;
		const floatNum = parseFloat(endCount).toFixed(1);
		const splitNum = floatNum.split(".");
		let count = 0;
		const timer = setInterval(countUp, 10);
		function countUp() {
			chartItem.innerHTML = count;
			setTimeout(function() {
				clearInterval(timer);
				chartItem.innerHTML = endCount;
				if(splitNum[1] != "0"){
					chartItem.innerHTML = floatNum;
				}
			}, setAnimationTime);
			// ここまで
			count++;
		};
	});
}
