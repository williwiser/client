import "./App.css";
import { Divider, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [prompt, setPrompt] = useState('Enter a word and press "Search"...');
  const [searchedWord, setSearchedWord] = useState({
    word: "",
    pronounce: "",
    def: "",
    part: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWord(event.target.value);
    console.log(word);
  }

  async function handleClick() {
    try {
      const queryWord = word.toLowerCase().trim();
      await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${queryWord}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchedWord({
            word: data[0].word,
            pronounce: data[0].phonetic,
            def: data[0].meanings[0].definitions[0].definition,
            part: data[0].meanings[0].partOfSpeech,
          });
        });
    } catch (error) {
      setPrompt("Sorry pal, couldn't find that word.");
      setSearchedWord({
        word: "",
        pronounce: "",
        def: "",
        part: "",
      });
    }

    console.log(searchedWord);
  }
  return (
    <>
      <h1 className="text-3xl font-bold px-20 py-10 text-zinc-700 ">
        Definity
      </h1>
      <section className="flex-none w-full">
        <div className="my-0 mx-auto max-w-96">
          <form className="flex mb-5 w-full">
            <Input
              className="mr-3"
              onChange={handleChange}
              type="text"
              placeholder="Type a word..."
              value={word}
            />
            <Button color="primary" onClick={handleClick}>
              Search
            </Button>
          </form>
          {searchedWord.word != "" ? (
            <Card className="max-w-96 min-h-64 p-3">
              <CardHeader className="flex-col justify-start">
                <h1 className="font-bold text-3xl">{searchedWord.word}</h1>
                <p className="text-zinc-500">{searchedWord.pronounce}</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-zinc-700">{searchedWord.def}</p>
              </CardBody>
              <CardFooter>
                <p className="text-zinc-700">{searchedWord.part}</p>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex justify-center">
              <h1>{prompt}</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
