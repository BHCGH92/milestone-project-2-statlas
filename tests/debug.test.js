// debug.test.js
describe('Fetch Mocking Debug', () => {
  it('should confirm that fetch has been mocked by the setup file', () => {
    // If your setup is working, fetch will be a special "mock function"
    // This test checks if the .mock property, which only mock functions have, exists.
    expect(fetch.mock).toBeDefined();
  });
});