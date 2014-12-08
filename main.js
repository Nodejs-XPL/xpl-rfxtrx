var XplRfxTrx = require("./lib/xpl-rfxtrx");

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

                var light=new Lighting2(wt.rfxcom, wt.rfxcom.lighting2.HOMEEASY_EU);

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

                var light=new Lighting2(wt.rfxcom, wt.rfxcom.lighting2.AC);

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
        
	rfxtrx.on("elec2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
		}
		wt.trig_elec(evt);
	});

	rfxtrx.on("elec3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
		}
		wt.trig_elec(evt);
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
			wt.trig_lighting1(evt);
			return;
		}
		var lastevt = wt.hash[evt.id];
		if (lastevt.command != evt.command) {
			wt.trig_lighting1(evt);
		} else {
			wt.stat_lighting1(evt);
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
			wt.trig_lighting2(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.trig_lighting2(evt);
			} else
				wt.stat_lighting2(evt);
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
			wt.trig_lighting5(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.trig_lighting5(evt);
			} else
				wt.stat_lighting5(evt);
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
			wt.trig_security1(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.deviceStatus != evt.deviceStatus) {
				wt.trig_security1(evt);
			} else
				wt.stat_security1(evt);
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
			wt.trig_rfxmeter(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.counter != evt.counter) {
				wt.trig_rfxmeter(evt);
			} else
				wt.stat_rfxmeter(evt);
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
			wt.trig_weight(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.trig_weight(evt);
			} else
				wt.stat_weight(evt);
		}
	});

	/**
	 * Called by the data event handler when data arrives from rfxmeter devices.
	 * 
	 */
	rfxtrx.on("rfxsensor", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_rfxsensor(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.command != evt.command) {
				wt.trig_rfxsensor(evt);
			} else
				wt.stat_rfxsensor(evt);
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
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_barometer(evt);
                        wt.trig_th_forecast(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.barometer != evt.barometer) {
				wt.trig_th_barometer(evt);
			} else
				wt.stat_th_barometer(evt);

			if (lastevt.forecast != evt.forecast) {
				wt.trig_th_forecast(evt);
			} else
				wt.stat_th_forecast(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("thb2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_barometer(evt);
                        wt.trig_th_forecast(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.barometer != evt.barometer) {
				wt.trig_th_barometer(evt);
			} else
				wt.stat_th_barometer(evt);

			if (lastevt.forecast != evt.forecast) {
				wt.trig_th_forecast(evt);
			} else
				wt.stat_th_forecast(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
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
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th4", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th5", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th6", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th7", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th8", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("th9", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_humidity(evt);
                        wt.trig_th_humidityStatus(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.humidity != evt.humidity) {
				wt.trig_th_humidity(evt);
			} else
				wt.stat_th_humidity(evt);

			if (lastevt.humidityStatus != evt.humidityStatus) {
				wt.trig_th_humidityStatus(evt);
			} else
				wt.stat_th_humidityStatus(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
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
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp2", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp3", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp4", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp5", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp6", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp7", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp8", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
		} else {
			var lastevt = wt.hash[evt.id];
			if (lastevt.temperature != evt.temperature) {
				wt.trig_th_temperature(evt);
			} else
				wt.stat_th_temperature(evt);

			if (lastevt.batteryLevel != evt.batteryLevel) {
				wt.trig_th_batteryLevel(evt);
			} else
				wt.stat_th_batteryLevel(evt);

			if (lastevt.rssi != evt.rssi) {
				wt.trig_th_rssi(evt);
			} else
				wt.stat_th_rssi(evt);
		}
	});

	rfxtrx.on("temp9", function(evt) {
		if (!wt.hash[evt.id]) {
			wt.hash[evt.id] = evt;
			wt.trig_th_temperature(evt);
                        wt.trig_th_batteryLevel(evt);
                        wt.trig_th_rssi(evt);
			return;
		}

		var lastevt = wt.hash[evt.id];
		if (lastevt.temperature != evt.temperature) {
			wt.trig_th_temperature(evt);
		} else {
			wt.stat_th_temperature(evt);
		}

		if (lastevt.batteryLevel != evt.batteryLevel) {
			wt.trig_th_batteryLevel(evt);
		} else {
			wt.stat_th_batteryLevel(evt);
		}

		if (lastevt.rssi != evt.rssi) {
			wt.trig_th_rssi(evt);
		} else {
			wt.stat_th_rssi(evt);
		}
	});

});
