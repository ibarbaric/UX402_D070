/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/sap/training/ux402/messages/UX402_E06_WorkingWithMessages/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/sap/training/ux402/messages/UX402_E06_WorkingWithMessages/test/integration/pages/Main",
	"com/sap/training/ux402/messages/UX402_E06_WorkingWithMessages/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.sap.training.ux402.messages.UX402_E06_WorkingWithMessages.view.",
		autoWait: true
	});
});