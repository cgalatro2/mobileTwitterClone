import serverAPI from "api/serverAPI";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";

type Beer = {
  id: number;
  uid: string;
  brand: string;
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: string;
  alcohol: string;
  blg: string;
};

export default function HomeScreen() {
  const { isLoading, error, data } = useQuery<Beer[]>("beers");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const response = await serverAPI.get("/tweets");
    setTweets(response.data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{`${error}`}</Text>;
  }

  return (
    <>
      {tweets?.map((tweet) => {
        return <Text key={tweet._id}>{tweet.content}</Text>;
      })}
    </>
  );
}
