sap.ui.controller("exceluploader.ume", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
	
	startBpmService: function(tableData){
		
		var processUrl="/bpmodata/startprocess.svc/com.ge/pbox~dm~bpm/PBoxDataMigrationEE/";

		// /StartData?$expand=ProcessStartEvent,ProcessStartEvent/::StartHrDm&$format=json

		oDModel= new sap.ui.model.odata.ODataModel(processUrl,true,"Manoj","abcd1234");

		oDModel.setCountSupported( false);

		oDModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

		var startData = {};  

		    //startData.ProcessStartEvent = {};

		    var jsonModel = tableData;  

		    var data={};

		    data["StartHrDm"]=jsonModel;

		    startData["ProcessStartEvent"]=data;

		    oDModel.read("/StartData",null,{ "$expand" : "ProcessStartEvent,ProcessStartEvent/StartHrDm"}, false, function(oData,oResponse){

		//console.log(oData);

		//opList=oData;

		},function(){

		console.log("error");

		}

		);

		   

		    oDModel.create("/StartData",startData, null,  

		            function(oData,oResponse) {  

//		                alert("Your data has been successfully submitted and Process Instance Id : "+ oResponse.data.processInstanceId);  

		                //console.log(oResponse.data);
		                
		              var oTextView = new sap.ui.commons.TextView({text:"Task has been successfully Started and Process Instance Id : " + oResponse.data.processInstanceId});
  					  oTextView.setDesign(sap.ui.commons.TextViewDesign.Bold); 
  					  oTextView.addStyleClass("fontStyle");
  					  sap.ui.getCore().byId("Layout1").addContent(oTextView);

		            },  

		            function(oEvent) {  

		            	var oTextView = new sap.ui.commons.TextView({text:"Task has not been Started"});
	  					  oTextView.setDesign(sap.ui.commons.TextViewDesign.Bold); 
	  					  oTextView.addStyleClass("fontStyle");
	  					  sap.ui.getCore().byId("Layout1").addContent(oTextView);  

		            });  


		
	},
	
	
	addColBind: function()
	{
		  var tabelTemp = sap.ui.getCore().byId("oTable");
		  tabelTemp.removeAllColumns();
	      var val = dataArray.Sheet1[0];
	      tabelTemp.addColumn(new sap.ui.table.Column({
	      		label: new sap.ui.commons.TriStateCheckBox("TriStateCheckBoxId",{tooltip: "Select All",
	      			change: function(oParent){
	      			var allChildren = tabelTemp.getModel().oData.modelData;
	      			if (this.getSelectionState() === "Checked"){
		     			for (var i = 0; i < allChildren.length; i++) {
		  	     			allChildren[i].checked=true;
		     			}
		     		}
		     		else {
		     			for (var i = 0; i < allChildren.length; i++) {
		     				allChildren[i].checked=false;
		   				}
		   			}
	      			tabelTemp.setModel(oModel);
	      			tabelTemp.bindRows("/modelData");
	      			tabelTemp.rerender();
	      		}
	      		}),
	      		template: new sap.ui.commons.CheckBox({
	      			change: function(){
	      				var i;
	      				var oParent = sap.ui.getCore().byId("TriStateCheckBoxId");
	      				var allChildren = tabelTemp.getModel().oData.modelData;
	      				var nSelectedChildren = 0;
	      				for (i = 0; i < allChildren.length; i++) {
	      					if(allChildren[i].checked)
	      						nSelectedChildren++;
	      	   			}
	      				if(nSelectedChildren == 0){
  		   					oParent.toggle("Unchecked");
  		   				}
  		   				else if(nSelectedChildren == allChildren.length){
  		   					oParent.toggle("Checked");
  		   				}
  		   				else{
  		   					oParent.toggle("Mixed");
  		   				}
	      				tabelTemp.setModel(oModel);
		      			tabelTemp.bindRows("/modelData");
		      			tabelTemp.rerender();
	      			}
	      		}).bindProperty("checked", "checked"),
	      		width:"35px"
	      	}));
	      
	      for(j in val){
	    	  if(j=="__rowNum__")
	    		  break;
	          var sub_key = j;
	          tabelTemp.addColumn(new sap.ui.table.Column({
	        		label: new sap.ui.commons.Label({text: j}),
	        		template: new sap.ui.commons.TextField().bindProperty("value", j),
	        		width:"100px"
	        	}));
	          var sub_val = val.j;
	          console.log(sub_key);

	      }
	      
	      tabelTemp.setVisible(true);
	      sap.ui.getCore().byId("MigrationButtonId").setVisible(true);
	      
	      oModel = new sap.ui.model.json.JSONModel();
	      oModel.setData({modelData: dataArray.Sheet1});
	      tabelTemp.setModel(oModel);
	      tabelTemp.bindRows("/modelData");
		
	},
	
	xlsxworker: function (data, cb) {
	var worker = new Worker("js/xlsxworker.js");
	worker.onmessage = function(e) {
		switch(e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			case 'xlsx': cb(JSON.parse(e.data.d)); break;
		}
	};
	var arr = rABS ? data : btoa(fixdata(data));
	worker.postMessage({d:arr,b:rABS});
   	},


   	process_wb: function (wb) {
	var output = "";
	switch(sap.ui.controller("exceluploader.ume").get_radio_value("format")) {
		case "json":
		output = JSON.stringify(sap.ui.controller("exceluploader.ume").to_json(wb), 2, 2);
			break;
		case "form":
			//output = to_formulae(wb);
			break;
		default:
		//output = to_csv(wb);
	}
	//if(out.innerText === undefined) out.textContent = output;
	//else out.innerText = output;
   	},

   	get_radio_value:function( radioName ) {
	/*var radios = document.getElementsByName( radioName );
	for( var i = 0; i < radios.length; i++ ) {
		if( radios[i].checked ) {
			return radios[i].value;
		}
	}*/
	return "json";
   	},

   	to_json:function (workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	dataArray = result;
	sap.ui.controller("exceluploader.ume").addColBind();
	return result;
   	},
   	
   	
	grabFile: function(e)
	{
		var f = sap.ui.getCore().byId("ofileUploader").oFileUpload.files[0]; 
		var reader = new FileReader();
		reader.readAsBinaryString(f);
		var name = f.name;
		if(f)
			{
		reader.onload = function(e) {
			var data = e.target.result;
			if(typeof Worker !== 'undefined') {
				sap.ui.controller("exceluploader.ume").xlsxworker(data, sap.ui.controller("exceluploader.ume").process_wb);
				console.log("this is over ");
//				sap.ui.controller("exceluploader.ume").process_wb(wb);
			} else {
				var wb;
				if(rABS) {
					wb = XLSX.read(data, {type: 'binary'});
				} else {
				var arr = fixdata(data);
					wb = XLSX.read(btoa(arr), {type: 'base64'});
				}
				sap.ui.controller("exceluploader.ume").process_wb(wb);
			}
		};}
		reader.onload();
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
		
	}

});
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
var dataArray;
var oModel;
