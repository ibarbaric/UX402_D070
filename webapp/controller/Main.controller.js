sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function (Controller, JSONModel, Sorter, Filter) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.messages.UX402_E06_WorkingWithMessages.controller.Main", {
		onInit: function () {
			this._oTable = this.getView().byId("idFlights");
			this._oFacetFilter = this.getView().byId("idFacetFilter");
		},

		_whenGetObjectSAP: function (iStrService, iaFilters) {
			return new Promise(
				function (funResolve, funReject) {
					var oModelSAPbckOData = this.getView().getModel(); //the model is 'Default'
					// call SAP OData service
					oModelSAPbckOData.read(iStrService, {
						filters: iaFilters,
						success: function (oData, response) {
							funResolve(oData);
						}.bind(this),
						error: function (oData, response) {
							funReject(oData);
						}.bind(this)
					});
				}.bind(this)
			);
		},

		onBeforeRendering: function () {
			var oDataFacetFilter = {
				Filters: [
					{
						title: "Carrier",
						key: "carrid",
						values: []
					}, {
						title: "Flight Date",
						key: "fldate",
						values: []
					}
				]
			};
			var oModFacetFilter = new sap.ui.model.json.JSONModel(oDataFacetFilter);
			this.getView().setModel(oModFacetFilter, "oModFacetFilter");
			this._whenGetObjectSAP("/CarrierCollection", []).then(
				function (ioData) {
					var oMod = this.getView().getModel("oModFacetFilter");
					var oData = oMod.getData();
					ioData.results.map(function(jLine) {
						oData.Filters[0].values.push({
							"key": jLine.carrid,
							"text": jLine.CARRNAME,
							"count": 1
						});
					});
					oMod.refresh(true);
				}.bind(this)
			).catch(
				function (ioError) {
					/*var strMessageText = GenericUtilities.getConcatSAPgwErrors(ioError);
					this.MessageBox(strMessageText);*/
				}.bind(this)
			);

			this._whenGetObjectSAP("/FlightCollection", []).then(
				function (ioData) {
					var oMod = this.getView().getModel("oModFacetFilter");
					var oData = oMod.getData();
					ioData.results.map(function(jLine) {
						oData.Filters[1].values.push({
							"key": jLine.fldate,
							"text": jLine.fldate,
							"count": 1
						});
					});
					oMod.refresh(true);
				}.bind(this)
			).catch(
				function (ioError) {
					/*var strMessageText = GenericUtilities.getConcatSAPgwErrors(ioError);
					this.MessageBox(strMessageText);*/
				}.bind(this)
			);
		},

		handleFacetFilterReset: function (oEvent) {
			var aFacetFilterLists = this._oFacetFilter.getLists();
			for (var i in aFacetFilterLists) {
				aFacetFilterLists[i].setSelectedKeys();
				this._oTable.getBinding("items").filter([]);
			}
		},

		handleListClose: function (oEvent) {
			// filter only active lists (eg Carriers, Flight Dates...)
			var aFacetFilterLists =
				this._oFacetFilter.getLists().filter(
					function (oList) {
						return oList.getActive() &&
							oList.getSelectedItems().length;
					}
				);
			// create new Filter
			var oFilter = new Filter(
				aFacetFilterLists.map(  // iterate filter lists (eg Carriers, Flight Dates...)
					function(oList) {
						return new Filter(
							oList.getSelectedItems().map( //iterate selected filter lines (eg carrid AA, AH...)
								function(oItem) {
									return new Filter(oList.getKey(), "EQ", oItem.getKey());
								}
							), false
						);
					}
				), true
			);
			// apply filter
			this._oTable.getBinding("items").filter(oFilter);
		},
		
		onSortSeatsOcc: function (oEvent) {
			var oSorter = new Sorter("carrid", true, true); 
			this._oTable.getBinding("items").sort(oSorter);
			/*oSorter = new Sorter("SEATSOCC", true, true); 
			this._oTable.getBinding("items").sort(oSorter);*/
			this._oFacetFilter = this.getView().byId("idFacetFilter");
			this._bIdSort = !this._bIdSort;

		}
	});
});