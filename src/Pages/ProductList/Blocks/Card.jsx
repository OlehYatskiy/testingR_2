import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
    Card as CardItem,
    Image,
    Button,
} from 'semantic-ui-react';

import ReactCardFlip from "react-card-flip";

export const Card = ({el, onAddToCartClick}) => {
  const [isFlipped, setFlip] = useState(false);

  const onAddToCartItemClick = (el) => (event) => {
      event.stopPropagation();
      onAddToCartClick(el);
  }


  return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <CardItem as='div' >
            <Image
                onClick={() => setFlip(!isFlipped)}
                src={el.image}
                wrapped
                ui={false}
            />
            <CardItem.Content>
                <Button
                    onClick={onAddToCartItemClick(el)}
                    basic
                    floated='right'
                    icon='shop'
                    labelPosition='right'
                    content='Add'
                />
                <Link to={'/details'}>
                    <CardItem.Header>{el.name}</CardItem.Header>
                </Link>
                <CardItem.Meta content={el.price + ' $'}/>
            </CardItem.Content>
          </CardItem>
          <CardItem as='div'>
              <Image
                  onClick={() => setFlip(!isFlipped)}
                  src={el.image}
                  wrapped
                  ui={false} />
              <CardItem.Content>
                  <Link to={'/details'}>
                      <CardItem.Header>{'Back Side'}</CardItem.Header>
                  </Link>
              </CardItem.Content>
          </CardItem>
      </ReactCardFlip>
  );
}
