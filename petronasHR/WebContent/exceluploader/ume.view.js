sap.ui.jsview("exceluploader.ume", {

      getControllerName : function() {
         return "exceluploader.ume";
      },

      createContent : function(oController) {
    	  var v4 = new sap.ui.commons.layout.VerticalLayout({id:"v4",width:"80%"}).addStyleClass("midDisplayClass");

    	  var oPanel = new sap.ui.commons.Panel("oPanel", {
    		  showCollapseIcon : false,
    		  width:"100%"
    		  });
    	  oPanel.addStyleClass("commonPanel");
//    	  oPanel.addStyleClass("panelStyle");
    	  var title1 = new sap.ui.core.Title({text: "SAP HR Migration Deshboard"});
    	  oPanel.setTitle(title1);
    	  
    	  var oMatrix = new sap.ui.commons.layout.MatrixLayout("oMatrix",{
    		  width:"100%",
    		  widths:["2%","28%","45%","25%"]
    	  });
    	  
    	  var oLabel = new sap.ui.commons.Label({text:"Select File of Employee Data Migration : "});
    	  
    	  var ofileUploader = new sap.ui.commons.FileUploader("ofileUploader",{
    		  uploadOnChange: false,
    		  name: "simpleUploader",
    		  change: function(e)
    		  {
    			  oController.grabFile(e);
    		  }
    	  });
    	  ofileUploader.addStyleClass("buttonStyle");
    	  
    	  oMatrix.createRow("");
    	  oMatrix.createRow("",oLabel,ofileUploader,"");
    	  oMatrix.createRow("");
//    	  oMatrix.createRow("");
    	  
    	  oPanel.addContent(oMatrix);
    	  
    	//Create an instance of the table control
    	  var oTable = new sap.ui.table.Table("oTable", {
//    	  	title: "Select File of Employee Data",
    		width:"100%",
    		visible: false,
    	  	visibleRowCount: 7,
    	  	selectionMode: sap.ui.table.SelectionMode.Single,
    	  	navigationMode: sap.ui.table.NavigationMode.Paginator,
    	  	fixedColumnCount: 4,
    	  	selectionBehavior:sap.ui.table.SelectionBehavior.RowOnly
    	  });
    	  oTable.addStyleClass("tablepadding").addStyleClass("dataTable");
    	  
    	  oPanel.addContent(oTable);
    	  var dummy=new sap.ui.commons.Label({width:"6px"});
    	  oPanel.addContent(dummy);
    	  var MigrationButton = new sap.ui.commons.Button("MigrationButtonId",{
    		  text:"Strat Data Migration",
    		  visible: false,
    		  press:function()
    		  {
    		  this.setEnabled(false);
    			  var oTableData = oTable.getModel().oData.modelData;
    			  if(oTableData!=null)
    			  {
    				  var i;
    				  for(i=0;i<oTableData.length;i++)
    				  {
    					  if(oTableData[i].checked)
    					  {
    						  var data={};
    						  data.LastName = oTableData[i].LastName;
    						  data.City = oTableData[i].City;
    						  data.Country = oTableData[i].Country;
    						  data.Title = oTableData[i].Title;
    						  data.NameFormat = oTableData[i].NameFormat;
    						  data.BirthName = oTableData[i].BirthName;
    						  data.FirstName = oTableData[i].FirstName;
    						  data.SecondName = oTableData[i].SecondName;
    						  data.MiddleName = oTableData[i].MiddleName;
    						  data.InitialName = oTableData[i].InitialName;
    						  
    						  data.secondTitle = oTableData[i].secondTitle;
    						  data.NickName = oTableData[i].NickName;
    						  data.Suffix = oTableData[i].Suffix;
    						  data.Name = oTableData[i].Name;
    						  data.SSN = oTableData[i].SSN;
//    						  data.BirthDate = oTableData[i].BirthDate;
    						  data.Language = oTableData[i].Language;
    						  data.Nationality = oTableData[i].Nationality;
    						  data.MarStatus = oTableData[i].MarStatus;
    						  data.Gender = oTableData[i].Gender;
//    						  data.Since = oTableData[i].Since;
//    						  data.NoOfChild = oTableData[i].NoOfChild;
    						  data.AddressType = oTableData[i].AddressType;
    						  data.CareOf = oTableData[i].CareOf;
    						  data.AddressLine1 = oTableData[i].AddressLine1;
    						  data.AddressLine2 = oTableData[i].AddressLine2;
    						  data.Country = oTableData[i].Country;
    						  data.State = oTableData[i].State;
    						  data.City = oTableData[i].City;
    						  data.ZipCode = oTableData[i].ZipCode;
    						  data.CountryKey = oTableData[i].CountryKey;
    						  data.TelephoneNo = oTableData[i].TelephoneNo;
    						  
    						  oController.startBpmService(data);
    						  
    					  }
    					  
    				  }
    			  }
    		  }});
//    	  MigrationButton.addStyleClass("buttonStyle");
    	  oPanel.addContent(MigrationButton);
    	  
//    	  oBaseLayout.addContent(oPanel);
    	  
    	  var oLayout = new sap.ui.layout.VerticalLayout("Layout1");
    	  oLayout.addStyleClass("buttonStyle");
    	  oLayout.addContent(MigrationButton);
    	  oPanel.addContent(oLayout);
    	  v4.addContent(oPanel);
    	 return v4;
      }

});
var aData;
