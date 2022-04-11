sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core"

], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.esfsrap.empskifsrap.controller.Employees", {
        onInit: function () {
        },
        onAddEmployee: function () {
            var employeeList = this.byId("idEmployeeTable"),
                employeeBinding = employeeList.getBinding("items"),
                oRouter = this.getOwnerComponent().getRouter(),
                oContext = employeeBinding.create({
                    "Fullname": " ",
                    "Department": "",
                    "Title": "",
                    "Role": "",
                    "Industry": "",
                    "DirectReport": "",
                    "StartDate": "2020-03-25",
                    "Email": ""
                });
                oContext.created().then(function (oEvent) {
                    oRouter.navTo("detail", {
                        employeePath: oContext.getPath().substring("/Employees(".length, oContext.getPath().length-1)
                    })
                })
            console.log('employeeBinding', employeeBinding);
            console.log('oContext', oContext);

            employeeList.getItems().some(function (oItem) {
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
        },
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            console.log('Click');
            oRouter.navTo("detail", {
                employeePath: window.encodeURIComponent((oItem.getBindingContext().getProperty("Id")))
            });
        },
        onAddSkill: function (oEvent) {
            console.log('clicked add skill');
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("skill");
        }
    });
});