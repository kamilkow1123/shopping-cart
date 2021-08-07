import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 2px solid lightblue;
    border-radius: 20px;
    height: 100%;
    overflow: hidden;

    button {
        font-size: 1.5rem;
        background: lightblue;
    }

    img {
        max-height: 350px;
        object-fit: contain;
        margin: 2rem;
    }

    div {
        font-family: Arial, sans-serif;
        padding: 1rem;
        height: 100%;
        /* display: flex;
        flex-direction: column;
        justify-content: flex-end; */
    }
`;
