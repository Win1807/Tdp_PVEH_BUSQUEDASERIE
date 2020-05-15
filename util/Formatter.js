jQuery.sap.declare("sap.ui.veh_busquedaserie.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.veh_busquedaserie.util.Formatter = {
    
	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = sap.ui.demo.myFiori.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	},
	
	time : function (value)
	{
			var oDateFormat = sap.ui.core.format.DateFormat.getInstance({  
			     source:{pattern:"KKmmss"},  
			     pattern: "KK:mm:ss"}  
			);  
			    value = oDateFormat.parse(value);  
				return oDateFormat.format(new Date(value)); 
	},
	
	dates : function (value) {
		if (value =="00000000"){
		 return ;
		} else{
			var oDateFormat = sap.ui.core.format.DateFormat.getInstance({  
			     source:{pattern:"MM-dd-yyyy"},  
			     pattern: "dd-MM-yyyy"}  
			);  		
	        value = oDateFormat.parse(value);  
			return oDateFormat.format(new Date(value)); 		
		}
	},
	
    onFormatDate:function(fecha){
    	if(fecha != ""){
    		var fec = fecha;
			var anio = fec.substr(0, 4);
			var mes = fec.substr(4, 2);
			var dia = fec.substr(6, 2);
			var newfecha = dia + "." + mes + "." + anio;
			return newfecha;
    	}
    },
    onFormatMoney:function(dinero){
    	if(dinero != "0.00"){
    		var total = dinero;
			return parseFloat(total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
    	}else{
    		return "0.00";
    	}
    },
    onValidatePago: function(value){
    	if(value == ""){
    		return "No";
    	}else{
    		return value;
    	}
    },
     borrar0izalfanumerico: function(valor){
		if(valor != null && valor != undefined && valor != ""){
			var val = valor;
			for (var i = 0; i < valor.length; i++) {
				if(val.substr(0, 1) == 0){
					val=val.substr(1, val.length-1);
				}
			}
			return val;
		}else{
			return valor;
		}
	}
};