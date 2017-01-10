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
   print("DJANGO VIEW")
   
   #lons1 = request.GET.get('request_data')
   #lons2 = request.GET.get('request_data2')
   #if lons1 is None:
   #       lons1 = 110.49
   #if lons2 is None:
   #       lons2 = 120.49
   readNetcdf = ReedNCFile()
   lon = readNetcdf.lon_data(1)
   lat = readNetcdf.lat_data(1)
   name_file = "ec45indcal"
  
   if(request.method == 'POST'and request.POST.get(
                                   'submit','') == 'save'):
       lats1 = float(request.POST['lat1'])
       lats2 = float(request.POST['lat2'])
       lons1 = float(request.POST['lon1'])
       lons2 = float(request.POST['lon2'])
   else:
       lats1 = lat[0]
       lats2 = lat[len(lat)-1]
       lons1 = lon[0]
       lons2 = lon[len(lon)-1]
   '''elif(request.method == 'POST'and request.POST.get(
                                   'submit','') != 'save'):
       if request.is_ajax():
            #Always use get on request.POST. Correct way of querying a QueryDict.
            path_file = request.POST.get('path_file')
            print(path_file)
            name_file = str(path_file)+".csv"
            cli = Climdex("/home/thiranan/Project2/"+name_file)
            txx_data = cli.txx()
            tnx_data = cli.tnx()
            txn_data = cli.txn()
            tnn_data = cli.tnn()
            tn10p_data = cli.tn10p()
            tx10p_data = cli.tx10p()
            tn90p_data = cli.tn90p()
            tx90p_data = cli.tx90p()
            rx1day_data = cli.rx1day()
            rx5day_data = cli.rx5day()
            su_data = cli.su()
            id_data = cli.id()
            tr_data = cli.tr()
            gsl_data = cli.gsl()
            wsdi_data = cli.wsdi()
            csdi_data = cli.csdi()

            dtr_data = cli.dtr()
            sdii_data = cli.sdii()
            r10mm_data = cli.r10mm()
            r20mm_data = cli.r20mm()
            rnnmm_data = cli.rnnmm()

            cdd_data = cli.cdd()
            cwd_data = cli.cwd()
            r95ptot_data = cli.r95ptot()
            r99ptot_data = cli.r99ptot()
            prcptot_data = cli.prcptot()

            data = {"TXX":txx_data}
            #Returning same data back to browser.It is not possible with Normal submit
            #data = {'TXX':txx_data,'TNX':tnx_data,'TXN':txn_data,'TNN':tnn_data,'Tn10p':tn10p_data,'Tx10p':tx10p_data,'Tn90p':tn90p_data,'Tx90p':tx90p_data,'Rx1day':rx1day_data,'Rx5day':rx5day_data,'SU':su_data,'ID':id_data,'TR':tr_data,'GSL':gsl_data,'WSDI':wsdi_data,'CSDI':csdi_data,'DTR':dtr_data,'SDII':sdii_data,'R10mm':r10mm_data,'R20mm':r20mm_data,'Rnnmm':rnnmm_data,'CDD':cdd_data,'CWD':cwd_data,'R95ptot':r95ptot_data,'R99ptot':r99ptot_data,'Prcptot':prcptot_data}
            return JsonResponse(data)'''
   
   #if(request.method == 'POST'and request.POST.get(
                                   #'sim','') == '1'):
      # n_file = float(request.POST['1'])
      
   #else:
       #n_file = name_file
   
   #print(n_file)
   #print(lats2)
   #print(lons1)
   #print(lons2)
   
  #--------Average--------
   dat_t = readNetcdf.year_cal('ts','avg',lats1,lats2,lons1,lons2)
   dat_p = readNetcdf.year_cal('pr','avg',lats1,lats2,lons1,lons2)
  
  #--------Max------------
   dat_maxt = readNetcdf.year_cal('ts','max',lats1,lats2,lons1,lons2)
   dat_maxp = readNetcdf.year_cal('pr','max',lats1,lats2,lons1,lons2)

  #--------Min------------
   dat_mint = readNetcdf.year_cal('ts','min',lats1,lats2,lons1,lons2)
   dat_minp = readNetcdf.year_cal('pr','min',lats1,lats2,lons1,lons2)

  #--------SU-------------
   su_cal = readNetcdf.cal_su_ind('ts',lats1,lats2,lons1,lons2)
  #--------FD-------------
   fd_cal = readNetcdf.cal_fd_day('ts',lats1,lats2,lons1,lons2)
  #--------ATR-------------
   rang_tem = readNetcdf.cal_dtr_ind('ts',lats1,lats2,lons1,lons2)
   
  #---------Climdex--------
   cli = Climdex("/home/thiranan/Project2/ec85indcal.csv")
   txx_data = cli.txx()
   tnx_data = cli.tnx()
   txn_data = cli.txn()
   tnn_data = cli.tnn()
   tn10p_data = cli.tn10p()
   tx10p_data = cli.tx10p()
   tn90p_data = cli.tn90p()
   tx90p_data = cli.tx90p()
   rx1day_data = cli.rx1day()
   rx5day_data = cli.rx5day()
   su_data = cli.su()
   fd_data = cli.fd()
   id_data = cli.id()
   tr_data = cli.tr()
   gsl_data = cli.gsl()
   wsdi_data = cli.wsdi()
   csdi_data = cli.csdi()

   dtr_data = cli.dtr()
   sdii_data = cli.sdii()
   r10mm_data = cli.r10mm()
   r20mm_data = cli.r20mm()
   rnnmm_data = cli.rnnmm()

   cdd_data = cli.cdd()
   cwd_data = cli.cwd()
   r95ptot_data = cli.r95ptot()
   r99ptot_data = cli.r99ptot()
   prcptot_data = cli.prcptot()
   #print(dat_minp)
   #print(gsl_data)

   return render(request, 'gridTs.html',{'FD':json.dumps(fd_data),'dat':json.dumps(dat_t),'per_y':json.dumps(dat_p),'max_p':json.dumps(dat_maxp),'max_t':json.dumps(dat_maxt),'min_t':json.dumps(dat_mint),'min_p':json.dumps(dat_minp),'lon':json.dumps(lon),'lat':json.dumps(lat),'lon1_g':json.dumps(lons1),'lon2_g':json.dumps(lons2),'lat1_g':json.dumps(lats1),'lat2_g':json.dumps(lats2),'TXX':json.dumps(txx_data),'TNX':json.dumps(tnx_data),'TXN':json.dumps(txn_data),'TNN':json.dumps(tnn_data),'Tn10p':json.dumps(tn10p_data),'Tx10p':json.dumps(tx10p_data),'Tn90p':json.dumps(tn90p_data),'Tx90p':json.dumps(tx90p_data),'Rx1day':json.dumps(rx1day_data),'Rx5day':json.dumps(rx5day_data),'SU':json.dumps(su_data),'ID':json.dumps(id_data),'TR':json.dumps(tr_data),'GSL':json.dumps(gsl_data),'WSDI':json.dumps(wsdi_data),'CSDI':json.dumps(csdi_data),'DTR':json.dumps(dtr_data),'SDII':json.dumps(sdii_data),'R10mm':json.dumps(r10mm_data),'R20mm':json.dumps(r20mm_data),'Rnnmm':json.dumps(rnnmm_data),'CDD':json.dumps(cdd_data),'CWD':json.dumps(cwd_data),'R95ptot':json.dumps(r95ptot_data),'R99ptot':json.dumps(r99ptot_data),'Prcptot':json.dumps(prcptot_data)})

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



