//Thanks to https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/

class Random {
  x: number;
  y: number;
  z: number;
  w: number;
  constructor(seed = 88779784379) {
    this.x = 8517089798;
    this.y = 1236314524;
    this.z = 8972134563;
    this.w = seed;
  }
  next() {
    let t;
    t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
  }
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}

type UseXorShift = {
  (seed: number, count: number, min?: number, max?: number, canDuplicate?: boolean): number[];
  (seed: number, count?: undefined, min?: number, max?: number, canDuplicate?: boolean): number;
}

const useXorShift: UseXorShift = (seed, count, min, max, canDuplicate) => {

  //countが0未満なら強制停止
  if (count !== undefined && count < 0) {
    throw new RangeError(
      `useXorShift will run infinitely because count is a negative number (${count})`
    )
  }

  if (count !== undefined && min !== undefined && max !== undefined && count > max - min) {
    console.warn(
      `useXorShift will run infinitely because count is out of range (${count}). Reducing 'count' to ${max - min} automatically.`
    )
    count = max - min
  }

  const gen = () => {
    return (min === undefined || max === undefined) ? random.next() : random.nextInt(min, max)
  }

  const random = new Random(seed);
  if (typeof count !== "number") {
    return gen()
  } else {
    const result: number[] = []
    for (let i = 0; i < count; i++) {
      let n = gen()
      canDuplicate !== undefined && !canDuplicate && result.includes(n) ? i-- : result.push(n)
    }
    return result
  }
}

export default useXorShift