function delay(time: number = 10) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export { delay };
