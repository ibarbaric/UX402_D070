sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function (Controller, JSONModel, Sorter, Filter) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.messages.UX402_E06_WorkingWithMessages.controller.Flights", {
		onInit: function () {
			// register Router.Matched handler method
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteFlights").attachMatched(this._onObjectMatched, this);
		},

		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		// handler of Router.Matched (when view gets navigated in)
		_onObjectMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			this._sCarrierId = oArgs.carrid;
			var oView = this.getView();
			oView.bindElement({
				path: "/CarrierCollection('" + this._sCarrierId + "')",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},

		// back navigation: usually goes to 'Base' controller
		onNavBack: function () {
			try {
				history.go(-1);
			} catch (error) {
				this._getRouter().navTo("RouteMaster", {}, true);
			}
		}
	});
});