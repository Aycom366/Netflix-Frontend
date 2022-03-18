export const distinctValues = (arr: any[], property: string) => {
  return arr.reduce((acc: any, cur: any) => {
    if (!acc.includes(cur[property])) {
      acc.push(cur[property]);
    }
    return acc;
  }, []);
};
