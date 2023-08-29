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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{`${error}`}</Text>;
  }

  return (
    <>
      {data?.map((beer) => {
        return <Text key={beer.id}>{beer.name}</Text>;
      })}
    </>
  );
}
