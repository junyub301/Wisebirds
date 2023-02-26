import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    .error {
        color: red;
        font-size: 10px;
    }
    button {
        outline: none;
        border:0;
        background-color: unset;
        cursor:pointer;
    }
`;

export default GlobalStyle;
