sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function (Controller, JSONModel, Sorter, Filter) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.messages.UX402_E06_WorkingWithMessages.controller.Main", {
		onInit: function () {},
		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onItemPress: function (oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var oCtx = oItem.getBindingContext();
			var sCarrid = oCtx.getProperty("carrid");
			this._getRouter().navTo("RouteFlights", {
					carrid: sCarrid
				},
				false);

		}
	});
});