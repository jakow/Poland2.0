/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Card, { CardList } from '../components/molecules/Card';
import PersonCard from '../components/molecules/PersonCard';
import { colors } from '../components/variables';
import TeamMember from '../types/TeamMember';

const text = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores. Harum impedit qui nulla eos aut natus.';
const text2 = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores.';

storiesOf('Card', module)
  .add('basic', () => (<Card>{text}</Card>))
  .add('with image', () => (
    <Card image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading...">
      {text}
    </Card>
  ))
  .add('clickable', () => (
    <Card image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading..." onClick={action('card clicked')}>
      {text}
    </Card>
  ))
  .add('href', () => (
    <Card image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading..." href="#" >
      {text}
    </Card>
  ))
  .add('with footer', () => (
    <Card image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading..." footer="Est occaecati expedita ea.">
      {text}
    </Card>
  ))
  .add('list', () => {
    const card = (index: number) => (
      <Card key={index} image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading..." href="#">
        {Math.random() > 0.5 ? text : text2}
      </Card>
    );
    const card2 = (index: number) => (
      <Card key={index} image="https://via.placeholder.com/400" imagePreview="http://via.placeholder.com/400?text=Loading..." href="#" footer={Math.random() <= 0.5 ? text : text2}>
        {Math.random() > 0.5 ? text : text2}
      </Card>
    );

    return (
      <CardList>
        {Array(3).fill('').map((_, index) => card(index))}
        {Array(3).fill('').map((_, index) => card2(index))}
      </CardList>
    );
  });
