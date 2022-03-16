from API_Documentation import metadata
from datetime import datetime, time

def response(ok, code, data):
    return {
        "team_name": metadata.api_data["title"],
        "version": metadata.api_data["version"],
        "accessed_time": datetime.datetime.now(datetime.timezone.utc),
        "data_source": metadata.api_data["data_source"],
        "ok": ok,
        "code": code,
        "data": data
    }

{
    "log":  {
        "team_name": "EpicDemic",
        "version": "0.0.1",
        "accessed_time": datetime.datetime.now(datetime.timezone.utc),
        "data_source": "promedmail.org"
    }
}


{
    "team_name": "EpicDemic",
    "version": "0.0.1",
    "accessed_time": "2022-03-10T02:08:51",
    "data_source": "promedmail.org",
    "ok": True,
    "code": 200,
    "data": {
        "start_range": 1,
        "end_range": 10,
        "articles": [{
            "id": 1,
            "url": "https://promedmail.org/promed-post/?id=8701909",
            "date_of_publication": "2022-03-10T02:08:51",
            "headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
            "main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
            "reports": [1, 2, 3]
        }]
    }
}


{
    "team_name": "EpicDemic",
    "version": "0.0.1",
    "accessed_time": "2022-03-10T02:08:51",
    "data_source": "promedmail.org",
    "ok": False,
    "code": 400,
    "data": {"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"}
}