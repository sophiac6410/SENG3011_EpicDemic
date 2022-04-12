import styled, { css } from 'styled-components';

export const BigTitle = styled.h1`
    color: #62B6CB;
    text-align: center;
    font-size: 16pt;
    padding: 30px;
    @media (max-width: 600px) {
        font-size: 16pt;
        padding: 15px;
    }
`;

export const Box = styled.div`
    margin: 0 auto;
    background: #62B6CB;
    border-radius: 10pt;
    min-width: 260px;
    max-width: 65%;
    @media (max-width: 600px) {
        max-width: 80%;
    }
    margin-bottom: 200px;
    margin-top: 100px;
`;

export const Header = styled.div`
    margin: 0 auto;
    width: 80%;
    padding: 20px 0;
`;

export const Title = styled.h3`
    color: white;
    font-size: 14pt;
    font-weight: 500;
    text-align: center;
`;

export const SubHeading = styled.div`
    text-align: center;
    font-size: 10pt;
    color: white;
    font-weight: 400;
    margin: 20px;
`;

export const Footer = styled.div`
    margin: 0 auto;
    width: 80%;
    border-top: 1px solid white;
    padding-bottom: 40px;
`;

export const Field = styled.input`
    border-radius: 20px;
    width: 80%;
    padding: 15px 20px;
    display: block;
    margin: 10px auto;
    border: none;
`;

export const SubmitButton = styled.button`
    display: block;
    margin: 0px auto;
    background-color: white;
    color: #62B6CB;
    border-radius: 20px;
    text-transform: none;
    font-weight: 600;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    outline: 0;
    font-size: 0.85rem;
    line-height: 1.75;
    border: 0;
    min-width: 64px;
    padding: 6px 16px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 3px 1px -2px rgb(64 100 171 / 20%), 0px 2px 2px 0px rgb(64 100 171 / 14%), 0px 1px 5px 0px rgb(64 100 171/ 12%);

`;
