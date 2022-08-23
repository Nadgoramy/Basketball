export const getAge = (birthday?: Date) => {
  if (!birthday) return "";
  const age = new Date(Date.now() - birthday.valueOf());
  return Math.abs(age.getUTCFullYear() - 1970);
};
