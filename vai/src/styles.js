import styled from 'styled-components';


// Estiliza o componente Row
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Distribui o espaço restante entre os itens */
    align-items: stretch; /* Faz os itens ocuparem todo o espaço vertical disponível */

    /* Estiliza o contêiner de itens dentro do componente Row */
    .items-container {
        display: flex;
        flex-direction: column;
    }

    /* Aplica a margem entre os elementos filhos do contêiner de itens */
    > :not(:last-child) {
        margin-right: 20px; /* Adiciona espaçamento horizontal entre os elementos, exceto o último */
    }
`;


export const Column = styled.div`
    display: flex;
    flex-direction: Column;
    justify-content: space-between;
    align-items: center;
`;