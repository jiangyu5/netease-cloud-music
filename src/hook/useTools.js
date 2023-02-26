function getNumber(count, n = 0) {
  if (count < 10000) {
    return [count, n];
  } else {
    let willCount = count / 10000;
    n++;
    return getNumber(willCount, n);
  }
}

export function useCount(count) {
  const unit = ["", "万", "亿", "兆", "京"];
  const [c, unitIndex] = getNumber(count);
  return c.toFixed(1) + unit[unitIndex];
}
