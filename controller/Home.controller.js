jQuery.sap.require("sap.ui.veh_busquedaserie.util.Formatter");
jQuery.sap.require("sap/ui/model/json/JSONModel");
jQuery.sap.require("sap/m/MessageToast");
jQuery.sap.require("sap/m/Table");
// jQuery.sap.require("sap/m/semantic");

sap.ui.define([
	"sap/ui/veh_busquedaserie/controller/BaseController",
	"sap/ui/veh_busquedaserie/util/Formatter",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(BaseController, formatter, MessageBox, JSONModel) {
	"use strict";
	var urlGlobal = "/DEV_TO_ODVIATICOS/odata/SAP/ZSCP_VEHICULOS_SRV";
	var oModel;
	// var urlGlobal = "http://tdperpdev.toyotaperu.com.pe:8001/sap/bc/zvehiculo/zdp_vehiculoloc";
	return BaseController.extend("sap.ui.veh_busquedaserie.controller.Home", {
		formatter: formatter,
		onInit: function() {
			oModel = new sap.ui.model.odata.v2.ODataModel(urlGlobal, true);
		},
		onNavBack: function() {
			window.history.back();
		},
		Buscar: function() {
			var thes = this;
			var numSerie = thes.getView().byId("numSerie").getValue();
			var newSerie = thes.onCompleteFormat(numSerie, 10);
			var resultado = newSerie.toUpperCase();

			var jsonParametros = {
				"SERIE": resultado
			};
			jsonParametros = JSON.stringify(jsonParametros);

			var filters1 = [];
			var filter;

			filter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, "06");
			filters1.push(filter);
			filter = new sap.ui.model.Filter("Parametros", sap.ui.model.FilterOperator.EQ, jsonParametros);
			filters1.push(filter);
			sap.ui.core.BusyIndicator.show(0);
			oModel.read("/PRC_VEHICULOSSet", {
				method: "GET",
				filters: filters1,
				urlParameters: {
					"search": "GET"
				},
				success: function(result, status, xhr) {
					//              {+@WVF001 Correcion de de visualizacion y mensajes de error
					var data = JSON.parse(result.results[0].Json);
					var li_logitud = data.listserie.length;
					var visualdata = data.visualdata;
					var mensajes = data.return;
					if (mensajes.length == 0) {
						var listserie = data.listserie[0];
						if (li_logitud == 0) {
							sap.m.MessageBox.error("No existe el número de serie");
							thes.getView().byId("numSerie").setValue("");
							thes.getView().byId("Formulariocon3columns").setVisible(false);
							thes.getView().byId("Formulario4").setVisible(false);
							thes.getView().byId("Table1").setVisible(false);
							thes.getView().byId("Table2").setVisible(false);
							thes.getView().byId("Table3").setVisible(false);
							thes.getView().byId("Table4").setVisible(false);
							thes.getView().byId("Table5").setVisible(false);
							thes.getView().byId("Panel1").setVisible(false);
							thes.getView().byId("Panel2").setVisible(false);
							thes.getView().byId("Panel3").setVisible(false);
							thes.getView().byId("Panel4").setVisible(false);
							thes.getView().byId("Panel5").setVisible(false);
							thes.getView().byId("Panel6").setVisible(false);
							thes.getView().byId("Panel7").setVisible(false);
						} else {
							//                    var data = JSON.parse(result.results[0].Json);
							var oModel = new JSONModel(listserie);
							thes.getView().setModel(oModel, "data");
							thes.getView().byId("Formulariocon3columns").setVisible(true);
							thes.getView().byId("Formulario4").setVisible(true);
							thes.getView().byId("Table1").setVisible(true);
							thes.getView().byId("Table2").setVisible(true);
							thes.getView().byId("Table3").setVisible(true);
							thes.getView().byId("Table4").setVisible(true);
							thes.getView().byId("Table5").setVisible(true);
							thes.getView().byId("Panel1").setVisible(true);
							thes.getView().byId("Panel2").setVisible(true);
							thes.getView().byId("Panel3").setVisible(true);
							thes.getView().byId("Panel4").setVisible(true);
							thes.getView().byId("Panel5").setVisible(true);
							thes.getView().byId("Panel6").setVisible(true);
							thes.getView().byId("Panel7").setVisible(true);

							if (visualdata.ver_fob == "X") {
								thes.getView().byId("idlblFob").setVisible(true);
								thes.getView().byId("idtxtFob").setVisible(true);
								thes.getView().byId("idlblFlete").setVisible(true);
								thes.getView().byId("idtxtFlete").setVisible(true);
							} else if (visualdata.ver_fob == "") {
								thes.getView().byId("idlblFob").setVisible(false);
								thes.getView().byId("idtxtFob").setVisible(false);
								thes.getView().byId("idlblFlete").setVisible(false);
								thes.getView().byId("idtxtFlete").setVisible(false);
							}

							if (visualdata.visual == "01") {
								thes.getView().byId("idlblChasis").setVisible(false);
								thes.getView().byId("idtxtChasis").setVisible(false);
								thes.getView().byId("idlblMotor").setVisible(false);
								thes.getView().byId("idtxtMotor").setVisible(false);
							} else if (visualdata.visual == "02") {
								thes.getView().byId("idlblChasis").setVisible(true);
								thes.getView().byId("idtxtChasis").setVisible(true);
								thes.getView().byId("idlblMotor").setVisible(true);
								thes.getView().byId("idtxtMotor").setVisible(true);
							}

						}

					} else {
                            thes.getView().byId("numSerie").setValue("");
							thes.getView().byId("Formulariocon3columns").setVisible(false);
							thes.getView().byId("Formulario4").setVisible(false);
							thes.getView().byId("Table1").setVisible(false);
							thes.getView().byId("Table2").setVisible(false);
							thes.getView().byId("Table3").setVisible(false);
							thes.getView().byId("Table4").setVisible(false);
							thes.getView().byId("Table5").setVisible(false);
							thes.getView().byId("Panel1").setVisible(false);
							thes.getView().byId("Panel2").setVisible(false);
							thes.getView().byId("Panel3").setVisible(false);
							thes.getView().byId("Panel4").setVisible(false);
							thes.getView().byId("Panel5").setVisible(false);
							thes.getView().byId("Panel6").setVisible(false);
							thes.getView().byId("Panel7").setVisible(false);
						sap.m.MessageBox.error(mensajes[0].message);
					}
					//              }+@WVF001 Correcion de de visualizacion y mensajes de error  

					// {-@WVF001 CORRECION DEL MODELO PROVENIENTE DE R3, VISUALIZACION Y MENSAJES                    
					//	                if(result.results[0].Json == "[]"){
					//						sap.m.MessageBox.error("No existe el número de serie");
					//						thes.getView().byId("numSerie").setValue("");
					//						thes.getView().byId("Formulariocon3columns").setVisible(false);
					//						thes.getView().byId("Formulario4").setVisible(false);
					//						thes.getView().byId("Table1").setVisible(false);
					//						thes.getView().byId("Table2").setVisible(false);
					//						thes.getView().byId("Table3").setVisible(false);
					//						thes.getView().byId("Table4").setVisible(false);
					//						thes.getView().byId("Table5").setVisible(false);
					//						thes.getView().byId("Panel1").setVisible(false);
					//						thes.getView().byId("Panel2").setVisible(false);
					//						thes.getView().byId("Panel3").setVisible(false);
					//						thes.getView().byId("Panel4").setVisible(false);
					//						thes.getView().byId("Panel5").setVisible(false);
					//						thes.getView().byId("Panel6").setVisible(false);
					//						thes.getView().byId("Panel7").setVisible(false);
					//					}else{
					//					var data = JSON.parse(result.results[0].Json);
					//					var oModel = new JSONModel(data[0]);
					//						thes.getView().setModel(oModel, "data");
					//						thes.getView().byId("Formulariocon3columns").setVisible(true);
					//						thes.getView().byId("Formulario4").setVisible(true);
					//						thes.getView().byId("Table1").setVisible(true);
					//						thes.getView().byId("Table2").setVisible(true);
					//						thes.getView().byId("Table3").setVisible(true);
					//						thes.getView().byId("Table4").setVisible(true);
					//						thes.getView().byId("Table5").setVisible(true);
					//						thes.getView().byId("Panel1").setVisible(true);
					//						thes.getView().byId("Panel2").setVisible(true);
					//						thes.getView().byId("Panel3").setVisible(true);
					//						thes.getView().byId("Panel4").setVisible(true);
					//						thes.getView().byId("Panel5").setVisible(true);
					//						thes.getView().byId("Panel6").setVisible(true);
					//						thes.getView().byId("Panel7").setVisible(true);
					//					}

					// }-@WVF001 
					sap.ui.core.BusyIndicator.hide();

				},
				error: function(xhr, status, error) {
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		onCompleteFormat: function(txt, cant) {
			var rtn = "";
			var cycles = cant - txt.length;
			for (var i = 0; i < cycles; i++) {
				rtn += "0";
			}
			return rtn + txt;
		}
	});
});