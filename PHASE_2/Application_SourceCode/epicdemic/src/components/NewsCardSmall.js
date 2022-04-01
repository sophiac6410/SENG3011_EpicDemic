import * as React from 'react';
import "react-multi-carousel/lib/styles.css";
import NewsCard from './NewsCard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCardSmall({col1, col2}) {
  return (
    <div className="news-container-col">
      <NewsCard col={col1}></NewsCard>
      <NewsCard col={col2}></NewsCard>
    </div>
  );
}