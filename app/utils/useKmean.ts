import { useState, useEffect, useRef } from "react";

export const useKmean = (src: ImageData, clusterNum: number, tMax: number) => {
  const mat = useRef([]);
  mat.current = [];
  const grvArr = [];
  const ptnMap = [];
  const width = src.width;
  for (var i = 0; i < src.data.length; i += 4) {
    if ((i / 4) % (width * 2) >= width) {
      continue
    }
    if (i % 8 === 4) {
      continue
    }
    if (!mat.current) {
      mat.current.push([
        src.data[i],
        src.data[i + 1],
        src.data[i + 2]
      ])
    }
  }



  export class KMean {
    public subtractiveColor = () => {

      //
      // k-menas
      var km = kMeans()
      var _w = width / 2
      for (var i = 0; i < dst.data.length; i += 4) {
        var count = i / 4
        var index = -1
        var mode = 0
        if ((i / 4) % (width * 2) >= width) {
          if (i % 8 === 4) {
            mode = 4
          } else {
            mode = 3
          }
        } else if (i % 8 === 4) {
          mode = 2
        } else {
          mode = 1
        }

        try {
          var r = 0,
            g = 0,
            b = 0
          if (mode === 0) {
            index = km.node[count]
            r = Math.ceil(km.result[index][0])
            g = Math.ceil(km.result[index][1])
            b = Math.ceil(km.result[index][2])

          } else if (mode === 1) {
            count = count / 2 - Math.ceil((i / 4) / width / 2) * (width / 2) + width / 2
            index = km.node[count]
            r = Math.ceil(km.result[index][0])
            g = Math.ceil(km.result[index][1])
            b = Math.ceil(km.result[index][2])

          } else if (mode === 2) {
            r = dst.data[i - 4]
            g = dst.data[i - 4 + 1]
            b = dst.data[i - 4 + 2]

          } else if (mode === 3) {
            count = width * 4
            r = dst.data[i - count]
            g = dst.data[i + 1 - count]
            b = dst.data[i + 2 - count]

          } else if (mode === 4) {
            count = width * 4
            r = dst.data[i - count]
            g = dst.data[i + 1 - count]
            b = dst.data[i + 2 - count]
          }
          dst.data[i] = r
          dst.data[i + 1] = g
          dst.data[i + 2] = b

        } catch (e) { }

        dst.data[i + 3] = src.data[i + 3]
      }
    }
    private kMeans = () => {
      ptnMap = mat.current.slice();
      var ptnMapBuffer = new Array(mat.current.length)
      grvArr = mat.current.slice(0, clusterNum)
      var count = 0;

      runClusterLoop(count)

      return {
        "result": grvArr,
        "count": count,
        "node": getBelongingCluster()
      };
    }

    //クラスタリング メインロジック
    private runClusterLoop = (count: number) => {
      var buffer = grvArr.slice();
      var result = calcClaster();

      if (isEqualArray(buffer, grvArr)) {
        return;
      }

      if (count > tMax) {
        return
      }
      count++;
      runClusterLoop(count);
    }


    // 配列の比較
    private isEqualArray = (arr1, arr2) => {
      var a = JSON.stringify(arr1);
      var b = JSON.stringify(arr2);
      return (a === b);
    }



    // クラスタの計算
    private calcClaster() {
      var i = 0
      //配列初期化
      var store = new Array(grvArr.length);

      for (i = 0; i < store.length; i++) {
        store[i] = [];
      }

      //ノードループ
      for (i = 0; i < ptnMap.length; i++) {
        var minVal = calcDistance(ptnMap[i], grvArr[0]);
        var minCount = 0;

        //クラスタループ
        for (var j = 0; j < grvArr.length; j++) {
          if (calcDistance(ptnMap[i], grvArr[j]) < minVal) {
            minCount = j;
            minVal = calcDistance(ptnMap[i], grvArr[j]);
          }
        }
        store[minCount].push(ptnMap[i].slice());
      }

      for (i = 0; i < grvArr.length; i++) {
        grvArr[i] = calcGravity(store[i]);
      }

      return grvArr;
    }

    // 分類
    private getBelongingCluster() {
      var result = []
      for (var i = 0; i < ptnMap.length; i++) {
        var minValue = -1;
        var minIndex = 0;

        for (var j = 0; j < grvArr.length; j++) {
          var d = calcDistance(grvArr[j], ptnMap[i])
          if (j === 0 || d < minValue) {
            minValue = d
            minIndex = j
          }
        }
        result.push(minIndex)
      }

      return result
    }

    // 重心
    private calcGravity = (vec) => {
      var sum = vec[0];
      if (!sum) {
        return;
      }
      for (var i = 1; i < vec.length; i++) {
        for (var j = 0; j < sum.length; j++) {
          sum[j] += vec[i][j];
        }
      }
      for (var j = 0; j < sum.length; j++) {
        sum[j] /= vec.length;
      }
      return sum;
    }

    // 距離
    private calcDistance(vec1, vec2) {
      if (!vec1 || !vec2) {
        return;
      }

      var result = 0;
      for (var i = 0; i < vec1.length; i++) {
        result += Math.pow(2, Math.abs(vec2[i] - vec1[i]));
      }
      return (Math.sqrt(result));
    }
  }