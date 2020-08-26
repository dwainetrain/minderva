import React, { useEffect, useState } from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';
import "./DisplayCards.css"
import moment from 'moment'

// UI
import { Input } from '@chakra-ui/core'

const DisplayCards = ({ cardCollection, user, handleMessage })  =>{
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
            const searchFilter = () => {
                const frontResults = cardCollection.filter(card => card.front
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
        
                const backResults = cardCollection.filter(card => card.back
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
                
                const totalResults = [...frontResults, ...backResults]

                setSearchResults([...new Set(totalResults)])}

                searchFilter()

    }, [cardCollection, searchTerm])


    return(
        <div>
            <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search"/>
            <table width="100%">

                <tbody>
                    <tr>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Date Created</th>
                        <th>Origin / Target</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {searchResults.map(
                    card =>
                        <tr key={card.id}>
                            <td>{card.front}</td>
                            <td>{card.back}</td>
                            <td>{moment.unix(card.dateCreated.seconds).calendar()}</td>
                            <td>{card.origin}/{card.target}</td>
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