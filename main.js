var wt = require("./lib/xpl-rfxtrx");

wt.xpl.bind(function(error) {
    if (error) {
        console.error(error);
        return;
    };

    wt.rfxtrx.on("elec2", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
        }
        wt.prototype.trig_elec(evt);
    });

    wt.rfxtrx.on("elec3", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
        }
        wt.prototype.trig_elec(evt);
    });

    /**
     *
     * light control device.
     * 
     *  0: "X10",
     *  1: "ARC",
     *  2: "ELRO AB400D",
     *  3: "Waveman",
     *  4: "EMW200",
     *  5: "Impuls",
     *  6: "RisingSun",
     *  7: "Philips SBC"
     *
     */
    wt.rfxtrx.on("lighting1", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_lighting1(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.command != evt.command) {
                wt.prototype.trig_lighting1(evt);
            }
            else wt.prototype.stat_lighting1(evt); 
        }
    });

    /**
     * 
     * light control device.
     *  
     *  LightwaveRF/Siemens
     */
    wt.rfxtrx.on("lighting2", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_lighting2(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.command != evt.command) {
                wt.prototype.trig_lighting2(evt);
            }
            else wt.prototype.stat_lighting2(evt); 
        }
    });

    /**
     *
     * light control device.
     * 
     *  0: "LightwaveRF, Siemens",
     *  1: "EMW100 GAO/Everflourish"
     *
     */
    wt.rfxtrx.on("lighting5", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_lighting5(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.command != evt.command) {
                wt.prototype.trig_lighting5(evt);
            }
            else wt.prototype.stat_lighting5(evt); 
        }
    });
    
    /**
     *
     * Called by the data event handler when data arrives from various security
     * devices.
     *
     */
    wt.rfxtrx.on("security1", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_security1(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.deviceStatus != evt.deviceStatus) {
                wt.prototype.trig_security1(evt);
            }
            else wt.prototype.stat_security1(evt); 
        }
    });

    /**
     *
     * Called by the data event handler when data arrives from rfxmeter
     * devices.
     *
     */
    wt.rfxtrx.on("rfxmeter", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_rfxmeter(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.counter != evt.counter) {
                wt.prototype.trig_rfxmeter(evt);
            }
            else wt.prototype.stat_rfxmeter(evt); 
        }
    });
    
    /**
     *
     * Called by the data event handler when data arrives from digital
     * scales.
     *
     */
    wt.rfxtrx.on("weight", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_weight(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.command != evt.command) {
                wt.prototype.trig_weight(evt);
            }
            else wt.prototype.stat_weight(evt); 
        }
    });
    
    /**
     * Called by the data event handler when data arrives from rfxmeter
     * devices.
     *
     */
    wt.rfxtrx.on("rfxsensor", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_rfxsensor(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.command != evt.command) {
                wt.prototype.trig_rfxsensor(evt);
            }
            else wt.prototype.stat_rfxsensor(evt); 
        }
    });
    
    /**
     *
     * Called by the data event handler when data arrives from thb1-thb2
     * devices.
     *
     */
    wt.rfxtrx.on("thb1", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.barometer != evt.barometer) {
                wt.prototype.trig_th_barometer(evt);
            }
            else wt.prototype.stat_th_barometer(evt); 
            
            if(lastevt.forecast != evt.forecast) {
                wt.prototype.trig_th_forecast(evt);
            }
            else wt.prototype.stat_th_forecast(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("thb2", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.barometer != evt.barometer) {
                wt.prototype.trig_th_barometer(evt);
            }
            else wt.prototype.stat_th_barometer(evt); 
            
            if(lastevt.forecast != evt.forecast) {
                wt.prototype.trig_th_forecast(evt);
            }
            else wt.prototype.stat_th_forecast(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    /**
     *
     * Called by the data event handler when data arrives from th1-9
     * devices.
     *
     */
    wt.rfxtrx.on("th1", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("th2", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("th3", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("th4", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("th5", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("th6", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("th7", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("th8", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("th9", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.humidity != evt.humidity) {
                wt.prototype.trig_th_humidity(evt);
            }
            else wt.prototype.stat_th_humidity(evt); 
            
            if(lastevt.humidityStatus != evt.humidityStatus) {
                wt.prototype.trig_th_humidityStatus(evt);
            }
            else wt.prototype.stat_th_humidityStatus(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    /**
     *
     * Called by the data event handler when data arrives from temp1-9
     * devices.
     *
     */
    wt.rfxtrx.on("temp1", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("temp2", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("temp3", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("temp4", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("temp5", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("temp6", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
    wt.rfxtrx.on("temp7", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("temp8", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });

    wt.rfxtrx.on("temp9", function (evt) {
        if(!wt.hash[evt.id]) {
            wt.hash[evt.id] = evt;
            wt.prototype.trig_thb(evt);
        }
        else {
            var lastevt = wt.hash[evt.id];
            if(lastevt.temperature != evt.temperature) {
                wt.prototype.trig_th_temperature(evt);
            }
            else wt.prototype.stat_th_temperature(evt); 
            
            if(lastevt.batteryLevel != evt.batteryLevel) {
                wt.prototype.trig_th_batteryLevel(evt);
            }
            else wt.prototype.stat_th_batteryLevel(evt); 
            
            if(lastevt.rssi != evt.rssi) {
                wt.prototype.trig_th_rssi(evt);
            }
            else wt.prototype.stat_th_rssi(evt); 
        }
    });
    
});