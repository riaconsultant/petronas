sap.ui.jsview("petronashr.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf petronashr.index
	*/ 
	getControllerName : function() {
		return "petronashr.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf petronashr.index
	*/ 
	createContent : function(oController) {
		var v4 = new sap.ui.commons.layout.VerticalLayout({id:"v4",width:"80%"}).addStyleClass("midDisplayClass");
		
		//CommonValidation
		var oHorizonalLayout2 = new sap.ui.layout.HorizontalLayout({
			id:"vendorActionId2",
			content:[new sap.ui.commons.Label("msgId2",
					{text:""})]
		}).addStyleClass("msgContainer2");
		
		v4.addContent(oHorizonalLayout2);
		
		/*** Start Vendor general details ***/
		var oPanel = new sap.ui.commons.Panel({
			id : "oVendorDPanel", 
			width : "100%",
			showCollapseIcon : false, 
			tooltip : "Employee Detail"
		}).addStyleClass("commonPanel").addStyleClass("panel-default");
		
		oPanel.setTitle(new sap.ui.core.Title({text: "Employee Detail"}));
		
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			width : '100%',
			columns : 4,
			widths : ['150px', '200px', '150px', '200px']
		}).addStyleClass("margin5");
		
		oMatrix.createRow(new sap.ui.commons.Label());
		oMatrix.createRow(
				new sap.ui.commons.Label('vendorNameLabel', {text:"Employee Id:"}),
				new sap.ui.commons.TextField({id:"empId",width:"80%",maxLength:40}).bindProperty("value","/empId").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label('vendorNoLabel', {text:"Employee Name:"}), 
				new sap.ui.commons.TextField({id:"empName",width:"80%"}).bindProperty("value", {path:"/empName"}).setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label('careOfNameLabel', {text:"Employee Joining Date:"}), 
				new sap.ui.commons.DatePicker({id:"empJoinDate",width:"80%"}).bindProperty("yyyymmdd","/empJoinDate").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label('searchTerm1Label', {text:"Actual Salary:"}), 
				new sap.ui.commons.TextField({id:"empSalary",width:"80%"}).bindProperty("value","/empSalary").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Address:"}),
				new sap.ui.commons.TextField({id:"address",width:"80%"}).bindProperty("value","/address").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label('passportLabel', {text:"Passport Number:"}),
				new sap.ui.commons.TextField({id:"passport",width:"80%"}).bindProperty("value","/passport").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Pan No:"}),
				new sap.ui.commons.TextField({id:"panNo",width:"80%",maxLength:10}).bindProperty("value","/panNo").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label('mobileLabel', {text:"Mobile Number:"}),
				new sap.ui.commons.TextField({id:"mobile",width:"80%",maxLength:20}).bindProperty("value","/mobile").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label('vatRegNoLabel', {text:"Employee Role:"}), 
				new sap.ui.commons.TextField({id:"empRole",width:"80%"}).bindProperty("value","/empRole").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label('companyRegNoLabel', {text:"Salary band:"}), 
				new sap.ui.commons.TextField({id:"salaryBand",width:"80%"}).bindProperty("value","/salaryBand").setModel(this.oController.oDataModel));
		
		var oSubmit = new sap.ui.commons.Button({id:"submit",text:"Submit"}).addStyleClass("submitBtn");
		oSubmit.attachEvent("press",1,this.oController.submit,this);
		
		var oAction=new sap.ui.layout.HorizontalLayout({id:"actionLayoutId",content:[oSubmit]}).addStyleClass("bottomAction");
		v4.addContent(oAction);
		
		var oApprove = new sap.ui.commons.Button({text:"Approve"}).addStyleClass("submitBtn");
		oApprove.attachEvent("press",2,this.oController.submit,this);
		
		var oCancel = new sap.ui.commons.Button({text:"Reject",style: sap.ui.commons.ButtonStyle.Reject}).addStyleClass("btns");
		oCancel.attachEvent("press",3,this.oController.submit,this);
		
		var oAppAction=new sap.ui.layout.HorizontalLayout({id:"appActionLayoutId",content:[oApprove,oCancel]}).addStyleClass("bottomAction");
		v4.addContent(oAppAction);
		
		oMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell({colSpan:4,content:[oAction]}));
		oMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell({colSpan:4,content:[oAppAction]}));
		
		oPanel.addContent(oMatrix);
		
		v4.addContent(oPanel);

		/*** End Vendor general details ***/
		return v4;
	}

});
