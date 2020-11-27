import React from 'react';

const LinkCard = ({link}) => {
    return (
        <div>
           <h2>Ссылка</h2>
    <p>Ваша ссылка : <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
    <p>Откуда : <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>  
        
          
        <p>clicks : <strong> {link.clicks}</strong> </p>  
    <p>Создано : <strong>Дата : {new Date(link.date).toLocaleDateString().split('2020')}</strong><strong> Время : { new Date(link.date).toLocaleTimeString()}</strong> </p>  
        
        </div>
    );
};

export default LinkCard;