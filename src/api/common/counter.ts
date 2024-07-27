export const fetchCount = new Promise<void>((res) => {
  setTimeout(() => {
    res();
  }, 200);
});
