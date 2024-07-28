export const fetchCount = (amount: number) =>
  new Promise<{ data: number }>((res) => {
    setTimeout(() => {
      res({ data: amount });
    }, 200);
  });
