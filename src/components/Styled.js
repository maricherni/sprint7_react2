import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle` 
body{
    font-family: Arial, Helvetica, sans-serif;
}
`;

export const Panell = styled.div `
    width: max-content;
    padding: 2rem 1rem 1rem 1rem;
    border: solid 0.2rem black;
    border-radius: 10px;
    margin: 1rem 0 1rem 0;
    
`;

export const Option = styled.div`
    display: grid;
    grid-template-columns: 55% 45%;
    margin-bottom: 1rem;
    gap: 0.5rem;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
`;

export const OptionsNumber = styled.div`
    display: flex;
`;

export const Button = styled.button`
    background-color: orangered;
    border: none;
    border-radius: 10px;
    width: 2rem;
    height: 2rem;
    color: white;
    font-size: 2rem;
    align-content: center;
`