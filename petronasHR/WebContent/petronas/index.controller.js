sap.ui.controller("petronas.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf petronas.index
*/
	taskUI:false,
	oDataModel:new sap.ui.model.json.JSONModel({}),
	oTitleModel:new sap.ui.model.json.JSONModel([{"title":"Mr"},{"title":"Mrs"}]),
	oGenderModel:new sap.ui.model.json.JSONModel([{"val":"Male"},{"val":"Female"},{"val":"TBD"}]),
	oAddressModel:new sap.ui.model.json.JSONModel([{"val":"Permanent Residence"},{"val":"Temporary Residence"},{"val":"Paycheck Location"},{"val":"Mailing Address"},{"val":"Nursing Address"},{"val":"Home Address"},{"val":"Emergency Address"}]),
	oDModel:null,
	onInit: function() {
		//this.oDataModel=new sap.ui.model.json.JSONModel({});
	},
	submit:function(evt,action){
		// submit = 1,Approve == 2,Reject == 3.
		if(action === 1){
			// Start BPM Process
			console.log(sap.ui.controller("petronas.index").oDataModel.getData());
			var processUrl="/bpmodata/startprocess.svc/com.ge/pbox~dm~bpm/PBoxDataMigrationEE";
			// /StartData?$expand=ProcessStartEvent,ProcessStartEvent/::StartHrDm&$format=json
			oDModel= new sap.ui.model.odata.ODataModel(processUrl,true,"Manoj","abcd1234");
			var startData = {};  
		    startData.ProcessStartEvent = {};  
		    var jsonModel = this.oDataModel();  
		    var data="::StartHrDm";
		    startData.ProcessStartEvent.data = jsonModel;  
		    this.processStartODataModel.create("/StartData", startData, null,  
		            function(oData,oResponse) {  
		                alert("Your data has been successfully submitted.");  
		                console.log(oResponse.getData());
		            },  
		            function(oEvent) {  
		                alert("An error occurred while submitting the data.");  
		            });  
			
		}else if(action === 2){
			// Approve BPM Process
			
		}else if(action === 3){
			// Reject BPM Process
			
		}else{
			console.log("No Action")
		}
	},
	getValFromQueryString:function(key){
		   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
		   var r=[], m;
		   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
		   return r;
	},
	setEditable:function(){
		sap.ui.getCore().byId("empId").setEditable(false);
		sap.ui.getCore().byId("empName").setEditable(false);
		sap.ui.getCore().byId("empJoinDate").setEditable(false);
		sap.ui.getCore().byId("empSalary").setEditable(false);
		sap.ui.getCore().byId("address").setEditable(false);
		sap.ui.getCore().byId("passport").setEditable(false);
		sap.ui.getCore().byId("panNo").setEditable(false);
		sap.ui.getCore().byId("mobile").setEditable(false);
		sap.ui.getCore().byId("empRole").setEditable(false);
		sap.ui.getCore().byId("salaryBand").setEditable(false);

	},
	callDataService:function(){
		
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf petronashr.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf petronashr.index
*/
	onAfterRendering: function() {
		var taskId=this.getValFromQueryString('taskId');
		if(taskId[0]){
			this.taskUI=true;
			this.setEditable();
			sap.ui.getCore().byId("actionLayoutId").setVisible(false);
		}else{
			sap.ui.getCore().byId("appActionLayoutId").setVisible(false);
		}
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf petronas.index
*/
//	onExit: function() {
//
//	}

});