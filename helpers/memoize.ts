function memoize<Tin, Tout>(fn: (arg: Tin) => Tout): ((arg: Tin) => Tout) {
  const memo: Map<Tin, Tout> = new Map();
  return function wrapped(argIn: Tin) {
    const fromMemo = memo.get(argIn);
    if (fromMemo != null) {
      return fromMemo;
    }
    const result = fn(argIn);
    memo.set(argIn, result);
    return result;
  };
}

export default memoize;
