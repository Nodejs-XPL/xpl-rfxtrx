var rfxcom = require('rfxcom');
var Xpl=require("xpl-api");

var xpl=new Xpl({
    xplSource: "bnz-rfxtrx.wiseflat",
    xplLog: false
});

var rfxtrx = new rfxcom.RfxCom("/dev/ttyUSB0", {debug: false});
//var lightwaverf = new rfxcom.Lighting5(rfxtrx, rfxcom.lighting5.LIGHTWAVERF);

/*xpl.on("message", function(message) {
    console.log("Receive message ", message);
});*/

/*xpl.on("close", function() {
    console.log("Receive close event");
});*/

xpl.bind(function(error) {
    if (error) {
        console.error(error);
        return;
    };

    rfxtrx.initialise(function () {
        console.log("Device initialised");
    });

    rfxtrx.on("ready", function (evt) {
        console.log("Device is ready");
    });
    
    rfxtrx.on("response", function (evt) {
        console.log("Response %s %s detected.", evt.subtype, evt.id);
    });

    rfxtrx.on("status", function (evt) {
        console.log("status %s %s detected.", evt.subtype, evt.id);
    });

    rfxtrx.on("elec2", function (evt) {
        //console.log("elec2 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            count: evt.count,
            currentWatts: evt.currentWatts,
            totalWatts: evt.totalWatts
        });
    });

    rfxtrx.on("elec3", function (evt) {
        //console.log("elec3 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            count: evt.count,
            currentWatts: evt.currentWatts,
            totalWatts: evt.totalWatts
        });
    });

    rfxtrx.on("lighting1", function (evt) {
        //console.log("--> lighting1 status subtype=%s id=%s seqnbr=%s housecode=%s unitcode=%s command=%s rssi=%s detected.", evt.subtype, evt.id, evt.seqnbr, evt.housecode, evt.unitcode, evt.command, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            housecode: evt.housecode,
            unitcode: evt.unitcode,
            command: evt.command,
            rssi: evt.rssi
        });
    });

    rfxtrx.on("lighting2", function (evt) {
        //console.log("lighting2 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            unitcode: evt.unitcode,
            command: evt.command,
            level: evt.level,
            rssi: evt.rssi
        });
    });

    rfxtrx.on("lighting5", function (evt) {
        //console.log("lighting5 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            unitcode: evt.unitcode,
            command: evt.command
        });
    });

    rfxtrx.on("security1", function (evt) {
        //console.log("security1 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            deviceStatus: evt.deviceStatus,
            batteryLevel: evt.batteryLevel,
            rssi: evt.rssi,
            tampered: evt.tampered
        });	
    });

    rfxtrx.on("rfxmeter", function (evt) {
        //console.log("security1 status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            counter: evt.counter
        });
    });
    
    rfxtrx.on("weight", function (evt) {
        //console.log("weight status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            weight: evt.weight,
            batteryLevel: evt.batteryLevel,
            rssi: evt.rssi
        });
    });

    rfxtrx.on("rfxsensor", function (evt) {
        //console.log("weight status %s %s detected.", evt.subtype, evt.id);
        xpl.sendXplTrig({
            device: evt.id,
            weight: evt.weight,
            batteryLevel: evt.batteryLevel,
            rssi: evt.rssi
        });
    });
    
    rfxtrx.on("thb1", function (evt) {
        console.log("thb1 status %s %s detected.", evt.subtype, evt.id);
    });

    rfxtrx.on("thb2", function (evt) {
        console.log("thb2 status %s %s detected.", evt.subtype, evt.id);
    });

    rfxtrx.on('th1', function(evt){
        //console.log("--> th1 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });	
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th2', function(evt){
        //console.log("--> th2 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th3', function(evt){
        //console.log("--> th3 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th4', function(evt){
        //console.log("--> th4 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th5', function(evt){
        //console.log("--> th5 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th6', function(evt){
        //console.log("--> th6 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th7', function(evt){
        //console.log("--> th7 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th8', function(evt){
        //console.log("--> th8 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('th9', function(evt){
        //console.log("--> th9 status subtype=%s id=%s temp=%s hum=%s humstatus=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.humidity, evt.humidityStatus, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidity",
            current: evt.humidity
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "humidityStatus",
            current: evt.humidityStatus
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp1', function(evt){
        //console.log("--> temp1 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp2', function(evt){
        //console.log("--> temp2 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp3', function(evt){
        //console.log("--> temp3 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp4', function(evt){
        //console.log("--> temp4 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp5', function(evt){
      //console.log("--> temp5 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp6', function(evt){
      //console.log("--> temp6 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp7', function(evt){
      //console.log("--> temp7 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp8', function(evt){
      //console.log("--> temp8 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });

    rfxtrx.on('temp9', function(evt){
      //console.log("--> temp9 status subtype=%s id=%s temp=%s batt=%s rssi=%s detected.", evt.subtype, evt.id, evt.temperature, evt.batteryLevel, evt.rssi);
        xpl.sendXplTrig({
            device: evt.id,
            type: "temp",
            current: evt.temperature
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "battery",
            current: evt.batteryLevel,
            units:"%"
        });
        xpl.sendXplTrig({
            device: evt.id,
            type: "rssi",
            current: evt.rssi
        });
    });
});
