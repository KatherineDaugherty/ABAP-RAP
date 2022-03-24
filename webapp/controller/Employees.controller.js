sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core"

], function (Controller, MessageToast, MessageBox, Fragment, Core) {
    "use strict";

    return Controller.extend("com.esfsrap.empskifsrap.controller.Employees", {
        onInit: function () {
        },
        onAddEmployee: function () {
            //   console.log('clicked Add Employee')
            var employeeList = this.byId("idEmployeeTable"),
                employeeBinding = employeeList.getBinding("items"),
                oContext = employeeBinding.create({
                    // "ID": "",
                    "Fullname": "",
                    "Department": "",
                    "Title": "",
                    "Role": "",
                    "Industry": "",
                    "DirectReport": "",
                    "StartDate": "1997-12-12",
                    "Email": ""
                });
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
            console.log('save clicked...but is it doing anything?', this.getView().getModel());
			this.getView().getModel().submitBatch();
		},
        onResetChanges : function () {
            console.log('reset Changes To be created still');
        },
        //NAVIGATION 
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            console.log('Click');
            oRouter.navTo("detail", {
                employeePath: window.encodeURIComponent((oItem.getBindingContext().getProperty("Id")))
            });
        }
    });
});