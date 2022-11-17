import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, input, textarea, button {
        font-size: 1rem;
        font-weight: 400;
        font-family:${({ theme }) => theme.font} ;

        @media (max-width: 1023px) {
            font-size: 87.5%; // 14px ou 0.875rem
        }
    }

    button {
        cursor: pointer;
        border: 0;
        background: 0;
    }
`;
