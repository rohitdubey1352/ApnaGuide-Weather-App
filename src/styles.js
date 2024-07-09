import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
  
  *{
    font-family: "Raleway", sans-serif;
  }
  
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
  }


`;

export default GlobalStyle;
