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

			this.getView().getModel().submitBatch("skillGroup");
			oViewModel.setProperty("/editMode", false)
		},
		
//Skills Controls 
		onOpenSkillDialog : function () {
			console.log('dialog clicked');
			if (!this.addSkillDialog) {
				this.addSkillDialog = this.getView().byId("addSkillDialog")
		}
		this.addSkillDialog.open();
		},

		onAddSkill: function (oEvent) {
			var selectedSkill = oEvent.getSource().getParent().getContent()[0].getContent()[0].getContent()[1].getSelectedItem().getKey();

			var List = this.byId("skillTable"),
				Binding = List.getBinding("items"),
				Context = Binding.create({

                        "SkillId": selectedSkill
				});

					List.getItems().some(function (Item) {
				if (Item.getBindingContext() === Context) {
					Item.focus();
					Item.setSelected(true);
					return true;
				}
			});	
			this.getView().getModel().submitBatch("skillGroup");

				this.addSkillDialog.close();
				
		},
		onSelectChange : function (oEvent) {
            var selectedSkill = oEvent.getParameter("selectedItem").getKey();
            var selectedSkillData = oEvent.getParameter("selectedItem").getCustomData();
            console.log(selectedSkill, selectedSkillData);
			// var List = this.byId("skillTable"),
			// 	Binding = List.getBinding("items"),
			// 	Context = Binding.create({

            //             "SkillId": selectedSkill
			// 	});

			// 		List.getItems().some(function (Item) {
			// 	if (Item.getBindingContext() === Context) {
			// 		Item.focus();
			// 		Item.setSelected(true);
			// 		return true;
			// 	}
			// });	
        },

		onCancel: function () {
			console.log('cancel clicked');
			this.addSkillDialog.close();
		}
	});
});