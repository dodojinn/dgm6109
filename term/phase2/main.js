"use strict"

let weatherFoodData = [ //List of daily observations //
{
    date: "2025-09-22",
    highTemp: 20,
    lowTemp: 12,
    weather: "Partly Cloudy",
    totalCalories: 1160, // total calories eaten that day //
    mealsPerDay: 2, // number of meals in the day //
    percentHotMeals: 33, //% of meals that were hot //
    emotionalImpact: 1 // 1-5 scale of emotional impact of weather on eating habits //
}, // one day's record //
{
    date: "2025-09-23",
    highTemp: 22,
    lowTemp: 12,
    weather: "Cloudy",
    totalCalories: 1396,
    mealsPerDay: 2,
    percentHotMeals: 75,
    emotionalImpact: 1
}, {
    date: "2025-09-24",
    highTemp: 20,
    lowTemp: 9,
    weather: "Cloudy",
    totalCalories: 1480,
    mealsPerDay: 2,
    percentHotMeals: 80,
    emotionalImpact: 2
},{
    date: "2025-09-25",
    highTemp: 16,
    lowTemp: 11,
    weather: "Overcast",
    totalCalories: 1550,
    mealsPerDay: 2,
    percentHotMeals: 90,
    emotionalImpact: 2
},{
    date: "2025-09-26",
    highTemp: 16,
    lowTemp: 12,
    weather: "Rain",
    totalCalories: 1507,
    mealsPerDay: 3,
    percentHotMeals: 100,
    emotionalImpact: 4
},{
    date: "2025-09-27",
    highTemp: 17,
    lowTemp: 11,
    weather: "Shower",
    totalCalories: 1380,
    mealsPerDay: 2,
    percentHotMeals: 100,
    emotionalImpact: 2
},{
    date: "2025-09-28",
    highTemp: 18,
    lowTemp: 14,
    weather: "Cloudy",
    totalCalories: 1400,
    mealsPerDay: 2,
    percentHotMeals: 80,
    emotionalImpact: 2
},{
    date: "2025-09-29",
    highTemp: 16,
    lowTemp: 12,
    weather: "Rain",
    totalCalories: 1670,
    mealsPerDay: 2,
    percentHotMeals: 90,
    emotionalImpact: 4
},{
    date: "2025-09-30",
    highTemp: 19,
    lowTemp: 11,
    weather: "Rain",
    totalCalories: 1865,
    mealsPerDay: 3,
    percentHotMeals: 90,
    emotionalImpact: 4
},{
    date: "2025-10-01",
    highTemp: 15,
    lowTemp: 11,
    weather: "Shower",
    totalCalories: 1640,
    mealsPerDay: 2,
    percentHotMeals: 50,
    emotionalImpact: 3
},{
    date: "2025-10-02",
    highTemp: 16,
    lowTemp: 9,
    weather: "Rain",
    totalCalories: 1360,
    mealsPerDay: 2,
    percentHotMeals: 85,
    emotionalImpact: 4
},{
    date: "2025-10-03",
    highTemp: 16,
    lowTemp: 10,
    weather: "Shower",
    totalCalories: 1400,
    mealsPerDay: 2,
    percentHotMeals: 80,
    emotionalImpact: 3
},{
    date: "2025-10-04",
    highTemp: 16,
    lowTemp: 6,
    weather: "Cloudy",
    totalCalories: 1750,
    mealsPerDay: 3,
    percentHotMeals: 100,
    emotionalImpact: 1
},{
    date: "2025-10-05",
    highTemp: 18,
    lowTemp: 7,
    weather: "Cloudy",
    totalCalories: 1406,
    mealsPerDay: 3,
    percentHotMeals: 100,
    emotionalImpact: 1
},{
    date: "2025-10-06",
    highTemp: 18,
    lowTemp: 7,
    weather: "Cloudy",
    totalCalories: 1289,
    mealsPerDay: 2,
    percentHotMeals: 80,
    emotionalImpact: 3
},{
    date: "2025-10-07",
    highTemp: 17,
    lowTemp: 9,
    weather: "Overcast",
    totalCalories: 1370,
    mealsPerDay: 2,
    percentHotMeals: 90,
    emotionalImpact: 2
},{
    date: "2025-10-08",
    highTemp: 14,
    lowTemp: 8,
    weather: "Overcast",
    totalCalories: 1084,
    mealsPerDay: 2,
    percentHotMeals: 67,
    emotionalImpact: 2
},{
    date: "2025-10-09",
    highTemp: 15,
    lowTemp: 8,
    weather: "Light Rain",
    totalCalories: 1815,
    mealsPerDay: 3,
    percentHotMeals: 67,
    emotionalImpact: 3
},{
    date: "2025-10-10",
    highTemp: 12,
    lowTemp: 9,
    weather: "Rain",
    totalCalories: 1530,
    mealsPerDay: 2,
    percentHotMeals: 100,
    emotionalImpact: 4
},{
    date: "2025-10-11",
    highTemp: 12,
    lowTemp: 8,
    weather: "Rain",
    totalCalories: 1930,
    mealsPerDay: 3,
    percentHotMeals: 100,
    emotionalImpact: 4
},{
    date: "2025-10-12",
    highTemp: 11,
    lowTemp: 3,
    weather: "Rain",
    totalCalories: 1900,
    mealsPerDay: 3,
    percentHotMeals: 100,
    emotionalImpact: 5
},{
    date: "2025-10-13",
    highTemp: 16,
    lowTemp: 2,
    weather: "Sunny",
    totalCalories: 1436,
    mealsPerDay: 2,
    percentHotMeals: 30,
    emotionalImpact: 1
},{
    date: "2025-10-14",
    highTemp: 14,
    lowTemp: 3,
    weather: "Sunny",
    totalCalories: 1230,
    mealsPerDay: 2,
    percentHotMeals: 50,
    emotionalImpact: 1
},{
    date: "2025-10-15",
    highTemp: 14,
    lowTemp: 4,
    weather: "Partly Cloudy",
    totalCalories: 1440,
    mealsPerDay: 2,
    percentHotMeals: 60,
    emotionalImpact: 2
},{
    date: "2025-10-16",
    highTemp: 13,
    lowTemp: 8,
    weather: "Cloudy",
    totalCalories: 1750,
    mealsPerDay: 3,
    percentHotMeals: 60,
    emotionalImpact: 3
},{
    date: "2025-10-18",
    highTemp: 9,
    lowTemp: 6,
    weather: "Rain",
    totalCalories: 1534,
    mealsPerDay: 2,
    percentHotMeals: 100,
    emotionalImpact: 5
},{
    date: "2025-10-19",
    highTemp: 12,
    lowTemp: 5,
    weather: "Rain",
    totalCalories: 1650,
    mealsPerDay: 3,
    percentHotMeals: 90,
    emotionalImpact: 4
},{
    date: "2025-10-20",
    highTemp: 12,
    lowTemp: 9,
    weather: "Rain",
    totalCalories: 1250,
    mealsPerDay: 2,
    percentHotMeals: 100,
    emotionalImpact: 2
},{
    date: "2025-10-21",
    highTemp: 14,
    lowTemp: 7,
    weather: "Partly Cloudy",
    totalCalories: 1380,
    mealsPerDay: 2,
    percentHotMeals: 90,
    emotionalImpact: 3
}];// List of daily observations //

// console.log(JSON.stringify(weatherFoodData));
showData(weatherFoodData);
