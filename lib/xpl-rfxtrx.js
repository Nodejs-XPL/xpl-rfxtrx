function wt() {
    var self = this;
    var rfxcom = require('rfxcom'), Xpl=require("xpl-api");
    
    self.hash = [];

    self.rfxtrx = new rfxcom.RfxCom("/dev/ttyUSB0", {debug: false});
    
    self.xpl=new Xpl({
        xplSource: "bnz-rfxtrx.wiseflat",
        xplLog: false
    });

    self.rfxtrx.initialise(function () {
        console.log("Device initialised");
    });

    self.rfxtrx.on("ready", function (evt) {
        console.log("Device is ready");
    });
    
    self.xpl.bind(function(error) {
        if (error) {
            console.error(error);
            return;
        };

        self.rfxtrx.on("elec2", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
            }
            self.prototype.trig_elec(evt);
        });

        self.rfxtrx.on("elec3", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
            }
            self.prototype.trig_elec(evt);
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
        self.rfxtrx.on("lighting1", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_lighting1(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.command != evt.command) {
                    self.prototype.trig_lighting1(evt);
                }
                else self.prototype.stat_lighting1(evt); 
            }
        });

        /**
         * 
         * light control device.
         *  
         *  LightwaveRF/Siemens
         */
        self.rfxtrx.on("lighting2", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_lighting2(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.command != evt.command) {
                    self.prototype.trig_lighting2(evt);
                }
                else self.prototype.stat_lighting2(evt); 
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
        self.rfxtrx.on("lighting5", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_lighting5(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.command != evt.command) {
                    self.prototype.trig_lighting5(evt);
                }
                else self.prototype.stat_lighting5(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from various security
         * devices.
         *
         */
        self.rfxtrx.on("security1", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_security1(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.deviceStatus != evt.deviceStatus) {
                    self.prototype.trig_security1(evt);
                }
                else self.prototype.stat_security1(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from rfxmeter
         * devices.
         *
         */
        self.rfxtrx.on("rfxmeter", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_rfxmeter(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.counter != evt.counter) {
                    self.prototype.trig_rfxmeter(evt);
                }
                else self.prototype.stat_rfxmeter(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from digital
         * scales.
         *
         */
        self.rfxtrx.on("weight", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_weight(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.command != evt.command) {
                    self.prototype.trig_weight(evt);
                }
                else self.prototype.stat_weight(evt); 
            }
        });

        /**
         * Called by the data event handler when data arrives from rfxmeter
         * devices.
         *
         */
        self.rfxtrx.on("rfxsensor", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_rfxsensor(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.command != evt.command) {
                    self.prototype.trig_rfxsensor(evt);
                }
                else self.prototype.stat_rfxsensor(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from thb1-thb2
         * devices.
         *
         */
        self.rfxtrx.on("thb1", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.barometer != evt.barometer) {
                    self.prototype.trig_th_barometer(evt);
                }
                else self.prototype.stat_th_barometer(evt); 

                if(lastevt.forecast != evt.forecast) {
                    self.prototype.trig_th_forecast(evt);
                }
                else self.prototype.stat_th_forecast(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("thb2", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.barometer != evt.barometer) {
                    self.prototype.trig_th_barometer(evt);
                }
                else self.prototype.stat_th_barometer(evt); 

                if(lastevt.forecast != evt.forecast) {
                    self.prototype.trig_th_forecast(evt);
                }
                else self.prototype.stat_th_forecast(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from th1-9
         * devices.
         *
         */
        self.rfxtrx.on("th1", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th2", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th3", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th4", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th5", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th6", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th7", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th8", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("th9", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.humidity != evt.humidity) {
                    self.prototype.trig_th_humidity(evt);
                }
                else self.prototype.stat_th_humidity(evt); 

                if(lastevt.humidityStatus != evt.humidityStatus) {
                    self.prototype.trig_th_humidityStatus(evt);
                }
                else self.prototype.stat_th_humidityStatus(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        /**
         *
         * Called by the data event handler when data arrives from temp1-9
         * devices.
         *
         */
        self.rfxtrx.on("temp1", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp2", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp3", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp4", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp5", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp6", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp7", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp8", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });

        self.rfxtrx.on("temp9", function (evt) {
            if(!self.hash[evt.id]) {
                self.hash[evt.id] = evt;
                self.prototype.trig_thb(evt);
            }
            else {
                var lastevt = self.hash[evt.id];
                if(lastevt.temperature != evt.temperature) {
                    self.prototype.trig_th_temperature(evt);
                }
                else self.prototype.stat_th_temperature(evt); 

                if(lastevt.batteryLevel != evt.batteryLevel) {
                    self.prototype.trig_th_batteryLevel(evt);
                }
                else self.prototype.stat_th_batteryLevel(evt); 

                if(lastevt.rssi != evt.rssi) {
                    self.prototype.trig_th_rssi(evt);
                }
                else self.prototype.stat_th_rssi(evt); 
            }
        });
    });
    
}
    
    
    /*****/
    
    
wt.prototype.trig_elec = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        count: evt.count,
        currentWatts: evt.currentWatts,
        totalWatts: evt.totalWatts
    });
};

wt.prototype.trig_lighting1 = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        housecode: evt.housecode,
        unitcode: evt.unitcode,
        command: evt.command,
        rssi: evt.rssi
    },'x10.basic');
};

wt.prototype.stat_lighting1 = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        housecode: evt.housecode,
        unitcode: evt.unitcode,
        command: evt.command,
        rssi: evt.rssi
    }, 'x10.basic');
};

wt.prototype.trig_lighting2 = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        unitcode: evt.unitcode,
        command: evt.command,
        level: evt.level,
        rssi: evt.rssi
    }, 'homeeasy.basic');
};

wt.prototype.stat_lighting2 = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        unitcode: evt.unitcode,
        command: evt.command,
        level: evt.level,
        rssi: evt.rssi
    }, 'homeeasy.basic');
};

wt.prototype.trig_lighting5 = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        unitcode: evt.unitcode,
        command: evt.command
    }, 'Lightwaverf.basic');
};

wt.prototype.stat_lighting5 = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        unitcode: evt.unitcode,
        command: evt.command
    }, 'Lightwaverf.basic');
};

wt.prototype.trig_security1 = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        deviceStatus: evt.deviceStatus,
        batteryLevel: evt.batteryLevel,
        rssi: evt.rssi,
        tampered: evt.tampered
    }, 'x10.security');
};

wt.prototype.stat_security1 = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        deviceStatus: evt.deviceStatus,
        batteryLevel: evt.batteryLevel,
        rssi: evt.rssi,
        tampered: evt.tampered
    }, 'x10.security');
};

wt.prototype.trig_rfxmeter = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        counter: evt.counter
    });
};

wt.prototype.stat_rfxmeter = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        counter: evt.counter
    });
};


wt.prototype.trig_weight = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        weight: evt.weight,
        batteryLevel: evt.batteryLevel,
        rssi: evt.rssi
    });
};

wt.prototype.stat_weight = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        weight: evt.weight,
        batteryLevel: evt.batteryLevel,
        rssi: evt.rssi
    });
};

wt.prototype.trig_rfxsensor = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        message: evt.message,
        rssi: evt.rssi
    });
};

wt.prototype.stat_rfxsensor = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        message: evt.message,
        rssi: evt.rssi
    });
};

wt.prototype.trig_th_forecast = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'forecast',
        current: evt.temperature
    });
};

wt.prototype.stat_th_forecast = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'forecast',
        current: evt.temperature
    });
};

wt.prototype.trig_th_barometer = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'barometer',
        current: evt.temperature
    });
};

wt.prototype.stat_th_barometer = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'barometer',
        current: evt.temperature
    });
};

wt.prototype.trig_th_temperature = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'temp',
        current: evt.temperature
    });
};

wt.prototype.stat_th_temperature = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'temp',
        current: evt.temperature
    });
};

wt.prototype.trig_th_humidity = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'humidity',
        current: evt.humidity
    });
};

wt.prototype.stat_th_humidity = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'humidity',
        current: evt.humidity
    });
};

wt.prototype.trig_th_humidityStatus = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'humidityStatus',
        current: evt.humidityStatus
    });
};

wt.prototype.stat_th_humidityStatus = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'humidityStatus',
        current: evt.humidityStatus
    });
};

wt.prototype.trig_th_batteryLevel = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'battery',
        current: evt.batteryLevel
    });
};

wt.prototype.stat_th_batteryLevel = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'battery',
        current: evt.batteryLevel
    });
};

wt.prototype.trig_th_rssi = function(evt) {
    var self = this;
    self.xpl.sendXplTrig({
        device: evt.id,
        subtype: evt.subtype,
        type: 'rssi',
        current: evt.rssi
    });
};

wt.prototype.stat_th_rssi = function(evt) {
    var self = this;
    self.xpl.sendXplStat({
        device: evt.id,
        subtype: evt.subtype,
        type: 'rssi',
        current: evt.rssi
    });
};