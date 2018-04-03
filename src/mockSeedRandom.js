// @flow
import seedrandom from "seedrandom";
import faker from "faker";

const originalMath = global.Math;

export function mockSeedRandom(seed: number): void {
  const mathCopy = Object.create(global.Math);
  mathCopy.random = seedrandom(seed);
  global.Math = mathCopy;

  faker.seed(seed);
}

export function unmockSeedRandom(): void {
  global.Math = originalMath;
}

export function mockSeedRandomEach(seed?: number): void {
  beforeEach(() => {
    mockSeedRandom(seed);
  });
  afterEach(() => {
    unmockSeedRandom();
  });
}
