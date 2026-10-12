import React from 'react';

import { ItemRepoContainer } from './styles';

function ItemRepo({repo, handleRemove }) {
    return(
        <ItemRepoContainer>
            <h3>{repo.name}</h3>
            <p>{repo.full_name}</p>
            <a href={repo.html_url} target="_blank" >Ver repositório</a><br />
            <a href="#" className="remover" onClick={(e) => {
                    e.preventDefault();
                    handleRemove(repo.id);
                }}>Remover</a>
            <hr />
        </ItemRepoContainer>
    )
}

export default ItemRepo;
