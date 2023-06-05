import os
from dotenv import load_dotenv
import requests
import csv
load_dotenv()
api_key = os.getenv("API_KEY")

url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="

# open data file
county_file = open("yolo.csv")
county_data = csv.reader(county_file)

# open empty file coordinates -> address
reverse_geocode_file = open('reverseGeocode.csv', "w")
reverse_geocode = csv.reader(reverse_geocode_file, delimiter=',')
write = csv.writer(reverse_geocode_file)

# send get request to the google reverse geo code
def sendReq(query_params, lat, lon):
    res = requests.get(url+query_params+'&key='+api_key+"&result_type=street_address|route|intersection")

    res_json = res.json()
    if (res_json['status'] == 'OK'):
        entry = []
        entry.append(lat)
        entry.append(lon)
        entry.append(res_json['results'][0]['formatted_address'])
        write.writerow(entry)

for row in county_data:
    coordinates=""
    coordinates += row[16] + ',' + row[17]
    sendReq(coordinates, row[16], row[17])