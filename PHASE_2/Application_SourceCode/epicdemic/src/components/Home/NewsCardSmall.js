import * as React from 'react';
import "react-multi-carousel/lib/styles.css";
import NewsCard from './NewsCard';

export default function NewsCardSmall({col1, col2}) {
  return (
    <div className="news-container-col">
      <NewsCard col={col1}></NewsCard>
      <NewsCard col={col2}></NewsCard>
    </div>
  );
}