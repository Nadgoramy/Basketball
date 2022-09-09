type colorNames =
  | "white"
  | "red"
  | "dark_red"
  | "light_red"
  | "lightest_red"
  | "grey"
  | "light_grey"
  | "lightest_grey"
  | "lightest_grey1"
  | "dark_grey"
  | "blue";

export interface DefaultTheme {
  font: string;
  //colors: Record<colorNames, string>;
  mobile: string;
  tablet: string;
}
export const theme: DefaultTheme = {
  font: "Avenir",
  /*colors: {
    white: "#FFFFFF",
    red: "#E4163A",
    dark_red: "#C60E2E",
    light_red: "#FF5761",
    lightest_red: "#FF768E",
    grey: "#707070",
    light_grey: "#9C9C9C",
    lightest_grey: "#D1D1D1",
    lightest_grey1: "#F6F6F6",
    dark_grey: "#303030",
    blue: "#344472",
  },*/
  mobile: "768px",
  tablet: "991px",
};
