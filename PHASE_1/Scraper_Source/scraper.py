import json
from urllib import request, parse
from bs4 import BeautifulSoup

PROMED_API = "https://promedmail.org/wp-admin/admin-ajax.php"
HEADERS={'User-Agent': 'Mozilla/5.0'}


#get the article ids by dates
#date format: "mm/dd/yyyy"
#return list of article id
def search(start_date="03/01/2022", end_date="03/12/2022"):    
    ids = []
    form1 = {
    'action': 'get_promed_search_content',
    'query[0][name]': "kwby1",
    'query[0][value]': "summary",
    'query[1][name]': "search",
    'query[1][value]': "",
    'query[2][name]': "date1",
    'query[2][value]': start_date,
    'query[3][name]': "date2",
    'query[3][value]': end_date,
    'query[4][name]': "feed_id",
    'query[4][value]': 1
    }

    query = encode_query(form1)git 
    req = request.Request(PROMED_API, headers=HEADERS, data=query)
    r = request.urlopen(req)
    data = r.read().decode("utf-8")
    data = json.loads(data)
    count = data['res_count']
    results = data['results'] #contain article id
    ids = extra_ids(results) #id in pages 0

    pagenums = int((count - 1)/50 + 1)
    for i in range(1, pagenums):
        form2 = {
            'action':"get_promed_search_content",
            'query[0][name]':"pagenum",
            'query[0][value]':i,
            'query[1][name]':"kwby1",
            'query[1][value]':"summary",
            'query[2][name]':"search",
            'query[2][value]':"",
            'query[3][name]':"date1",
            'query[3][value]':start_date,
            'query[4][name]':"date2",
            'query[4][value]':end_date,
            'query[5][name]':"feed_id",
            'query[5][value]':1,
            'query[6][name]':"submit",
            'query[6][value]':"next"
        }
        query = encode_query(form2)
        req = request.Request(PROMED_API, headers=HEADERS, data=query)
        r = request.urlopen(req)
        data = r.read().decode("utf-8")
        data = json.loads(data)
        count = data['res_count']
        results = data['results']
        ids = ids + extra_ids(results)
    return ids

#get the json article data by id
def article_request(article_id):
    form = {
    'action': "get_latest_post_data",
    'alertId': article_id
    }
    query = encode_query(form)
    req = request.Request(PROMED_API, headers=HEADERS, data=query)
    r = request.urlopen(req)
    data = r.read().decode("utf-8")
    return json.loads(data)

def encode_query(form):
    query_string = parse.urlencode(form)
    query = query_string.encode("ascii")
    return query

#extract ids from get_promed_search_content action
def extra_ids(results):
    soup = BeautifulSoup(results, 'lxml')
    elems = soup.find_all("a")
    ids = []
    for elem in elems:
        _id = int(elem.get('id')[2:])
        ids.append(_id)
    return ids

def main():
    ids = search()
    for _id in ids:
        data = article_request(_id)
        # parser(data)
        print(data)

if __name__ == "__main__":
    main()