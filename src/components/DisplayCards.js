import React from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';
import "./DisplayCards.css"

const DisplayCards = ({ cardCollection, user, handleMessage })  =>{

    return(
        <div>
            
            <table width="100%">

                <tbody>
                    <tr>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Card ID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {cardCollection.map(
                    card =>
                        <tr key={card.id}>
                            <td>{card.front}</td>
                            <td>{card.back}</td>
                            <td>{card.id}</td>
                            <td>
                                <Link to={`/edit-card/${card.id}`} user={user} id={card.id}>Edit</Link>
                            </td>
                            <td><DeleteCard user={user} id={card.id} handleMessage={handleMessage}/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
  )}

export default DisplayCards;