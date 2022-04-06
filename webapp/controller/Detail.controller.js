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

//Floating Footer Controls 
		onResetChanges: function () {
			var oViewModel = this.getView().getModel("detailView");
			oViewModel.setProperty("/editMode", false),
			this.getView().getModel().resetChanges('employeeGroup');
		},
		onSaveEmployee: function () {
			this.getView().getModel().submitBatch("employeeGroup");
			var oViewModel = this.getView().getModel("detailView");
			oViewModel.setProperty("/editMode", false)
		},
		
//Skills Controls 
		onAddSkill: function () {
			console.log('clicked add Skill');
			
		},
		onDeleteSkill: function () {
			console.log('delete clicked');
		}
	});
});