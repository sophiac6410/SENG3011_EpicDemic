from parser import *
from pymongo import MongoClient
import datetime
import pytest

### DATE TESTS ###

# checks if get_date returns date datatype
def test_date_value():
    assert isinstance( get_date('2022-03-15 13:09:42'), datetime.datetime)

# checks if the format is correct
def test_date_format():
    assert str(get_date('2022-03-15 13:09:42')) == '2022-03-15 13:09:42'

# should raise an exception as date format is incorrect 
def test_date_format_err():
    with pytest.raises(Exception):
        get_date('Sat 12 Mar 2022')


### DISEASES TESTS ###

# test for disease: e.coli
def test_diseases_ecoli():
    headline = 'E. coli EHEC - France (02): hemolytic uremic syndrome, fatal'
    assert get_diseases(headline) == [ 13 ]

# test for disease: influenza 
def test_disease_h5n1():
    headline = 'Avian influenza (40): Americas (USA) wild bird, HPAI H5N1'
    assert get_diseases(headline) == [ 15 ]

# test for disease: hepatitis 
def test_disease_hepatitis():
    headline = 'Hepatitis A - USA (07): (VA) injection drug population'
    assert get_diseases(headline) == [ 25 ]

# test for disease: other
def test_disease_other():
    headline = 'Cronobacteriosis, salmonellosis - USA (03): powdered form., alert, recall, fatal'
    assert get_diseases(headline) == [ 1 ]

# test for disease: unknown
def test_disease_unknown():
    headline = 'Unknown illness, giant pandas - China (04)'
    assert get_diseases(headline) == [ 46 ]

# test for disease: covid
def test_disease_covid():
    headline = 'COVID-19 update (72): France mask restrictions, deltacron, US prisons, WHO'
    assert get_diseases(headline) == [ 45 ]

# test for disease: hand, foot and mouth disease
def test_disease_handfootmouth():
    headline = 'Hand, foot & mouth disease update: Philippines (CZ)'
    assert get_diseases(headline) == [ 23 ]

# test for disease anthrax cutaneous
def test_disease_anthraxcutaneous():
    headline = 'Anthrax, human - Turkey: (E. Anatolia) cutaneous cases 2008-2014'
    assert get_diseases(headline) == [ 2 ]

# test for ebola haemorrhagic fever
def test_disease_ebolafever():
    headline = 'Ebola haemorrhagic fever - Congo Rep.'
    assert get_diseases(headline) == [ 12 ]

# test for avian influenza - different keywords present 
def test_disease_avian2():
    headline = 'Avian influenza (18): H7N9 & H9N2 reassortment, zoonotic potential'
    assert get_diseases(headline) == [ 16, 17 ]

# test for cryptococcosis
def test_disease_crypto():
    headline = 'Cryptococcosis, human, animal - Canada (BC)'
    assert get_diseases(headline) == [ 8 ]

# test for unknown
def test_disease_unknown2():
    headline = 'Undiagnosed hemorrhagic fever - South Sudan: (BG) RFI'
    assert get_diseases(headline) == [ 46 ]

# test for multiple diseases
def test_disease_multiple():
    headline = 'Dengue, chikungunya, Zika viruses - Americas: Brazil (RJ) co-circulation'
    result = get_diseases(headline)
    result.sort()
    assert result == [ 6, 10, 41 ]


### LOCATION TESTING ###

# checks if the database updates as needed
def test_loc_database():
    loc_str = 'New Zealand'
    loc_lat = '-42.423489'
    loc_long = '172.659393'

    db = get_db()
    location_collection = db["Locations"]
    db_loc = location_collection.find_one({"latitude": loc_lat, "longitude": loc_long})

    prev_count = location_collection.count_documents({})
    get_locations(loc_str, loc_lat, loc_long)

    # if location already exists, get_location shouldnt add in the database:
    if db_loc: 
        assert location_collection.count_documents({}) == prev_count
    # if location doesnt exist, collection should increase by 1
    else: 
        assert location_collection.count_documents({}) == prev_count + 1


# checks that if the country is given, then state and city is an emptry string
def test_loc_country():
    loc_str = 'New Zealand'
    loc_lat = '-42.423489'
    loc_long = '172.659393'

    db = get_db()
    location_collection = db["Locations"]
    get_locations(loc_str, loc_lat, loc_long)
    db_loc = location_collection.find_one({"latitude": loc_lat, "longitude": loc_long})

    assert db_loc != None 
    assert db_loc['state'] == ""
    assert db_loc['city'] == ""
    assert db_loc['country'] == "New Zealand"

# if state is given, city by default is the capital city 
def test_loc_state():
    loc_str = 'South Dakota, United States'
    loc_lat = '44.496498'
    loc_long = '-100.239304'

    db = get_db()
    location_collection = db["Locations"]
    get_locations(loc_str, loc_lat, loc_long)
    db_loc = location_collection.find_one({"latitude": loc_lat, "longitude": loc_long})

    assert db_loc != None 
    assert db_loc['state'] == "South Dakota"
    assert db_loc['city'] == "Sioux Falls"
    assert db_loc['country'] == "United States"

# testing for Worldwide edge case
def test_loc_worldwide():
    loc_str = 'Worldwide'
    loc_lat = '-50.0'
    loc_long = '0'

    db = get_db()
    location_collection = db["Locations"]
    loc = get_locations(loc_str, loc_lat, loc_long)
    db_loc = location_collection.find_one({"_id": loc[0]})

    assert db_loc != None 
    assert db_loc['state'] == ""
    assert db_loc['city'] == ""
    assert db_loc['country'] == ""
    assert db_loc['geonames_id'] == 0

# test for weird location string
def test_loc_complexstring():
    loc_str = 'Canary Islands [Spain]'
    loc_lat = '28.000000'
    loc_long = '-15.500000'

    db = get_db()
    location_collection = db["Locations"]
    loc = get_locations(loc_str, loc_lat, loc_long)
    db_loc = location_collection.find_one({"_id": loc[0]})

    assert db_loc != None 
    assert db_loc['country'] == "Spain"



test_disease_h5n1()