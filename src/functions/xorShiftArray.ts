//Thanks to https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
//and people on みすてむず
/*

- @NakaKoma@misskey.systems
- @renoa_ts@misskey.systems
- @tarosan5924@misskey.systems
- @nakano@misskey.systems
- @tanakanira@misskey.systems
- @poc_popoyama@misskey.systems
- @leino@misskey.systems

on Misskey

*/

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
    const r = Math.abs(this.next())
    return min + (r % (max + 1 - min))
  }
}

type XorShiftArray = {
  (seed: number, count: number, min?: number, max?: number, canDuplicate?: boolean): number[];
}

const xorShiftArray: XorShiftArray = (seed, count, min, max, canDuplicate) => {

  //countが0未満なら強制停止
  if (count !== undefined && count < 0) {
    throw new RangeError(
      `Argument "count" can't be a negative number as useXorShift will run infinitely with such value (your current value is: ${count})`
    )
  }

  if (min !== undefined && max === undefined) {
    console.warn(`Only min is defined and max is undefined. Ignoring min value...`)
  }

  if (min !== undefined && max !== undefined && min < max) {
    console.warn(`Argument min (${min}) is larger than max (${max}). Swapping the two...`);
    [min, max] = [max, min]
  }

  //countで実現可能な個数がmax-min+1（整数範囲）より大きいなら、無限ループに入るので強制的に数値減少
  if (count !== undefined && min !== undefined && max !== undefined && count > Math.abs(max - min) + 1) {
    const size = Math.abs(max - min) + 1
    console.warn(
      `useXorShift will run infinitely because ${count} (count) is larger than ${size} (the number of integers in the specified range ${min} to ${max}). Reducing 'count' to ${size} automatically.`
    )
    count = max - min + 1
  }

  const gen = () => {
    return (min === undefined || max === undefined) ? random.next() : random.nextInt(min, max)
  }

  const random = new Random(seed)

  const result: number[] = []
  for (let i = 0; i < count; i++) {
    let n = gen()
    canDuplicate !== undefined && !canDuplicate && result.includes(n) ? i-- : result.push(n)
  }
  return result
}

export default xorShiftArray