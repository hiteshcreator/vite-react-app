import useFetchAPI from './useFetchAPI'; // Assuming this file is in the same directory as your test file

describe('useFetchAPI', () => {
  // Mocking fetch response for success case
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'John Doe', email: 'john@example.com' }]
    });
  });

  // Test for successful response
  it('fetches data from the API', async () => {
    const data = await useFetchAPI();
    expect(data).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
  });

  // Mocking fetch response for error case
  beforeAll(() => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));
  });

  // Test for error handling
  it('handles errors', async () => {
    try {
      await useFetchAPI();
    } catch (error) {
      expect(error).toEqual(new Error('Network error'));
    }
  });
});
