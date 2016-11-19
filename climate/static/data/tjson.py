import json
with open('countries.topojson', 'r') as f:
     data = json.load(f)

print(data)
