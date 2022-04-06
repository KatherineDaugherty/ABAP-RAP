sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/core/Fragment",
	"sap/ui/core/Core"

], function (Controller, JSONModel, History, Fragment, Core) {
	"use strict";
	return Controller.extend("com.esfsrap.empskifsrap.controller.Detail", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			var oViewModel = new JSONModel({
				editMode : false
			});
			this.getView().setModel(oViewModel, "detailView");
			this.oEditAction = this.byId("editAction");
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path : "/Employees(Id=" + window.decodeURIComponent(oEvent.getParameter("arguments").employeePath)+ ")",
				parameters : {
					"$$updateGroupId" : 'employeeGroup'
				}	
			});
			console.log('in object', window.decodeURIComponent(oEvent.getParameter("arguments").employeePath));
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMain", {}, true);
			}
		},
		onEditEmployee: function (oEvent) {
			var oViewModel = this.getView().getModel("detailView");
			oViewModel.setProperty("/editMode", true);	
		},
	
		onResetChanges: function () {
			var oViewModel = this.getView().getModel("detailView");
			console.log('pressed cancel');
			oViewModel.setProperty("/editMode", false),

			this.getView().getModel().resetChanges('employeeGroup');
			this.byId("information").setProperty("visible", true);
            this.byId("inputs").setProperty("visible", false);
			this.byId("saveButton").setProperty("visible", false);
			this.byId("resetButton").setProperty("visible", false);
			this.byId("editEmployeeButton").setProperty("visible", true);
		},
		onSaveEmployee: function () {
			this.getView().getModel().submitBatch("employeeGroup");
			console.log('pressed Save');
			var oViewModel = this.getView().getModel("detailView");
			oViewModel.setProperty("/editMode", false)
		}, 
		onAddSkill: function () {
			console.log('clicked add Skill');
			
		},
		onDeleteSkill: function () {
			console.log('delete clicked');
		}
	});
});