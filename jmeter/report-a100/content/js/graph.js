/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 531.0, "series": [{"data": [[0.0, 2.0], [0.1, 4.0], [0.2, 4.0], [0.3, 4.0], [0.4, 5.0], [0.5, 5.0], [0.6, 5.0], [0.7, 5.0], [0.8, 5.0], [0.9, 5.0], [1.0, 6.0], [1.1, 6.0], [1.2, 6.0], [1.3, 6.0], [1.4, 6.0], [1.5, 6.0], [1.6, 6.0], [1.7, 6.0], [1.8, 7.0], [1.9, 7.0], [2.0, 7.0], [2.1, 7.0], [2.2, 7.0], [2.3, 7.0], [2.4, 7.0], [2.5, 7.0], [2.6, 7.0], [2.7, 8.0], [2.8, 8.0], [2.9, 8.0], [3.0, 8.0], [3.1, 8.0], [3.2, 8.0], [3.3, 8.0], [3.4, 8.0], [3.5, 9.0], [3.6, 9.0], [3.7, 9.0], [3.8, 9.0], [3.9, 9.0], [4.0, 9.0], [4.1, 9.0], [4.2, 9.0], [4.3, 10.0], [4.4, 10.0], [4.5, 10.0], [4.6, 10.0], [4.7, 10.0], [4.8, 10.0], [4.9, 11.0], [5.0, 11.0], [5.1, 11.0], [5.2, 11.0], [5.3, 11.0], [5.4, 11.0], [5.5, 12.0], [5.6, 12.0], [5.7, 12.0], [5.8, 12.0], [5.9, 12.0], [6.0, 13.0], [6.1, 13.0], [6.2, 13.0], [6.3, 13.0], [6.4, 13.0], [6.5, 14.0], [6.6, 14.0], [6.7, 14.0], [6.8, 14.0], [6.9, 15.0], [7.0, 15.0], [7.1, 15.0], [7.2, 15.0], [7.3, 15.0], [7.4, 16.0], [7.5, 16.0], [7.6, 16.0], [7.7, 16.0], [7.8, 17.0], [7.9, 17.0], [8.0, 17.0], [8.1, 18.0], [8.2, 18.0], [8.3, 18.0], [8.4, 18.0], [8.5, 19.0], [8.6, 19.0], [8.7, 19.0], [8.8, 19.0], [8.9, 20.0], [9.0, 20.0], [9.1, 20.0], [9.2, 20.0], [9.3, 20.0], [9.4, 20.0], [9.5, 21.0], [9.6, 21.0], [9.7, 21.0], [9.8, 21.0], [9.9, 21.0], [10.0, 21.0], [10.1, 22.0], [10.2, 22.0], [10.3, 22.0], [10.4, 22.0], [10.5, 22.0], [10.6, 22.0], [10.7, 23.0], [10.8, 23.0], [10.9, 23.0], [11.0, 23.0], [11.1, 23.0], [11.2, 23.0], [11.3, 24.0], [11.4, 24.0], [11.5, 24.0], [11.6, 24.0], [11.7, 24.0], [11.8, 24.0], [11.9, 24.0], [12.0, 25.0], [12.1, 25.0], [12.2, 25.0], [12.3, 25.0], [12.4, 25.0], [12.5, 25.0], [12.6, 26.0], [12.7, 26.0], [12.8, 26.0], [12.9, 26.0], [13.0, 26.0], [13.1, 26.0], [13.2, 26.0], [13.3, 27.0], [13.4, 27.0], [13.5, 27.0], [13.6, 27.0], [13.7, 27.0], [13.8, 27.0], [13.9, 28.0], [14.0, 28.0], [14.1, 28.0], [14.2, 28.0], [14.3, 28.0], [14.4, 28.0], [14.5, 29.0], [14.6, 29.0], [14.7, 29.0], [14.8, 29.0], [14.9, 29.0], [15.0, 29.0], [15.1, 30.0], [15.2, 30.0], [15.3, 30.0], [15.4, 30.0], [15.5, 30.0], [15.6, 30.0], [15.7, 31.0], [15.8, 31.0], [15.9, 31.0], [16.0, 31.0], [16.1, 31.0], [16.2, 32.0], [16.3, 32.0], [16.4, 32.0], [16.5, 32.0], [16.6, 33.0], [16.7, 33.0], [16.8, 33.0], [16.9, 33.0], [17.0, 34.0], [17.1, 34.0], [17.2, 34.0], [17.3, 34.0], [17.4, 34.0], [17.5, 35.0], [17.6, 35.0], [17.7, 35.0], [17.8, 35.0], [17.9, 35.0], [18.0, 36.0], [18.1, 36.0], [18.2, 36.0], [18.3, 36.0], [18.4, 36.0], [18.5, 36.0], [18.6, 37.0], [18.7, 37.0], [18.8, 37.0], [18.9, 37.0], [19.0, 37.0], [19.1, 37.0], [19.2, 37.0], [19.3, 37.0], [19.4, 38.0], [19.5, 38.0], [19.6, 38.0], [19.7, 38.0], [19.8, 38.0], [19.9, 38.0], [20.0, 38.0], [20.1, 38.0], [20.2, 38.0], [20.3, 38.0], [20.4, 38.0], [20.5, 38.0], [20.6, 38.0], [20.7, 39.0], [20.8, 39.0], [20.9, 39.0], [21.0, 39.0], [21.1, 39.0], [21.2, 39.0], [21.3, 39.0], [21.4, 39.0], [21.5, 39.0], [21.6, 39.0], [21.7, 39.0], [21.8, 39.0], [21.9, 39.0], [22.0, 39.0], [22.1, 39.0], [22.2, 39.0], [22.3, 39.0], [22.4, 39.0], [22.5, 40.0], [22.6, 40.0], [22.7, 40.0], [22.8, 40.0], [22.9, 40.0], [23.0, 40.0], [23.1, 40.0], [23.2, 40.0], [23.3, 40.0], [23.4, 40.0], [23.5, 40.0], [23.6, 40.0], [23.7, 40.0], [23.8, 40.0], [23.9, 40.0], [24.0, 40.0], [24.1, 40.0], [24.2, 40.0], [24.3, 40.0], [24.4, 40.0], [24.5, 40.0], [24.6, 40.0], [24.7, 40.0], [24.8, 41.0], [24.9, 41.0], [25.0, 41.0], [25.1, 41.0], [25.2, 41.0], [25.3, 41.0], [25.4, 41.0], [25.5, 41.0], [25.6, 41.0], [25.7, 41.0], [25.8, 41.0], [25.9, 41.0], [26.0, 41.0], [26.1, 41.0], [26.2, 41.0], [26.3, 41.0], [26.4, 41.0], [26.5, 41.0], [26.6, 41.0], [26.7, 41.0], [26.8, 41.0], [26.9, 41.0], [27.0, 41.0], [27.1, 41.0], [27.2, 41.0], [27.3, 41.0], [27.4, 41.0], [27.5, 42.0], [27.6, 42.0], [27.7, 42.0], [27.8, 42.0], [27.9, 42.0], [28.0, 42.0], [28.1, 42.0], [28.2, 42.0], [28.3, 42.0], [28.4, 42.0], [28.5, 42.0], [28.6, 42.0], [28.7, 42.0], [28.8, 42.0], [28.9, 42.0], [29.0, 42.0], [29.1, 42.0], [29.2, 42.0], [29.3, 42.0], [29.4, 42.0], [29.5, 42.0], [29.6, 42.0], [29.7, 42.0], [29.8, 42.0], [29.9, 42.0], [30.0, 42.0], [30.1, 42.0], [30.2, 42.0], [30.3, 43.0], [30.4, 43.0], [30.5, 43.0], [30.6, 43.0], [30.7, 43.0], [30.8, 43.0], [30.9, 43.0], [31.0, 43.0], [31.1, 43.0], [31.2, 43.0], [31.3, 43.0], [31.4, 43.0], [31.5, 43.0], [31.6, 43.0], [31.7, 43.0], [31.8, 43.0], [31.9, 43.0], [32.0, 43.0], [32.1, 43.0], [32.2, 43.0], [32.3, 43.0], [32.4, 43.0], [32.5, 43.0], [32.6, 43.0], [32.7, 43.0], [32.8, 43.0], [32.9, 43.0], [33.0, 43.0], [33.1, 43.0], [33.2, 44.0], [33.3, 44.0], [33.4, 44.0], [33.5, 44.0], [33.6, 44.0], [33.7, 44.0], [33.8, 44.0], [33.9, 44.0], [34.0, 44.0], [34.1, 44.0], [34.2, 44.0], [34.3, 44.0], [34.4, 44.0], [34.5, 44.0], [34.6, 44.0], [34.7, 44.0], [34.8, 44.0], [34.9, 44.0], [35.0, 44.0], [35.1, 44.0], [35.2, 44.0], [35.3, 44.0], [35.4, 44.0], [35.5, 44.0], [35.6, 44.0], [35.7, 44.0], [35.8, 44.0], [35.9, 44.0], [36.0, 44.0], [36.1, 44.0], [36.2, 44.0], [36.3, 45.0], [36.4, 45.0], [36.5, 45.0], [36.6, 45.0], [36.7, 45.0], [36.8, 45.0], [36.9, 45.0], [37.0, 45.0], [37.1, 45.0], [37.2, 45.0], [37.3, 45.0], [37.4, 45.0], [37.5, 45.0], [37.6, 45.0], [37.7, 45.0], [37.8, 45.0], [37.9, 45.0], [38.0, 45.0], [38.1, 45.0], [38.2, 45.0], [38.3, 45.0], [38.4, 45.0], [38.5, 45.0], [38.6, 45.0], [38.7, 45.0], [38.8, 45.0], [38.9, 45.0], [39.0, 45.0], [39.1, 45.0], [39.2, 45.0], [39.3, 45.0], [39.4, 45.0], [39.5, 45.0], [39.6, 46.0], [39.7, 46.0], [39.8, 46.0], [39.9, 46.0], [40.0, 46.0], [40.1, 46.0], [40.2, 46.0], [40.3, 46.0], [40.4, 46.0], [40.5, 46.0], [40.6, 46.0], [40.7, 46.0], [40.8, 46.0], [40.9, 46.0], [41.0, 46.0], [41.1, 46.0], [41.2, 46.0], [41.3, 46.0], [41.4, 46.0], [41.5, 46.0], [41.6, 46.0], [41.7, 46.0], [41.8, 46.0], [41.9, 46.0], [42.0, 46.0], [42.1, 46.0], [42.2, 46.0], [42.3, 46.0], [42.4, 46.0], [42.5, 46.0], [42.6, 46.0], [42.7, 46.0], [42.8, 46.0], [42.9, 46.0], [43.0, 46.0], [43.1, 47.0], [43.2, 47.0], [43.3, 47.0], [43.4, 47.0], [43.5, 47.0], [43.6, 47.0], [43.7, 47.0], [43.8, 47.0], [43.9, 47.0], [44.0, 47.0], [44.1, 47.0], [44.2, 47.0], [44.3, 47.0], [44.4, 47.0], [44.5, 47.0], [44.6, 47.0], [44.7, 47.0], [44.8, 47.0], [44.9, 47.0], [45.0, 47.0], [45.1, 47.0], [45.2, 47.0], [45.3, 47.0], [45.4, 47.0], [45.5, 47.0], [45.6, 47.0], [45.7, 47.0], [45.8, 47.0], [45.9, 47.0], [46.0, 47.0], [46.1, 47.0], [46.2, 47.0], [46.3, 47.0], [46.4, 47.0], [46.5, 47.0], [46.6, 47.0], [46.7, 47.0], [46.8, 48.0], [46.9, 48.0], [47.0, 48.0], [47.1, 48.0], [47.2, 48.0], [47.3, 48.0], [47.4, 48.0], [47.5, 48.0], [47.6, 48.0], [47.7, 48.0], [47.8, 48.0], [47.9, 48.0], [48.0, 48.0], [48.1, 48.0], [48.2, 48.0], [48.3, 48.0], [48.4, 48.0], [48.5, 48.0], [48.6, 48.0], [48.7, 48.0], [48.8, 48.0], [48.9, 48.0], [49.0, 48.0], [49.1, 48.0], [49.2, 48.0], [49.3, 48.0], [49.4, 48.0], [49.5, 48.0], [49.6, 48.0], [49.7, 48.0], [49.8, 48.0], [49.9, 48.0], [50.0, 48.0], [50.1, 48.0], [50.2, 48.0], [50.3, 48.0], [50.4, 48.0], [50.5, 49.0], [50.6, 49.0], [50.7, 49.0], [50.8, 49.0], [50.9, 49.0], [51.0, 49.0], [51.1, 49.0], [51.2, 49.0], [51.3, 49.0], [51.4, 49.0], [51.5, 49.0], [51.6, 49.0], [51.7, 49.0], [51.8, 49.0], [51.9, 49.0], [52.0, 49.0], [52.1, 49.0], [52.2, 49.0], [52.3, 49.0], [52.4, 49.0], [52.5, 49.0], [52.6, 49.0], [52.7, 49.0], [52.8, 49.0], [52.9, 49.0], [53.0, 49.0], [53.1, 49.0], [53.2, 49.0], [53.3, 49.0], [53.4, 49.0], [53.5, 49.0], [53.6, 49.0], [53.7, 49.0], [53.8, 49.0], [53.9, 49.0], [54.0, 49.0], [54.1, 49.0], [54.2, 50.0], [54.3, 50.0], [54.4, 50.0], [54.5, 50.0], [54.6, 50.0], [54.7, 50.0], [54.8, 50.0], [54.9, 50.0], [55.0, 50.0], [55.1, 50.0], [55.2, 50.0], [55.3, 50.0], [55.4, 50.0], [55.5, 50.0], [55.6, 50.0], [55.7, 50.0], [55.8, 50.0], [55.9, 50.0], [56.0, 50.0], [56.1, 50.0], [56.2, 50.0], [56.3, 50.0], [56.4, 50.0], [56.5, 50.0], [56.6, 50.0], [56.7, 50.0], [56.8, 50.0], [56.9, 50.0], [57.0, 50.0], [57.1, 50.0], [57.2, 50.0], [57.3, 50.0], [57.4, 50.0], [57.5, 50.0], [57.6, 50.0], [57.7, 51.0], [57.8, 51.0], [57.9, 51.0], [58.0, 51.0], [58.1, 51.0], [58.2, 51.0], [58.3, 51.0], [58.4, 51.0], [58.5, 51.0], [58.6, 51.0], [58.7, 51.0], [58.8, 51.0], [58.9, 51.0], [59.0, 51.0], [59.1, 51.0], [59.2, 51.0], [59.3, 51.0], [59.4, 51.0], [59.5, 51.0], [59.6, 51.0], [59.7, 51.0], [59.8, 51.0], [59.9, 51.0], [60.0, 51.0], [60.1, 51.0], [60.2, 51.0], [60.3, 51.0], [60.4, 51.0], [60.5, 51.0], [60.6, 51.0], [60.7, 51.0], [60.8, 52.0], [60.9, 52.0], [61.0, 52.0], [61.1, 52.0], [61.2, 52.0], [61.3, 52.0], [61.4, 52.0], [61.5, 52.0], [61.6, 52.0], [61.7, 52.0], [61.8, 52.0], [61.9, 52.0], [62.0, 52.0], [62.1, 52.0], [62.2, 52.0], [62.3, 52.0], [62.4, 52.0], [62.5, 52.0], [62.6, 52.0], [62.7, 52.0], [62.8, 52.0], [62.9, 52.0], [63.0, 52.0], [63.1, 52.0], [63.2, 52.0], [63.3, 52.0], [63.4, 52.0], [63.5, 53.0], [63.6, 53.0], [63.7, 53.0], [63.8, 53.0], [63.9, 53.0], [64.0, 53.0], [64.1, 53.0], [64.2, 53.0], [64.3, 53.0], [64.4, 53.0], [64.5, 53.0], [64.6, 53.0], [64.7, 53.0], [64.8, 53.0], [64.9, 53.0], [65.0, 53.0], [65.1, 53.0], [65.2, 53.0], [65.3, 53.0], [65.4, 53.0], [65.5, 53.0], [65.6, 53.0], [65.7, 53.0], [65.8, 53.0], [65.9, 54.0], [66.0, 54.0], [66.1, 54.0], [66.2, 54.0], [66.3, 54.0], [66.4, 54.0], [66.5, 54.0], [66.6, 54.0], [66.7, 54.0], [66.8, 54.0], [66.9, 54.0], [67.0, 54.0], [67.1, 54.0], [67.2, 54.0], [67.3, 54.0], [67.4, 54.0], [67.5, 54.0], [67.6, 54.0], [67.7, 54.0], [67.8, 54.0], [67.9, 54.0], [68.0, 54.0], [68.1, 55.0], [68.2, 55.0], [68.3, 55.0], [68.4, 55.0], [68.5, 55.0], [68.6, 55.0], [68.7, 55.0], [68.8, 55.0], [68.9, 55.0], [69.0, 55.0], [69.1, 55.0], [69.2, 55.0], [69.3, 55.0], [69.4, 55.0], [69.5, 55.0], [69.6, 55.0], [69.7, 55.0], [69.8, 55.0], [69.9, 55.0], [70.0, 55.0], [70.1, 56.0], [70.2, 56.0], [70.3, 56.0], [70.4, 56.0], [70.5, 56.0], [70.6, 56.0], [70.7, 56.0], [70.8, 56.0], [70.9, 56.0], [71.0, 56.0], [71.1, 56.0], [71.2, 56.0], [71.3, 56.0], [71.4, 56.0], [71.5, 56.0], [71.6, 56.0], [71.7, 56.0], [71.8, 56.0], [71.9, 57.0], [72.0, 57.0], [72.1, 57.0], [72.2, 57.0], [72.3, 57.0], [72.4, 57.0], [72.5, 57.0], [72.6, 57.0], [72.7, 57.0], [72.8, 57.0], [72.9, 57.0], [73.0, 57.0], [73.1, 57.0], [73.2, 57.0], [73.3, 57.0], [73.4, 57.0], [73.5, 57.0], [73.6, 58.0], [73.7, 58.0], [73.8, 58.0], [73.9, 58.0], [74.0, 58.0], [74.1, 58.0], [74.2, 58.0], [74.3, 58.0], [74.4, 58.0], [74.5, 58.0], [74.6, 58.0], [74.7, 58.0], [74.8, 58.0], [74.9, 58.0], [75.0, 59.0], [75.1, 59.0], [75.2, 59.0], [75.3, 59.0], [75.4, 59.0], [75.5, 59.0], [75.6, 59.0], [75.7, 59.0], [75.8, 59.0], [75.9, 59.0], [76.0, 59.0], [76.1, 59.0], [76.2, 59.0], [76.3, 60.0], [76.4, 60.0], [76.5, 60.0], [76.6, 60.0], [76.7, 60.0], [76.8, 60.0], [76.9, 60.0], [77.0, 60.0], [77.1, 60.0], [77.2, 60.0], [77.3, 60.0], [77.4, 60.0], [77.5, 60.0], [77.6, 60.0], [77.7, 61.0], [77.8, 61.0], [77.9, 61.0], [78.0, 61.0], [78.1, 61.0], [78.2, 61.0], [78.3, 61.0], [78.4, 61.0], [78.5, 61.0], [78.6, 61.0], [78.7, 61.0], [78.8, 61.0], [78.9, 62.0], [79.0, 62.0], [79.1, 62.0], [79.2, 62.0], [79.3, 62.0], [79.4, 62.0], [79.5, 62.0], [79.6, 62.0], [79.7, 62.0], [79.8, 62.0], [79.9, 62.0], [80.0, 62.0], [80.1, 63.0], [80.2, 63.0], [80.3, 63.0], [80.4, 63.0], [80.5, 63.0], [80.6, 63.0], [80.7, 63.0], [80.8, 63.0], [80.9, 63.0], [81.0, 63.0], [81.1, 64.0], [81.2, 64.0], [81.3, 64.0], [81.4, 64.0], [81.5, 64.0], [81.6, 64.0], [81.7, 64.0], [81.8, 64.0], [81.9, 64.0], [82.0, 64.0], [82.1, 65.0], [82.2, 65.0], [82.3, 65.0], [82.4, 65.0], [82.5, 65.0], [82.6, 65.0], [82.7, 65.0], [82.8, 65.0], [82.9, 65.0], [83.0, 65.0], [83.1, 66.0], [83.2, 66.0], [83.3, 66.0], [83.4, 66.0], [83.5, 66.0], [83.6, 66.0], [83.7, 66.0], [83.8, 66.0], [83.9, 66.0], [84.0, 67.0], [84.1, 67.0], [84.2, 67.0], [84.3, 67.0], [84.4, 67.0], [84.5, 67.0], [84.6, 67.0], [84.7, 67.0], [84.8, 68.0], [84.9, 68.0], [85.0, 68.0], [85.1, 68.0], [85.2, 68.0], [85.3, 68.0], [85.4, 68.0], [85.5, 68.0], [85.6, 69.0], [85.7, 69.0], [85.8, 69.0], [85.9, 69.0], [86.0, 69.0], [86.1, 69.0], [86.2, 69.0], [86.3, 69.0], [86.4, 70.0], [86.5, 70.0], [86.6, 70.0], [86.7, 70.0], [86.8, 70.0], [86.9, 70.0], [87.0, 70.0], [87.1, 71.0], [87.2, 71.0], [87.3, 71.0], [87.4, 71.0], [87.5, 71.0], [87.6, 71.0], [87.7, 71.0], [87.8, 72.0], [87.9, 72.0], [88.0, 72.0], [88.1, 72.0], [88.2, 72.0], [88.3, 73.0], [88.4, 73.0], [88.5, 73.0], [88.6, 73.0], [88.7, 73.0], [88.8, 73.0], [88.9, 74.0], [89.0, 74.0], [89.1, 74.0], [89.2, 74.0], [89.3, 74.0], [89.4, 75.0], [89.5, 75.0], [89.6, 75.0], [89.7, 75.0], [89.8, 76.0], [89.9, 76.0], [90.0, 76.0], [90.1, 76.0], [90.2, 76.0], [90.3, 77.0], [90.4, 77.0], [90.5, 77.0], [90.6, 78.0], [90.7, 78.0], [90.8, 78.0], [90.9, 78.0], [91.0, 79.0], [91.1, 79.0], [91.2, 79.0], [91.3, 80.0], [91.4, 80.0], [91.5, 80.0], [91.6, 80.0], [91.7, 81.0], [91.8, 81.0], [91.9, 81.0], [92.0, 82.0], [92.1, 82.0], [92.2, 82.0], [92.3, 83.0], [92.4, 83.0], [92.5, 84.0], [92.6, 84.0], [92.7, 84.0], [92.8, 85.0], [92.9, 85.0], [93.0, 85.0], [93.1, 86.0], [93.2, 86.0], [93.3, 87.0], [93.4, 87.0], [93.5, 88.0], [93.6, 88.0], [93.7, 88.0], [93.8, 89.0], [93.9, 89.0], [94.0, 90.0], [94.1, 90.0], [94.2, 91.0], [94.3, 91.0], [94.4, 92.0], [94.5, 92.0], [94.6, 93.0], [94.7, 94.0], [94.8, 94.0], [94.9, 95.0], [95.0, 96.0], [95.1, 96.0], [95.2, 97.0], [95.3, 97.0], [95.4, 98.0], [95.5, 99.0], [95.6, 100.0], [95.7, 101.0], [95.8, 102.0], [95.9, 102.0], [96.0, 103.0], [96.1, 104.0], [96.2, 105.0], [96.3, 106.0], [96.4, 107.0], [96.5, 108.0], [96.6, 109.0], [96.7, 111.0], [96.8, 112.0], [96.9, 113.0], [97.0, 114.0], [97.1, 115.0], [97.2, 116.0], [97.3, 118.0], [97.4, 119.0], [97.5, 120.0], [97.6, 121.0], [97.7, 123.0], [97.8, 124.0], [97.9, 126.0], [98.0, 127.0], [98.1, 129.0], [98.2, 131.0], [98.3, 132.0], [98.4, 134.0], [98.5, 136.0], [98.6, 137.0], [98.7, 139.0], [98.8, 142.0], [98.9, 144.0], [99.0, 147.0], [99.1, 150.0], [99.2, 153.0], [99.3, 157.0], [99.4, 162.0], [99.5, 170.0], [99.6, 179.0], [99.7, 195.0], [99.8, 264.0], [99.9, 407.0]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 87.0, "minX": 0.0, "maxY": 325518.0, "series": [{"data": [[0.0, 325518.0], [300.0, 164.0], [100.0, 14135.0], [200.0, 430.0], [400.0, 303.0], [500.0, 87.0]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 87.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 340550.0, "series": [{"data": [[0.0, 340550.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 87.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 57.15051034482746, "minX": 1.79222736E12, "maxY": 100.0, "series": [{"data": [[1.79222748E12, 100.0], [1.79222754E12, 99.9475519057949], [1.79222736E12, 57.15051034482746], [1.79222742E12, 100.0]], "isOverall": false, "label": "跳转压测线程组（阶梯加压：50/100/200/400）", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222754E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 8.294685990338165, "minX": 1.0, "maxY": 118.33333333333333, "series": [{"data": [[2.0, 94.0], [3.0, 118.33333333333333], [4.0, 64.55555555555556], [5.0, 49.333333333333336], [6.0, 66.84615384615385], [7.0, 49.45], [8.0, 47.529411764705884], [9.0, 10.522222222222219], [10.0, 18.948275862068964], [11.0, 9.407692307692308], [12.0, 8.842857142857143], [13.0, 9.533333333333337], [14.0, 8.502890173410403], [15.0, 9.945121951219509], [16.0, 11.539999999999997], [17.0, 8.294685990338165], [18.0, 10.02061855670103], [19.0, 12.512345679012345], [20.0, 10.145539906103286], [21.0, 12.177777777777775], [22.0, 11.626865671641792], [23.0, 12.198979591836736], [24.0, 11.871559633027523], [25.0, 16.235668789808912], [26.0, 16.333333333333332], [27.0, 15.43157894736842], [28.0, 16.844444444444452], [29.0, 14.66486486486487], [30.0, 15.573394495412847], [31.0, 13.669603524229077], [32.0, 14.151111111111106], [33.0, 14.694690265486727], [34.0, 15.7351598173516], [35.0, 17.551546391752584], [36.0, 15.619047619047613], [37.0, 20.16666666666666], [38.0, 23.57861635220126], [39.0, 25.04848484848484], [40.0, 18.527272727272745], [41.0, 19.69194312796208], [42.0, 17.194331983805665], [43.0, 22.89304812834224], [44.0, 22.484999999999992], [45.0, 27.119496855345915], [46.0, 31.84375], [47.0, 21.6860986547085], [48.0, 23.300492610837445], [49.0, 22.115740740740733], [50.0, 43.377192982456144], [51.0, 34.32704402515724], [52.0, 28.36842105263157], [53.0, 26.405797101449274], [54.0, 28.281914893617017], [55.0, 31.443113772455092], [56.0, 33.891428571428605], [57.0, 33.649122807017555], [58.0, 30.38383838383838], [59.0, 35.75147928994082], [60.0, 38.485714285714316], [61.0, 38.183908045977006], [62.0, 35.56069364161847], [63.0, 34.543010752688176], [64.0, 35.75531914893617], [65.0, 41.75912408759125], [66.0, 38.20765027322405], [67.0, 32.325688073394474], [68.0, 35.21938775510205], [69.0, 29.10762331838565], [70.0, 32.20600858369095], [71.0, 30.33606557377049], [72.0, 30.043668122270738], [73.0, 28.16216216216217], [74.0, 30.48235294117649], [75.0, 33.023148148148145], [76.0, 36.68396226415095], [77.0, 34.481308411214954], [78.0, 37.99038461538464], [79.0, 33.91101694915253], [80.0, 48.12578616352203], [81.0, 37.56540084388184], [82.0, 34.25925925925926], [83.0, 34.39748953974895], [84.0, 35.8595041322314], [85.0, 39.51256281407033], [86.0, 38.68442622950818], [87.0, 36.18750000000002], [88.0, 40.09134615384613], [89.0, 39.12406015037592], [90.0, 38.46090534979423], [91.0, 39.2522123893805], [92.0, 41.404761904761905], [93.0, 41.60337552742619], [94.0, 39.66382978723404], [95.0, 42.791469194312796], [96.0, 44.36693548387096], [97.0, 39.93043478260869], [98.0, 40.532258064516114], [99.0, 39.340163934426215], [100.0, 52.6265994090674], [1.0, 93.0]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}, {"data": [[97.70411611187048, 51.30609417062755]], "isOverall": false, "label": "GET /1bhtK（短码跳转）-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 51574.583333333336, "minX": 1.79222736E12, "maxY": 348247.85, "series": [{"data": [[1.79222748E12, 348247.85], [1.79222754E12, 305849.61666666664], [1.79222736E12, 53907.95], [1.79222742E12, 301129.38333333336]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79222748E12, 335100.15], [1.79222754E12, 294302.4], [1.79222736E12, 51574.583333333336], [1.79222742E12, 289756.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222754E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 27.490482758620626, "minX": 1.79222736E12, "maxY": 58.91506752304099, "series": [{"data": [[1.79222748E12, 50.92010478061647], [1.79222754E12, 48.434284939572386], [1.79222736E12, 27.490482758620626], [1.79222742E12, 58.91506752304099]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222754E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 27.48987586206906, "minX": 1.79222736E12, "maxY": 58.91496916464181, "series": [{"data": [[1.79222748E12, 50.919977206813755], [1.79222754E12, 48.434110629067284], [1.79222736E12, 27.48987586206906], [1.79222742E12, 58.91496916464181]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222754E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.005817365345852641, "minX": 1.79222736E12, "maxY": 0.007999999999999964, "series": [{"data": [[1.79222748E12, 0.005817365345852641], [1.79222754E12, 0.007969863650449284], [1.79222736E12, 0.007999999999999964], [1.79222742E12, 0.006167071575406462]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222754E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.79222736E12, "maxY": 531.0, "series": [{"data": [[1.79222748E12, 493.0], [1.79222754E12, 268.0], [1.79222736E12, 136.0], [1.79222742E12, 531.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79222748E12, 3.0], [1.79222754E12, 2.0], [1.79222736E12, 4.0], [1.79222742E12, 28.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79222748E12, 50.0], [1.79222754E12, 95.0], [1.79222736E12, 42.0], [1.79222742E12, 89.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79222748E12, 109.0], [1.79222754E12, 155.0], [1.79222736E12, 53.0], [1.79222742E12, 194.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79222748E12, 32.0], [1.79222754E12, 27.0], [1.79222736E12, 29.0], [1.79222742E12, 54.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.79222748E12, 58.0], [1.79222754E12, 121.0], [1.79222736E12, 44.70000000000073], [1.79222742E12, 115.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222754E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 7.0, "minX": 191.0, "maxY": 88.0, "series": [{"data": [[191.0, 7.0], [202.0, 83.0], [875.0, 62.0], [1014.0, 57.0], [1034.0, 52.0], [1078.0, 83.0], [1059.0, 57.0], [1104.0, 65.0], [1106.0, 74.0], [1093.0, 88.0], [1196.0, 81.0], [1206.0, 72.0], [1172.0, 74.0], [1265.0, 59.0], [1274.0, 71.0], [1233.0, 80.0], [1305.0, 65.0], [1299.0, 66.0], [1300.0, 69.0], [1349.0, 68.0], [1355.0, 72.0], [1438.0, 51.0], [1470.0, 49.0], [1466.0, 65.0], [1415.0, 66.0], [1452.0, 55.0], [1451.0, 70.0], [1517.0, 58.0], [1518.0, 64.0], [1524.0, 51.0], [1505.0, 66.0], [1533.0, 66.0], [1474.0, 65.0], [1486.0, 63.0], [1567.0, 63.0], [1564.0, 54.0], [1596.0, 54.0], [1583.0, 62.0], [1559.0, 62.0], [1585.0, 63.0], [1565.0, 57.0], [1563.0, 59.0], [1574.0, 52.0], [1573.0, 44.0], [1657.0, 55.0], [1626.0, 8.0], [1632.0, 59.0], [1646.0, 58.0], [1660.0, 54.0], [1604.0, 62.0], [1605.0, 60.0], [1620.0, 52.0], [1638.0, 57.0], [1643.0, 57.0], [1699.0, 57.0], [1677.0, 53.0], [1664.0, 47.0], [1707.0, 57.0], [1710.0, 54.0], [1679.0, 58.0], [1727.0, 56.0], [1700.0, 58.0], [1702.0, 57.0], [1668.0, 54.0], [1755.0, 44.0], [1777.0, 54.0], [1733.0, 52.0], [1731.0, 53.0], [1776.0, 51.0], [1764.0, 44.0], [1732.0, 56.0], [1848.0, 53.0], [1824.0, 53.0], [1855.0, 13.0], [1825.0, 48.0], [1827.0, 52.0], [1815.0, 52.0], [1829.0, 55.0], [1837.0, 52.0], [1843.0, 51.0], [1840.0, 30.5], [1805.0, 54.0], [1792.0, 52.0], [1814.0, 52.0], [1812.0, 54.0], [1828.0, 48.0], [1915.0, 50.0], [1869.0, 33.0], [1872.0, 48.0], [1874.0, 51.0], [1899.0, 52.0], [1903.0, 50.0], [1866.0, 52.0], [1863.0, 34.0], [1882.0, 48.0], [1907.0, 49.0], [1913.0, 49.0], [1895.0, 51.0], [1888.0, 52.0], [1917.0, 51.0], [1919.0, 48.0], [1924.0, 42.0], [1923.0, 50.0], [1958.0, 47.0], [1991.0, 50.0], [2015.0, 49.0], [1999.0, 49.0], [1993.0, 47.0], [2000.0, 49.0], [2033.0, 49.0], [2014.0, 48.0], [2012.0, 48.0], [2037.0, 48.0], [2035.0, 20.0], [2038.0, 46.0], [2018.0, 31.0], [1990.0, 49.0], [2058.0, 16.0], [2098.0, 47.0], [2120.0, 47.0], [2081.0, 47.0], [2090.0, 47.0], [2132.0, 44.0], [2133.0, 44.0], [2073.0, 49.0], [2053.0, 44.0], [2052.0, 48.0], [2173.0, 44.0], [2158.0, 46.0], [2201.0, 45.0], [2241.0, 31.0], [2297.0, 36.0], [2286.0, 43.0], [2288.0, 43.0], [2192.0, 44.0], [2198.0, 22.0], [2185.0, 23.0], [2246.0, 43.0], [2252.0, 43.0], [2253.0, 42.0], [2216.0, 43.0], [2221.0, 43.0], [2236.0, 44.0], [2210.0, 44.0], [2309.0, 41.0], [2324.0, 42.0], [2356.0, 41.0], [2343.0, 42.0], [2380.0, 21.0], [2358.0, 42.0], [2369.0, 41.0], [2370.0, 40.0], [2408.0, 20.0], [2452.0, 25.0], [2484.0, 19.0], [2531.0, 21.0], [2649.0, 10.0], [2666.0, 21.0], [2624.0, 17.0], [2579.0, 19.0], [2628.0, 21.0], [2658.0, 26.0], [2814.0, 35.0], [2785.0, 11.0], [2915.0, 24.0], [2965.0, 29.0], [3316.0, 29.0], [3319.0, 28.0], [3528.0, 23.0], [3998.0, 24.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3998.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 7.0, "minX": 191.0, "maxY": 88.0, "series": [{"data": [[191.0, 7.0], [202.0, 83.0], [875.0, 62.0], [1014.0, 57.0], [1034.0, 52.0], [1078.0, 83.0], [1059.0, 57.0], [1104.0, 65.0], [1106.0, 74.0], [1093.0, 88.0], [1196.0, 81.0], [1206.0, 72.0], [1172.0, 74.0], [1265.0, 59.0], [1274.0, 71.0], [1233.0, 80.0], [1305.0, 65.0], [1299.0, 66.0], [1300.0, 69.0], [1349.0, 68.0], [1355.0, 72.0], [1438.0, 51.0], [1470.0, 49.0], [1466.0, 65.0], [1415.0, 66.0], [1452.0, 55.0], [1451.0, 70.0], [1517.0, 58.0], [1518.0, 64.0], [1524.0, 51.0], [1505.0, 66.0], [1533.0, 66.0], [1474.0, 65.0], [1486.0, 63.0], [1567.0, 63.0], [1564.0, 54.0], [1596.0, 54.0], [1583.0, 62.0], [1559.0, 62.0], [1585.0, 63.0], [1565.0, 57.0], [1563.0, 59.0], [1574.0, 52.0], [1573.0, 44.0], [1657.0, 55.0], [1626.0, 8.0], [1632.0, 59.0], [1646.0, 58.0], [1660.0, 54.0], [1604.0, 62.0], [1605.0, 60.0], [1620.0, 52.0], [1638.0, 57.0], [1643.0, 57.0], [1699.0, 57.0], [1677.0, 53.0], [1664.0, 47.0], [1707.0, 57.0], [1710.0, 54.0], [1679.0, 58.0], [1727.0, 56.0], [1700.0, 58.0], [1702.0, 57.0], [1668.0, 54.0], [1755.0, 44.0], [1777.0, 54.0], [1733.0, 52.0], [1731.0, 53.0], [1776.0, 51.0], [1764.0, 44.0], [1732.0, 56.0], [1848.0, 53.0], [1824.0, 53.0], [1855.0, 13.0], [1825.0, 48.0], [1827.0, 52.0], [1815.0, 52.0], [1829.0, 55.0], [1837.0, 52.0], [1843.0, 51.0], [1840.0, 30.5], [1805.0, 54.0], [1792.0, 52.0], [1814.0, 52.0], [1812.0, 54.0], [1828.0, 48.0], [1915.0, 50.0], [1869.0, 33.0], [1872.0, 48.0], [1874.0, 51.0], [1899.0, 52.0], [1903.0, 50.0], [1866.0, 52.0], [1863.0, 34.0], [1882.0, 48.0], [1907.0, 49.0], [1913.0, 49.0], [1895.0, 51.0], [1888.0, 52.0], [1917.0, 51.0], [1919.0, 48.0], [1924.0, 42.0], [1923.0, 50.0], [1958.0, 47.0], [1991.0, 50.0], [2015.0, 49.0], [1999.0, 49.0], [1993.0, 47.0], [2000.0, 49.0], [2033.0, 49.0], [2014.0, 48.0], [2012.0, 48.0], [2037.0, 48.0], [2035.0, 20.0], [2038.0, 46.0], [2018.0, 31.0], [1990.0, 49.0], [2058.0, 16.0], [2098.0, 47.0], [2120.0, 47.0], [2081.0, 47.0], [2090.0, 47.0], [2132.0, 44.0], [2133.0, 44.0], [2073.0, 49.0], [2053.0, 44.0], [2052.0, 48.0], [2173.0, 44.0], [2158.0, 46.0], [2201.0, 45.0], [2241.0, 31.0], [2297.0, 36.0], [2286.0, 43.0], [2288.0, 43.0], [2192.0, 44.0], [2198.0, 22.0], [2185.0, 23.0], [2246.0, 43.0], [2252.0, 43.0], [2253.0, 42.0], [2216.0, 43.0], [2221.0, 43.0], [2236.0, 44.0], [2210.0, 44.0], [2309.0, 41.0], [2324.0, 42.0], [2356.0, 41.0], [2343.0, 42.0], [2380.0, 21.0], [2358.0, 42.0], [2369.0, 41.0], [2370.0, 40.0], [2408.0, 20.0], [2452.0, 25.0], [2484.0, 19.0], [2531.0, 21.0], [2649.0, 10.0], [2666.0, 21.0], [2624.0, 17.0], [2579.0, 19.0], [2628.0, 21.0], [2658.0, 26.0], [2814.0, 35.0], [2785.0, 11.0], [2915.0, 24.0], [2965.0, 29.0], [3316.0, 29.0], [3319.0, 28.0], [3528.0, 23.0], [3998.0, 24.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3998.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 303.75, "minX": 1.79222736E12, "maxY": 1959.65, "series": [{"data": [[1.79222748E12, 1959.65], [1.79222754E12, 1719.4166666666667], [1.79222736E12, 303.75], [1.79222742E12, 1694.4666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222754E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 302.0833333333333, "minX": 1.79222736E12, "maxY": 1959.65, "series": [{"data": [[1.79222748E12, 1959.65], [1.79222754E12, 1721.0666666666666], [1.79222736E12, 302.0833333333333], [1.79222742E12, 1694.4833333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222754E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 302.0833333333333, "minX": 1.79222736E12, "maxY": 1959.65, "series": [{"data": [[1.79222748E12, 1959.65], [1.79222754E12, 1721.0666666666666], [1.79222736E12, 302.0833333333333], [1.79222742E12, 1694.4833333333333]], "isOverall": false, "label": "GET /1bhtK（短码跳转）-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222754E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 302.0833333333333, "minX": 1.79222736E12, "maxY": 1959.65, "series": [{"data": [[1.79222748E12, 1959.65], [1.79222754E12, 1721.0666666666666], [1.79222736E12, 302.0833333333333], [1.79222742E12, 1694.4833333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222754E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

