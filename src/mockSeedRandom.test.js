import {mockSeedRandom, unmockSeedRandom} from "./mockSeedRandom";

describe("mockSeedRandom", () => {
  it("changes the global Math.random", () => {
    const originalRandom = Math.random;
    mockSeedRandom(42);
    expect(originalRandom).not.toBe(Math.random);
    unmockSeedRandom();
  });

  it("gives a mock which generates seeded random numbers", () => {
    mockSeedRandom(42);
    const firstRandom = Math.random();
    unmockSeedRandom();
    mockSeedRandom(42);
    const secondRandom = Math.random();
    unmockSeedRandom();
    expect(firstRandom).toBe(secondRandom);
  });
});
