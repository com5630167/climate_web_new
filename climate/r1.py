import math, datetime
#import rpy2.robjects.lib.ggplot2 as ggplot2
import rpy2.robjects as ro
from rpy2.robjects.packages import importr

importr("climdex.pcic")
importr("PCICt")
#mydata = ro.DataFrame.from_csvfile('/home/thiranan/Project2/ec45indcal.csv')

import rpy2.robjects as robjects
#r_source = robjects.r['source']
#r_source("/home/thiranan/Project2/dex1.r")

from rpy2.robjects.packages import SignatureTranslatedAnonymousPackage

string = """
library("climdex.pcic", lib.loc="~/R/x86_64-pc-linux-gnu-library/3.3")
library(PCICt)

help(read.csv) 
dat_cut <- function(file_name){
  mydata = read.csv(file_name)
  return(mydata)
}
mdata <- function(file_name){
  mydata <- dat_cut(file_name)
  dat_mydata <- as.PCICt(do.call(paste, mydata[,c("year","month","day")]), format="%Y%m%d", cal="gregorian")
  ## Load the data in.
  ci_mydata <- climdexInput.raw(mydata$tmax,mydata$tmin,mydata$prcp,dat_mydata,dat_mydata,dat_mydata, base.range=c(1970, 2099))
  return(ci_mydata)
}
#------------------------------------------------
su <- function(file_name){
  ci_mydata <- mdata(file_name)
  su_mydata <- climdex.su(ci_mydata)
 
  return(su_mydata)
}
fd <- function(file_name){
  ci_mydata <- mdata(file_name)
  fd_mydata <- climdex.fd(ci_mydata)
  
  return(fd_mydata)
}
id <- function(file_name){
  ci_mydata <- mdata(file_name)
  id_mydata <- climdex.id(ci_mydata)
  return(id_mydata)
}
tr <- function(file_name){
  ci_mydata <- mdata(file_name)
  tr_mydata <- climdex.tr(ci_mydata)
  return(tr_mydata)
}
gsl <- function(file_name){
  ci_mydata <- mdata(file_name)
  gsl_mydata <- climdex.gsl(ci_mydata)
  return(gsl_mydata)
}
wsdi <- function(file_name){
  ci_mydata <- mdata(file_name)
  wsdi_mydata <- climdex.wsdi(ci_mydata)
  return(wsdi_mydata)
}
csdi <- function(file_name){
  ci_mydata <- mdata(file_name)
  csdi_mydata <- climdex.csdi(ci_mydata)
  return(csdi_mydata)
}
dtr <- function(file_name){
  ci_mydata <- mdata(file_name)
  dtr_mydata <- climdex.dtr(ci_mydata)
  return(dtr_mydata)
}
sdii <- function(file_name){
  ci_mydata <- mdata(file_name)
  sdii_mydata <- climdex.sdii(ci_mydata)
  return(sdii_mydata)
}
r10mm <- function(file_name){
  ci_mydata <- mdata(file_name)
  r10mm_mydata <- climdex.r10mm(ci_mydata)
  return(r10mm_mydata)
}
r20mm <- function(file_name){
  ci_mydata <- mdata(file_name)
  r20mm_mydata <- climdex.r20mm(ci_mydata)
  return(r20mm_mydata)
}
rnnmm <- function(file_name){
  ci_mydata <- mdata(file_name)
  rnnmm_mydata <- climdex.rnnmm(ci_mydata)
  return(rnnmm_mydata)
}
cdd <- function(file_name){
  ci_mydata <- mdata(file_name)
  cdd_mydata <- climdex.cdd(ci_mydata)
  return(cdd_mydata)
}
cwd <- function(file_name){
  ci_mydata <- mdata(file_name)
  cwd_mydata <- climdex.cwd(ci_mydata,spells.can.span.years = FALSE)
  cwd_mydata[is.na(cwd_mydata)] <- 0
  return(cwd_mydata)
}
r95ptot <- function(file_name){
  ci_mydata <- mdata(file_name)
  r95ptot_mydata <- climdex.r95ptot(ci_mydata)
  return(r95ptot_mydata)
}
r99ptot <- function(file_name){
  ci_mydata <- mdata(file_name)
  r99ptot_mydata <- climdex.r99ptot(ci_mydata)
  return(r99ptot_mydata)
}
prcptot <- function(file_name){
  ci_mydata <- mdata(file_name)
  prcptot_mydata <- climdex.prcptot(ci_mydata)
  return(prcptot_mydata)
}
txx <- function(file_name){
  ci_mydata <- mdata(file_name)
  txx_mydata <- climdex.txx(ci_mydata)
  return(txx_mydata)
}
tnx <- function(file_name){
  ci_mydata <- mdata(file_name)
  tnx_mydata <- climdex.tnx(ci_mydata)
  return(tnx_mydata)
}
txn <- function(file_name){
  ci_mydata <- mdata(file_name)
  txn_mydata <- climdex.txn(ci_mydata)
  return(txn_mydata)
}
tnn <- function(file_name){
  ci_mydata <- mdata(file_name)
  tnn_mydata <- climdex.tnn(ci_mydata)
  return(tnn_mydata)
}
tn10p <- function(file_name){
  ci_mydata <- mdata(file_name)
  tn10p_mydata <- climdex.tn10p(ci_mydata)
  return(tn10p_mydata)
}
tx10p <- function(file_name){
  ci_mydata <- mdata(file_name)
  tx10p_mydata <- climdex.tx10p(ci_mydata)
  return(tx10p_mydata)
}
tn90p <- function(file_name){
  ci_mydata <- mdata(file_name)
  tn90p_mydata <- climdex.tn90p(ci_mydata)
  return(tn90p_mydata)
}
tx90p <- function(file_name){
  ci_mydata <- mdata(file_name)
  tx90p_mydata <- climdex.tx90p(ci_mydata)
  return(tx90p_mydata)
}
rx1day <- function(file_name){
  ci_mydata <- mdata(file_name)
  rx1day_mydata <- climdex.rx1day(ci_mydata)
  return(rx1day_mydata)
}
rx5day <- function(file_name){
  ci_mydata <- mdata(file_name)
  rx5day_mydata <- climdex.rx5day(ci_mydata)
  return(rx5day_mydata)
}
"""

powerpack = SignatureTranslatedAnonymousPackage(string, "powerpack")

#file_name = "/home/thiranan/Project2/ec45indcal.csv"


class Climdex(object):

    def __init__(self, file_name):
        self.file_name = file_name
        

    def dat(self):
        dat_y = []
        month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        for i in range(1970, 2100):
            for j in range(0, 12):
                dat_y.append(str(i)+"-"+month[j]+"-00")
                
        return dat_y

    def dat2(self):
        dat_y = []
        for i in range(1970, 2100):
            dat_y.append(str(i))
                
        return dat_y

    def txx(self):
        year = self.dat()
        txx_arr = powerpack.txx(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(txx_arr[i])])
        return result

    def tnx(self):
        year = self.dat()
        tnx_arr = powerpack.tnx(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tnx_arr[i])])
        return result

    def txn(self):
        year = self.dat()
        txn_arr = powerpack.txn(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(txn_arr[i])])
        return result

    def tnn(self):
        year = self.dat()
        tnn_d = powerpack.tnn(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tnn_d[i])])
        return result

    def tn10p(self):
        year = self.dat()
        tn10p_d = powerpack.tn10p(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tn10p_d[i])])
        return result

    def tx10p(self):
        year = self.dat()
        tx10p_d = powerpack.tx10p(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tx10p_d[i])])
        return result

    def tn90p(self):
        year = self.dat()
        tn90p_d = powerpack.tn90p(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tn90p_d[i])])
        return result

    def tx90p(self):
        year = self.dat()
        tx90p_d = powerpack.tx90p(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tx90p_d[i])])
        return result

    def rx1day(self):
        year = self.dat()
        rx1day_d = powerpack.rx1day(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(rx1day_d[i])])
        return result

    def rx5day(self):
        year = self.dat()
        rx5day_d = powerpack.rx5day(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(rx5day_d[i])])
        return result

    def su(self):
        year = self.dat2()
        su_d = powerpack.su(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(su_d[i])])
        return result

    def fd(self):
        year = self.dat2()
        fd_d = powerpack.fd(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(fd_d[i])])
        return result

    def id(self):
        year = self.dat2()
        id_d = powerpack.id(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(id_d[i])])
        return result

    def tr(self):
        year = self.dat2()
        tr_d = powerpack.tr(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(tr_d[i])])
        return result

    def gsl(self):
        year = self.dat2()
        gsl_d = powerpack.gsl(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(gsl_d[i])])
        return result

    def wsdi(self):
        year = self.dat2()
        wsdi_d = powerpack.wsdi(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(wsdi_d[i])])
        return result

    def csdi(self):
        year = self.dat2()
        csdi_d = powerpack.csdi(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(csdi_d[i])])
        return result

    def dtr(self):
        year = self.dat()
        dtr_d = powerpack.dtr(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(dtr_d[i])])
        return result

    def sdii(self):
        year = self.dat2()
        sdii_d = powerpack.sdii(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(sdii_d[i])])
        return result

    def r10mm(self):
        year = self.dat2()
        r10mm_d = powerpack.r10mm(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(r10mm_d[i])])
        return result

    def r20mm(self):
        year = self.dat2()
        r20mm_d = powerpack.r20mm(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(r20mm_d[i])])
        return result

    def rnnmm(self):
        year = self.dat2()
        rnnmm_d = powerpack.rnnmm(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(rnnmm_d[i])])
        return result

    def cdd(self):
        year = self.dat2()
        cdd_d = powerpack.cdd(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(cdd_d[i])])
        return result

    def cwd(self):
        year = self.dat2()
        cwd_d = powerpack.cwd(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(cwd_d[i])])
        return result

    def r95ptot(self):
        year = self.dat2()
        r95ptot_d = powerpack.r95ptot(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(r95ptot_d[i])])
        return result

    def r99ptot(self):
        year = self.dat2()
        r99ptot_d = powerpack.r99ptot(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(r99ptot_d[i])])
        return result

    def prcptot(self):
        year = self.dat2()
        prcptot_d = powerpack.prcptot(self.file_name)
        result = []
        for i in range(0,len(year)):
             result.append([year[i],float(prcptot_d[i])])
        return result




