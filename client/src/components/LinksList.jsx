import React from 'react';
import "materialize-css"
import { Link } from 'react-router-dom';
const LinksList = ({links}) => {
    if (!!links===false){
        return <p className="center"> No links</p>

    }
    
    
    return (
        <div>
             <table className="striped responsive-table">
        <thead>
          <tr>
              <th>№</th>
              <th>Большая</th>
              <th>Маленькая</th>
              <th>Клики</th>
              <th>Дата создания</th>
              <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
            {links.map((link,index)=>{
                return (<tr key={link._id}>
                    <td>{index+1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>{link.clicks}</td>
                <td> {new Date(link.date).toLocaleDateString()}</td>
                <td><Link to={`/detail/${link._id}`}>Откыть</Link></td>
                  </tr>)
            })}
        </tbody>
      </table>
        </div>
    );
};

export default LinksList;