import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    /* align-items: space-between; */
    font-family: Arial, sans-serif;
    border-bottom: 2px solid lightblue;
    padding-bottom: 20px;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }

    div {
        flex: 1;
    }

    .information,
    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .information {
        flex-direction: column;
    }

    .prices {
        display: flex;
        justify-content: space-between;
    }

    img {
        max-width: 80px;
        object-fit: contain;
        margin-left: 40px;
        margin: 0 auto;
    }
`;
