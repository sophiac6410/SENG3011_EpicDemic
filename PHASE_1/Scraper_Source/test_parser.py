from parser import *
import datetime
import pytest

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

# test for disease: e.coli
def test_diseases_ecoli():
    headline = 'E. coli EHEC - France (02): hemolytic uremic syndrome, fatal'
    assert get_diseases(headline) == [ 13 ]

# test for disease: influenza 
def test_disease_h5n1():
    headline = 'Avian influenza (67): Europe (France) poultry, HPAI H5N1, spread, control'
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
def test_disease_other():
    headline = 'Undiagnosed death, dog - New Zealand: (CA) toxic algae susp'
    assert get_diseases(headline) == [ 46 ]





