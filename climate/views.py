from django.shortcuts import redirect, render
from django.core import serializers
from django.shortcuts import render
from django.template import loader, Context
from django.core import serializers
from django.http import JsonResponse
from netCDF4 import Dataset
from decimal import *
from climate.readNetcdf import ReedNCFile
from climate.r1 import Climdex

import csv
import json
import numpy as np
import datetime as dt 


# --------------------------------------------------------------------------#
# ** plot grid
def home_page(request):
    cli = Climdex("/home/thiranan/Project2/ec85indcal.csv")
    if request.method == 'POST':
        #POST goes here . is_ajax is must to capture ajax requests. Beginner's pit.
        txx_data = cli.txx()
        if request.is_ajax():
            #Always use get on request.POST. Correct way of querying a QueryDict.
            path_file = request.POST.get('path_file')
            print(path_file)
           
            data = {"path_file":getattr(cli, path_file)()}
    
            #Returning same data back to browser.It is not possible with Normal submit
            return JsonResponse(data)
    #Get goes here
    return render(request,'gridTs.html',{'SU':json.dumps(cli.su())})
# --------------------------------------------------------------------------#
# ** home
def grid(request):
    return 
# --------------------------------------------------------------------------#
# ** plot graph from avg
def plot_file(request):
    return 
# --------------------------------------------------------------------------#
# ** plot graph from lat lon
def test(request):  
    return



