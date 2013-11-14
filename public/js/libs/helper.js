var helper = {

  formatDateTime : function(time, type, resultType) {
    var timeStr = "";
    var len = 10;
    if(time == null || time == "") {
      return "";
    }
    if(typeof time === "string") {
      var theTime = time.slice(0, 10) + " " + time.slice(11, 19);
      time = new Date( Date.parse(theTime.replace(/-/g, "/")) );
    }
    switch(type) {
      case "year" :
        timeStr = time.getFullYear() + "-01" + "-01" + " " + "00" + ":00" + ":00";
        len = 4;
        break;
      case "month" :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + ".01" + " " + "00" + ":00" + ":00";
        len = 7;
        break;
      case "day" :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + "00" + ":00" + ":00";
        len = 10;
        break;
      case "hour" :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":00" + ":00";
        len = 13;
        break;
      case "minute" :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":" + this.dateAddZero(time.getMinutes().toString()) + ":00";
        len = 16;
        break;
      case "second" :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":" + this.dateAddZero(time.getMinutes().toString()) + ":" + this.dateAddZero(time.getSeconds().toString());
        len = 19;
        break;
      case "SN" :
        timeStr = time.getFullYear() + this.dateAddZero((time.getMonth()+1).toString()) + this.dateAddZero(time.getDate().toString()) + this.dateAddZero(time.getHours().toString()) + this.dateAddZero(time.getMinutes().toString()) + this.dateAddZero(time.getSeconds().toString());
        len = 14;
        break;
      default :
        timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + "00" + ":00" + ":00";
    }
    if(resultType==="Date") {
      return new Date( Date.parse(timeStr.replace(/-/g, "/")) );
    } else if(resultType==="shortString") {
      return timeStr.slice(0, len);
    } else if(resultType==="tinyString") {
      return timeStr.slice(11, len);
    } 
    else {
      return timeStr;
    }
  },

  dateAddZero : function(str) {
    str = '0' + str;
    return str.length >= 3 ? str.slice(1, 3) : str;
  },
  
  calNByDateType : function(time, type) {
    var myTime = new Date( time.valueOf() );
    var n = 1;
    if(arguments[2]!==undefined) {
      n=arguments[2];
    }
    if(type==="hour") {
      myTime.setHours( myTime.getHours() + n );
    } else if(type==="day") {
      myTime.setDate( myTime.getDate() + n );
    } else if(type==="month") {
      myTime.setMonth( myTime.getMonth() + n );
    } else if(type==="year") {
      myTime.setFullYear( myTime.getFullYear() + n );
    }
    
    return myTime;
  },
  
  getCurrentWeek : function(today) {
    var re = [];
    var d = today.getDay() == 0 ? 7 : today.getDay();
    for(var i=1; i<=7; i++) {
      re.push( this.calNByDateType(today, "day", i-d) );
    }
    return re;
  },
  
  getQueryString : function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  
  loopTree : function(obj, type, callback, childrenKey) {
    childrenKey = childrenKey || 'children';
    if(obj[childrenKey]) {
      for(var i=0; i<obj[childrenKey].length; i++ ) {
        helper.loopTree(obj[childrenKey][i], type, callback, childrenKey);
      }
      if(type=="all"||type=="parents") {
        callback(obj);
      }
    } else {
      if(type=="all"||type=="child") {
        callback(obj);
      }
    }
  },
  
  // Provide by vendor, Copyright unknown. Did a few modification.
  serializeObject : function(serializedArr) {
    var o = {};
    var a = serializedArr;
    for(var i=0; i<a.length; i++) {
      if (o[a[i].name] !== undefined) {
        if (!o[a[i].name].push) {
          o[a[i].name] = [o[a[i].name]];
        }
        o[a[i].name].push(a[i].value || "");
      } else {
        o[a[i].name] = a[i].value || "";
      }
    }
    return o;
  },
  
  // http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit. Did a few modification.
  postToUrl : function(attrObj, paramObj) {
    var form = document.createElement("form");
    for(var key in attrObj) {
      form.setAttribute(key, attrObj[key]);
    }
    for(var key in paramObj) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", key=="file"?"file":"hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", paramObj[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  }
  
}