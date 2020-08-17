import React from 'react'
import {
  ThemeProvider,
  CSSReset,
  theme,
  Box,
  Grid,
  Text,
  Select,
  Input,
  Button,
  Flex,
  Checkbox
} from '@chakra-ui/core'

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Grid templateColumns="repeat(2, 1fr)" gap={6} templateRows={2} rowGap={2}>
      <Box display="block" width="100%">
        <Text textAlign="center" color="blackAlpha.500">
          FRONT
        </Text>
      </Box>
      <Box display="block" width="100%">
        <Text textAlign="center" color="blackAlpha.500">
          BACK
        </Text>
      </Box>
      <Box>
        <SelectLanguage 
          handleLanguageSelect={handleFromLanguageSelect}
          selected={fromLanguage} keyTo="text"/>
        <Input
            name="front" 
            placeholder="Front" 
            value={front}
            onChange={e => setFront(e.target.value)}
            maxLength="60"
            autoComplete="off"/>
      </Box>
      <Box>
        <SelectLanguage 
          handleLanguageSelect={handleFromLanguageSelect}
          selected={fromLanguage} keyTo="text"/>
        <Flex alignItems="space-around" justifyContent="center">
          <Button variantColor="twitter" leftIcon="arrow-right" onClick={translation}>
            Translate
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Button size="sm" variant="link" leftIcon="edit">
            Manual Entry
          </Button>
          <figure>
                <figcaption>Listen to the Somthing:</figcaption>
                <audio
                    controls
                    src={audio}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
            </figure>
        </Flex>
      </Box>
    </Grid>
    <Flex justifyContent="center">
      <Flex width="100%" justifyContent="space-around">
        <Button variantColor="blackAlpha" leftIcon="repeat">
          Flip Sides
        </Button>
        <Button variantColor="cyan" leftIcon="chevron-right" onClick={textToSpeech}>
          Generate Audio
        </Button>
      </Flex>
      <Flex width="100%" justifyContent="flex-end">
        <Checkbox isReadOnly mr={3} variantColor="teal" isChecked>
          Study Reverse
        </Checkbox>
        <Button variantColor="whatsapp" leftIcon="add" onClick={create}>
          Add Card
        </Button>
      </Flex>
    </Flex>
    <Text>
      Your origin language is English, and your target Language is Japanese
    </Text>
  </ThemeProvider>
)

export default App
