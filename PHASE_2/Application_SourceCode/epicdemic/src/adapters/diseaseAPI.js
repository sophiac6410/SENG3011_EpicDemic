import API_URL from '../config.json';

export const getDiseaseArticles = async (code, disease) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/articles/country?code=${code}&disease=${disease}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
    } else {
      const article_dict = data.data.articles
      const articles = Object.values(article_dict)
      console.log('articles are', articles)
      return articles;
    }
  } catch (e) {
    console.log(e)
  }
}

export const getCovidArticles = async () => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/articles/?start_date=2021-01-01T10:10:10&end_date=2023-01-01T10:10:10&key_terms=Corona&timezone=Australia/Sydney&start_range=1&end_range=10`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
    } else {
      const article_dict = data.data.articles
      const articles = Object.values(article_dict)
      console.log('articles are', articles)
      return articles;
    }
  } catch (e) {
    console.log(e)
  }
}

export const getDiseaseList = async (code) => {
  try {
    const response = await fetch(`${API_URL.API_URL}/v1/locations/${code}/diseases`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
    } else {
      console.log('getting diseaseList', data.data)
      return (data.data)
    }
  } catch (e) {
      console.log(e)
  }
}
