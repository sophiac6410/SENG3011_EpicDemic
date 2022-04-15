import React from 'react';

export function colorScore (score) {
  if (score >= 0 && score <= 20) {
    return "#1CC02C"
  } else if (score <= 40) {
    return "#FFC700"
  } else if (score <= 60) {
    return "#FFA800"
  } else if (score <= 80) {
    return "#ED6400"
  } else if (score <= 100) {
    return "#DA4848"
  }
}