from django.shortcuts import redirect, render
from django.core import serializers
from django.http import JsonResponse
from netCDF4 import Dataset
from decimal import *

import csv
import json
import numpy as np
import datetime as dt 

# --------------------------------------------------------------------------#
# ** home
def home_page(request):
    return render(request, 'home.html')

# --------------------------------------------------------------------------#
# ** plot grid
def grid(request):
    with open('/home/nuyuyii/Downloads/d3-grid-map-master/data/countries.topojson', 'r') as f:
        data = json.load(f)
    geodata = [ ( "Here", (1003,3004) ), ("There", (1.2,1.3)) ]
    return render(request, 'test.html') #'gridTs.html', {'objects': json.dumps(geodata)})


# --------------------------------------------------------------------------#
# ** plot graph from avg
def plot(request):
    v = Dataset('/home/nuyuyii/401_Project/NetCDFfile/sresa1b_ncar_ccsm3-example.nc', 'r')   
    lons = v.variables['lon']
    lats = v.variables['lat']
    ta = v.variables['tas']
    pre= v.variables['pr']
    times = v.variables['time']
    p = pre[:,1:2,1:256]
    t = ta[:,0:128,0:256]
    msk = v.variables['msk_rgn']
    for i in range(len(t[:])):
	    for j in range(len(t[:])):
	            temp = t[i][j]
		
    for i in range(len(p[:])):
	    for j in range(len(p[:])):
		    precip = p[i][j]

    temp_avg = np.average(ta,axis=2)
    for i in range(1):
	    tem_a = temp_avg[i]-273.15

    a = np.array(lats[:])
 
    b = [float(Decimal("%.2f" % e)) for e in a]
    c = np.array(tem_a[:])
    d = [float(Decimal("%.2f" % e)) for e in c]
    
    offset = dt.timedelta(hours=48)
    # List of all times in the file as datetime objects
    dt_time = [dt.date(1915, 1, 1) + dt.timedelta(hours=t) - offset\
		   for t in times]
    cur_time = dt_time[0]
 
    return render(request, 'plot.html',{'lat':json.dumps(b) ,'tem':json.dumps(d),'date':json.dumps( str(cur_time))})  



# --------------------------------------------------------------------------#
# ** plot graph from lat lon

def plot_file(request):  
    if(request.method == 'POST'and request.POST.get(
                                   'submit','') == 'save'):
        lat_txt = float(request.POST['lat'])
        lng_txt = float(request.POST['lng'])
        lat_ = float(Decimal("%.2f" % lat_txt))
        lng_ = float(Decimal("%.2f" % lng_txt))
        latlng = "Lat:"+str(lat_)+"Lng:"+str(lng_)
        Bangkok = {'name': latlng, 'lat': lat_, 'lon': lng_}
    else:
        Bangkok = {'name': 'Bangkok, Thailand', 'lat': 13.45, 'lon': 100.48}

    nc_fid = Dataset('/home/nuyuyii/401_Project/NetCDFfile/air.sig995.2012.nc', 'r') 
    lats = nc_fid.variables['lat'][:]  
    lons = nc_fid.variables['lon'][:]
    time = nc_fid.variables['time'][:]
    air = nc_fid.variables['air'][:] 

    time_idx = 100  # some random day in 2012
    # Python and the renalaysis are slightly off in time so this fixes that problem
    offset = dt.timedelta(hours=48)
    # List of all times in the file as datetime objects
    d0 = dt.date(1970, 1, 1)
    delta = [str(dt.date(1, 1, 1) + dt.timedelta(hours=t) - offset -d0).split() \
               for t in time]
    cur_time = d0+dt.timedelta(days=int(delta[0][0]))
    dt_time = [int(delta[i][0]) for i in range(len(time))]
    #cur_time = dt_time[time_idx]



    # Find the nearest latitude and longitude for Darwin
    lat_idx = np.abs(lats - Bangkok['lat']).argmin()
    lon_idx = np.abs(lons - Bangkok['lon']).argmin()

    celsius = air[:, lat_idx, lon_idx]

    for i in range(len(time)):
        celsius[i] = air[i, lat_idx, lon_idx] - 273.15

    #cel = np.average(air,axis=2)

    title = nc_fid.variables['air'].var_desc+" from "+Bangkok['name']+" for "+str(cur_time.year)

    a = 0
    b = 12
    ta = []
    for i in range(13):
        ta.append(np.average(celsius[a:b]))
        a = a+12
        b = a+12

    c = np.array(celsius[:])
    d = [float(Decimal("%.2f" % e)) for e in c]

    av = [float(Decimal("%.2f" % e)) for e in ta]
    
    return render(request, 'tjlat.html',{'lat':json.dumps(av) ,'tem':json.dumps(d),'date':json.dumps(title)})
    # return render(request, 'plot.html')

