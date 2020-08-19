import React, { useEffect, useState } from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';
import "./DisplayCards.css"
import moment from 'moment'

// UI
import { Input, SimpleGrid, Box } from '@chakra-ui/core'

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
        <>
        <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search"/>
        <SimpleGrid columns={[2, null, 3]} spacing="40px">
            
                   
                    {searchResults.map(
                    card =>
                        <Box key={card.id}>
                            <h4>{card.front}</h4>
                            <h3>{card.back}</h3>
                            <p>{moment.unix(card.dateCreated.seconds).calendar()}</p>
                            <p>{card.origin}/{card.target}</p>
                            <p>
                                <Link to={`/edit-card/${card.id}`} user={user} id={card.id}>Edit</Link>
                            </p>
                            <DeleteCard user={user} id={card.id} handleMessage={handleMessage} />
                        </Box>
                    )}

            
           
        </SimpleGrid>
        </>
  )}

export default DisplayCards;