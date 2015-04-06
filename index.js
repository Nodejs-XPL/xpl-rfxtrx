var XplRfxTrx = require("./lib/xpl-rfxtrx");
var rfxcom = require('rfxcom');

var schema_Ac = require('/etc/wiseflat/schemas/ac.basic.json');
var schema_Homeeasy = require('/etc/wiseflat/schemas/homeeasy.basic.json');
var schema_x10basic = require('/etc/wiseflat/schemas/x10.basic.json');
var schema_x10security = require('/etc/wiseflat/schemas/x10.security.json');
var schema_Sensorbasic = require('/etc/wiseflat/schemas/sensor.basic.json');

var wt = new XplRfxTrx("/dev/ttyUSB0", {
	rfxtrxDebug: false,
        xplLog: false,
        forceBodySchemaValidation: false
});

wt.init(function(error, rfxtrx, xpl) {
	if (error) {
		console.error(error);
		return;
	}

	// Load config file into hash
        wt.readConfig();
        
        // Send every minutes an xPL status message 
        setInterval(function(){
                wt.sendConfig();
        }, 60 * 1000);
	
	xpl.addBodySchema(schema_Ac.id, schema_Ac.definitions.body);
        xpl.addBodySchema(schema_Homeeasy.id, schema_Homeeasy.definitions.body);
        xpl.addBodySchema(schema_x10basic.id, schema_x10basic.definitions.body);
        xpl.addBodySchema(schema_x10security.id, schema_x10security.definitions.body);
        xpl.addBodySchema(schema_Sensorbasic.id, schema_Sensorbasic.definitions.body);

        xpl.on("xpl:homeeasy.basic", function(message) {
		//console.log("Receive message ", message);
                var deviceId = message.body.address + '/' + message.body.unit;

                var light=new rfxcom.Lighting2(rfxtrx, rfxcom.lighting2.HOMEEASY_EU);

                if(message.body.command == 'on'){
                        light.switchOn(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.switchOff(deviceId);
                }
                else if (message.body.command == 'preset'){
                        light.setLevel(deviceId, parseInt(message.body.level, 10));
                }
        });

        xpl.on("xpl:ac.basic", function(message) {
		//console.log("Receive message ", message);
                var deviceId = message.body.address + '/' + message.body.unit;

                var light=new rfxcom.Lighting2(rfxtrx, rfxcom.lighting2.AC);

                if(message.body.command == 'on'){
                        light.switchOn(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.switchOff(deviceId);
                }
                else if (message.body.command == 'preset'){
                        light.setLevel(deviceId, parseInt(message.body.level, 10));
                }
		
		// WTF the gateway doesn't send back a xpl-stat message ?
		if (message.headerName == 'xpl-cmnd') {
			wt.sendXplStat(message.body, 'ac.basic' );
		}
        });
        
        xpl.on("xpl:x10.basic", function(message) {
		//console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.X10);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);
                }
        });
        
	rfxtrx.on("elec2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
		}
		wt.xplSend_elec(evt, 1);
	});

	rfxtrx.on("elec3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
		}
		wt.xplSend_elec(evt, 1);
	});
        
	/**
	 * 
	 * light control device.
	 * 
	 * 0: "X10", 1: "ARC", 2: "ELRO AB400D", 3: "Waveman", 4: "EMW200", 5:
	 * "Impuls", 6: "RisingSun", 7: "Philips SBC"
	 * 
	 */
        rfxtrx.on("lighting1", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_lighting1(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
        rfxtrx.on("lighting2", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_lighting2(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * 
	 * light control device.
	 * 
	 * 0: "LightwaveRF, Siemens", 1: "EMW100 GAO/Everflourish"
	 * 
	 */
        rfxtrx.on("lighting5", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_lighting5(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from various security
	 * devices.
	 * 
	 */
        rfxtrx.on("security1", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_lsecurity1(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from rfxmeter devices.
	 * 
	 */
        rfxtrx.on("rfxmeter", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_rfxmeter(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from digital scales.
	 * 
	 */
        rfxtrx.on("weight", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_weight(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * Called by the data event handler when data arrives from rfxmeter devices.
	 * 
	 */
        rfxtrx.on("rfxsensor", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_rfxsensor(evt, !lastEvt || lastEvt.command != evt.command);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from thb1-thb2 devices.
	 * 
	 */
        
        rfxtrx.on("thb1", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_barometer(evt, !lastEvt || lastEvt.barometer != evt.barometer);
                wt.xplSend_th_forecast(evt, !lastEvt || lastEvt.forecast != evt.forecast);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("thb2", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_barometer(evt, !lastEvt || lastEvt.barometer != evt.barometer);
                wt.xplSend_th_forecast(evt, !lastEvt || lastEvt.forecast != evt.forecast);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from th1-9 devices.
	 * 
	 */
        
        rfxtrx.on("th1", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
       rfxtrx.on("th2", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
       rfxtrx.on("th3", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
       rfxtrx.on("th4", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        
       rfxtrx.on("th5", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        
       rfxtrx.on("th6", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
       rfxtrx.on("th7", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
                
       rfxtrx.on("th8", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
       rfxtrx.on("th9", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
	/**
	 * 
	 * Called by the data event handler when data arrives from temp1-9 devices.
	 * 
	 */
        
        rfxtrx.on("temp1", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp2", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp3", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp4", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp5", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp6", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp7", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
        rfxtrx.on("temp8", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });

        rfxtrx.on("temp0", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
        
});
