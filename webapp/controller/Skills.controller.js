sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core"

], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.esfsrap.empskifsrap.controller.Skills", {
        onInit: function () {
        },
        onAddSkill: function () {
            var skillList = this.byId("idSkillTable"),
                skillBinding = skillList.getBinding("items"),
                // oRouter = this.getOwnerComponent().getRouter(),
                oContext = skillBinding.create({
                    "Skill": " ",
                    "Type": "",
                    "Institution": ""
                });
                // oContext.created().then(function (oEvent) {
                //     oRouter.navTo("skill", {
                //         skillPath: oContext.getPath().substring("/Employees(".length, oContext.getPath().length-1)
                //     })
                // })

            skillList.getItems().some(function (oItem) {
                if (oItem.getBindingContext() === oContext) {
                    oItem.focus();
                    oItem.setSelected(true);
                    return true;
                }
            });
        },  
        onSave : function () {
            console.log('save clicked', this.getView().getModel());
			this.getView().getModel().submitBatch();
		},
        onDelete : function () {
            console.log ('clicked Delete');
			var oSelected = this.byId("idEmployeeTable").getSelectedItem();

			if (oSelected) {
				oSelected.getBindingContext().delete("$auto").then(function () {
					MessageToast.show(this._getText("deletionSuccessMessage"));
				}.bind(this), function (oError) {
					MessageBox.error(oError.message);
				});
			}
        }
        
    });
});