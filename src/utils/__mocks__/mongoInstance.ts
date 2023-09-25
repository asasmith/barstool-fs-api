export async function mongoInstance() {
  console.log('Mocked mongoInstance: Attempted to connect but mocked.');
  return Promise.resolve();
}
