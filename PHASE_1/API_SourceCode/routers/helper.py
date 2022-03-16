def log():
    return {
        "team_name": "EpicDemic",
        "accessed_time": datetime.datetime.now(datetime.timezone.utc),
        "data_source": "promedmail.org"
    }

def response(ok, code, data):
    return {
        "ok": ok,
        "code": code,
        "data": data,
        "log": log()
    }