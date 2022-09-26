// import original module declarations
import "styled-components";

// extend them
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      neutral44: string;
      neutral77: string;
      neutral22: string;

      codGray: string;
      mineShaft: string;
    };
    layout: {
      window: { width: number; height: number };
      screen: { width: number; height: number };
      padding: number;
      contentPadding: number;
      borderRadius: number;
    };
  }
}
