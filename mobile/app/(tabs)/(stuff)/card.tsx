import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import BirdDetailCard from '@/components/BirdDetailCard'; 

export default function CardScreen({ route }: any) {
  const { data } = route.params; 
  const { predicted, res } = data; 

  const [birdName] = predicted; 
  const { img, species, weight, url, summary } = res;

  const cp = 100;  
  const hp = 50;   
  const type = species;  
  const height = "0.2";  

  
  console.log('Bird Image:', img);
  console.log('Summary:', summary);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#d2f45f', dark: '#7aad4e' }}
    >
      <BirdDetailCard
        birdName={birdName}
        birdImage={img}
        species={species}
        summary={summary}
        weight={weight}
        height={height}
        url={url}
        data={data}
      />
    </ParallaxScrollView>
  );
}
