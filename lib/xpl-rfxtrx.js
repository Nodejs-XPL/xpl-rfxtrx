var rfxcom = require('rfxcom');
var Xpl = require('xpl-api');
var pjson = require('../package.json');
var fs = require('fs');

function wt(device, options) {
	options = options || {};
	this._options = options;
	this.hash = [];

	this.configFile = "/etc/wiseflat/rfxtrx.config.json";
        this.configHash = [];

	this.rfxtrx = new rfxcom.RfxCom(device, {
		debug: options.rfxtrxDebug
	});

	this.version = pjson.version;
	
	options.xplSource = options.xplSource || "bnz-rfxtrx.wiseflat";

	this.xpl = new Xpl(options);
}

module.exports = wt;

var proto = {
    
        init: function(callback) {
                var self = this;

                this.rfxtrx.initialise(function(error) {
                        if (error) {
                                return callback(error);
                        }
                        self._log("RFXTRX device initialised");

                        self.xpl.bind(function(error) {
                                if (error) {
                                        return callback(error);
                                }

                                self._log("XPL is ready");

                                callback(null, self.rfxtrx, self.xpl);
                        });
                });
        },

	_log: function(log) {
		/*if (!this._configuration.xplLog) {
			return;
		}*/
                
		console.log('xpl-rfxtrx -', log);
	},
	
        /*
         *  Config xPL message
         */
        
        readConfig: function(callback) {
                var self = this;
                fs.readFile(self.configFile, { encoding: "utf-8"}, function (err, body) {
                        if (err) self._log("file "+self.configFile+" is empty ...");
                        else {
                            self.configHash = JSON.parse(body);
                        }
                });
        },

        sendConfig: function(callback) {
                var self = this;
                self._sendXplStat(self.configHash, 'rfxtrx.config', '*');
        },
        
        writeConfig: function(body) {
                var self = this;
		self.configHash.version = self.version;
                self.configHash.enable = body.enable;
                fs.writeFile(self.configFile, JSON.stringify(self.configHash), function(err) {
                        if (err) self._log("file "+self.configFile+" was not saved to disk ...");
			else self._sendXplStat(self.configHash, 'rfxtrx.config', evt.header.source);
                });
        },
	
        _sendXplStat: function(body, schema, target) {
                var self = this;                
                self.xpl.sendXplStat(
                        body,
                        schema,
			target
                );
        },      

        _send: function(trigMode, body, bodyName, callback) {
                var func=(trigMode)?this.xpl.sendXplTrig:this.xpl.sendXplStat;

                func.call(this.xpl, body, bodyName, callback);
        },

        xplSend_elec: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            count: evt.count,
                            currentWatts: evt.currentWatts,
                            totalWatts: evt.totalWatts
                        }, null, callback);
        },

        xplSend_lighting1: function(evt, trigMode, callback) {
                var subtype = {
                        0 : 'x10',
                        1 : 'arc',
                        2 : 'elro',
                        3 : 'waveman',
                        4 : 'chacon',
                        5 : 'impuls',
                        6 : 'risingsun',
                        7 : 'philipssbc'
                };

                this._send(trigMode, {
                            device: evt.id,
                            //protocol: evt.subtype,
                            housecode: evt.housecode,
                            unitcode: evt.unitcode,
                            command: evt.command,
                            rssi: evt.rssi
                        }, subtype[evt.subtype]+'.basic', callback
                );

        },

        xplSend_lighting2: function(evt, trigMode, callback) {
                var subtype = {
                        0: 'ac',
                        1: 'homeeasy',
                        2: 'anslut'
                };

                this._send(trigMode, {
                            device: evt.id,
                            //protocol: evt.subtype,
                            unit: evt.unitcode,
                            command: evt.command.toLowerCase(),
                            level: evt.level,
                            rssi: evt.rssi
                        }, subtype[evt.subtype]+'.basic', callback
                );
        },

        xplSend_lighting5: function(evt, trigMode, callback) {
                var subtype = {
                        0 : 'lightwaverf',
                        1 : 'emw100',
                        2 : 'bbsb'
                };

                this._send(trigMode, {
                            device: evt.id,
                            //protocol: evt.subtype,
                            subtype: evt.subtype,
                            unitcode: evt.unitcode,
                            command: evt.command
                        }, subtype[evt.subtype]+'.basic', callback
                );
        },

        xplSend_security1: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            deviceStatus: evt.deviceStatus,
                            batteryLevel: evt.batteryLevel,
                            rssi: evt.rssi,
                            tampered: evt.tampered
                        }, 'x10.security', callback
                );            
        },

        xplSend_rfxmeter: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            counter: evt.counter
                        }, callback
                );
        },

        xplSend_weight: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            weight: evt.weight,
                            batteryLevel: evt.batteryLevel,
                            rssi: evt.rssi
                        }, callback
                );
        },

        xplSend_rfxsensor: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            message: evt.message,
                            rssi: evt.rssi
                        }, callback
                );
        },

        xplSend_th_forecast: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'forecast',
                            current: evt.temperature
                        }, callback
                );
        },

        xplSend_th_barometer: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'barometer',
                            current: evt.temperature
                        }, callback
                );
        },

        xplSend_th_temp: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'temp',
                            current: evt.temperature
                        }, callback
                );
        },


        xplSend_th_humidity: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'humidity',
                            current: evt.humidity
                        }, callback
                );
        },

        xplSend_th_humidityStatus: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'humidityStatus',
                            current: evt.humidityStatus
                        }, callback
                );
        },

        xplSend_th_battery: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'battery',
                            current: evt.batteryLevel
                        }, callback
                );
        },

        xplSend_th_rssi: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'rssi',
                            current: evt.rssi
                        }, callback
                );
        }
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
