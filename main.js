var XplRfxTrx = require("./lib/xpl-rfxtrx");
var rfxcom = require('rfxcom');

var wt = new XplRfxTrx("/dev/ttyUSB0", {
	rfxtrxDebug: false
});

wt.init(function(error, rfxtrx, xpl) {
	if (error) {
		console.error(error);
		return;
	}

        xpl.on("xpl:homeeasy.basic", function(message) {
		console.log("Receive message ", message);
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
		console.log("Receive message ", message);
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
        });
        
        xpl.on("xpl:x10.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.X10);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:arc.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.ARC);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:elro.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.ELRO);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:waveman.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.WAVEMAN);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:chacon.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.CHACON);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:impuls.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.IMULS);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);

                }
        });
        
        xpl.on("xpl:risingsun.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.RISING_SUN);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);
                }
        });
        
        xpl.on("xpl:philipssbc.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device;

                var light=new rfxcom.Lighting1(rfxtrx, rfxcom.lighting1.PHILIPS_SBC);

                if(message.body.command == 'on'){
                        light.chime(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.chime(deviceId);
                }
        });
        
        xpl.on("xpl:lightwaverf.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device + '/' + message.body.unitcode;

                var light=new rfxcom.Lighting5(rfxtrx, rfxcom.lighting5.LIGHTWAVERF);

                if(message.body.command == 'on'){
                        light.switchOn(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.switchOff(deviceId);
                }
        });
        
        xpl.on("xpl:emw100.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device + '/' + message.body.unitcode;

                var light=new rfxcom.Lighting5(rfxtrx, rfxcom.lighting5.EMW100);

                if(message.body.command == 'on'){
                        light.switchOn(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.switchOff(deviceId);
                }
        });
        
        xpl.on("xpl:bbsb.basic", function(message) {
		console.log("Receive message ", message);
                var deviceId = message.body.device + '/' + message.body.unitcode;

                var light=new rfxcom.Lighting5(rfxtrx, rfxcom.lighting5.BBSB);

                if(message.body.command == 'on'){
                        light.switchOn(deviceId);
                }
                else if(message.body.command == 'off'){
                        light.switchOff(deviceId);
                }
        });
        
	rfxtrx.on("elec2" || "elec3", function(evt) {
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
        
        rfxtrx.on("thb1" || "thb2", function(evt) {
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
        
        rfxtrx.on("th1" || "th2" || "th3" || "th4" || "th5" || "th6" || "th7" || "th8" || "th9", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_humidity(evt, !lastEvt || lastEvt.humidity != evt.humidity);
                wt.xplSend_th_humidityStatus(evt, !lastEvt || lastEvt.humidityStatus != evt.humidityStatus);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        })
        
	/**
	 * 
	 * Called by the data event handler when data arrives from temp1-9 devices.
	 * 
	 */
        
        rfxtrx.on("temp1" || "temp2" || "temp3" || "temp4" || "temp5" || "temp6" || "temp7" || "temp8" || "temp9", function(evt) {
                var lastEvt = wt.hash[evt.id];
                wt.hash[evt.id]=evt;
                wt.xplSend_th_temp(evt, !lastEvt || lastEvt.temperature != evt.temperature);
                wt.xplSend_th_battery(evt, !lastEvt || lastEvt.batteryLevel != evt.batteryLevel);
                wt.xplSend_th_rssi(evt, !lastEvt || lastEvt.rssi != evt.rssi);
        });
});
