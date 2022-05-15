import React from 'react';

const green = "#1CC02C";
const yellow = "#FFC700";
const orange = "#FFA800";
const darkOrange = "#ED6400";
const red = "#DA4848";
const lightGrey = '#EEF0F2';

export function safteyScore (score) {
  if (score >= 0 && score <= 20) {
    return 'Low';
  } else if (score <= 40) {
    return 'Moderate';
  } else if (score <= 60) {
    return 'Medium';
  } else if (score <= 80) {
    return 'High';
  } else if (score <= 100) {
    return 'Extreme';
  }
}

export function safteyScoreColor (score) {
  if (score === undefined) {
    return lightGrey;
  }
  if (score >= 0 && score <= 20) {
    return green;
  } else if (score <= 40) {
    return yellow;
  } else if (score <= 60) {
    return orange;
  } else if (score <= 80) {
    return darkOrange;
  } else if (score <= 100) {
    return red;
  } else {
    return lightGrey;
  }
}

export function travelStatus (score) {
  if (score === 0) {
    return 'Open';
  } else if (score === 1) {
    return 'Open with Restrictions'
  } else if (score === 2) {
    return 'Closed'
  }
}

export function travelStatusColor (score) {
  if (score === 0) {
    return green;
  } else if (score === 1) {
    return orange;
  } else if (score === 2) {
    return red;
  }
}

export function diseaseRisk (score) {
  if (score === 0) {
    return 'Low';
  } else if (score === 1) {
    return 'Moderate';
  } else if (score === 2) {
    return 'Medium';
  } else if (score === 3) {
    return 'High';
  } else if (score === 4) {
    return 'Extreme';
  }
}

export function diseaseRiskColor (score) {
  if (score === 0) {
    return green;
  } else if (score === 1) {
    return yellow;
  } else if (score === 2) {
    return orange;
  } else if (score === 3) {
    return darkOrange;
  } else if (score === 4) {
    return red;
  }
}

export function adviceLevel (score) {
  if (score === 0) {
    return 'Regular Precautions'
  } else if (score === 1) {
    return 'Exercise Caution'
  } else if (score === 2) {
    return 'Reconsider your need for travel'
  } else if (score === 3) {
    return 'Do not travel'
  }
}

export function adviceLevelColor (score) {
  if (score === 0) {
    return green;
  } else if (score === 1) {
    return yellow;
  } else if (score === 2) {
    return orange;
  } else if (score === 3) {
    return red;
  }
}