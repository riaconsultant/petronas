sap.ui.jsview("petronas.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf petronas.index
	*/ 
	getControllerName : function() {
		return "petronas.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf petronas.index
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
		
		/*** Start general details ***/
		var oPanel = new sap.ui.commons.Panel({
			id : "oVendorDPanel", 
			width : "100%",
			showCollapseIcon : false, 
			tooltip : "Employee Detail"
		}).addStyleClass("commonPanel").addStyleClass("panel-default");
		
		oPanel.setTitle(new sap.ui.core.Title({text: "Name"}));
		
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			width : '100%',
			columns : 4,
			widths : ['150px', '200px', '150px', '200px']
		}).addStyleClass("margin5");
		
		var title=new sap.ui.commons.DropdownBox({id:"title",width:"30%"}).bindProperty("value","/Title").setModel(this.oController.oTitleModel)
			
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "title");
		title.bindItems("/", oItemTemplate1);
		
		oMatrix.createRow(new sap.ui.commons.Label());
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Title:"}),
				title,
				new sap.ui.commons.Label({text:"Name Format:"}), 
				new sap.ui.commons.TextField({id:"nameFormat",width:"80%"}).bindProperty("value", {path:"/in"}).setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Last Name:"}), 
				new sap.ui.commons.TextField({id:"lastName",width:"80%"}).bindProperty("value","/LastName").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Birth Name:"}), 
				new sap.ui.commons.TextField({id:"birthName",width:"80%"}).bindProperty("value","/BirthName").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"First Name:"}),
				new sap.ui.commons.TextField({id:"firstName",width:"80%"}).bindProperty("value","/FirstName").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Second Name:"}),
				new sap.ui.commons.TextField({id:"sName",width:"80%"}).bindProperty("value","/SecondName").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Middle Name:"}),
				new sap.ui.commons.TextField({id:"mName",width:"80%",maxLength:10}).bindProperty("value","/MiddleName").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Initials:"}),
				new sap.ui.commons.TextField({id:"initials",width:"80%",maxLength:20}).bindProperty("value","/InitialName").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Second Title:"}), 
				new sap.ui.commons.TextField({id:"sTitle",width:"80%"}).bindProperty("value","/secondTitle").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Nick Name:"}), 
				new sap.ui.commons.TextField({id:"nName",width:"80%"}).bindProperty("value","/NickName").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Suffix:"}), 
				new sap.ui.commons.TextField({id:"suffix",width:"80%"}).bindProperty("value","/Suffix").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Name:"}), 
				new sap.ui.commons.TextField({id:"name",width:"80%"}).bindProperty("value","/Name").setModel(this.oController.oDataModel));
		oMatrix.createRow(new sap.ui.commons.Label());
		
		oPanel.addContent(oMatrix);
		/*** End general details ***/
		v4.addContent(oPanel);
		
		/*** Start HR Data details ***/
		var bPanel = new sap.ui.commons.Panel({
			id : "oVendorBPanel", 
			width : "100%",
			showCollapseIcon : false, 
			//text : "Bank Detail:",
			tooltip : "HR Data Details"
		}).addStyleClass("commonPanel").addStyleClass("panel-default");
		bPanel.setTitle(new sap.ui.core.Title({text: "HR Data"}));
		  	  
	  	var oMatrix = new sap.ui.commons.layout.MatrixLayout({
	  		layoutFixed : false,
			width : '100%',
			columns : 4,
			widths : ['150px', '200px', '150px', '200px']
		});
	  		
	  	var SSN = new sap.ui.commons.TextField({id:"ssn",width:"80%"}).bindProperty("value","/SSN").setModel(this.oController.oDataModel);
	  	
	  	var birthDate = new sap.ui.commons.DatePicker({id:"birthDate",width:"80%"}).bindProperty("value","/BirthDate").setModel(this.oController.oDataModel);
		
	  	var nationality = new sap.ui.commons.TextField({id:"nationality",width:"80%"}).bindProperty("value","/Nationality").setModel(this.oController.oDataModel);
	  	
	  	var gender = new sap.ui.commons.DropdownBox({id:"gender",width:"40%"}).bindProperty("value","/Gender").setModel(this.oController.oGenderModel);
		
		var oItemTemplate2 = new sap.ui.core.ListItem();
		oItemTemplate2.bindProperty("text", "val");
		gender.bindItems("/", oItemTemplate2);
		
	  	var sinceDate = new sap.ui.commons.DatePicker({id:"sinceDate",width:"80%"}).bindProperty("yyyymmdd","/Since").setModel(this.oController.oDataModel); 
	  	
	  	var noChild = new sap.ui.commons.TextField({id:"noChild",width:"80%"}).bindProperty("value","/NoOfChild").setModel(this.oController.oDataModel);
	  	
	  	oMatrix.createRow(new sap.ui.commons.Label());
	  	oMatrix.createRow(
	  			new sap.ui.commons.Label({text:"SSN:"}),SSN,
	  			new sap.ui.commons.Label({text:"Gender:"}),gender);
	  	oMatrix.createRow(
	  			new sap.ui.commons.Label({text:"Birth date:"}),birthDate,
	  			new sap.ui.commons.Label({text:"Language:"}),
	  			new sap.ui.commons.TextField({id:"language",width:"80%"}).bindValue("/Language").setModel(this.oController.oDataModel));
	  	oMatrix.createRow(new sap.ui.commons.Label({text:"Nationality:"}),nationality,new sap.ui.commons.Label({text:"Mar. Status:"}),new sap.ui.commons.TextField({id:"mStatus",width:"80%",maxLength:60}).bindValue("/MarStatus").setModel(this.oController.oDataModel));
	  	
	  	oMatrix.createRow(new sap.ui.commons.Label({text:"Since Date:"}),sinceDate,new sap.ui.commons.Label({text:"No. of Child:"}),noChild);

	  	bPanel.addContent(oMatrix);
		
		/*** End HR Data details ***/
	  	v4.addContent(bPanel);
	  	
	  	/*** Start Vendor Contact details ***/
		var cPanel = new sap.ui.commons.Panel({
			id : "oVendorCPanel", 
			width : "100%",
			showCollapseIcon : false, 
			tooltip : "Address Detail"
		}).addStyleClass("commonPanel").addStyleClass("panel-default").addStyleClass("bottomMargin");
		cPanel.setTitle(new sap.ui.core.Title({text: "Address "}));
		
		
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			width : '100%',
			columns : 4,
			widths : ['150px', '200px', '150px', '200px']
		});
		
		var addressType=new sap.ui.commons.DropdownBox({id:"addressType"}).bindValue("/AddressType").setModel(this.oController.oAddressModel);
		var oItemTemplate3 = new sap.ui.core.ListItem();
		oItemTemplate3.bindProperty("text", "val");
		addressType.bindItems("/", oItemTemplate3);
		
		oMatrix.createRow(new sap.ui.commons.Label());
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Address Type:"}),addressType,
				new sap.ui.commons.Label({text:"C/O :"}),
				new sap.ui.commons.TextField({id:"coName",width:"80%"}).bindProperty("value","/CareOf").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Address Line 1:"}), 
				new sap.ui.commons.TextField({id:"addressLine1",width:"80%"}).bindProperty("value","/AddressLine1").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Address Line 2:"}), 
				new sap.ui.commons.TextField({id:"addressLine2",width:"80%"}).bindValue("/AddressLine2").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Country:"}), 
				new sap.ui.commons.TextField({id:"country",maxLength:25}).bindValue("/Country").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"State:"}), 
				new sap.ui.commons.TextField({id:"state",maxLength:40}).bindValue("/State").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"City:"}), 
				new sap.ui.commons.TextField({id:"city",maxLength:25}).bindValue("/City").setModel(this.oController.oDataModel),
				new sap.ui.commons.Label({text:"Zip code:"}), 
				new sap.ui.commons.TextField({id:"zip",maxLength:40}).bindValue("/ZipCode").setModel(this.oController.oDataModel));
		oMatrix.createRow(
				new sap.ui.commons.Label({text:"Country Key:"}), 
				new sap.ui.commons.TextField({id:"countryKey"}).bindValue("/CountryKey").setModel(this.oController.oDataModel),
                new sap.ui.commons.Label({text:"Telephone Number:"}),new sap.ui.commons.TextField({id:"teleNum"}).bindValue("/TelephoneNo").setModel(this.oController.oDataModel));
		
		cPanel.addContent(oMatrix);
		
		v4.addContent(cPanel);
		
		var oSubmit = new sap.ui.commons.Button({id:"submit",text:"Submit"}).addStyleClass("submitBtn");
		oSubmit.attachEvent("press",1,this.oController.submit,this);
		
		var oAction=new sap.ui.layout.HorizontalLayout({id:"actionLayoutId",content:[oSubmit]}).addStyleClass("bottomAction").addStyleClass("actionItem");
		v4.addContent(oAction);
		
		var oApprove = new sap.ui.commons.Button({text:"Approve"}).addStyleClass("submitBtn");
		oApprove.attachEvent("press",2,this.oController.submit,this);
		
		var oCancel = new sap.ui.commons.Button({text:"Reject",style: sap.ui.commons.ButtonStyle.Reject}).addStyleClass("btns");
		oCancel.attachEvent("press",3,this.oController.submit,this);
		
		var oAppAction=new sap.ui.layout.HorizontalLayout({id:"appActionLayoutId",content:[oApprove,oCancel]}).addStyleClass("bottomAction").addStyleClass("actionItem");
		v4.addContent(oAppAction);
		
		//oMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell({colSpan:4,content:[oAction]}));
		//oMatrix.createRow(new sap.ui.commons.layout.MatrixLayoutCell({colSpan:4,content:[oAppAction]}));
		
		

		/*** End Vendor general details ***/
		return v4;
	}

});
