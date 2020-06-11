import React, { useState, useEffect } from "react";

const timeUrl = "https://www.reddit.com/r/dadjokes/top.json?t=day&limit=1";

const DadJokes = (props) => {
  const [joke, setJoke] = useState({});
  const { refresh } = props;

  const getJoke = () => {
    fetch(timeUrl)
      .then((response) => response.json())
      .then((json) => setJoke(json.data.children[0].data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getJoke();
  }, [refresh]);

  return joke.title ? (
    <div className="joke">
      <p>{joke.title}</p>
      <p>{joke.selftext}</p>
    </div>
  ) : (
    <></>
  );
};

export default DadJokes;
