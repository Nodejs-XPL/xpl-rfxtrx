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
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_lighting1(evt, 1);
			return;
		}
		var lastevt = wt.hash[evt.id];
		if (lastevt.command != evt.command) {
			wt.xplSend_lighting1(evt, 1);
		} else {
			wt.xplSend_lighting1(evt, 0);
		}
	});

	/**
	 * 
	 * light control device.
	 * 
	 * LightwaveRF/Siemens
	 */
	rfxtrx.on("lighting2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_lighting2(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.xplSend_lighting2(evt, 1);
			} else
				wt.xplSend_lighting2(evt, 0);
		}
	});

	/**
	 * 
	 * light control device.
	 * 
	 * 0: "LightwaveRF, Siemens", 1: "EMW100 GAO/Everflourish"
	 * 
	 */
	rfxtrx.on("lighting5", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_lighting5(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.xplSend_lighting5(evt, 1);
			} else
				wt.xplSend_lighting5(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from various security
	 * devices.
	 * 
	 */
	rfxtrx.on("security1", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_security1(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.deviceStatus != evt.deviceStatus) {
				wt.xplSend_security1(evt, 1);
			} else
				wt.xplSend_security1(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from rfxmeter devices.
	 * 
	 */
	rfxtrx.on("rfxmeter", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
                        wt.xplSend_rfxmeter(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.counter != evt.counter) {
				wt.xplSend_rfxmeter(evt, 1);
			} else
				wt.xplSend_rfxmeter(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from digital scales.
	 * 
	 */
	rfxtrx.on("weight", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
                        wt.xplSend_weight(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.xplSend_weight(evt, 1);
			} else
				wt.xplSend_weight(evt, 0);
		}
	});

	/**
	 * Called by the data event handler when data arrives from rfxmeter devices.
	 * 
	 */
	rfxtrx.on("rfxsensor", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
                        wt.xplSend_rfxsensor(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.xplSend_rfxsensor(evt, 1);
			} else
				wt.xplSend_rfxsensor(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from thb1-thb2 devices.
	 * 
	 */
	rfxtrx.on("thb1", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_barometer(evt, 1);
                        wt.xplSend_th_forecast(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.barometer != evt.barometer) {
				wt.xplSend_th_barometer(evt, 1);
			} else
				wt.xplSend_th_barometer(evt, 0);

			if (lastevt.forecast != evt.forecast) {
				wt.xplSend_th_forecast(evt, 1);
			} else
				wt.xplSend_th_forecast(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("thb2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_barometer(evt, 1);
                        wt.xplSend_th_forecast(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.barometer != evt.barometer) {
				wt.xplSend_th_barometer(evt, 1);
			} else
				wt.xplSend_th_barometer(evt, 0);

			if (lastevt.forecast != evt.forecast) {
				wt.xplSend_th_forecast(evt, 1);
			} else
				wt.xplSend_th_forecast(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from th1-9 devices.
	 * 
	 */
	rfxtrx.on("th1", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th4", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th5", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th6", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th7", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th8", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("th9", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_humidity(evt, 1);
                        wt.xplSend_th_humidityStatus(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.humidity != evt.humidity) {
				wt.xplSend_th_humidity(evt, 1);
			} else
				wt.xplSend_th_humidity(evt, 0);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.xplSend_th_humidityStatus(evt, 1);
			} else
				wt.xplSend_th_humidityStatus(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	/**
	 * 
	 * Called by the data event handler when data arrives from temp1-9 devices.
	 * 
	 */
	rfxtrx.on("temp1", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp4", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp5", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp6", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp7", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp8", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.xplSend_th_temp(evt, 1);
			} else
				wt.xplSend_th_temp(evt, 0);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.xplSend_th_battery(evt, 1);
			} else
				wt.xplSend_th_battery(evt, 0);

			if (lastevt.rssi != evt.rssi) {
				wt.xplSend_th_rssi(evt, 1);
			} else
				wt.xplSend_th_rssi(evt, 0);
		}
	});

	rfxtrx.on("temp9", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.xplSend_th_temp(evt, 1);
                        wt.xplSend_th_battery(evt, 1);
                        wt.xplSend_th_rssi(evt, 1);
			return;
		}

		var lastevt = wt.hash[evt.id];
		if (lastevt.temperature != evt.temperature) {
			wt.xplSend_th_temp(evt, 1);
		} else {
			wt.xplSend_th_temp(evt, 0);
		}

		if (lastevt.batteryLevel != evt.batteryLevel) {
			wt.xplSend_th_battery(evt, 1);
		} else {
			wt.xplSend_th_battery(evt, 0);
		}

		if (lastevt.rssi != evt.rssi) {
			wt.xplSend_th_rssi(evt, 1);
		} else {
			wt.xplSend_th_rssi(evt, 0);
		}
	});

});
