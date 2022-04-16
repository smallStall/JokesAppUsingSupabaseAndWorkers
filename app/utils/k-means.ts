import { labTorgb, rgbToLab } from "./lab";

export class KMean {
  constructor(
    private src: ImageData,
    private dst: ImageData,
    private clusterNum: number,
    private transactionMax: number,
    private grletr = []
  ) {
  }
  private mat = [];
  private ptnMap = [];
  public subtractiveColor = () => {
    const width = this.src.width;
    const height = this.src.height;
    for (let i = 0; i < this.src.data.length; i += 4) {
      if ((i / 4) % (width * 2) >= width) {
        continue
      }
      if (i % 8 === 4) {
        continue
      }
      this.mat.push(
        rgbToLab(
          [this.src.data[i],
          this.src.data[i + 1],
          this.src.data[i + 2]
          ])
      )
    }
    //
    // k-menas
    const km = this.kMeans()

    for (let i = 0; i < this.dst.data.length; i += 4) {
      const [l, a, b] = rgbToLab([this.dst.data[i], this.dst.data[i + 1], this.dst.data[i + 2]]);
      this.dst.data[i] = l
      this.dst.data[i + 1] = a
      this.dst.data[i + 2] = b
    }

    for (let i = 0; i < this.dst.data.length; i += 4) {
      let count = i / 4
      let index = -1
      let mode = 0
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
        let lstar = 0;
        let astar = 0;
        let bstar = 0;
        if (mode === 0) {
          index = km.node[count]
          lstar = Math.ceil(km.result[index][0])
          astar = Math.ceil(km.result[index][1])
          bstar = Math.ceil(km.result[index][2])

        } else if (mode === 1) {
          count = count / 2 - Math.ceil((i / 4) / width / 2) * (width / 2) + width / 2
          index = km.node[count]
          lstar = Math.ceil(km.result[index][0])
          astar = Math.ceil(km.result[index][1])
          bstar = Math.ceil(km.result[index][2])

        } else if (mode === 2) {
          lstar = this.dst.data[i - 4]
          astar = this.dst.data[i - 4 + 1]
          bstar = this.dst.data[i - 4 + 2]

        } else if (mode === 3) {
          count = width * 4
          lstar = this.dst.data[i - count]
          astar = this.dst.data[i + 1 - count]
          bstar = this.dst.data[i + 2 - count]

        } else if (mode === 4) {
          count = width * 4
          lstar = this.dst.data[i - count]
          astar = this.dst.data[i + 1 - count]
          bstar = this.dst.data[i + 2 - count]
        }

        const [r, g, b] = labTorgb(lstar, astar, bstar);
        this.dst.data[i] = r
        this.dst.data[i + 1] = g
        this.dst.data[i + 2] = b
      } catch (e) { }
    }
    return this.grletr.slice();
  }
  private kMeans = () => {
    this.ptnMap = this.mat.slice();
    const ptnMapBuffer = new Array(this.mat.length)
    const count = 0;
    if (!this.grletr[this.clusterNum - 1] || Math.random() < 0.03) {
      this.initializeGrletr();
      //this.grletr = this.mat.slice(0, this.clusterNum);
      this.runClusterLoop(count);
    }

    return {
      "result": this.grletr,
      "count": count,
      "node": this.getBelongingCluster()
    };
  }

  //クラスタリング メインロジック
  private runClusterLoop = (count: number) => {
    const buffer = this.grletr.slice();
    const result = this.calcClaster();

    if (this.isEqualArray(buffer, this.grletr)) {
      return;
    }

    if (count > this.transactionMax) {
      return
    }
    count++;
    this.runClusterLoop(count);
  }


  // 配列の比較
  private isEqualArray = (arr1, arr2) => {
    const a = JSON.stringify(arr1);
    const b = JSON.stringify(arr2);
    return (a === b);
  }



  // クラスタの計算
  private calcClaster() {
    let i = 0
    //配列初期化
    const store = new Array(this.grletr.length);

    for (i = 0; i < store.length; i++) {
      store[i] = [];
    }

    //ノードループ
    for (i = 0; i < this.ptnMap.length; i++) {
      let minVal = this.calcDistance(this.ptnMap[i], this.grletr[0]);
      let minCount = 0;

      //クラスタループ
      for (let j = 0; j < this.grletr.length; j++) {
        if (this.calcDistance(this.ptnMap[i], this.grletr[j]) < minVal) {
          minCount = j;
          minVal = this.calcDistance(this.ptnMap[i], this.grletr[j]);
        }
      }
      store[minCount].push(this.ptnMap[i].slice());
    }

    for (i = 0; i < this.grletr.length; i++) {
      this.grletr[i] = this.calcGravity(store[i]);
    }

    return this.grletr;
  }

  // 分類
  private getBelongingCluster() {
    const result = []
    for (let i = 0; i < this.ptnMap.length; i++) {
      let minValue = -1;
      let minIndex = 0;

      for (let j = 0; j < this.grletr.length; j++) {
        const d = this.calcDistance(this.grletr[j], this.ptnMap[i])
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
    const sum = vec[0];
    if (!sum) {
      return;
    }
    for (let i = 1; i < vec.length; i++) {
      for (let j = 0; j < sum.length; j++) {
        sum[j] += vec[i][j];
      }
    }
    for (let j = 0; j < sum.length; j++) {
      sum[j] /= vec.length;
    }
    return sum;
  }

  // 距離
  private calcDistance(col1, col2) {
    if (col1 && col2) {
      let result = 0;
      for (let i = 0; i < col1.length; i++) {
        result += Math.pow(2, Math.abs(col2[i] - col1[i]));
      }
      return (Math.sqrt(result));
    }
  }
  private nearest(sample: Array<number>, centroids) {
    let minIndex = 0
    let minDistanse = Number.MAX_VALUE;
    const clusterCount = centroids.length;
    for (let k = 0; k < clusterCount; k++) {
      const d = this.calcDistance(sample, centroids[k]);
      if (minDistanse > d) {
        minDistanse = d;
        minIndex = k;
      }
    }
    return [minIndex, minDistanse];
  }

  //初期化
  private initializeGrletr() {
    const d = [];
    let sumDistance = 0.0;
    const previous = [];
    let label: number;
    const len = this.mat.length;
    const r = Math.floor(Math.random() * len);
    const centroids = [];
    centroids[0] = [];
    centroids[0][0] = this.mat[r][0];
    centroids[0][1] = this.mat[r][1];
    centroids[0][2] = this.mat[r][2];
    previous[0] = [0.0, 0.0, 0.0];
    this.grletr[0] = [];
    for (let k = 1; k < this.clusterNum; k++) {
      sumDistance = 0.0;
      for (let i = 0; i < len; i++) {
        d[i] = this.nearest(this.mat[i], centroids)[1];
        sumDistance += d[i];
      }
      sumDistance *= Math.random();
      for (let i = 0; i < len; i++) {
        sumDistance -= d[i];
        if (sumDistance > 0) continue;
        centroids[k] = [];
        centroids[k][0] = this.mat[i][0];
        centroids[k][1] = this.mat[i][1];
        centroids[k][2] = this.mat[i][2];
        break;
      }
      previous[k] = [0.0, 0.0, 0.0];
      this.grletr[k] = [];
    }
    this.grletr = centroids;
  }
}
