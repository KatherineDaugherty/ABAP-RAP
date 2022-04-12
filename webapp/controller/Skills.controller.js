sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"


], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("com.esfsrap.empskifsrap.controller.Skills", {
        onInit: function () {
            var oViewModel = new JSONModel({
				editMode: false
			});
			this.getView().setModel(oViewModel, "skillView");
			this.oEditAction = this.byId("editAction");
        },
        onAddSkill: function () {
            console.log('onAddSkill-Skills');
            var oViewModel = this.getView().getModel("skillView");
			oViewModel.setProperty("/editMode", true);

            this.getView().getModel().submitBatch("SkillGroup");
            var skillList = this.byId("idSkillTable"),
                skillBinding = skillList.getBinding("items"),
                oRouter = this.getOwnerComponent().getRouter(),
                oContext = skillBinding.create({
                    "Skill": " ",
                    "Type": "",
                    "Institution": ""
                });
                oContext.created().then(function (oEvent) {
                    oRouter.navTo("skill")
                })

            skillList.getItems().some(function (oItem) {
                if (oItem.getBindingContext() === oContext) {
                    oItem.focus();
                    oItem.setSelected(true);
                    return true;
                }
            });
            
        }, 
        onEditSkill : function () {
            var oViewModel = this.getView().getModel("skillView");
			oViewModel.setProperty("/editMode", true);        
        },
        onSave : function () {
            console.log('save clicked', this.getView().getModel());
			this.getView().getModel().submitBatch();
		},
        onDeleteSkill : function (oEvent) {
            console.log ('clicked Delete');
			var oSelected = this.byId("idSkillTable").getSelectedItem();

			if (oSelected) {
				oSelected.getBindingContext().delete("$auto").then(function () {
					MessageToast.show(this._getText("deletionSuccessMessage"));
				}.bind(this), function (oError) {
					MessageBox.error(oError.message);
				});
			}
        },
//  Footer 
        onResetChanges : function (oEvent){
            console.log('reset');
            var oViewModel = this.getView().getModel("skillView");
			oViewModel.setProperty("/editMode", false),
				this.getView().getModel().resetChanges('SkillGroup');
        },
        onSaveSkill : function (oEvent){
            console.log('onSaveSkill');
        this.getView().getModel().submitBatch("SkillGroup");
        var oViewModel = this.getView().getModel("skillView");
        oViewModel.setProperty("/editMode", false)
        }
    });
});