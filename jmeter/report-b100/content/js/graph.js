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
        data: {"result": {"minY": 5.0, "minX": 0.0, "maxY": 9946.0, "series": [{"data": [[0.0, 5.0], [0.1, 9.0], [0.2, 10.0], [0.3, 11.0], [0.4, 12.0], [0.5, 13.0], [0.6, 14.0], [0.7, 15.0], [0.8, 15.0], [0.9, 17.0], [1.0, 18.0], [1.1, 19.0], [1.2, 20.0], [1.3, 21.0], [1.4, 22.0], [1.5, 23.0], [1.6, 24.0], [1.7, 25.0], [1.8, 26.0], [1.9, 27.0], [2.0, 28.0], [2.1, 29.0], [2.2, 30.0], [2.3, 31.0], [2.4, 32.0], [2.5, 33.0], [2.6, 35.0], [2.7, 36.0], [2.8, 37.0], [2.9, 38.0], [3.0, 39.0], [3.1, 40.0], [3.2, 41.0], [3.3, 43.0], [3.4, 44.0], [3.5, 45.0], [3.6, 46.0], [3.7, 47.0], [3.8, 48.0], [3.9, 49.0], [4.0, 50.0], [4.1, 51.0], [4.2, 52.0], [4.3, 54.0], [4.4, 55.0], [4.5, 56.0], [4.6, 58.0], [4.7, 59.0], [4.8, 61.0], [4.9, 62.0], [5.0, 63.0], [5.1, 63.0], [5.2, 64.0], [5.3, 64.0], [5.4, 65.0], [5.5, 65.0], [5.6, 65.0], [5.7, 65.0], [5.8, 66.0], [5.9, 66.0], [6.0, 66.0], [6.1, 66.0], [6.2, 67.0], [6.3, 67.0], [6.4, 67.0], [6.5, 67.0], [6.6, 67.0], [6.7, 67.0], [6.8, 68.0], [6.9, 68.0], [7.0, 68.0], [7.1, 68.0], [7.2, 68.0], [7.3, 68.0], [7.4, 68.0], [7.5, 68.0], [7.6, 69.0], [7.7, 69.0], [7.8, 69.0], [7.9, 69.0], [8.0, 69.0], [8.1, 69.0], [8.2, 69.0], [8.3, 69.0], [8.4, 69.0], [8.5, 69.0], [8.6, 69.0], [8.7, 70.0], [8.8, 70.0], [8.9, 70.0], [9.0, 70.0], [9.1, 70.0], [9.2, 70.0], [9.3, 70.0], [9.4, 70.0], [9.5, 70.0], [9.6, 70.0], [9.7, 70.0], [9.8, 70.0], [9.9, 70.0], [10.0, 70.0], [10.1, 70.0], [10.2, 71.0], [10.3, 71.0], [10.4, 71.0], [10.5, 71.0], [10.6, 71.0], [10.7, 71.0], [10.8, 71.0], [10.9, 71.0], [11.0, 71.0], [11.1, 71.0], [11.2, 71.0], [11.3, 71.0], [11.4, 71.0], [11.5, 71.0], [11.6, 71.0], [11.7, 71.0], [11.8, 71.0], [11.9, 71.0], [12.0, 72.0], [12.1, 72.0], [12.2, 72.0], [12.3, 72.0], [12.4, 72.0], [12.5, 72.0], [12.6, 72.0], [12.7, 72.0], [12.8, 72.0], [12.9, 72.0], [13.0, 72.0], [13.1, 72.0], [13.2, 72.0], [13.3, 72.0], [13.4, 72.0], [13.5, 72.0], [13.6, 72.0], [13.7, 72.0], [13.8, 72.0], [13.9, 72.0], [14.0, 72.0], [14.1, 73.0], [14.2, 73.0], [14.3, 73.0], [14.4, 73.0], [14.5, 73.0], [14.6, 73.0], [14.7, 73.0], [14.8, 73.0], [14.9, 73.0], [15.0, 73.0], [15.1, 73.0], [15.2, 73.0], [15.3, 73.0], [15.4, 73.0], [15.5, 73.0], [15.6, 73.0], [15.7, 73.0], [15.8, 73.0], [15.9, 73.0], [16.0, 73.0], [16.1, 73.0], [16.2, 73.0], [16.3, 73.0], [16.4, 73.0], [16.5, 74.0], [16.6, 74.0], [16.7, 74.0], [16.8, 74.0], [16.9, 74.0], [17.0, 74.0], [17.1, 74.0], [17.2, 74.0], [17.3, 74.0], [17.4, 74.0], [17.5, 74.0], [17.6, 74.0], [17.7, 74.0], [17.8, 74.0], [17.9, 74.0], [18.0, 74.0], [18.1, 74.0], [18.2, 74.0], [18.3, 74.0], [18.4, 74.0], [18.5, 74.0], [18.6, 74.0], [18.7, 74.0], [18.8, 74.0], [18.9, 74.0], [19.0, 74.0], [19.1, 74.0], [19.2, 75.0], [19.3, 75.0], [19.4, 75.0], [19.5, 75.0], [19.6, 75.0], [19.7, 75.0], [19.8, 75.0], [19.9, 75.0], [20.0, 75.0], [20.1, 75.0], [20.2, 75.0], [20.3, 75.0], [20.4, 75.0], [20.5, 75.0], [20.6, 75.0], [20.7, 75.0], [20.8, 75.0], [20.9, 75.0], [21.0, 75.0], [21.1, 75.0], [21.2, 75.0], [21.3, 75.0], [21.4, 75.0], [21.5, 75.0], [21.6, 75.0], [21.7, 75.0], [21.8, 75.0], [21.9, 76.0], [22.0, 76.0], [22.1, 76.0], [22.2, 76.0], [22.3, 76.0], [22.4, 76.0], [22.5, 76.0], [22.6, 76.0], [22.7, 76.0], [22.8, 76.0], [22.9, 76.0], [23.0, 76.0], [23.1, 76.0], [23.2, 76.0], [23.3, 76.0], [23.4, 76.0], [23.5, 76.0], [23.6, 76.0], [23.7, 76.0], [23.8, 76.0], [23.9, 76.0], [24.0, 76.0], [24.1, 76.0], [24.2, 76.0], [24.3, 76.0], [24.4, 76.0], [24.5, 76.0], [24.6, 76.0], [24.7, 76.0], [24.8, 77.0], [24.9, 77.0], [25.0, 77.0], [25.1, 77.0], [25.2, 77.0], [25.3, 77.0], [25.4, 77.0], [25.5, 77.0], [25.6, 77.0], [25.7, 77.0], [25.8, 77.0], [25.9, 77.0], [26.0, 77.0], [26.1, 77.0], [26.2, 77.0], [26.3, 77.0], [26.4, 77.0], [26.5, 77.0], [26.6, 77.0], [26.7, 77.0], [26.8, 77.0], [26.9, 77.0], [27.0, 77.0], [27.1, 77.0], [27.2, 77.0], [27.3, 77.0], [27.4, 77.0], [27.5, 77.0], [27.6, 77.0], [27.7, 78.0], [27.8, 78.0], [27.9, 78.0], [28.0, 78.0], [28.1, 78.0], [28.2, 78.0], [28.3, 78.0], [28.4, 78.0], [28.5, 78.0], [28.6, 78.0], [28.7, 78.0], [28.8, 78.0], [28.9, 78.0], [29.0, 78.0], [29.1, 78.0], [29.2, 78.0], [29.3, 78.0], [29.4, 78.0], [29.5, 78.0], [29.6, 78.0], [29.7, 78.0], [29.8, 78.0], [29.9, 78.0], [30.0, 78.0], [30.1, 78.0], [30.2, 78.0], [30.3, 78.0], [30.4, 78.0], [30.5, 78.0], [30.6, 79.0], [30.7, 79.0], [30.8, 79.0], [30.9, 79.0], [31.0, 79.0], [31.1, 79.0], [31.2, 79.0], [31.3, 79.0], [31.4, 79.0], [31.5, 79.0], [31.6, 79.0], [31.7, 79.0], [31.8, 79.0], [31.9, 79.0], [32.0, 79.0], [32.1, 79.0], [32.2, 79.0], [32.3, 79.0], [32.4, 79.0], [32.5, 79.0], [32.6, 79.0], [32.7, 79.0], [32.8, 79.0], [32.9, 79.0], [33.0, 79.0], [33.1, 79.0], [33.2, 79.0], [33.3, 79.0], [33.4, 80.0], [33.5, 80.0], [33.6, 80.0], [33.7, 80.0], [33.8, 80.0], [33.9, 80.0], [34.0, 80.0], [34.1, 80.0], [34.2, 80.0], [34.3, 80.0], [34.4, 80.0], [34.5, 80.0], [34.6, 80.0], [34.7, 80.0], [34.8, 80.0], [34.9, 80.0], [35.0, 80.0], [35.1, 80.0], [35.2, 80.0], [35.3, 80.0], [35.4, 80.0], [35.5, 80.0], [35.6, 80.0], [35.7, 80.0], [35.8, 80.0], [35.9, 80.0], [36.0, 80.0], [36.1, 80.0], [36.2, 81.0], [36.3, 81.0], [36.4, 81.0], [36.5, 81.0], [36.6, 81.0], [36.7, 81.0], [36.8, 81.0], [36.9, 81.0], [37.0, 81.0], [37.1, 81.0], [37.2, 81.0], [37.3, 81.0], [37.4, 81.0], [37.5, 81.0], [37.6, 81.0], [37.7, 81.0], [37.8, 81.0], [37.9, 81.0], [38.0, 81.0], [38.1, 81.0], [38.2, 81.0], [38.3, 81.0], [38.4, 81.0], [38.5, 81.0], [38.6, 81.0], [38.7, 81.0], [38.8, 82.0], [38.9, 82.0], [39.0, 82.0], [39.1, 82.0], [39.2, 82.0], [39.3, 82.0], [39.4, 82.0], [39.5, 82.0], [39.6, 82.0], [39.7, 82.0], [39.8, 82.0], [39.9, 82.0], [40.0, 82.0], [40.1, 82.0], [40.2, 82.0], [40.3, 82.0], [40.4, 82.0], [40.5, 82.0], [40.6, 82.0], [40.7, 82.0], [40.8, 82.0], [40.9, 82.0], [41.0, 82.0], [41.1, 82.0], [41.2, 83.0], [41.3, 83.0], [41.4, 83.0], [41.5, 83.0], [41.6, 83.0], [41.7, 83.0], [41.8, 83.0], [41.9, 83.0], [42.0, 83.0], [42.1, 83.0], [42.2, 83.0], [42.3, 83.0], [42.4, 83.0], [42.5, 83.0], [42.6, 83.0], [42.7, 83.0], [42.8, 83.0], [42.9, 83.0], [43.0, 83.0], [43.1, 83.0], [43.2, 83.0], [43.3, 83.0], [43.4, 83.0], [43.5, 83.0], [43.6, 83.0], [43.7, 83.0], [43.8, 84.0], [43.9, 84.0], [44.0, 84.0], [44.1, 84.0], [44.2, 84.0], [44.3, 84.0], [44.4, 84.0], [44.5, 84.0], [44.6, 84.0], [44.7, 84.0], [44.8, 84.0], [44.9, 84.0], [45.0, 84.0], [45.1, 84.0], [45.2, 84.0], [45.3, 84.0], [45.4, 84.0], [45.5, 84.0], [45.6, 84.0], [45.7, 84.0], [45.8, 84.0], [45.9, 84.0], [46.0, 84.0], [46.1, 84.0], [46.2, 84.0], [46.3, 84.0], [46.4, 85.0], [46.5, 85.0], [46.6, 85.0], [46.7, 85.0], [46.8, 85.0], [46.9, 85.0], [47.0, 85.0], [47.1, 85.0], [47.2, 85.0], [47.3, 85.0], [47.4, 85.0], [47.5, 85.0], [47.6, 85.0], [47.7, 85.0], [47.8, 85.0], [47.9, 85.0], [48.0, 85.0], [48.1, 85.0], [48.2, 85.0], [48.3, 85.0], [48.4, 85.0], [48.5, 85.0], [48.6, 85.0], [48.7, 85.0], [48.8, 85.0], [48.9, 86.0], [49.0, 86.0], [49.1, 86.0], [49.2, 86.0], [49.3, 86.0], [49.4, 86.0], [49.5, 86.0], [49.6, 86.0], [49.7, 86.0], [49.8, 86.0], [49.9, 86.0], [50.0, 86.0], [50.1, 86.0], [50.2, 86.0], [50.3, 86.0], [50.4, 86.0], [50.5, 86.0], [50.6, 86.0], [50.7, 86.0], [50.8, 86.0], [50.9, 86.0], [51.0, 86.0], [51.1, 86.0], [51.2, 86.0], [51.3, 87.0], [51.4, 87.0], [51.5, 87.0], [51.6, 87.0], [51.7, 87.0], [51.8, 87.0], [51.9, 87.0], [52.0, 87.0], [52.1, 87.0], [52.2, 87.0], [52.3, 87.0], [52.4, 87.0], [52.5, 87.0], [52.6, 87.0], [52.7, 87.0], [52.8, 87.0], [52.9, 87.0], [53.0, 87.0], [53.1, 87.0], [53.2, 87.0], [53.3, 87.0], [53.4, 87.0], [53.5, 88.0], [53.6, 88.0], [53.7, 88.0], [53.8, 88.0], [53.9, 88.0], [54.0, 88.0], [54.1, 88.0], [54.2, 88.0], [54.3, 88.0], [54.4, 88.0], [54.5, 88.0], [54.6, 88.0], [54.7, 88.0], [54.8, 88.0], [54.9, 88.0], [55.0, 88.0], [55.1, 88.0], [55.2, 88.0], [55.3, 88.0], [55.4, 88.0], [55.5, 88.0], [55.6, 89.0], [55.7, 89.0], [55.8, 89.0], [55.9, 89.0], [56.0, 89.0], [56.1, 89.0], [56.2, 89.0], [56.3, 89.0], [56.4, 89.0], [56.5, 89.0], [56.6, 89.0], [56.7, 89.0], [56.8, 89.0], [56.9, 89.0], [57.0, 89.0], [57.1, 89.0], [57.2, 89.0], [57.3, 89.0], [57.4, 89.0], [57.5, 89.0], [57.6, 90.0], [57.7, 90.0], [57.8, 90.0], [57.9, 90.0], [58.0, 90.0], [58.1, 90.0], [58.2, 90.0], [58.3, 90.0], [58.4, 90.0], [58.5, 90.0], [58.6, 90.0], [58.7, 90.0], [58.8, 90.0], [58.9, 90.0], [59.0, 90.0], [59.1, 90.0], [59.2, 90.0], [59.3, 90.0], [59.4, 90.0], [59.5, 91.0], [59.6, 91.0], [59.7, 91.0], [59.8, 91.0], [59.9, 91.0], [60.0, 91.0], [60.1, 91.0], [60.2, 91.0], [60.3, 91.0], [60.4, 91.0], [60.5, 91.0], [60.6, 91.0], [60.7, 91.0], [60.8, 91.0], [60.9, 91.0], [61.0, 91.0], [61.1, 91.0], [61.2, 91.0], [61.3, 92.0], [61.4, 92.0], [61.5, 92.0], [61.6, 92.0], [61.7, 92.0], [61.8, 92.0], [61.9, 92.0], [62.0, 92.0], [62.1, 92.0], [62.2, 92.0], [62.3, 92.0], [62.4, 92.0], [62.5, 92.0], [62.6, 92.0], [62.7, 92.0], [62.8, 92.0], [62.9, 92.0], [63.0, 93.0], [63.1, 93.0], [63.2, 93.0], [63.3, 93.0], [63.4, 93.0], [63.5, 93.0], [63.6, 93.0], [63.7, 93.0], [63.8, 93.0], [63.9, 93.0], [64.0, 93.0], [64.1, 93.0], [64.2, 93.0], [64.3, 93.0], [64.4, 93.0], [64.5, 94.0], [64.6, 94.0], [64.7, 94.0], [64.8, 94.0], [64.9, 94.0], [65.0, 94.0], [65.1, 94.0], [65.2, 94.0], [65.3, 94.0], [65.4, 94.0], [65.5, 94.0], [65.6, 94.0], [65.7, 94.0], [65.8, 94.0], [65.9, 94.0], [66.0, 95.0], [66.1, 95.0], [66.2, 95.0], [66.3, 95.0], [66.4, 95.0], [66.5, 95.0], [66.6, 95.0], [66.7, 95.0], [66.8, 95.0], [66.9, 95.0], [67.0, 95.0], [67.1, 95.0], [67.2, 95.0], [67.3, 96.0], [67.4, 96.0], [67.5, 96.0], [67.6, 96.0], [67.7, 96.0], [67.8, 96.0], [67.9, 96.0], [68.0, 96.0], [68.1, 96.0], [68.2, 96.0], [68.3, 96.0], [68.4, 96.0], [68.5, 97.0], [68.6, 97.0], [68.7, 97.0], [68.8, 97.0], [68.9, 97.0], [69.0, 97.0], [69.1, 97.0], [69.2, 97.0], [69.3, 97.0], [69.4, 97.0], [69.5, 97.0], [69.6, 98.0], [69.7, 98.0], [69.8, 98.0], [69.9, 98.0], [70.0, 98.0], [70.1, 98.0], [70.2, 98.0], [70.3, 98.0], [70.4, 98.0], [70.5, 98.0], [70.6, 98.0], [70.7, 99.0], [70.8, 99.0], [70.9, 99.0], [71.0, 99.0], [71.1, 99.0], [71.2, 99.0], [71.3, 99.0], [71.4, 99.0], [71.5, 99.0], [71.6, 99.0], [71.7, 100.0], [71.8, 100.0], [71.9, 100.0], [72.0, 100.0], [72.1, 100.0], [72.2, 100.0], [72.3, 100.0], [72.4, 100.0], [72.5, 100.0], [72.6, 100.0], [72.7, 101.0], [72.8, 101.0], [72.9, 101.0], [73.0, 101.0], [73.1, 101.0], [73.2, 101.0], [73.3, 101.0], [73.4, 101.0], [73.5, 101.0], [73.6, 101.0], [73.7, 102.0], [73.8, 102.0], [73.9, 102.0], [74.0, 102.0], [74.1, 102.0], [74.2, 102.0], [74.3, 102.0], [74.4, 102.0], [74.5, 102.0], [74.6, 102.0], [74.7, 103.0], [74.8, 103.0], [74.9, 103.0], [75.0, 103.0], [75.1, 103.0], [75.2, 103.0], [75.3, 103.0], [75.4, 103.0], [75.5, 103.0], [75.6, 104.0], [75.7, 104.0], [75.8, 104.0], [75.9, 104.0], [76.0, 104.0], [76.1, 104.0], [76.2, 104.0], [76.3, 104.0], [76.4, 104.0], [76.5, 104.0], [76.6, 105.0], [76.7, 105.0], [76.8, 105.0], [76.9, 105.0], [77.0, 105.0], [77.1, 105.0], [77.2, 105.0], [77.3, 105.0], [77.4, 105.0], [77.5, 106.0], [77.6, 106.0], [77.7, 106.0], [77.8, 106.0], [77.9, 106.0], [78.0, 106.0], [78.1, 106.0], [78.2, 106.0], [78.3, 106.0], [78.4, 107.0], [78.5, 107.0], [78.6, 107.0], [78.7, 107.0], [78.8, 107.0], [78.9, 107.0], [79.0, 107.0], [79.1, 108.0], [79.2, 108.0], [79.3, 108.0], [79.4, 108.0], [79.5, 108.0], [79.6, 108.0], [79.7, 108.0], [79.8, 108.0], [79.9, 109.0], [80.0, 109.0], [80.1, 109.0], [80.2, 109.0], [80.3, 109.0], [80.4, 109.0], [80.5, 109.0], [80.6, 110.0], [80.7, 110.0], [80.8, 110.0], [80.9, 110.0], [81.0, 110.0], [81.1, 110.0], [81.2, 111.0], [81.3, 111.0], [81.4, 111.0], [81.5, 111.0], [81.6, 111.0], [81.7, 111.0], [81.8, 111.0], [81.9, 112.0], [82.0, 112.0], [82.1, 112.0], [82.2, 112.0], [82.3, 112.0], [82.4, 113.0], [82.5, 113.0], [82.6, 113.0], [82.7, 113.0], [82.8, 113.0], [82.9, 113.0], [83.0, 114.0], [83.1, 114.0], [83.2, 114.0], [83.3, 114.0], [83.4, 114.0], [83.5, 114.0], [83.6, 115.0], [83.7, 115.0], [83.8, 115.0], [83.9, 115.0], [84.0, 115.0], [84.1, 115.0], [84.2, 116.0], [84.3, 116.0], [84.4, 116.0], [84.5, 116.0], [84.6, 116.0], [84.7, 117.0], [84.8, 117.0], [84.9, 117.0], [85.0, 117.0], [85.1, 117.0], [85.2, 118.0], [85.3, 118.0], [85.4, 118.0], [85.5, 118.0], [85.6, 119.0], [85.7, 119.0], [85.8, 119.0], [85.9, 119.0], [86.0, 120.0], [86.1, 120.0], [86.2, 120.0], [86.3, 120.0], [86.4, 121.0], [86.5, 121.0], [86.6, 121.0], [86.7, 121.0], [86.8, 122.0], [86.9, 122.0], [87.0, 122.0], [87.1, 122.0], [87.2, 123.0], [87.3, 123.0], [87.4, 123.0], [87.5, 123.0], [87.6, 124.0], [87.7, 124.0], [87.8, 124.0], [87.9, 124.0], [88.0, 125.0], [88.1, 125.0], [88.2, 125.0], [88.3, 125.0], [88.4, 126.0], [88.5, 126.0], [88.6, 126.0], [88.7, 126.0], [88.8, 127.0], [88.9, 127.0], [89.0, 127.0], [89.1, 127.0], [89.2, 128.0], [89.3, 128.0], [89.4, 128.0], [89.5, 128.0], [89.6, 129.0], [89.7, 129.0], [89.8, 129.0], [89.9, 130.0], [90.0, 130.0], [90.1, 130.0], [90.2, 131.0], [90.3, 131.0], [90.4, 131.0], [90.5, 131.0], [90.6, 132.0], [90.7, 132.0], [90.8, 133.0], [90.9, 133.0], [91.0, 133.0], [91.1, 134.0], [91.2, 134.0], [91.3, 134.0], [91.4, 135.0], [91.5, 135.0], [91.6, 136.0], [91.7, 136.0], [91.8, 136.0], [91.9, 137.0], [92.0, 137.0], [92.1, 138.0], [92.2, 138.0], [92.3, 139.0], [92.4, 139.0], [92.5, 140.0], [92.6, 140.0], [92.7, 141.0], [92.8, 142.0], [92.9, 142.0], [93.0, 143.0], [93.1, 144.0], [93.2, 145.0], [93.3, 145.0], [93.4, 146.0], [93.5, 147.0], [93.6, 148.0], [93.7, 149.0], [93.8, 149.0], [93.9, 150.0], [94.0, 151.0], [94.1, 152.0], [94.2, 153.0], [94.3, 154.0], [94.4, 155.0], [94.5, 157.0], [94.6, 158.0], [94.7, 159.0], [94.8, 160.0], [94.9, 162.0], [95.0, 164.0], [95.1, 165.0], [95.2, 167.0], [95.3, 169.0], [95.4, 171.0], [95.5, 174.0], [95.6, 176.0], [95.7, 179.0], [95.8, 184.0], [95.9, 187.0], [96.0, 191.0], [96.1, 197.0], [96.2, 203.0], [96.3, 211.0], [96.4, 219.0], [96.5, 232.0], [96.6, 244.0], [96.7, 280.0], [96.8, 351.0], [96.9, 392.0], [97.0, 424.0], [97.1, 440.0], [97.2, 450.0], [97.3, 459.0], [97.4, 472.0], [97.5, 486.0], [97.6, 498.0], [97.7, 508.0], [97.8, 518.0], [97.9, 528.0], [98.0, 535.0], [98.1, 541.0], [98.2, 550.0], [98.3, 560.0], [98.4, 569.0], [98.5, 583.0], [98.6, 598.0], [98.7, 613.0], [98.8, 628.0], [98.9, 649.0], [99.0, 671.0], [99.1, 699.0], [99.2, 748.0], [99.3, 880.0], [99.4, 1124.0], [99.5, 1265.0], [99.6, 1866.0], [99.7, 2111.0], [99.8, 3328.0], [99.9, 5417.0], [100.0, 9946.0]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 103180.0, "series": [{"data": [[0.0, 103180.0], [600.0, 713.0], [700.0, 206.0], [800.0, 130.0], [900.0, 47.0], [1000.0, 16.0], [1100.0, 97.0], [1200.0, 95.0], [1300.0, 34.0], [1400.0, 5.0], [1500.0, 8.0], [1600.0, 21.0], [1700.0, 39.0], [1800.0, 28.0], [1900.0, 53.0], [2000.0, 70.0], [2100.0, 39.0], [2200.0, 15.0], [2300.0, 3.0], [2400.0, 3.0], [2500.0, 2.0], [2600.0, 8.0], [2700.0, 1.0], [2900.0, 15.0], [3000.0, 21.0], [3100.0, 31.0], [3300.0, 12.0], [3200.0, 5.0], [3400.0, 6.0], [3500.0, 2.0], [3600.0, 3.0], [3700.0, 3.0], [3900.0, 12.0], [4000.0, 24.0], [4100.0, 8.0], [4200.0, 9.0], [4600.0, 17.0], [4500.0, 10.0], [4400.0, 1.0], [4700.0, 2.0], [5100.0, 9.0], [5000.0, 1.0], [5300.0, 17.0], [5200.0, 3.0], [5500.0, 5.0], [5600.0, 4.0], [5400.0, 26.0], [5700.0, 12.0], [5800.0, 4.0], [6300.0, 8.0], [6500.0, 2.0], [6900.0, 8.0], [6800.0, 1.0], [7100.0, 1.0], [7200.0, 1.0], [7400.0, 13.0], [7300.0, 2.0], [7500.0, 3.0], [7600.0, 2.0], [7900.0, 7.0], [7800.0, 8.0], [8100.0, 11.0], [8000.0, 5.0], [8300.0, 2.0], [8200.0, 4.0], [8400.0, 5.0], [8500.0, 5.0], [8600.0, 1.0], [8700.0, 2.0], [8900.0, 3.0], [9000.0, 1.0], [8800.0, 2.0], [9300.0, 2.0], [9700.0, 3.0], [9600.0, 2.0], [9900.0, 1.0], [100.0, 35346.0], [200.0, 827.0], [300.0, 268.0], [400.0, 1018.0], [500.0, 1434.0]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 657.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 140650.0, "series": [{"data": [[0.0, 140650.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2766.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 657.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 60.53025533403284, "minX": 1.79222718E12, "maxY": 100.0, "series": [{"data": [[1.7922273E12, 100.0], [1.79222718E12, 60.53025533403284], [1.79222736E12, 99.88946083869533], [1.79222724E12, 100.0]], "isOverall": false, "label": "跳转压测线程组（阶梯加压：50/100/200/400）", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222736E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 11.266666666666662, "minX": 2.0, "maxY": 751.7368421052631, "series": [{"data": [[2.0, 68.25], [3.0, 51.0], [4.0, 88.33333333333333], [5.0, 18.030303030303035], [6.0, 33.90476190476191], [7.0, 46.0], [8.0, 29.031249999999996], [9.0, 11.949367088607596], [10.0, 18.333333333333336], [11.0, 19.087719298245613], [12.0, 11.266666666666662], [13.0, 12.330097087378638], [14.0, 14.557894736842107], [15.0, 12.1869918699187], [16.0, 13.738095238095237], [17.0, 13.161764705882353], [18.0, 15.066115702479348], [19.0, 14.481203007518799], [20.0, 15.071428571428571], [21.0, 18.20175438596491], [22.0, 19.742857142857137], [23.0, 20.3], [24.0, 32.90666666666667], [25.0, 20.946428571428573], [26.0, 23.90677966101695], [27.0, 21.68], [28.0, 22.50406504065041], [29.0, 23.174603174603174], [30.0, 26.630252100840334], [31.0, 22.801470588235297], [32.0, 23.738461538461536], [33.0, 29.634782608695645], [34.0, 29.157024793388434], [35.0, 29.193277310924373], [36.0, 27.148437500000004], [37.0, 31.289256198347104], [38.0, 31.857142857142858], [39.0, 30.369230769230775], [40.0, 34.670212765957444], [41.0, 38.33613445378151], [42.0, 41.911504424778734], [43.0, 35.14953271028038], [44.0, 38.95999999999999], [45.0, 42.523364485981304], [46.0, 49.87356321839081], [47.0, 46.45132743362831], [48.0, 40.77272727272728], [49.0, 38.71851851851852], [50.0, 44.165217391304346], [51.0, 39.33846153846155], [52.0, 38.593495934959336], [53.0, 47.8934426229508], [54.0, 43.62295081967213], [55.0, 51.24271844660195], [56.0, 46.62601626016263], [57.0, 60.66666666666667], [58.0, 52.9561403508772], [59.0, 47.06617647058823], [60.0, 45.26923076923077], [61.0, 51.12612612612613], [62.0, 54.801652892561975], [63.0, 50.34615384615384], [64.0, 54.24999999999999], [65.0, 62.38392857142858], [66.0, 65.05050505050505], [67.0, 68.27659574468085], [68.0, 57.84496124031006], [69.0, 56.467213114754074], [70.0, 71.19753086419753], [71.0, 83.4842105263158], [72.0, 67.5916666666667], [73.0, 50.685314685314694], [74.0, 64.14285714285715], [75.0, 90.30681818181819], [76.0, 119.2608695652174], [77.0, 215.33333333333334], [78.0, 310.4736842105263], [79.0, 381.8666666666667], [80.0, 377.33333333333337], [81.0, 489.0], [82.0, 536.5454545454546], [83.0, 453.3124999999999], [84.0, 566.0], [86.0, 751.7368421052631], [87.0, 629.7249999999997], [85.0, 103.0], [88.0, 371.25000000000006], [89.0, 180.93650793650792], [90.0, 161.84444444444446], [91.0, 164.25714285714292], [92.0, 152.15], [93.0, 148.69642857142856], [94.0, 184.4230769230769], [95.0, 230.5], [96.0, 183.4714285714286], [97.0, 155.4255319148936], [98.0, 167.472972972973], [99.0, 158.7857142857143], [100.0, 125.41533171491302]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}, {"data": [[96.83245299257956, 121.40938968439418]], "isOverall": false, "label": "GET /1bhtK（短码跳转）-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 25934.333333333332, "minX": 1.79222718E12, "maxY": 194224.65, "series": [{"data": [[1.7922273E12, 153335.25], [1.79222718E12, 25934.333333333332], [1.79222736E12, 101407.5], [1.79222724E12, 43690.5]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7922273E12, 194224.65], [1.79222718E12, 32510.933333333334], [1.79222736E12, 128449.5], [1.79222724E12, 55341.3]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222736E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 87.90616149906745, "minX": 1.79222718E12, "maxY": 319.10407868987437, "series": [{"data": [[1.7922273E12, 87.90616149906745], [1.79222718E12, 92.82388947184336], [1.79222736E12, 94.14690481473262], [1.79222724E12, 319.10407868987437]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222736E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 87.90605878296103, "minX": 1.79222718E12, "maxY": 319.1040271912636, "series": [{"data": [[1.7922273E12, 87.90605878296103], [1.79222718E12, 92.82266526757624], [1.79222736E12, 94.14686043931695], [1.79222724E12, 319.1040271912636]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222736E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.79222718E12, "maxY": 0.017767020290452202, "series": [{"data": [[1.7922273E12, 0.0014233517733202245], [1.79222718E12, 0.008569429870584145], [1.79222736E12, 0.0], [1.79222724E12, 0.017767020290452202]], "isOverall": false, "label": "GET /1bhtK（短码跳转）", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222736E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 5.0, "minX": 1.79222718E12, "maxY": 9946.0, "series": [{"data": [[1.7922273E12, 502.0], [1.79222718E12, 2973.0], [1.79222736E12, 592.0], [1.79222724E12, 9946.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7922273E12, 40.0], [1.79222718E12, 5.0], [1.79222736E12, 38.0], [1.79222724E12, 64.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7922273E12, 100.0], [1.79222718E12, 162.0], [1.79222736E12, 127.0], [1.79222724E12, 583.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7922273E12, 125.0], [1.79222718E12, 820.5599999999904], [1.79222736E12, 170.0], [1.79222724E12, 4645.430000000004]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7922273E12, 80.0], [1.79222718E12, 50.0], [1.79222736E12, 89.0], [1.79222724E12, 113.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7922273E12, 108.0], [1.79222718E12, 188.0], [1.79222736E12, 139.0], [1.79222724E12, 783.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222736E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 12.0, "minX": 6.0, "maxY": 8100.0, "series": [{"data": [[6.0, 2205.0], [7.0, 7899.0], [12.0, 3438.5], [16.0, 1236.0], [17.0, 6060.5], [20.0, 2080.0], [22.0, 4615.5], [23.0, 5813.0], [25.0, 4019.0], [27.0, 5418.0], [33.0, 8100.0], [44.0, 2511.5], [57.0, 3097.0], [59.0, 12.0], [67.0, 853.0], [71.0, 1209.0], [76.0, 1840.0], [82.0, 1313.5], [100.0, 604.0], [122.0, 878.5], [123.0, 508.0], [128.0, 476.5], [140.0, 2056.5], [148.0, 544.0], [154.0, 615.0], [164.0, 640.5], [163.0, 696.0], [169.0, 564.0], [170.0, 523.0], [180.0, 611.0], [191.0, 530.0], [189.0, 565.0], [197.0, 522.0], [201.0, 91.0], [200.0, 543.5], [214.0, 502.0], [209.0, 481.0], [217.0, 498.0], [378.0, 262.0], [459.0, 112.0], [514.0, 170.0], [620.0, 136.0], [642.0, 108.0], [677.0, 150.0], [689.0, 88.0], [701.0, 84.0], [717.0, 104.0], [759.0, 136.0], [745.0, 134.0], [750.0, 125.0], [799.0, 126.0], [789.0, 110.0], [798.0, 126.0], [781.0, 124.0], [802.0, 12.0], [835.0, 115.0], [848.0, 116.0], [856.0, 78.0], [836.0, 93.0], [832.0, 119.0], [883.0, 115.0], [895.0, 111.0], [892.0, 81.0], [887.0, 112.0], [889.0, 112.0], [915.0, 106.0], [907.0, 101.0], [927.0, 99.0], [913.0, 106.0], [896.0, 112.0], [950.0, 62.0], [933.0, 97.0], [936.0, 104.0], [938.0, 99.0], [958.0, 100.0], [962.0, 99.0], [986.0, 98.0], [980.0, 94.0], [991.0, 102.0], [994.0, 98.0], [1005.0, 95.0], [995.0, 97.0], [1017.0, 93.0], [1013.0, 72.0], [1064.0, 91.0], [1082.0, 91.0], [1037.0, 90.0], [1025.0, 92.0], [1077.0, 91.0], [1065.0, 94.0], [1091.0, 90.0], [1101.0, 69.0], [1134.0, 52.0], [1121.0, 87.0], [1120.0, 83.0], [1107.0, 89.0], [1115.0, 90.0], [1111.0, 90.0], [1113.0, 87.0], [1114.0, 88.0], [1112.0, 87.0], [1097.0, 89.0], [1099.0, 85.0], [1093.0, 87.0], [1146.0, 86.0], [1141.0, 86.0], [1137.0, 90.0], [1149.0, 85.0], [1151.0, 88.0], [1090.0, 89.0], [1118.0, 88.0], [1116.0, 88.0], [1164.0, 17.0], [1184.0, 67.0], [1189.0, 80.0], [1198.0, 82.0], [1197.0, 82.0], [1172.0, 83.0], [1176.0, 85.0], [1174.0, 74.0], [1177.0, 83.0], [1180.0, 82.0], [1155.0, 84.0], [1156.0, 80.0], [1152.0, 84.5], [1181.0, 84.0], [1211.0, 79.0], [1207.0, 80.0], [1212.0, 80.0], [1214.0, 80.0], [1213.0, 78.0], [1215.0, 80.0], [1221.0, 83.0], [1241.0, 25.0], [1277.0, 76.0], [1245.0, 80.0], [1243.0, 78.0], [1247.0, 78.0], [1228.0, 76.0], [1233.0, 80.0], [1239.0, 79.0], [1216.0, 78.0], [1219.0, 81.0], [1220.0, 79.0], [1217.0, 78.0], [1253.0, 79.0], [1267.0, 77.0], [1275.0, 73.0], [1296.0, 74.0], [1287.0, 75.0], [1303.0, 74.0], [1281.0, 76.0], [1302.0, 75.0], [1295.0, 76.0], [1350.0, 73.0], [1357.0, 74.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1357.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 12.0, "minX": 6.0, "maxY": 8100.0, "series": [{"data": [[6.0, 2205.0], [7.0, 7899.0], [12.0, 3438.5], [16.0, 1236.0], [17.0, 6060.5], [20.0, 2080.0], [22.0, 4615.5], [23.0, 5813.0], [25.0, 4019.0], [27.0, 5418.0], [33.0, 8100.0], [44.0, 2511.5], [57.0, 3097.0], [59.0, 12.0], [67.0, 853.0], [71.0, 1209.0], [76.0, 1840.0], [82.0, 1313.5], [100.0, 604.0], [122.0, 878.5], [123.0, 508.0], [128.0, 476.5], [140.0, 2056.5], [148.0, 544.0], [154.0, 615.0], [164.0, 640.5], [163.0, 696.0], [169.0, 564.0], [170.0, 523.0], [180.0, 611.0], [191.0, 530.0], [189.0, 565.0], [197.0, 522.0], [201.0, 91.0], [200.0, 543.5], [214.0, 502.0], [209.0, 481.0], [217.0, 498.0], [378.0, 262.0], [459.0, 112.0], [514.0, 170.0], [620.0, 136.0], [642.0, 108.0], [677.0, 150.0], [689.0, 88.0], [701.0, 84.0], [717.0, 104.0], [759.0, 136.0], [745.0, 134.0], [750.0, 125.0], [799.0, 126.0], [789.0, 110.0], [798.0, 126.0], [781.0, 124.0], [802.0, 12.0], [835.0, 115.0], [848.0, 116.0], [856.0, 78.0], [836.0, 93.0], [832.0, 119.0], [883.0, 115.0], [895.0, 111.0], [892.0, 81.0], [887.0, 112.0], [889.0, 112.0], [915.0, 106.0], [907.0, 101.0], [927.0, 99.0], [913.0, 106.0], [896.0, 112.0], [950.0, 62.0], [933.0, 97.0], [936.0, 104.0], [938.0, 99.0], [958.0, 100.0], [962.0, 99.0], [986.0, 98.0], [980.0, 94.0], [991.0, 102.0], [994.0, 98.0], [1005.0, 95.0], [995.0, 97.0], [1017.0, 93.0], [1013.0, 72.0], [1064.0, 91.0], [1082.0, 91.0], [1037.0, 90.0], [1025.0, 92.0], [1077.0, 91.0], [1065.0, 94.0], [1091.0, 90.0], [1101.0, 69.0], [1134.0, 52.0], [1121.0, 87.0], [1120.0, 83.0], [1107.0, 89.0], [1115.0, 90.0], [1111.0, 90.0], [1113.0, 87.0], [1114.0, 88.0], [1112.0, 87.0], [1097.0, 89.0], [1099.0, 85.0], [1093.0, 87.0], [1146.0, 86.0], [1141.0, 86.0], [1137.0, 90.0], [1149.0, 85.0], [1151.0, 88.0], [1090.0, 89.0], [1118.0, 88.0], [1116.0, 88.0], [1164.0, 17.0], [1184.0, 67.0], [1189.0, 80.0], [1198.0, 82.0], [1197.0, 82.0], [1172.0, 83.0], [1176.0, 85.0], [1174.0, 74.0], [1177.0, 83.0], [1180.0, 82.0], [1155.0, 84.0], [1156.0, 80.0], [1152.0, 84.5], [1181.0, 84.0], [1211.0, 79.0], [1207.0, 80.0], [1212.0, 80.0], [1214.0, 80.0], [1213.0, 78.0], [1215.0, 80.0], [1221.0, 83.0], [1241.0, 25.0], [1277.0, 76.0], [1245.0, 80.0], [1243.0, 78.0], [1247.0, 78.0], [1228.0, 76.0], [1233.0, 80.0], [1239.0, 79.0], [1216.0, 78.0], [1219.0, 81.0], [1220.0, 79.0], [1217.0, 78.0], [1253.0, 79.0], [1267.0, 77.0], [1275.0, 73.0], [1296.0, 74.0], [1287.0, 75.0], [1303.0, 74.0], [1281.0, 76.0], [1302.0, 75.0], [1295.0, 76.0], [1350.0, 73.0], [1357.0, 74.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1357.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 192.26666666666668, "minX": 1.79222718E12, "maxY": 1135.8166666666666, "series": [{"data": [[1.7922273E12, 1135.8166666666666], [1.79222718E12, 192.26666666666668], [1.79222736E12, 749.5], [1.79222724E12, 323.6333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222736E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 190.6, "minX": 1.79222718E12, "maxY": 1135.8166666666666, "series": [{"data": [[1.7922273E12, 1135.8166666666666], [1.79222718E12, 190.6], [1.79222736E12, 751.1666666666666], [1.79222724E12, 323.6333333333333]], "isOverall": false, "label": "302", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79222736E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 190.6, "minX": 1.79222718E12, "maxY": 1135.8166666666666, "series": [{"data": [[1.7922273E12, 1135.8166666666666], [1.79222718E12, 190.6], [1.79222736E12, 751.1666666666666], [1.79222724E12, 323.6333333333333]], "isOverall": false, "label": "GET /1bhtK（短码跳转）-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222736E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 190.6, "minX": 1.79222718E12, "maxY": 1135.8166666666666, "series": [{"data": [[1.7922273E12, 1135.8166666666666], [1.79222718E12, 190.6], [1.79222736E12, 751.1666666666666], [1.79222724E12, 323.6333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79222736E12, "title": "Total Transactions Per Second"}},
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

