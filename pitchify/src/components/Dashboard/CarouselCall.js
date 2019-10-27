import React, { Component } from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Carousel, CarouselSlide } from 'material-ui-carousel'

export default class CarouselCall extends Component {
  pictures = [
    {image: './photo-1.jpeg', title: 'A Doriurugs ar'},
    {image: './photo-2.jpeg', title: 'Delicious Coffee'},
    {image: './photo-3.jpeg', title: 'Beautiful Dog'},
  ];

  render () {
    return (
      <Carousel>
        {this.pictures.map(({ image, title }) => (
          <CarouselSlide key={image}>
            <Card>
              <CardMedia
                image={image}
                title={title}
                style={{
                  height: 0,
                  paddingTop: '20%',
                }}
              />
              <CardContent>
                <Typography>{title}</Typography>
              </CardContent>
            </Card>
          </CarouselSlide>
        ))}
      </Carousel>
      )
  }
}
