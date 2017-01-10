from netCDF4 import Dataset
from decimal import *

import csv
import json
import numpy as np
import datetime as dt 

# --------------------------------------------------------------------------#
# ** function read netcdf
class ReedNCFile(object):

    def file_reader(self,year,month,var):
        y = str(year)
  
        if month <= 9:
            m = str(month)
            m1 = Dataset('/home/thiranan/Climate Data/Exp_03_mm_ATM.197'+y+'0'+m+'.nc', 'r')
        elif month >= 10:
            m = str(month)
            m1 = Dataset('/home/thiranan/Climate Data/Exp_03_mm_ATM.197'+y+m+'.nc', 'r')
        # read variable from netCDF
        var = m1.variables[var]
        return var

    def lon_data(self,year):
        y = str(year)
        m1 = self.file_reader(year,1,'lon')
        lons = m1[:]
        c = np.array(lons)
        lons = [float(Decimal("%.2f" % e)) for e in c]
        return lons[:]

    def lat_data(self,year):
        y = str(year)
        m1 = self.file_reader(year,1,'lat')
        lats = m1[:]
        c = np.array(lats)
        lats = [float(Decimal("%.2f" % e)) for e in c]
        return lats[:]

# print(lat_data(1))


# b = file_reader(1,1,'lat')
# print(b[:])

    def cut_val(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
       # keep value of variable from netCDF at this year and month
       lat_file = self.file_reader(year,month,'lat')
       lon_file = self.file_reader(year,month,'lon')
   
       # Find the nearest latitude and longitude 
       lat_id_s = np.abs(lat_file[:] - lat_s).argmin()
       lat_id_e = np.abs(lat_file[:] - lat_e).argmin()
       lon_id_s = np.abs(lon_file[:] - lon_s).argmin()
       lon_id_e = np.abs(lon_file[:] - lon_e).argmin()

       vars_cut = self.file_reader(year,month,var)
   
       vars_out = vars_cut[:,lat_id_s:lat_id_e,lon_id_s:lon_id_e]
       return vars_out
#  -----------------------------------------------------------------
    def cal_avg(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
        val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
        # average measure value all time, lat, lon
        avg1 = np.average(val,axis=2)
        if var == 'ts':
            for i in range(1):
                day1 = avg1[i]-273.15
            for i in range(2):
                day2 = avg1[i]-273.15
        if var == 'pr':
            for i in range(1):
                day1 = avg1[i]*84600
            for i in range(2):
                day2 = avg1[i]*84600
        sum_var = [];
        for i in range(0,len(day1)):
            sum_var.append((day1[i]+day2[i])/2)
   

        c = np.array(sum_var)
        sum_var = [float(Decimal("%.2f" % e)) for e in c]
   
        fin_avg = sum(sum_var)/len(sum_var)
        result = "%.2f" % fin_avg

        return result

    def cal_min(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
        val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
        min1 = np.min(val,axis=2)
        if var == 'ts':
            for i in range(1):
                day1 = min1[i]-273.15
            for i in range(2):
                day2 = min1[i]-273.15
        if var == 'pr':
            for i in range(1):
                day1 = min1[i]*84600
            for i in range(2):
                day2 = min1[i]*84600

        sum_var = [];
        for i in range(0,len(day1)):
            sum_var.append(min(day1[i],day2[i]))

        c = np.array(sum_var)
        sum_var = [float(Decimal("%.2f" % e)) for e in c]
   
        fin_avg = np.min(sum_var)
        result = "%.2f" % fin_avg

        return result

    def cal_max(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
       val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
       max1 = np.max(val,axis=2)
       if var == 'ts':
           for i in range(1):
               day1 = max1[i]-273.15
           for i in range(2):
               day2 = max1[i]-273.15
       if var == 'pr':
           for i in range(1):
               day1 = max1[i]*84600
           for i in range(2):
               day2 = max1[i]*84600

       sum_var = [];
       for i in range(0,len(day1)):
            sum_var.append(max(day1[i],day2[i]))

       c = np.array(sum_var)
       sum_var = [float(Decimal("%.2f" % e)) for e in c]
   
       fin_avg = np.max(sum_var)
       result = "%.2f" % fin_avg

       return result
#  -------------------------------------------------------------
    def cal_avg_all(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_year = [];
       for i in range(0, 10):
           for j in range(1, 13):
                   cal_year.append(self.cal_avg(var,i,j,lat_s,lat_e,lon_s,lon_e))
       return cal_year

    def cal_max_all(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_year = [];
       for i in range(0, 10):
           for j in range(1, 13):
                   cal_year.append(self.cal_max(var,i,j,lat_s,lat_e,lon_s,lon_e))
       return cal_year

    def cal_min_all(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_year = [];
       for i in range(0, 10):
           for j in range(1, 13):
                   cal_year.append(self.cal_min(var,i,j,lat_s,lat_e,lon_s,lon_e))
       return cal_year
#  -------------------------Date-----------------------------------
    def data_year(self):
       mon_avg = []
       mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
       for i in range(0, 10):
           for j in range(0, 12):
               mon_avg.append("197"+str(i)+"-"+mon[j]+"-00")

       return mon_avg

#  -------------------------Result---------------------------------

    def year_cal(self,var,ind,lat_s,lat_e,lon_s,lon_e):
       value = [];
       year = self.data_year()
       if ind == 'avg':
           value = self.cal_avg_all(var,lat_s,lat_e,lon_s,lon_e)
       elif ind == 'max':
           value = self.cal_max_all(var,lat_s,lat_e,lon_s,lon_e)  
       elif ind == 'min':
           value = self.cal_min_all(var,lat_s,lat_e,lon_s,lon_e) 

       result = []
       for i in range(0,len(value)):
           result.append([year[i],float(value[i])])
       return result

# --------------------------SU--------------------------------------
    def cal_day(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
       val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
       avg1 = np.max(val,axis=2)
       if var == 'ts':
           for i in range(1):
               day1 = avg1[i]-273.15
           for i in range(2):
               day2 = avg1[i]-273.15

       day1_avg = np.max(day1)
       day2_avg = np.max(day2)
       day1_avg = "%.2f" % day1_avg
       day2_avg = "%.2f" % day2_avg

       sum_var = [];

       sum_var.append(day1_avg)
       sum_var.append(day2_avg)

       return sum_var

    def cal_min_day(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
       val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
       avg1 = np.min(val,axis=2)
       if var == 'ts':
           for i in range(1):
               day1 = avg1[i]-273.15
           for i in range(2):
               day2 = avg1[i]-273.15

       day1_avg = np.min(day1)
       day2_avg = np.min(day2)
       day1_avg = "%.2f" % day1_avg
       day2_avg = "%.2f" % day2_avg

       sum_var = [];

       sum_var.append(day1_avg)
       sum_var.append(day2_avg)

       return sum_var

    def cal_max_day(self,var,year,month,lat_s,lat_e,lon_s,lon_e):
       val = self.cut_val(var,year,month,lat_s,lat_e,lon_s,lon_e)
       avg1 = np.max(val,axis=2)
       if var == 'ts':
           for i in range(1):
               day1 = avg1[i]-273.15
           for i in range(2):
               day2 = avg1[i]-273.15

       day1_avg = np.max(day1)
       day2_avg = np.max(day2)
       day1_avg = "%.2f" % day1_avg
       day2_avg = "%.2f" % day2_avg

       sum_var = [];

       sum_var.append(day1_avg)
       sum_var.append(day2_avg)

       return sum_var


    def date_cal(self,year,month,date):
       mon_avg = []
       mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
       mon_avg.append("197"+str(year)+"-"+mon[month-1]+"-0"+str(date+1))
         
       return mon_avg


    def cal_su_ind(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_in = [];
       for i in range(0, 10):
           for j in range(1, 13):
               cal_year = self.cal_day(var,i,j,lat_s,lat_e,lon_s,lon_e)
               for k in range(0,len(cal_year)):
                   if float(cal_year[k]) > 25.00:
                       dat = self.date_cal(i,j,k)
                       cal_in.append([str(dat[0]),float(cal_year[k])])
       return cal_in

    def cal_fd_day(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_in = [];
       for i in range(0, 10):
           for j in range(1, 13):
               cal_year = self.cal_min_day(var,i,j,lat_s,lat_e,lon_s,lon_e)
               for k in range(0,len(cal_year)):
                   if float(cal_year[k]) < 0.00:
                       dat = self.date_cal(i,j,k)
                       cal_in.append([dat[0],float(cal_year[k])])
       return cal_in


    def cal_dtr_ind(self,var,lat_s,lat_e,lon_s,lon_e):
       cal_in = [];
       for i in range(0, 10):
           for j in range(1, 13):
               cal_min = self.cal_min_day(var,i,j,lat_s,lat_e,lon_s,lon_e)
               cal_max = self.cal_max_day(var,i,j,lat_s,lat_e,lon_s,lon_e)
               for k in range(0,len(cal_min)):
                   dat = self.date_cal(i,j,k)
                   cal_dtr = (float(cal_max[k])-float(cal_min[k]))/(10*12*2)
                   cal_in.append([dat[0],float("%.4f" % cal_dtr)])
       return cal_in

    
