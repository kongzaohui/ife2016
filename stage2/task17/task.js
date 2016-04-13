/* 
{
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
this json-like data should be loaded from server, here is just built for demo
*/
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
}


//return a random integer number which is among [1,seed];
function randomInteger(seed) {return Math.floor(Math.random() * seed) + 1; }

//make the input Date object to move forward exactly one day;
function moveOneDay(date) {date.setTime((date.getTime() + 24 * 60 * 60 * 1000));}

//format the input Date object to be a "yyyy-mm-dd" like string
function formatDate(date){
	return [date.getFullYear(), 
			(((date.getMonth()+1)<10)?"0":"") + (date.getMonth()+1),
			((date.getDate()<10)?"0":"") + date.getDate()
		   ].join("-");
}
/*
return a random-built aqi data map for the 91 days of the first 3 month of 2016 year;
each aqi score will be a random integer number which is among [1,seed];
*/
function randomBuildData(seed){
	var ret = {};
	for(var d=new Date("2016-01-01"), end=new Date("2016-04-01");d.getTime() < end.getTime();moveOneDay(d)){
		ret[formatDate(d)] = randomInteger(seed);
	}
	return ret;
}

function $(id) {return document.getElementById(id);}

function buildCitySelect(){
  var options = [];
  for(var city in aqiSourceData){
    options.push("<option>" + city + "</option>");
  }
  $("city-select").innerHTML = options.join("");
}

//根据用户当前选择的日期粒度选项和目标城市选项（已经cache到setting对象中了），绘制对应的柱状图
function drawChart(){
   
  console.log("begin to draw chart with setting: " + setting.city + ", by " + setting.granularity);
}

//缓存用户的当前选中的配置，当用户选择发生改变时会对应更新相关分量属性的取值
var setting = {
  city: "北京",
  granularity: "day"
};

(function(){
  //build the city droplist based on the aqiSourceData
	buildCitySelect();
  
  //当city select选项change时，触发柱状图的重绘
  $("city-select").addEventListener("change", function(){
     setting.city = this.value;
     drawChart();
  });
  
  var radioChangeHandler = function(event){
    setting.granularity = event.target.value;
    drawChart();
  }
  var radioList = document.querySelectorAll('#form-gra-time [type="radio"]');
  for(var i=0; i<radioList.length; i++){
    radioList[i].addEventListener("change", radioChangeHandler);
  }
  
  //当页面初始化加载时，柱状图第一次绘制
  drawChart();
})();